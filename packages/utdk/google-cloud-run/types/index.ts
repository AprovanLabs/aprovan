import type { GoogleCloudRunV2BinaryAuthorization, GoogleCloudRunV2Condition, GoogleCloudRunV2ExecutionReference, GoogleCloudRunV2ExecutionTemplate, GoogleCloudRunV2ListExecutionsResponse, GoogleCloudRunV2ListJobsResponse, GoogleCloudRunV2ListRevisionsResponse, GoogleCloudRunV2ListServicesResponse, GoogleCloudRunV2ListTasksResponse, GoogleCloudRunV2Revision, GoogleCloudRunV2RevisionTemplate, GoogleCloudRunV2TrafficTarget, GoogleCloudRunV2TrafficTargetStatus, GoogleIamV1Policy, GoogleIamV1TestIamPermissionsResponse, GoogleLongrunningListOperationsResponse, GoogleLongrunningOperation } from "./schemas.js";

export type GoogleCloudRunClient = {
  /**
   * Deletes a Revision.
   */
  runProjectsLocationsServicesRevisionsDelete: (input: {
    /** Required. The name of the Revision to delete. Format: projects/{project}/locations/{location}/services/{service}/revisions/{revision} */
    name: string;
    /** V1 error format. */
    "$.xgafv"?: "1" | "2";
    /** OAuth access token. */
    access_token?: string;
    /** Data format for response. */
    alt?: "json" | "media" | "proto";
    /** JSONP */
    callback?: string;
    /** Selector specifying which fields to include in a partial response. */
    fields?: string;
    /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
    key?: string;
    /** OAuth 2.0 token for the current user. */
    oauth_token?: string;
    /** Returns response with indentations and line breaks. */
    prettyPrint?: boolean;
    /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
    quotaUser?: string;
    /** Upload protocol for media (e.g. "raw", "multipart"). */
    upload_protocol?: string;
    /** Legacy upload protocol for media (e.g. "media", "multipart"). */
    uploadType?: string;
    /** A system-generated fingerprint for this version of the resource. This may be used to detect modification conflict during updates. */
    etag?: string;
    /** Indicates that the request should be validated without actually deleting any resources. */
    validateOnly?: boolean;
  }) => Promise<GoogleLongrunningOperation>;

  /**
   * Gets information about a Revision.
   */
  runProjectsLocationsServicesRevisionsGet: (input: {
    /** Required. The full name of the Revision. Format: projects/{project}/locations/{location}/services/{service}/revisions/{revision} */
    name: string;
    /** V1 error format. */
    "$.xgafv"?: "1" | "2";
    /** OAuth access token. */
    access_token?: string;
    /** Data format for response. */
    alt?: "json" | "media" | "proto";
    /** JSONP */
    callback?: string;
    /** Selector specifying which fields to include in a partial response. */
    fields?: string;
    /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
    key?: string;
    /** OAuth 2.0 token for the current user. */
    oauth_token?: string;
    /** Returns response with indentations and line breaks. */
    prettyPrint?: boolean;
    /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
    quotaUser?: string;
    /** Upload protocol for media (e.g. "raw", "multipart"). */
    upload_protocol?: string;
    /** Legacy upload protocol for media (e.g. "media", "multipart"). */
    uploadType?: string;
  }) => Promise<GoogleCloudRunV2Revision>;

  /**
   * Updates a Service.
   */
  runProjectsLocationsServicesPatch: (input: {
    /** Unstructured key value map that may be set by external tools to store and arbitrary metadata. They are not queryable and should be preserved when modifying objects. Cloud Run API v2 does not support annotations with `run.googleapis.com`, `cloud.googleapis.com`, `serving.knative.dev`, or `autoscaling.knative.dev` namespaces, and they will be rejected in new resources. All system annotations in v1 now have a corresponding field in v2 Service. This field follows Kubernetes annotations' namespacing, limits, and rules. */
    annotations?: { [key: string]: string | undefined };
    /** Settings for the Binary Authorization feature. */
    binaryAuthorization?: GoogleCloudRunV2BinaryAuthorization;
    /** Arbitrary identifier for the API client. */
    client?: string;
    /** Arbitrary version identifier for the API client. */
    clientVersion?: string;
    /** Output only. The Conditions of all other associated sub-resources. They contain additional diagnostics information in case the Service does not reach its Serving state. See comments in `reconciling` for additional information on reconciliation process in Cloud Run. */
    conditions?: (GoogleCloudRunV2Condition)[];
    /** Output only. The creation time. */
    createTime?: string;
    /** Output only. Email address of the authenticated creator. */
    creator?: string;
    /** Output only. The deletion time. */
    deleteTime?: string;
    /** User-provided description of the Service. This field currently has a 512-character limit. */
    description?: string;
    /** Output only. A system-generated fingerprint for this version of the resource. May be used to detect modification conflict during updates. */
    etag?: string;
    /** Output only. For a deleted resource, the time after which it will be permamently deleted. */
    expireTime?: string;
    /** Output only. A number that monotonically increases every time the user modifies the desired state. Please note that unlike v1, this is an int64 value. As with most Google APIs, its JSON representation will be a `string` instead of an `integer`. */
    generation?: string;
    /** Provides the ingress settings for this Service. On output, returns the currently observed ingress settings, or INGRESS_TRAFFIC_UNSPECIFIED if no revision is active. */
    ingress?: "INGRESS_TRAFFIC_UNSPECIFIED" | "INGRESS_TRAFFIC_ALL" | "INGRESS_TRAFFIC_INTERNAL_ONLY" | "INGRESS_TRAFFIC_INTERNAL_LOAD_BALANCER";
    /** Map of string keys and values that can be used to organize and categorize objects. User-provided labels are shared with Google's billing system, so they can be used to filter, or break down billing charges by team, component, environment, state, etc. For more information, visit https://cloud.google.com/resource-manager/docs/creating-managing-labels or https://cloud.google.com/run/docs/configuring/labels Cloud Run API v2 does not support labels with `run.googleapis.com`, `cloud.googleapis.com`, `serving.knative.dev`, or `autoscaling.knative.dev` namespaces, and they will be rejected. All system labels in v1 now have a corresponding field in v2 Service. */
    labels?: { [key: string]: string | undefined };
    /** Output only. Email address of the last authenticated modifier. */
    lastModifier?: string;
    /** Output only. Name of the last created revision. See comments in `reconciling` for additional information on reconciliation process in Cloud Run. */
    latestCreatedRevision?: string;
    /** Output only. Name of the latest revision that is serving traffic. See comments in `reconciling` for additional information on reconciliation process in Cloud Run. */
    latestReadyRevision?: string;
    /** The launch stage as defined by [Google Cloud Platform Launch Stages](https://cloud.google.com/terms/launch-stages). Cloud Run supports `ALPHA`, `BETA`, and `GA`. If no value is specified, GA is assumed. Set the launch stage to a preview stage on input to allow use of preview features in that stage. On read (or output), describes whether the resource uses preview features. For example, if ALPHA is provided as input, but only BETA and GA-level features are used, this field will be BETA on output. */
    launchStage?: "LAUNCH_STAGE_UNSPECIFIED" | "UNIMPLEMENTED" | "PRELAUNCH" | "EARLY_ACCESS" | "ALPHA" | "BETA" | "GA" | "DEPRECATED";
    /** The fully qualified name of this Service. In CreateServiceRequest, this field is ignored, and instead composed from CreateServiceRequest.parent and CreateServiceRequest.service_id. Format: projects/{project}/locations/{location}/services/{service_id} */
    name?: string;
    /** Output only. The generation of this Service currently serving traffic. See comments in `reconciling` for additional information on reconciliation process in Cloud Run. Please note that unlike v1, this is an int64 value. As with most Google APIs, its JSON representation will be a `string` instead of an `integer`. */
    observedGeneration?: string;
    /** Output only. Returns true if the Service is currently being acted upon by the system to bring it into the desired state. When a new Service is created, or an existing one is updated, Cloud Run will asynchronously perform all necessary steps to bring the Service to the desired serving state. This process is called reconciliation. While reconciliation is in process, `observed_generation`, `latest_ready_revison`, `traffic_statuses`, and `uri` will have transient values that might mismatch the intended state: Once reconciliation is over (and this field is false), there are two possible outcomes: reconciliation succeeded and the serving state matches the Service, or there was an error, and reconciliation failed. This state can be found in `terminal_condition.state`. If reconciliation succeeded, the following fields will match: `traffic` and `traffic_statuses`, `observed_generation` and `generation`, `latest_ready_revision` and `latest_created_revision`. If reconciliation failed, `traffic_statuses`, `observed_generation`, and `latest_ready_revision` will have the state of the last serving revision, or empty for newly created Services. Additional information on the failure can be found in `terminal_condition` and `conditions`. */
    reconciling?: boolean;
    /** Output only. Reserved for future use. */
    satisfiesPzs?: boolean;
    /** Required. The template used to create revisions for this Service. */
    template?: GoogleCloudRunV2RevisionTemplate;
    /** Output only. The Condition of this Service, containing its readiness status, and detailed error information in case it did not reach a serving state. See comments in `reconciling` for additional information on reconciliation process in Cloud Run. */
    terminalCondition?: GoogleCloudRunV2Condition;
    /** Specifies how to distribute traffic over a collection of Revisions belonging to the Service. If traffic is empty or not provided, defaults to 100% traffic to the latest `Ready` Revision. */
    traffic?: (GoogleCloudRunV2TrafficTarget)[];
    /** Output only. Detailed status information for corresponding traffic targets. See comments in `reconciling` for additional information on reconciliation process in Cloud Run. */
    trafficStatuses?: (GoogleCloudRunV2TrafficTargetStatus)[];
    /** Output only. Server assigned unique identifier for the trigger. The value is a UUID4 string and guaranteed to remain unchanged until the resource is deleted. */
    uid?: string;
    /** Output only. The last-modified time. */
    updateTime?: string;
    /** Output only. The main URI in which this Service is serving traffic. */
    uri?: string;
    /** V1 error format. */
    "$.xgafv"?: "1" | "2";
    /** OAuth access token. */
    access_token?: string;
    /** Data format for response. */
    alt?: "json" | "media" | "proto";
    /** JSONP */
    callback?: string;
    /** Selector specifying which fields to include in a partial response. */
    fields?: string;
    /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
    key?: string;
    /** OAuth 2.0 token for the current user. */
    oauth_token?: string;
    /** Returns response with indentations and line breaks. */
    prettyPrint?: boolean;
    /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
    quotaUser?: string;
    /** Upload protocol for media (e.g. "raw", "multipart"). */
    upload_protocol?: string;
    /** Legacy upload protocol for media (e.g. "media", "multipart"). */
    uploadType?: string;
    /** This field is currently not used by Cloud Run; setting it does not have any effect. */
    allowMissing?: boolean;
    /** Indicates that the request should be validated and default values populated, without persisting the request or updating any resources. */
    validateOnly?: boolean;
  }, options: { params: { name: string } }) => Promise<GoogleLongrunningOperation>;

  /**
   * Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`.
   */
  runProjectsLocationsOperationsList: (input: {
    /** Required. To query for all of the operations for a project. */
    name: string;
    /** V1 error format. */
    "$.xgafv"?: "1" | "2";
    /** OAuth access token. */
    access_token?: string;
    /** Data format for response. */
    alt?: "json" | "media" | "proto";
    /** JSONP */
    callback?: string;
    /** Selector specifying which fields to include in a partial response. */
    fields?: string;
    /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
    key?: string;
    /** OAuth 2.0 token for the current user. */
    oauth_token?: string;
    /** Returns response with indentations and line breaks. */
    prettyPrint?: boolean;
    /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
    quotaUser?: string;
    /** Upload protocol for media (e.g. "raw", "multipart"). */
    upload_protocol?: string;
    /** Legacy upload protocol for media (e.g. "media", "multipart"). */
    uploadType?: string;
    /** Optional. A filter for matching the completed or in-progress operations. The supported formats of *filter* are: To query for only completed operations: done:true To query for only ongoing operations: done:false Must be empty to query for all of the latest operations for the given parent project. */
    filter?: string;
    /** The maximum number of records that should be returned. Requested page size cannot exceed 100. If not set or set to less than or equal to 0, the default page size is 100. . */
    pageSize?: number;
    /** Token identifying which result to start with, which is returned by a previous list call. */
    pageToken?: string;
  }) => Promise<GoogleLongrunningListOperationsResponse>;

  /**
   * Triggers creation of a new Execution of this Job.
   */
  runProjectsLocationsJobsRun: (input: {
    /** A system-generated fingerprint for this version of the resource. May be used to detect modification conflict during updates. */
    etag?: string;
    /** Indicates that the request should be validated without actually deleting any resources. */
    validateOnly?: boolean;
    /** Required. The full name of the Job. Format: projects/{project}/locations/{location}/jobs/{job}, where {project} can be project id or number. */
    name: string;
    /** V1 error format. */
    "$.xgafv"?: "1" | "2";
    /** OAuth access token. */
    access_token?: string;
    /** Data format for response. */
    alt?: "json" | "media" | "proto";
    /** JSONP */
    callback?: string;
    /** Selector specifying which fields to include in a partial response. */
    fields?: string;
    /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
    key?: string;
    /** OAuth 2.0 token for the current user. */
    oauth_token?: string;
    /** Returns response with indentations and line breaks. */
    prettyPrint?: boolean;
    /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
    quotaUser?: string;
    /** Upload protocol for media (e.g. "raw", "multipart"). */
    upload_protocol?: string;
    /** Legacy upload protocol for media (e.g. "media", "multipart"). */
    uploadType?: string;
  }) => Promise<GoogleLongrunningOperation>;

  /**
   * Waits until the specified long-running operation is done or reaches at most a specified timeout, returning the latest state. If the operation is already done, the latest state is immediately returned. If the timeout specified is greater than the default HTTP/RPC timeout, the HTTP/RPC timeout is used. If the server does not support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Note that this method is on a best-effort basis. It may return the latest state before the specified timeout (including immediately), meaning even an immediate response is no guarantee that the operation is done.
   */
  runProjectsLocationsOperationsWait: (input: {
    /** The maximum duration to wait before timing out. If left blank, the wait will be at most the time permitted by the underlying HTTP/RPC protocol. If RPC context deadline is also specified, the shorter one will be used. */
    timeout?: string;
    /** The name of the operation resource to wait on. */
    name: string;
    /** V1 error format. */
    "$.xgafv"?: "1" | "2";
    /** OAuth access token. */
    access_token?: string;
    /** Data format for response. */
    alt?: "json" | "media" | "proto";
    /** JSONP */
    callback?: string;
    /** Selector specifying which fields to include in a partial response. */
    fields?: string;
    /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
    key?: string;
    /** OAuth 2.0 token for the current user. */
    oauth_token?: string;
    /** Returns response with indentations and line breaks. */
    prettyPrint?: boolean;
    /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
    quotaUser?: string;
    /** Upload protocol for media (e.g. "raw", "multipart"). */
    upload_protocol?: string;
    /** Legacy upload protocol for media (e.g. "media", "multipart"). */
    uploadType?: string;
  }) => Promise<GoogleLongrunningOperation>;

  /**
   * Lists Executions from a Job.
   */
  runProjectsLocationsJobsExecutionsList: (input: {
    /** Required. The Execution from which the Executions should be listed. To list all Executions across Jobs, use "-" instead of Job name. Format: projects/{project}/locations/{location}/jobs/{job}, where {project} can be project id or number. */
    parent: string;
    /** V1 error format. */
    "$.xgafv"?: "1" | "2";
    /** OAuth access token. */
    access_token?: string;
    /** Data format for response. */
    alt?: "json" | "media" | "proto";
    /** JSONP */
    callback?: string;
    /** Selector specifying which fields to include in a partial response. */
    fields?: string;
    /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
    key?: string;
    /** OAuth 2.0 token for the current user. */
    oauth_token?: string;
    /** Returns response with indentations and line breaks. */
    prettyPrint?: boolean;
    /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
    quotaUser?: string;
    /** Upload protocol for media (e.g. "raw", "multipart"). */
    upload_protocol?: string;
    /** Legacy upload protocol for media (e.g. "media", "multipart"). */
    uploadType?: string;
    /** Maximum number of Executions to return in this call. */
    pageSize?: number;
    /** A page token received from a previous call to ListExecutions. All other parameters must match. */
    pageToken?: string;
    /** If true, returns deleted (but unexpired) resources along with active ones. */
    showDeleted?: boolean;
  }) => Promise<GoogleCloudRunV2ListExecutionsResponse>;

  /**
   * Lists Jobs.
   */
  runProjectsLocationsJobsList: (input: {
    /** Required. The location and project to list resources on. Format: projects/{project}/locations/{location}, where {project} can be project id or number. */
    parent: string;
    /** V1 error format. */
    "$.xgafv"?: "1" | "2";
    /** OAuth access token. */
    access_token?: string;
    /** Data format for response. */
    alt?: "json" | "media" | "proto";
    /** JSONP */
    callback?: string;
    /** Selector specifying which fields to include in a partial response. */
    fields?: string;
    /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
    key?: string;
    /** OAuth 2.0 token for the current user. */
    oauth_token?: string;
    /** Returns response with indentations and line breaks. */
    prettyPrint?: boolean;
    /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
    quotaUser?: string;
    /** Upload protocol for media (e.g. "raw", "multipart"). */
    upload_protocol?: string;
    /** Legacy upload protocol for media (e.g. "media", "multipart"). */
    uploadType?: string;
    /** Maximum number of Jobs to return in this call. */
    pageSize?: number;
    /** A page token received from a previous call to ListJobs. All other parameters must match. */
    pageToken?: string;
    /** If true, returns deleted (but unexpired) resources along with active ones. */
    showDeleted?: boolean;
  }) => Promise<GoogleCloudRunV2ListJobsResponse>;

  /**
   * Creates a Job.
   */
  runProjectsLocationsJobsCreate: (input: {
    /** KRM-style annotations for the resource. Unstructured key value map that may be set by external tools to store and arbitrary metadata. They are not queryable and should be preserved when modifying objects. Cloud Run API v2 does not support annotations with `run.googleapis.com`, `cloud.googleapis.com`, `serving.knative.dev`, or `autoscaling.knative.dev` namespaces, and they will be rejected on new resources. All system annotations in v1 now have a corresponding field in v2 Job. This field follows Kubernetes annotations' namespacing, limits, and rules. */
    annotations?: { [key: string]: string | undefined };
    /** Settings for the Binary Authorization feature. */
    binaryAuthorization?: GoogleCloudRunV2BinaryAuthorization;
    /** Arbitrary identifier for the API client. */
    client?: string;
    /** Arbitrary version identifier for the API client. */
    clientVersion?: string;
    /** Output only. The Conditions of all other associated sub-resources. They contain additional diagnostics information in case the Job does not reach its desired state. See comments in `reconciling` for additional information on reconciliation process in Cloud Run. */
    conditions?: (GoogleCloudRunV2Condition)[];
    /** Output only. The creation time. */
    createTime?: string;
    /** Output only. Email address of the authenticated creator. */
    creator?: string;
    /** Output only. The deletion time. */
    deleteTime?: string;
    /** Output only. A system-generated fingerprint for this version of the resource. May be used to detect modification conflict during updates. */
    etag?: string;
    /** Output only. Number of executions created for this job. */
    executionCount?: number;
    /** Output only. For a deleted resource, the time after which it will be permamently deleted. */
    expireTime?: string;
    /** Output only. A number that monotonically increases every time the user modifies the desired state. */
    generation?: string;
    /** KRM-style labels for the resource. User-provided labels are shared with Google's billing system, so they can be used to filter, or break down billing charges by team, component, environment, state, etc. For more information, visit https://cloud.google.com/resource-manager/docs/creating-managing-labels or https://cloud.google.com/run/docs/configuring/labels Cloud Run API v2 does not support labels with `run.googleapis.com`, `cloud.googleapis.com`, `serving.knative.dev`, or `autoscaling.knative.dev` namespaces, and they will be rejected. All system labels in v1 now have a corresponding field in v2 Job. */
    labels?: { [key: string]: string | undefined };
    /** Output only. Email address of the last authenticated modifier. */
    lastModifier?: string;
    /** Output only. Name of the last created execution. */
    latestCreatedExecution?: GoogleCloudRunV2ExecutionReference;
    /** The launch stage as defined by [Google Cloud Platform Launch Stages](https://cloud.google.com/terms/launch-stages). Cloud Run supports `ALPHA`, `BETA`, and `GA`. If no value is specified, GA is assumed. Set the launch stage to a preview stage on input to allow use of preview features in that stage. On read (or output), describes whether the resource uses preview features. For example, if ALPHA is provided as input, but only BETA and GA-level features are used, this field will be BETA on output. */
    launchStage?: "LAUNCH_STAGE_UNSPECIFIED" | "UNIMPLEMENTED" | "PRELAUNCH" | "EARLY_ACCESS" | "ALPHA" | "BETA" | "GA" | "DEPRECATED";
    /** The fully qualified name of this Job. Format: projects/{project}/locations/{location}/jobs/{job} */
    name?: string;
    /** Output only. The generation of this Job. See comments in `reconciling` for additional information on reconciliation process in Cloud Run. */
    observedGeneration?: string;
    /** Output only. Returns true if the Job is currently being acted upon by the system to bring it into the desired state. When a new Job is created, or an existing one is updated, Cloud Run will asynchronously perform all necessary steps to bring the Job to the desired state. This process is called reconciliation. While reconciliation is in process, `observed_generation` and `latest_succeeded_execution`, will have transient values that might mismatch the intended state: Once reconciliation is over (and this field is false), there are two possible outcomes: reconciliation succeeded and the state matches the Job, or there was an error, and reconciliation failed. This state can be found in `terminal_condition.state`. If reconciliation succeeded, the following fields will match: `observed_generation` and `generation`, `latest_succeeded_execution` and `latest_created_execution`. If reconciliation failed, `observed_generation` and `latest_succeeded_execution` will have the state of the last succeeded execution or empty for newly created Job. Additional information on the failure can be found in `terminal_condition` and `conditions`. */
    reconciling?: boolean;
    /** Output only. Reserved for future use. */
    satisfiesPzs?: boolean;
    /** Required. The template used to create executions for this Job. */
    template?: GoogleCloudRunV2ExecutionTemplate;
    /** Output only. The Condition of this Job, containing its readiness status, and detailed error information in case it did not reach the desired state. */
    terminalCondition?: GoogleCloudRunV2Condition;
    /** Output only. Server assigned unique identifier for the Execution. The value is a UUID4 string and guaranteed to remain unchanged until the resource is deleted. */
    uid?: string;
    /** Output only. The last-modified time. */
    updateTime?: string;
    /** Required. The location and project in which this Job should be created. Format: projects/{project}/locations/{location}, where {project} can be project id or number. */
    parent: string;
    /** V1 error format. */
    "$.xgafv"?: "1" | "2";
    /** OAuth access token. */
    access_token?: string;
    /** Data format for response. */
    alt?: "json" | "media" | "proto";
    /** JSONP */
    callback?: string;
    /** Selector specifying which fields to include in a partial response. */
    fields?: string;
    /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
    key?: string;
    /** OAuth 2.0 token for the current user. */
    oauth_token?: string;
    /** Returns response with indentations and line breaks. */
    prettyPrint?: boolean;
    /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
    quotaUser?: string;
    /** Upload protocol for media (e.g. "raw", "multipart"). */
    upload_protocol?: string;
    /** Legacy upload protocol for media (e.g. "media", "multipart"). */
    uploadType?: string;
    /** Required. The unique identifier for the Job. The name of the job becomes {parent}/jobs/{job_id}. */
    jobId?: string;
    /** Indicates that the request should be validated and default values populated, without persisting the request or creating any resources. */
    validateOnly?: boolean;
  }) => Promise<GoogleLongrunningOperation>;

  /**
   * Lists Revisions from a given Service, or from a given location.
   */
  runProjectsLocationsServicesRevisionsList: (input: {
    /** Required. The Service from which the Revisions should be listed. To list all Revisions across Services, use "-" instead of Service name. Format: projects/{project}/locations/{location}/services/{service} */
    parent: string;
    /** V1 error format. */
    "$.xgafv"?: "1" | "2";
    /** OAuth access token. */
    access_token?: string;
    /** Data format for response. */
    alt?: "json" | "media" | "proto";
    /** JSONP */
    callback?: string;
    /** Selector specifying which fields to include in a partial response. */
    fields?: string;
    /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
    key?: string;
    /** OAuth 2.0 token for the current user. */
    oauth_token?: string;
    /** Returns response with indentations and line breaks. */
    prettyPrint?: boolean;
    /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
    quotaUser?: string;
    /** Upload protocol for media (e.g. "raw", "multipart"). */
    upload_protocol?: string;
    /** Legacy upload protocol for media (e.g. "media", "multipart"). */
    uploadType?: string;
    /** Maximum number of revisions to return in this call. */
    pageSize?: number;
    /** A page token received from a previous call to ListRevisions. All other parameters must match. */
    pageToken?: string;
    /** If true, returns deleted (but unexpired) resources along with active ones. */
    showDeleted?: boolean;
  }) => Promise<GoogleCloudRunV2ListRevisionsResponse>;

  /**
   * Lists Services.
   */
  runProjectsLocationsServicesList: (input: {
    /** Required. The location and project to list resources on. Location must be a valid Google Cloud region, and cannot be the "-" wildcard. Format: projects/{project}/locations/{location}, where {project} can be project id or number. */
    parent: string;
    /** V1 error format. */
    "$.xgafv"?: "1" | "2";
    /** OAuth access token. */
    access_token?: string;
    /** Data format for response. */
    alt?: "json" | "media" | "proto";
    /** JSONP */
    callback?: string;
    /** Selector specifying which fields to include in a partial response. */
    fields?: string;
    /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
    key?: string;
    /** OAuth 2.0 token for the current user. */
    oauth_token?: string;
    /** Returns response with indentations and line breaks. */
    prettyPrint?: boolean;
    /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
    quotaUser?: string;
    /** Upload protocol for media (e.g. "raw", "multipart"). */
    upload_protocol?: string;
    /** Legacy upload protocol for media (e.g. "media", "multipart"). */
    uploadType?: string;
    /** Maximum number of Services to return in this call. */
    pageSize?: number;
    /** A page token received from a previous call to ListServices. All other parameters must match. */
    pageToken?: string;
    /** If true, returns deleted (but unexpired) resources along with active ones. */
    showDeleted?: boolean;
  }) => Promise<GoogleCloudRunV2ListServicesResponse>;

  /**
   * Creates a new Service in a given project and location.
   */
  runProjectsLocationsServicesCreate: (input: {
    /** Unstructured key value map that may be set by external tools to store and arbitrary metadata. They are not queryable and should be preserved when modifying objects. Cloud Run API v2 does not support annotations with `run.googleapis.com`, `cloud.googleapis.com`, `serving.knative.dev`, or `autoscaling.knative.dev` namespaces, and they will be rejected in new resources. All system annotations in v1 now have a corresponding field in v2 Service. This field follows Kubernetes annotations' namespacing, limits, and rules. */
    annotations?: { [key: string]: string | undefined };
    /** Settings for the Binary Authorization feature. */
    binaryAuthorization?: GoogleCloudRunV2BinaryAuthorization;
    /** Arbitrary identifier for the API client. */
    client?: string;
    /** Arbitrary version identifier for the API client. */
    clientVersion?: string;
    /** Output only. The Conditions of all other associated sub-resources. They contain additional diagnostics information in case the Service does not reach its Serving state. See comments in `reconciling` for additional information on reconciliation process in Cloud Run. */
    conditions?: (GoogleCloudRunV2Condition)[];
    /** Output only. The creation time. */
    createTime?: string;
    /** Output only. Email address of the authenticated creator. */
    creator?: string;
    /** Output only. The deletion time. */
    deleteTime?: string;
    /** User-provided description of the Service. This field currently has a 512-character limit. */
    description?: string;
    /** Output only. A system-generated fingerprint for this version of the resource. May be used to detect modification conflict during updates. */
    etag?: string;
    /** Output only. For a deleted resource, the time after which it will be permamently deleted. */
    expireTime?: string;
    /** Output only. A number that monotonically increases every time the user modifies the desired state. Please note that unlike v1, this is an int64 value. As with most Google APIs, its JSON representation will be a `string` instead of an `integer`. */
    generation?: string;
    /** Provides the ingress settings for this Service. On output, returns the currently observed ingress settings, or INGRESS_TRAFFIC_UNSPECIFIED if no revision is active. */
    ingress?: "INGRESS_TRAFFIC_UNSPECIFIED" | "INGRESS_TRAFFIC_ALL" | "INGRESS_TRAFFIC_INTERNAL_ONLY" | "INGRESS_TRAFFIC_INTERNAL_LOAD_BALANCER";
    /** Map of string keys and values that can be used to organize and categorize objects. User-provided labels are shared with Google's billing system, so they can be used to filter, or break down billing charges by team, component, environment, state, etc. For more information, visit https://cloud.google.com/resource-manager/docs/creating-managing-labels or https://cloud.google.com/run/docs/configuring/labels Cloud Run API v2 does not support labels with `run.googleapis.com`, `cloud.googleapis.com`, `serving.knative.dev`, or `autoscaling.knative.dev` namespaces, and they will be rejected. All system labels in v1 now have a corresponding field in v2 Service. */
    labels?: { [key: string]: string | undefined };
    /** Output only. Email address of the last authenticated modifier. */
    lastModifier?: string;
    /** Output only. Name of the last created revision. See comments in `reconciling` for additional information on reconciliation process in Cloud Run. */
    latestCreatedRevision?: string;
    /** Output only. Name of the latest revision that is serving traffic. See comments in `reconciling` for additional information on reconciliation process in Cloud Run. */
    latestReadyRevision?: string;
    /** The launch stage as defined by [Google Cloud Platform Launch Stages](https://cloud.google.com/terms/launch-stages). Cloud Run supports `ALPHA`, `BETA`, and `GA`. If no value is specified, GA is assumed. Set the launch stage to a preview stage on input to allow use of preview features in that stage. On read (or output), describes whether the resource uses preview features. For example, if ALPHA is provided as input, but only BETA and GA-level features are used, this field will be BETA on output. */
    launchStage?: "LAUNCH_STAGE_UNSPECIFIED" | "UNIMPLEMENTED" | "PRELAUNCH" | "EARLY_ACCESS" | "ALPHA" | "BETA" | "GA" | "DEPRECATED";
    /** The fully qualified name of this Service. In CreateServiceRequest, this field is ignored, and instead composed from CreateServiceRequest.parent and CreateServiceRequest.service_id. Format: projects/{project}/locations/{location}/services/{service_id} */
    name?: string;
    /** Output only. The generation of this Service currently serving traffic. See comments in `reconciling` for additional information on reconciliation process in Cloud Run. Please note that unlike v1, this is an int64 value. As with most Google APIs, its JSON representation will be a `string` instead of an `integer`. */
    observedGeneration?: string;
    /** Output only. Returns true if the Service is currently being acted upon by the system to bring it into the desired state. When a new Service is created, or an existing one is updated, Cloud Run will asynchronously perform all necessary steps to bring the Service to the desired serving state. This process is called reconciliation. While reconciliation is in process, `observed_generation`, `latest_ready_revison`, `traffic_statuses`, and `uri` will have transient values that might mismatch the intended state: Once reconciliation is over (and this field is false), there are two possible outcomes: reconciliation succeeded and the serving state matches the Service, or there was an error, and reconciliation failed. This state can be found in `terminal_condition.state`. If reconciliation succeeded, the following fields will match: `traffic` and `traffic_statuses`, `observed_generation` and `generation`, `latest_ready_revision` and `latest_created_revision`. If reconciliation failed, `traffic_statuses`, `observed_generation`, and `latest_ready_revision` will have the state of the last serving revision, or empty for newly created Services. Additional information on the failure can be found in `terminal_condition` and `conditions`. */
    reconciling?: boolean;
    /** Output only. Reserved for future use. */
    satisfiesPzs?: boolean;
    /** Required. The template used to create revisions for this Service. */
    template?: GoogleCloudRunV2RevisionTemplate;
    /** Output only. The Condition of this Service, containing its readiness status, and detailed error information in case it did not reach a serving state. See comments in `reconciling` for additional information on reconciliation process in Cloud Run. */
    terminalCondition?: GoogleCloudRunV2Condition;
    /** Specifies how to distribute traffic over a collection of Revisions belonging to the Service. If traffic is empty or not provided, defaults to 100% traffic to the latest `Ready` Revision. */
    traffic?: (GoogleCloudRunV2TrafficTarget)[];
    /** Output only. Detailed status information for corresponding traffic targets. See comments in `reconciling` for additional information on reconciliation process in Cloud Run. */
    trafficStatuses?: (GoogleCloudRunV2TrafficTargetStatus)[];
    /** Output only. Server assigned unique identifier for the trigger. The value is a UUID4 string and guaranteed to remain unchanged until the resource is deleted. */
    uid?: string;
    /** Output only. The last-modified time. */
    updateTime?: string;
    /** Output only. The main URI in which this Service is serving traffic. */
    uri?: string;
    /** Required. The location and project in which this service should be created. Format: projects/{project}/locations/{location}, where {project} can be project id or number. Only lowercase characters, digits, and hyphens. */
    parent: string;
    /** V1 error format. */
    "$.xgafv"?: "1" | "2";
    /** OAuth access token. */
    access_token?: string;
    /** Data format for response. */
    alt?: "json" | "media" | "proto";
    /** JSONP */
    callback?: string;
    /** Selector specifying which fields to include in a partial response. */
    fields?: string;
    /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
    key?: string;
    /** OAuth 2.0 token for the current user. */
    oauth_token?: string;
    /** Returns response with indentations and line breaks. */
    prettyPrint?: boolean;
    /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
    quotaUser?: string;
    /** Upload protocol for media (e.g. "raw", "multipart"). */
    upload_protocol?: string;
    /** Legacy upload protocol for media (e.g. "media", "multipart"). */
    uploadType?: string;
    /** Required. The unique identifier for the Service. It must begin with letter, and cannot end with hyphen; must contain fewer than 50 characters. The name of the service becomes {parent}/services/{service_id}. */
    serviceId?: string;
    /** Indicates that the request should be validated and default values populated, without persisting the request or creating any resources. */
    validateOnly?: boolean;
  }) => Promise<GoogleLongrunningOperation>;

  /**
   * Lists Tasks from an Execution of a Job.
   */
  runProjectsLocationsJobsExecutionsTasksList: (input: {
    /** Required. The Execution from which the Tasks should be listed. To list all Tasks across Executions of a Job, use "-" instead of Execution name. To list all Tasks across Jobs, use "-" instead of Job name. Format: projects/{project}/locations/{location}/jobs/{job}/executions/{execution} */
    parent: string;
    /** V1 error format. */
    "$.xgafv"?: "1" | "2";
    /** OAuth access token. */
    access_token?: string;
    /** Data format for response. */
    alt?: "json" | "media" | "proto";
    /** JSONP */
    callback?: string;
    /** Selector specifying which fields to include in a partial response. */
    fields?: string;
    /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
    key?: string;
    /** OAuth 2.0 token for the current user. */
    oauth_token?: string;
    /** Returns response with indentations and line breaks. */
    prettyPrint?: boolean;
    /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
    quotaUser?: string;
    /** Upload protocol for media (e.g. "raw", "multipart"). */
    upload_protocol?: string;
    /** Legacy upload protocol for media (e.g. "media", "multipart"). */
    uploadType?: string;
    /** Maximum number of Tasks to return in this call. */
    pageSize?: number;
    /** A page token received from a previous call to ListTasks. All other parameters must match. */
    pageToken?: string;
    /** If true, returns deleted (but unexpired) resources along with active ones. */
    showDeleted?: boolean;
  }) => Promise<GoogleCloudRunV2ListTasksResponse>;

  /**
   * Gets the IAM Access Control policy currently in effect for the given Cloud Run Service. This result does not include any inherited policies.
   */
  runProjectsLocationsServicesGetIamPolicy: (input: {
    /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
    resource: string;
    /** V1 error format. */
    "$.xgafv"?: "1" | "2";
    /** OAuth access token. */
    access_token?: string;
    /** Data format for response. */
    alt?: "json" | "media" | "proto";
    /** JSONP */
    callback?: string;
    /** Selector specifying which fields to include in a partial response. */
    fields?: string;
    /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
    key?: string;
    /** OAuth 2.0 token for the current user. */
    oauth_token?: string;
    /** Returns response with indentations and line breaks. */
    prettyPrint?: boolean;
    /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
    quotaUser?: string;
    /** Upload protocol for media (e.g. "raw", "multipart"). */
    upload_protocol?: string;
    /** Legacy upload protocol for media (e.g. "media", "multipart"). */
    uploadType?: string;
    /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
    "options.requestedPolicyVersion"?: number;
  }) => Promise<GoogleIamV1Policy>;

  /**
   * Sets the IAM Access control policy for the specified Service. Overwrites any existing policy.
   */
  runProjectsLocationsServicesSetIamPolicy: (input: {
    /** REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. */
    policy?: GoogleIamV1Policy;
    /** OPTIONAL: A FieldMask specifying which fields of the policy to modify. Only the fields in the mask will be modified. If no mask is provided, the following default mask is used: `paths: "bindings, etag"` */
    updateMask?: string;
    /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
    resource: string;
    /** V1 error format. */
    "$.xgafv"?: "1" | "2";
    /** OAuth access token. */
    access_token?: string;
    /** Data format for response. */
    alt?: "json" | "media" | "proto";
    /** JSONP */
    callback?: string;
    /** Selector specifying which fields to include in a partial response. */
    fields?: string;
    /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
    key?: string;
    /** OAuth 2.0 token for the current user. */
    oauth_token?: string;
    /** Returns response with indentations and line breaks. */
    prettyPrint?: boolean;
    /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
    quotaUser?: string;
    /** Upload protocol for media (e.g. "raw", "multipart"). */
    upload_protocol?: string;
    /** Legacy upload protocol for media (e.g. "media", "multipart"). */
    uploadType?: string;
  }) => Promise<GoogleIamV1Policy>;

  /**
   * Returns permissions that a caller has on the specified Project. There are no permissions required for making this API call.
   */
  runProjectsLocationsServicesTestIamPermissions: (input: {
    /** The set of permissions to check for the `resource`. Permissions with wildcards (such as `*` or `storage.*`) are not allowed. For more information see [IAM Overview](https://cloud.google.com/iam/docs/overview#permissions). */
    permissions?: (string)[];
    /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
    resource: string;
    /** V1 error format. */
    "$.xgafv"?: "1" | "2";
    /** OAuth access token. */
    access_token?: string;
    /** Data format for response. */
    alt?: "json" | "media" | "proto";
    /** JSONP */
    callback?: string;
    /** Selector specifying which fields to include in a partial response. */
    fields?: string;
    /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
    key?: string;
    /** OAuth 2.0 token for the current user. */
    oauth_token?: string;
    /** Returns response with indentations and line breaks. */
    prettyPrint?: boolean;
    /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
    quotaUser?: string;
    /** Upload protocol for media (e.g. "raw", "multipart"). */
    upload_protocol?: string;
    /** Legacy upload protocol for media (e.g. "media", "multipart"). */
    uploadType?: string;
  }) => Promise<GoogleIamV1TestIamPermissionsResponse>;
};

export * from "./schemas.js";
