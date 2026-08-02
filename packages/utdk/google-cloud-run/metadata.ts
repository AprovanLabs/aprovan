import type { ToolRuntimeMetadataMap } from "../client.js";

export const toolMetadata = {
  "run.projects.locations.services.revisions.delete": {
    "accessPath": [
      "runProjectsLocationsServicesRevisionsDelete"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v2/{name}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "name"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "etag",
      "validateOnly"
    ],
    "description": "Deletes a Revision.",
    "parameterDescriptions": {
      "name": "Required. The name of the Revision to delete. Format: projects/{project}/locations/{location}/services/{service}/revisions/{revision}",
      "etag": "A system-generated fingerprint for this version of the resource. This may be used to detect modification conflict during updates.",
      "validateOnly": "Indicates that the request should be validated without actually deleting any resources."
    }
  },
  "run.projects.locations.services.revisions.get": {
    "accessPath": [
      "runProjectsLocationsServicesRevisionsGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v2/{name}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "name"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType"
    ],
    "description": "Gets information about a Revision.",
    "parameterDescriptions": {
      "name": "Required. The full name of the Revision. Format: projects/{project}/locations/{location}/services/{service}/revisions/{revision}"
    }
  },
  "run.projects.locations.services.patch": {
    "accessPath": [
      "runProjectsLocationsServicesPatch"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "annotations",
      "binaryAuthorization",
      "client",
      "clientVersion",
      "conditions",
      "createTime",
      "creator",
      "deleteTime",
      "description",
      "etag",
      "expireTime",
      "generation",
      "ingress",
      "labels",
      "lastModifier",
      "latestCreatedRevision",
      "latestReadyRevision",
      "launchStage",
      "name",
      "observedGeneration",
      "reconciling",
      "satisfiesPzs",
      "template",
      "terminalCondition",
      "traffic",
      "trafficStatuses",
      "uid",
      "updateTime",
      "uri"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/v2/{name}",
    "pathConflictKeys": [
      "name"
    ],
    "pathParameterKeys": [
      "name"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "allowMissing",
      "validateOnly"
    ],
    "description": "Updates a Service.",
    "parameterDescriptions": {
      "name": "The fully qualified name of this Service. In CreateServiceRequest, this field is ignored, and instead composed from CreateServiceRequest.parent and CreateServiceRequest.service_id. Format: projects/{project}/locations/{location}/services/{service_id}",
      "allowMissing": "This field is currently not used by Cloud Run; setting it does not have any effect.",
      "validateOnly": "Indicates that the request should be validated and default values populated, without persisting the request or updating any resources."
    }
  },
  "run.projects.locations.operations.list": {
    "accessPath": [
      "runProjectsLocationsOperationsList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v2/{name}/operations",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "name"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "filter",
      "pageSize",
      "pageToken"
    ],
    "description": "Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`.",
    "parameterDescriptions": {
      "name": "Required. To query for all of the operations for a project.",
      "filter": "Optional. A filter for matching the completed or in-progress operations. The supported formats of *filter* are: To query for only completed operations: done:true To query for only ongoing operations: done:false Must be empty to query for all of the latest operations for the given parent project.",
      "pageSize": "The maximum number of records that should be returned. Requested page size cannot exceed 100. If not set or set to less than or equal to 0, the default page size is 100. .",
      "pageToken": "Token identifying which result to start with, which is returned by a previous list call."
    }
  },
  "run.projects.locations.jobs.run": {
    "accessPath": [
      "runProjectsLocationsJobsRun"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "etag",
      "validateOnly"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v2/{name}:run",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "name"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType"
    ],
    "description": "Triggers creation of a new Execution of this Job.",
    "parameterDescriptions": {
      "name": "Required. The full name of the Job. Format: projects/{project}/locations/{location}/jobs/{job}, where {project} can be project id or number."
    }
  },
  "run.projects.locations.operations.wait": {
    "accessPath": [
      "runProjectsLocationsOperationsWait"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "timeout"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v2/{name}:wait",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "name"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType"
    ],
    "description": "Waits until the specified long-running operation is done or reaches at most a specified timeout, returning the latest state. If the operation is already done, the latest state is immediately returned. If the timeout specified is greater than the default HTTP/RPC timeout, the HTTP/RPC timeout is used. If the server does not support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Note that this method is on a best-effort basis. It may return the latest state before the specified timeout (including immediately), meaning even an immediate response is no guarantee that the operation is done.",
    "parameterDescriptions": {
      "name": "The name of the operation resource to wait on."
    }
  },
  "run.projects.locations.jobs.executions.list": {
    "accessPath": [
      "runProjectsLocationsJobsExecutionsList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v2/{parent}/executions",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "parent"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "pageSize",
      "pageToken",
      "showDeleted"
    ],
    "description": "Lists Executions from a Job.",
    "parameterDescriptions": {
      "parent": "Required. The Execution from which the Executions should be listed. To list all Executions across Jobs, use \"-\" instead of Job name. Format: projects/{project}/locations/{location}/jobs/{job}, where {project} can be project id or number.",
      "pageSize": "Maximum number of Executions to return in this call.",
      "pageToken": "A page token received from a previous call to ListExecutions. All other parameters must match.",
      "showDeleted": "If true, returns deleted (but unexpired) resources along with active ones."
    }
  },
  "run.projects.locations.jobs.list": {
    "accessPath": [
      "runProjectsLocationsJobsList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v2/{parent}/jobs",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "parent"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "pageSize",
      "pageToken",
      "showDeleted"
    ],
    "description": "Lists Jobs.",
    "parameterDescriptions": {
      "parent": "Required. The location and project to list resources on. Format: projects/{project}/locations/{location}, where {project} can be project id or number.",
      "pageSize": "Maximum number of Jobs to return in this call.",
      "pageToken": "A page token received from a previous call to ListJobs. All other parameters must match.",
      "showDeleted": "If true, returns deleted (but unexpired) resources along with active ones."
    }
  },
  "run.projects.locations.jobs.create": {
    "accessPath": [
      "runProjectsLocationsJobsCreate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "annotations",
      "binaryAuthorization",
      "client",
      "clientVersion",
      "conditions",
      "createTime",
      "creator",
      "deleteTime",
      "etag",
      "executionCount",
      "expireTime",
      "generation",
      "labels",
      "lastModifier",
      "latestCreatedExecution",
      "launchStage",
      "name",
      "observedGeneration",
      "reconciling",
      "satisfiesPzs",
      "template",
      "terminalCondition",
      "uid",
      "updateTime"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v2/{parent}/jobs",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "parent"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "jobId",
      "validateOnly"
    ],
    "description": "Creates a Job.",
    "parameterDescriptions": {
      "parent": "Required. The location and project in which this Job should be created. Format: projects/{project}/locations/{location}, where {project} can be project id or number.",
      "jobId": "Required. The unique identifier for the Job. The name of the job becomes {parent}/jobs/{job_id}.",
      "validateOnly": "Indicates that the request should be validated and default values populated, without persisting the request or creating any resources."
    }
  },
  "run.projects.locations.services.revisions.list": {
    "accessPath": [
      "runProjectsLocationsServicesRevisionsList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v2/{parent}/revisions",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "parent"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "pageSize",
      "pageToken",
      "showDeleted"
    ],
    "description": "Lists Revisions from a given Service, or from a given location.",
    "parameterDescriptions": {
      "parent": "Required. The Service from which the Revisions should be listed. To list all Revisions across Services, use \"-\" instead of Service name. Format: projects/{project}/locations/{location}/services/{service}",
      "pageSize": "Maximum number of revisions to return in this call.",
      "pageToken": "A page token received from a previous call to ListRevisions. All other parameters must match.",
      "showDeleted": "If true, returns deleted (but unexpired) resources along with active ones."
    }
  },
  "run.projects.locations.services.list": {
    "accessPath": [
      "runProjectsLocationsServicesList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v2/{parent}/services",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "parent"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "pageSize",
      "pageToken",
      "showDeleted"
    ],
    "description": "Lists Services.",
    "parameterDescriptions": {
      "parent": "Required. The location and project to list resources on. Location must be a valid Google Cloud region, and cannot be the \"-\" wildcard. Format: projects/{project}/locations/{location}, where {project} can be project id or number.",
      "pageSize": "Maximum number of Services to return in this call.",
      "pageToken": "A page token received from a previous call to ListServices. All other parameters must match.",
      "showDeleted": "If true, returns deleted (but unexpired) resources along with active ones."
    }
  },
  "run.projects.locations.services.create": {
    "accessPath": [
      "runProjectsLocationsServicesCreate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "annotations",
      "binaryAuthorization",
      "client",
      "clientVersion",
      "conditions",
      "createTime",
      "creator",
      "deleteTime",
      "description",
      "etag",
      "expireTime",
      "generation",
      "ingress",
      "labels",
      "lastModifier",
      "latestCreatedRevision",
      "latestReadyRevision",
      "launchStage",
      "name",
      "observedGeneration",
      "reconciling",
      "satisfiesPzs",
      "template",
      "terminalCondition",
      "traffic",
      "trafficStatuses",
      "uid",
      "updateTime",
      "uri"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v2/{parent}/services",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "parent"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "serviceId",
      "validateOnly"
    ],
    "description": "Creates a new Service in a given project and location.",
    "parameterDescriptions": {
      "parent": "Required. The location and project in which this service should be created. Format: projects/{project}/locations/{location}, where {project} can be project id or number. Only lowercase characters, digits, and hyphens.",
      "serviceId": "Required. The unique identifier for the Service. It must begin with letter, and cannot end with hyphen; must contain fewer than 50 characters. The name of the service becomes {parent}/services/{service_id}.",
      "validateOnly": "Indicates that the request should be validated and default values populated, without persisting the request or creating any resources."
    }
  },
  "run.projects.locations.jobs.executions.tasks.list": {
    "accessPath": [
      "runProjectsLocationsJobsExecutionsTasksList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v2/{parent}/tasks",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "parent"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "pageSize",
      "pageToken",
      "showDeleted"
    ],
    "description": "Lists Tasks from an Execution of a Job.",
    "parameterDescriptions": {
      "parent": "Required. The Execution from which the Tasks should be listed. To list all Tasks across Executions of a Job, use \"-\" instead of Execution name. To list all Tasks across Jobs, use \"-\" instead of Job name. Format: projects/{project}/locations/{location}/jobs/{job}/executions/{execution}",
      "pageSize": "Maximum number of Tasks to return in this call.",
      "pageToken": "A page token received from a previous call to ListTasks. All other parameters must match.",
      "showDeleted": "If true, returns deleted (but unexpired) resources along with active ones."
    }
  },
  "run.projects.locations.services.getIamPolicy": {
    "accessPath": [
      "runProjectsLocationsServicesGetIamPolicy"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v2/{resource}:getIamPolicy",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "resource"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "options.requestedPolicyVersion"
    ],
    "description": "Gets the IAM Access Control policy currently in effect for the given Cloud Run Service. This result does not include any inherited policies.",
    "parameterDescriptions": {
      "resource": "REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.",
      "options.requestedPolicyVersion": "Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies)."
    }
  },
  "run.projects.locations.services.setIamPolicy": {
    "accessPath": [
      "runProjectsLocationsServicesSetIamPolicy"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "policy",
      "updateMask"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v2/{resource}:setIamPolicy",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "resource"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType"
    ],
    "description": "Sets the IAM Access control policy for the specified Service. Overwrites any existing policy.",
    "parameterDescriptions": {
      "resource": "REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field."
    }
  },
  "run.projects.locations.services.testIamPermissions": {
    "accessPath": [
      "runProjectsLocationsServicesTestIamPermissions"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "permissions"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v2/{resource}:testIamPermissions",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "resource"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType"
    ],
    "description": "Returns permissions that a caller has on the specified Project. There are no permissions required for making this API call.",
    "parameterDescriptions": {
      "resource": "REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field."
    }
  }
} satisfies ToolRuntimeMetadataMap;
