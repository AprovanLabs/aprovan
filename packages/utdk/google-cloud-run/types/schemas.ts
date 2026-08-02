/** Settings for Binary Authorization feature. */
export type GoogleCloudRunV2BinaryAuthorization = {
  /** If present, indicates to use Breakglass using this justification. If use_default is False, then it must be empty. For more information on breakglass, see https://cloud.google.com/binary-authorization/docs/using-breakglass */
  breakglassJustification?: string;
  /** If True, indicates to use the default project's binary authorization policy. If False, binary authorization will be disabled. */
  useDefault?: boolean;
};

/** Represents a set of Cloud SQL instances. Each one will be available under /cloudsql/[instance]. Visit https://cloud.google.com/sql/docs/mysql/connect-run for more information on how to connect Cloud SQL and Cloud Run. */
export type GoogleCloudRunV2CloudSqlInstance = {
  /** The Cloud SQL instance connection names, as can be found in https://console.cloud.google.com/sql/instances. Visit https://cloud.google.com/sql/docs/mysql/connect-run for more information on how to connect Cloud SQL and Cloud Run. Format: {project}:{location}:{instance} */
  instances?: (string)[];
};

/** Defines a status condition for a resource. */
export type GoogleCloudRunV2Condition = {
  /** A reason for the execution condition. */
  executionReason?: "EXECUTION_REASON_UNDEFINED" | "JOB_STATUS_SERVICE_POLLING_ERROR" | "NON_ZERO_EXIT_CODE" | "CANCELLED" | "CANCELLING";
  /** Last time the condition transitioned from one status to another. */
  lastTransitionTime?: string;
  /** Human readable message indicating details about the current status. */
  message?: string;
  /** A common (service-level) reason for this condition. */
  reason?: "COMMON_REASON_UNDEFINED" | "UNKNOWN" | "REVISION_FAILED" | "PROGRESS_DEADLINE_EXCEEDED" | "CONTAINER_MISSING" | "CONTAINER_PERMISSION_DENIED" | "CONTAINER_IMAGE_UNAUTHORIZED" | "CONTAINER_IMAGE_AUTHORIZATION_CHECK_FAILED" | "ENCRYPTION_KEY_PERMISSION_DENIED" | "ENCRYPTION_KEY_CHECK_FAILED" | "SECRETS_ACCESS_CHECK_FAILED" | "WAITING_FOR_OPERATION" | "IMMEDIATE_RETRY" | "POSTPONED_RETRY" | "INTERNAL";
  /** A reason for the revision condition. */
  revisionReason?: "REVISION_REASON_UNDEFINED" | "PENDING" | "RESERVE" | "RETIRED" | "RETIRING" | "RECREATING" | "HEALTH_CHECK_CONTAINER_ERROR" | "CUSTOMIZED_PATH_RESPONSE_PENDING" | "MIN_INSTANCES_NOT_PROVISIONED" | "ACTIVE_REVISION_LIMIT_REACHED" | "NO_DEPLOYMENT" | "HEALTH_CHECK_SKIPPED" | "MIN_INSTANCES_WARMING";
  /** How to interpret failures of this condition, one of Error, Warning, Info */
  severity?: "SEVERITY_UNSPECIFIED" | "ERROR" | "WARNING" | "INFO";
  /** State of the condition. */
  state?: "STATE_UNSPECIFIED" | "CONDITION_PENDING" | "CONDITION_RECONCILING" | "CONDITION_FAILED" | "CONDITION_SUCCEEDED";
  /** type is used to communicate the status of the reconciliation process. See also: https://github.com/knative/serving/blob/main/docs/spec/errors.md#error-conditions-and-reporting Types common to all resources include: * "Ready": True when the Resource is ready. */
  type?: string;
};

/** A single application container. This specifies both the container to run, the command to run in the container and the arguments to supply to it. Note that additional arguments may be supplied by the system to the container at runtime. */
export type GoogleCloudRunV2Container = {
  /** Arguments to the entrypoint. The docker image's CMD is used if this is not provided. */
  args?: (string)[];
  /** Entrypoint array. Not executed within a shell. The docker image's ENTRYPOINT is used if this is not provided. */
  command?: (string)[];
  /** List of environment variables to set in the container. */
  env?: (GoogleCloudRunV2EnvVar)[];
  /** Required. Name of the container image in Dockerhub, Google Artifact Registry, or Google Container Registry. If the host is not provided, Dockerhub is assumed. */
  image?: string;
  /** Periodic probe of container liveness. Container will be restarted if the probe fails. */
  livenessProbe?: GoogleCloudRunV2Probe;
  /** Name of the container specified as a DNS_LABEL (RFC 1123). */
  name?: string;
  /** List of ports to expose from the container. Only a single port can be specified. The specified ports must be listening on all interfaces (0.0.0.0) within the container to be accessible. If omitted, a port number will be chosen and passed to the container through the PORT environment variable for the container to listen on. */
  ports?: (GoogleCloudRunV2ContainerPort)[];
  /** Compute Resource requirements by this container. */
  resources?: GoogleCloudRunV2ResourceRequirements;
  /** Startup probe of application within the container. All other probes are disabled if a startup probe is provided, until it succeeds. Container will not be added to service endpoints if the probe fails. */
  startupProbe?: GoogleCloudRunV2Probe;
  /** Volume to mount into the container's filesystem. */
  volumeMounts?: (GoogleCloudRunV2VolumeMount)[];
  /** Container's working directory. If not specified, the container runtime's default will be used, which might be configured in the container image. */
  workingDir?: string;
};

/** ContainerPort represents a network port in a single container. */
export type GoogleCloudRunV2ContainerPort = {
  /** Port number the container listens on. This must be a valid TCP port number, 0 < container_port < 65536. */
  containerPort?: number;
  /** If specified, used to specify which protocol to use. Allowed values are "http1" and "h2c". */
  name?: string;
};

/** EnvVar represents an environment variable present in a Container. */
export type GoogleCloudRunV2EnvVar = {
  /** Required. Name of the environment variable. Must be a C_IDENTIFIER, and mnay not exceed 32768 characters. */
  name?: string;
  /** Variable references $(VAR_NAME) are expanded using the previous defined environment variables in the container and any route environment variables. If a variable cannot be resolved, the reference in the input string will be unchanged. The $(VAR_NAME) syntax can be escaped with a double $$, ie: $$(VAR_NAME). Escaped references will never be expanded, regardless of whether the variable exists or not. Defaults to "", and the maximum length is 32768 bytes. */
  value?: string;
  /** Source for the environment variable's value. */
  valueSource?: GoogleCloudRunV2EnvVarSource;
};

/** EnvVarSource represents a source for the value of an EnvVar. */
export type GoogleCloudRunV2EnvVarSource = {
  /** Selects a secret and a specific version from Cloud Secret Manager. */
  secretKeyRef?: GoogleCloudRunV2SecretKeySelector;
};

/** Execution represents the configuration of a single execution. A execution an immutable resource that references a container image which is run to completion. */
export type GoogleCloudRunV2Execution = {
  /** KRM-style annotations for the resource. */
  annotations?: { [key: string]: string | undefined };
  /** Output only. The number of tasks which reached phase Cancelled. */
  cancelledCount?: number;
  /** Output only. Represents time when the execution was completed. It is not guaranteed to be set in happens-before order across separate operations. */
  completionTime?: string;
  /** Output only. The Condition of this Execution, containing its readiness status, and detailed error information in case it did not reach the desired state. */
  conditions?: (GoogleCloudRunV2Condition)[];
  /** Output only. Represents time when the execution was acknowledged by the execution controller. It is not guaranteed to be set in happens-before order across separate operations. */
  createTime?: string;
  /** Output only. For a deleted resource, the deletion time. It is only populated as a response to a Delete request. */
  deleteTime?: string;
  /** Output only. A system-generated fingerprint for this version of the resource. May be used to detect modification conflict during updates. */
  etag?: string;
  /** Output only. For a deleted resource, the time after which it will be permamently deleted. It is only populated as a response to a Delete request. */
  expireTime?: string;
  /** Output only. The number of tasks which reached phase Failed. */
  failedCount?: number;
  /** Output only. A number that monotonically increases every time the user modifies the desired state. */
  generation?: string;
  /** Output only. The name of the parent Job. */
  job?: string;
  /** KRM-style labels for the resource. User-provided labels are shared with Google's billing system, so they can be used to filter, or break down billing charges by team, component, environment, state, etc. For more information, visit https://cloud.google.com/resource-manager/docs/creating-managing-labels or https://cloud.google.com/run/docs/configuring/labels */
  labels?: { [key: string]: string | undefined };
  /** The least stable launch stage needed to create this resource, as defined by [Google Cloud Platform Launch Stages](https://cloud.google.com/terms/launch-stages). Cloud Run supports `ALPHA`, `BETA`, and `GA`. Note that this value might not be what was used as input. For example, if ALPHA was provided as input in the parent resource, but only BETA and GA-level features are were, this field will be BETA. */
  launchStage?: "LAUNCH_STAGE_UNSPECIFIED" | "UNIMPLEMENTED" | "PRELAUNCH" | "EARLY_ACCESS" | "ALPHA" | "BETA" | "GA" | "DEPRECATED";
  /** Output only. URI where logs for this execution can be found in Cloud Console. */
  logUri?: string;
  /** Output only. The unique name of this Execution. */
  name?: string;
  /** Output only. The generation of this Execution. See comments in `reconciling` for additional information on reconciliation process in Cloud Run. */
  observedGeneration?: string;
  /** Output only. Specifies the maximum desired number of tasks the execution should run at any given time. Must be <= task_count. The actual number of tasks running in steady state will be less than this number when ((.spec.task_count - .status.successful) < .spec.parallelism), i.e. when the work left to do is less than max parallelism. */
  parallelism?: number;
  /** Output only. Indicates whether the resource's reconciliation is still in progress. See comments in `Job.reconciling` for additional information on reconciliation process in Cloud Run. */
  reconciling?: boolean;
  /** Output only. The number of tasks which have retried at least once. */
  retriedCount?: number;
  /** Output only. The number of actively running tasks. */
  runningCount?: number;
  /** Output only. Reserved for future use. */
  satisfiesPzs?: boolean;
  /** Output only. Represents time when the execution started to run. It is not guaranteed to be set in happens-before order across separate operations. */
  startTime?: string;
  /** Output only. The number of tasks which reached phase Succeeded. */
  succeededCount?: number;
  /** Output only. Specifies the desired number of tasks the execution should run. Setting to 1 means that parallelism is limited to 1 and the success of that task signals the success of the execution. */
  taskCount?: number;
  /** Output only. The template used to create tasks for this execution. */
  template?: GoogleCloudRunV2TaskTemplate;
  /** Output only. Server assigned unique identifier for the Execution. The value is a UUID4 string and guaranteed to remain unchanged until the resource is deleted. */
  uid?: string;
  /** Output only. The last-modified time. */
  updateTime?: string;
};

/** Reference to an Execution. Use /Executions.GetExecution with the given name to get full execution including the latest status. */
export type GoogleCloudRunV2ExecutionReference = {
  /** Creation timestamp of the execution. */
  completionTime?: string;
  /** Creation timestamp of the execution. */
  createTime?: string;
  /** Name of the execution. */
  name?: string;
};

/** ExecutionTemplate describes the data an execution should have when created from a template. */
export type GoogleCloudRunV2ExecutionTemplate = {
  /** KRM-style annotations for the resource. Cloud Run API v2 does not support annotations with `run.googleapis.com`, `cloud.googleapis.com`, `serving.knative.dev`, or `autoscaling.knative.dev` namespaces, and they will be rejected. All system annotations in v1 now have a corresponding field in v2 ExecutionTemplate. */
  annotations?: { [key: string]: string | undefined };
  /** KRM-style labels for the resource. Cloud Run API v2 does not support labels with `run.googleapis.com`, `cloud.googleapis.com`, `serving.knative.dev`, or `autoscaling.knative.dev` namespaces, and they will be rejected. All system labels in v1 now have a corresponding field in v2 ExecutionTemplate. */
  labels?: { [key: string]: string | undefined };
  /** Specifies the maximum desired number of tasks the execution should run at given time. Must be <= task_count. When the job is run, if this field is 0 or unset, the maximum possible value will be used for that execution. The actual number of tasks running in steady state will be less than this number when there are fewer tasks waiting to be completed remaining, i.e. when the work left to do is less than max parallelism. */
  parallelism?: number;
  /** Specifies the desired number of tasks the execution should run. Setting to 1 means that parallelism is limited to 1 and the success of that task signals the success of the execution. Defaults to 1. */
  taskCount?: number;
  /** Required. Describes the task(s) that will be created when executing an execution. */
  template?: GoogleCloudRunV2TaskTemplate;
};

/** GRPCAction describes an action involving a GRPC port. */
export type GoogleCloudRunV2GrpcAction = {
  /** Port number of the gRPC service. Number must be in the range 1 to 65535. If not specified, defaults to the exposed port of the container, which is the value of container.ports[0].containerPort. */
  port?: number;
  /** Service is the name of the service to place in the gRPC HealthCheckRequest (see https://github.com/grpc/grpc/blob/master/doc/health-checking.md). If this is not specified, the default behavior is defined by gRPC. */
  service?: string;
};

/** HTTPGetAction describes an action based on HTTP Get requests. */
export type GoogleCloudRunV2HttpGetAction = {
  /** Custom headers to set in the request. HTTP allows repeated headers. */
  httpHeaders?: (GoogleCloudRunV2HttpHeader)[];
  /** Path to access on the HTTP server. Defaults to '/'. */
  path?: string;
  /** Port number to access on the container. Must be in the range 1 to 65535. If not specified, defaults to the exposed port of the container, which is the value of container.ports[0].containerPort. */
  port?: number;
};

/** HTTPHeader describes a custom header to be used in HTTP probes */
export type GoogleCloudRunV2HttpHeader = {
  /** Required. The header field name */
  name?: string;
  /** The header field value */
  value?: string;
};

/** Job represents the configuration of a single job, which references a container image that is run to completion. */
export type GoogleCloudRunV2Job = {
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
};

/** Response message containing a list of Executions. */
export type GoogleCloudRunV2ListExecutionsResponse = {
  /** The resulting list of Executions. */
  executions?: (GoogleCloudRunV2Execution)[];
  /** A token indicating there are more items than page_size. Use it in the next ListExecutions request to continue. */
  nextPageToken?: string;
};

/** Response message containing a list of Jobs. */
export type GoogleCloudRunV2ListJobsResponse = {
  /** The resulting list of Jobs. */
  jobs?: (GoogleCloudRunV2Job)[];
  /** A token indicating there are more items than page_size. Use it in the next ListJobs request to continue. */
  nextPageToken?: string;
};

/** Response message containing a list of Revisions. */
export type GoogleCloudRunV2ListRevisionsResponse = {
  /** A token indicating there are more items than page_size. Use it in the next ListRevisions request to continue. */
  nextPageToken?: string;
  /** The resulting list of Revisions. */
  revisions?: (GoogleCloudRunV2Revision)[];
};

/** Response message containing a list of Services. */
export type GoogleCloudRunV2ListServicesResponse = {
  /** A token indicating there are more items than page_size. Use it in the next ListServices request to continue. */
  nextPageToken?: string;
  /** The resulting list of Services. */
  services?: (GoogleCloudRunV2Service)[];
};

/** Response message containing a list of Tasks. */
export type GoogleCloudRunV2ListTasksResponse = {
  /** A token indicating there are more items than page_size. Use it in the next ListTasks request to continue. */
  nextPageToken?: string;
  /** The resulting list of Tasks. */
  tasks?: (GoogleCloudRunV2Task)[];
};

/** Probe describes a health check to be performed against a container to determine whether it is alive or ready to receive traffic. */
export type GoogleCloudRunV2Probe = {
  /** Minimum consecutive failures for the probe to be considered failed after having succeeded. Defaults to 3. Minimum value is 1. */
  failureThreshold?: number;
  /** GRPC specifies an action involving a gRPC port. Exactly one of httpGet, tcpSocket, or grpc must be specified. */
  grpc?: GoogleCloudRunV2GrpcAction;
  /** HTTPGet specifies the http request to perform. Exactly one of httpGet, tcpSocket, or grpc must be specified. */
  httpGet?: GoogleCloudRunV2HttpGetAction;
  /** Number of seconds after the container has started before the probe is initiated. Defaults to 0 seconds. Minimum value is 0. Maximum value for liveness probe is 3600. Maximum value for startup probe is 240. */
  initialDelaySeconds?: number;
  /** How often (in seconds) to perform the probe. Default to 10 seconds. Minimum value is 1. Maximum value for liveness probe is 3600. Maximum value for startup probe is 240. Must be greater or equal than timeout_seconds. */
  periodSeconds?: number;
  /** TCPSocket specifies an action involving a TCP port. Exactly one of httpGet, tcpSocket, or grpc must be specified. */
  tcpSocket?: GoogleCloudRunV2TcpSocketAction;
  /** Number of seconds after which the probe times out. Defaults to 1 second. Minimum value is 1. Maximum value is 3600. Must be smaller than period_seconds. */
  timeoutSeconds?: number;
};

/** ResourceRequirements describes the compute resource requirements. */
export type GoogleCloudRunV2ResourceRequirements = {
  /** Determines whether CPU should be throttled or not outside of requests. */
  cpuIdle?: boolean;
  /** Only ´memory´ and 'cpu' are supported. Notes: * The only supported values for CPU are '1', '2', '4', and '8'. Setting 4 CPU requires at least 2Gi of memory. For more information, go to https://cloud.google.com/run/docs/configuring/cpu. * For supported 'memory' values and syntax, go to https://cloud.google.com/run/docs/configuring/memory-limits */
  limits?: { [key: string]: string | undefined };
  /** Determines whether CPU should be boosted on startup of a new container instance above the requested CPU threshold, this can help reduce cold-start latency. */
  startupCpuBoost?: boolean;
};

/** A Revision is an immutable snapshot of code and configuration. A Revision references a container image. Revisions are only created by updates to its parent Service. */
export type GoogleCloudRunV2Revision = {
  /** KRM-style annotations for the resource. */
  annotations?: { [key: string]: string | undefined };
  /** Output only. The Condition of this Revision, containing its readiness status, and detailed error information in case it did not reach a serving state. */
  conditions?: (GoogleCloudRunV2Condition)[];
  /** Holds the single container that defines the unit of execution for this Revision. */
  containers?: (GoogleCloudRunV2Container)[];
  /** Output only. The creation time. */
  createTime?: string;
  /** Output only. For a deleted resource, the deletion time. It is only populated as a response to a Delete request. */
  deleteTime?: string;
  /** A reference to a customer managed encryption key (CMEK) to use to encrypt this container image. For more information, go to https://cloud.google.com/run/docs/securing/using-cmek */
  encryptionKey?: string;
  /** The action to take if the encryption key is revoked. */
  encryptionKeyRevocationAction?: "ENCRYPTION_KEY_REVOCATION_ACTION_UNSPECIFIED" | "PREVENT_NEW" | "SHUTDOWN";
  /** If encryption_key_revocation_action is SHUTDOWN, the duration before shutting down all instances. The minimum increment is 1 hour. */
  encryptionKeyShutdownDuration?: string;
  /** Output only. A system-generated fingerprint for this version of the resource. May be used to detect modification conflict during updates. */
  etag?: string;
  /** The execution environment being used to host this Revision. */
  executionEnvironment?: "EXECUTION_ENVIRONMENT_UNSPECIFIED" | "EXECUTION_ENVIRONMENT_GEN1" | "EXECUTION_ENVIRONMENT_GEN2";
  /** Output only. For a deleted resource, the time after which it will be permamently deleted. It is only populated as a response to a Delete request. */
  expireTime?: string;
  /** Output only. A number that monotonically increases every time the user modifies the desired state. */
  generation?: string;
  /** KRM-style labels for the resource. User-provided labels are shared with Google's billing system, so they can be used to filter, or break down billing charges by team, component, environment, state, etc. For more information, visit https://cloud.google.com/resource-manager/docs/creating-managing-labels or https://cloud.google.com/run/docs/configuring/labels */
  labels?: { [key: string]: string | undefined };
  /** The least stable launch stage needed to create this resource, as defined by [Google Cloud Platform Launch Stages](https://cloud.google.com/terms/launch-stages). Cloud Run supports `ALPHA`, `BETA`, and `GA`. Note that this value might not be what was used as input. For example, if ALPHA was provided as input in the parent resource, but only BETA and GA-level features are were, this field will be BETA. */
  launchStage?: "LAUNCH_STAGE_UNSPECIFIED" | "UNIMPLEMENTED" | "PRELAUNCH" | "EARLY_ACCESS" | "ALPHA" | "BETA" | "GA" | "DEPRECATED";
  /** Output only. The Google Console URI to obtain logs for the Revision. */
  logUri?: string;
  /** Sets the maximum number of requests that each serving instance can receive. */
  maxInstanceRequestConcurrency?: number;
  /** Output only. The unique name of this Revision. */
  name?: string;
  /** Output only. The generation of this Revision currently serving traffic. See comments in `reconciling` for additional information on reconciliation process in Cloud Run. */
  observedGeneration?: string;
  /** Output only. Indicates whether the resource's reconciliation is still in progress. See comments in `Service.reconciling` for additional information on reconciliation process in Cloud Run. */
  reconciling?: boolean;
  /** Output only. Reserved for future use. */
  satisfiesPzs?: boolean;
  /** Scaling settings for this revision. */
  scaling?: GoogleCloudRunV2RevisionScaling;
  /** Output only. The name of the parent service. */
  service?: string;
  /** Email address of the IAM service account associated with the revision of the service. The service account represents the identity of the running revision, and determines what permissions the revision has. */
  serviceAccount?: string;
  /** Max allowed time for an instance to respond to a request. */
  timeout?: string;
  /** Output only. Server assigned unique identifier for the Revision. The value is a UUID4 string and guaranteed to remain unchanged until the resource is deleted. */
  uid?: string;
  /** Output only. The last-modified time. */
  updateTime?: string;
  /** A list of Volumes to make available to containers. */
  volumes?: (GoogleCloudRunV2Volume)[];
  /** VPC Access configuration for this Revision. For more information, visit https://cloud.google.com/run/docs/configuring/connecting-vpc. */
  vpcAccess?: GoogleCloudRunV2VpcAccess;
};

/** Settings for revision-level scaling settings. */
export type GoogleCloudRunV2RevisionScaling = {
  /** Maximum number of serving instances that this resource should have. */
  maxInstanceCount?: number;
  /** Minimum number of serving instances that this resource should have. */
  minInstanceCount?: number;
};

/** RevisionTemplate describes the data a revision should have when created from a template. */
export type GoogleCloudRunV2RevisionTemplate = {
  /** KRM-style annotations for the resource. Cloud Run API v2 does not support annotations with `run.googleapis.com`, `cloud.googleapis.com`, `serving.knative.dev`, or `autoscaling.knative.dev` namespaces, and they will be rejected. All system annotations in v1 now have a corresponding field in v2 RevisionTemplate. */
  annotations?: { [key: string]: string | undefined };
  /** Holds the single container that defines the unit of execution for this Revision. */
  containers?: (GoogleCloudRunV2Container)[];
  /** A reference to a customer managed encryption key (CMEK) to use to encrypt this container image. For more information, go to https://cloud.google.com/run/docs/securing/using-cmek */
  encryptionKey?: string;
  /** The sandbox environment to host this Revision. */
  executionEnvironment?: "EXECUTION_ENVIRONMENT_UNSPECIFIED" | "EXECUTION_ENVIRONMENT_GEN1" | "EXECUTION_ENVIRONMENT_GEN2";
  /** KRM-style labels for the resource. Cloud Run API v2 does not support labels with `run.googleapis.com`, `cloud.googleapis.com`, `serving.knative.dev`, or `autoscaling.knative.dev` namespaces, and they will be rejected. All system labels in v1 now have a corresponding field in v2 RevisionTemplate. */
  labels?: { [key: string]: string | undefined };
  /** Sets the maximum number of requests that each serving instance can receive. */
  maxInstanceRequestConcurrency?: number;
  /** The unique name for the revision. If this field is omitted, it will be automatically generated based on the Service name. */
  revision?: string;
  /** Scaling settings for this Revision. */
  scaling?: GoogleCloudRunV2RevisionScaling;
  /** Email address of the IAM service account associated with the revision of the service. The service account represents the identity of the running revision, and determines what permissions the revision has. If not provided, the revision will use the project's default service account. */
  serviceAccount?: string;
  /** Max allowed time for an instance to respond to a request. */
  timeout?: string;
  /** A list of Volumes to make available to containers. */
  volumes?: (GoogleCloudRunV2Volume)[];
  /** VPC Access configuration to use for this Revision. For more information, visit https://cloud.google.com/run/docs/configuring/connecting-vpc. */
  vpcAccess?: GoogleCloudRunV2VpcAccess;
};

/** Request message to create a new Execution of a Job. */
export type GoogleCloudRunV2RunJobRequest = {
  /** A system-generated fingerprint for this version of the resource. May be used to detect modification conflict during updates. */
  etag?: string;
  /** Indicates that the request should be validated without actually deleting any resources. */
  validateOnly?: boolean;
};

/** SecretEnvVarSource represents a source for the value of an EnvVar. */
export type GoogleCloudRunV2SecretKeySelector = {
  /** Required. The name of the secret in Cloud Secret Manager. Format: {secret_name} if the secret is in the same project. projects/{project}/secrets/{secret_name} if the secret is in a different project. */
  secret?: string;
  /** The Cloud Secret Manager secret version. Can be 'latest' for the latest version, an integer for a specific version, or a version alias. */
  version?: string;
};

/** The secret's value will be presented as the content of a file whose name is defined in the item path. If no items are defined, the name of the file is the secret. */
export type GoogleCloudRunV2SecretVolumeSource = {
  /** Integer representation of mode bits to use on created files by default. Must be a value between 0000 and 0777 (octal), defaulting to 0444. Directories within the path are not affected by this setting. Notes * Internally, a umask of 0222 will be applied to any non-zero value. * This is an integer representation of the mode bits. So, the octal integer value should look exactly as the chmod numeric notation with a leading zero. Some examples: for chmod 777 (a=rwx), set to 0777 (octal) or 511 (base-10). For chmod 640 (u=rw,g=r), set to 0640 (octal) or 416 (base-10). For chmod 755 (u=rwx,g=rx,o=rx), set to 0755 (octal) or 493 (base-10). * This might be in conflict with other options that affect the file mode, like fsGroup, and the result can be other mode bits set. This might be in conflict with other options that affect the file mode, like fsGroup, and as a result, other mode bits could be set. */
  defaultMode?: number;
  /** If unspecified, the volume will expose a file whose name is the secret, relative to VolumeMount.mount_path. If specified, the key will be used as the version to fetch from Cloud Secret Manager and the path will be the name of the file exposed in the volume. When items are defined, they must specify a path and a version. */
  items?: (GoogleCloudRunV2VersionToPath)[];
  /** Required. The name of the secret in Cloud Secret Manager. Format: {secret} if the secret is in the same project. projects/{project}/secrets/{secret} if the secret is in a different project. */
  secret?: string;
};

/** Service acts as a top-level container that manages a set of configurations and revision templates which implement a network service. Service exists to provide a singular abstraction which can be access controlled, reasoned about, and which encapsulates software lifecycle decisions such as rollout policy and team resource ownership. */
export type GoogleCloudRunV2Service = {
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
};

/** TCPSocketAction describes an action based on opening a socket */
export type GoogleCloudRunV2TcpSocketAction = {
  /** Port number to access on the container. Must be in the range 1 to 65535. If not specified, defaults to the exposed port of the container, which is the value of container.ports[0].containerPort. */
  port?: number;
};

/** Task represents a single run of a container to completion. */
export type GoogleCloudRunV2Task = {
  /** KRM-style annotations for the resource. */
  annotations?: { [key: string]: string | undefined };
  /** Output only. Represents time when the Task was completed. It is not guaranteed to be set in happens-before order across separate operations. */
  completionTime?: string;
  /** Output only. The Condition of this Task, containing its readiness status, and detailed error information in case it did not reach the desired state. */
  conditions?: (GoogleCloudRunV2Condition)[];
  /** Holds the single container that defines the unit of execution for this task. */
  containers?: (GoogleCloudRunV2Container)[];
  /** Output only. Represents time when the task was created by the job controller. It is not guaranteed to be set in happens-before order across separate operations. */
  createTime?: string;
  /** Output only. For a deleted resource, the deletion time. It is only populated as a response to a Delete request. */
  deleteTime?: string;
  /** Output only. A reference to a customer managed encryption key (CMEK) to use to encrypt this container image. For more information, go to https://cloud.google.com/run/docs/securing/using-cmek */
  encryptionKey?: string;
  /** Output only. A system-generated fingerprint for this version of the resource. May be used to detect modification conflict during updates. */
  etag?: string;
  /** Output only. The name of the parent Execution. */
  execution?: string;
  /** The execution environment being used to host this Task. */
  executionEnvironment?: "EXECUTION_ENVIRONMENT_UNSPECIFIED" | "EXECUTION_ENVIRONMENT_GEN1" | "EXECUTION_ENVIRONMENT_GEN2";
  /** Output only. For a deleted resource, the time after which it will be permamently deleted. It is only populated as a response to a Delete request. */
  expireTime?: string;
  /** Output only. A number that monotonically increases every time the user modifies the desired state. */
  generation?: string;
  /** Output only. Index of the Task, unique per execution, and beginning at 0. */
  index?: number;
  /** Output only. The name of the parent Job. */
  job?: string;
  /** KRM-style labels for the resource. User-provided labels are shared with Google's billing system, so they can be used to filter, or break down billing charges by team, component, environment, state, etc. For more information, visit https://cloud.google.com/resource-manager/docs/creating-managing-labels or https://cloud.google.com/run/docs/configuring/labels */
  labels?: { [key: string]: string | undefined };
  /** Output only. Result of the last attempt of this Task. */
  lastAttemptResult?: GoogleCloudRunV2TaskAttemptResult;
  /** Output only. URI where logs for this execution can be found in Cloud Console. */
  logUri?: string;
  /** Number of retries allowed per Task, before marking this Task failed. */
  maxRetries?: number;
  /** Output only. The unique name of this Task. */
  name?: string;
  /** Output only. The generation of this Task. See comments in `Job.reconciling` for additional information on reconciliation process in Cloud Run. */
  observedGeneration?: string;
  /** Output only. Indicates whether the resource's reconciliation is still in progress. See comments in `Job.reconciling` for additional information on reconciliation process in Cloud Run. */
  reconciling?: boolean;
  /** Output only. The number of times this Task was retried. Tasks are retried when they fail up to the maxRetries limit. */
  retried?: number;
  /** Output only. Reserved for future use. */
  satisfiesPzs?: boolean;
  /** Email address of the IAM service account associated with the Task of a Job. The service account represents the identity of the running task, and determines what permissions the task has. If not provided, the task will use the project's default service account. */
  serviceAccount?: string;
  /** Output only. Represents time when the task started to run. It is not guaranteed to be set in happens-before order across separate operations. */
  startTime?: string;
  /** Max allowed time duration the Task may be active before the system will actively try to mark it failed and kill associated containers. This applies per attempt of a task, meaning each retry can run for the full timeout. */
  timeout?: string;
  /** Output only. Server assigned unique identifier for the Task. The value is a UUID4 string and guaranteed to remain unchanged until the resource is deleted. */
  uid?: string;
  /** Output only. The last-modified time. */
  updateTime?: string;
  /** A list of Volumes to make available to containers. */
  volumes?: (GoogleCloudRunV2Volume)[];
  /** Output only. VPC Access configuration to use for this Task. For more information, visit https://cloud.google.com/run/docs/configuring/connecting-vpc. */
  vpcAccess?: GoogleCloudRunV2VpcAccess;
};

/** Result of a task attempt. */
export type GoogleCloudRunV2TaskAttemptResult = {
  /** Output only. The exit code of this attempt. This may be unset if the container was unable to exit cleanly with a code due to some other failure. See status field for possible failure details. */
  exitCode?: number;
  /** Output only. The status of this attempt. If the status code is OK, then the attempt succeeded. */
  status?: GoogleRpcStatus;
};

/** TaskTemplate describes the data a task should have when created from a template. */
export type GoogleCloudRunV2TaskTemplate = {
  /** Holds the single container that defines the unit of execution for this task. */
  containers?: (GoogleCloudRunV2Container)[];
  /** A reference to a customer managed encryption key (CMEK) to use to encrypt this container image. For more information, go to https://cloud.google.com/run/docs/securing/using-cmek */
  encryptionKey?: string;
  /** The execution environment being used to host this Task. */
  executionEnvironment?: "EXECUTION_ENVIRONMENT_UNSPECIFIED" | "EXECUTION_ENVIRONMENT_GEN1" | "EXECUTION_ENVIRONMENT_GEN2";
  /** Number of retries allowed per Task, before marking this Task failed. Defaults to 3. */
  maxRetries?: number;
  /** Email address of the IAM service account associated with the Task of a Job. The service account represents the identity of the running task, and determines what permissions the task has. If not provided, the task will use the project's default service account. */
  serviceAccount?: string;
  /** Max allowed time duration the Task may be active before the system will actively try to mark it failed and kill associated containers. This applies per attempt of a task, meaning each retry can run for the full timeout. Defaults to 600 seconds. */
  timeout?: string;
  /** A list of Volumes to make available to containers. */
  volumes?: (GoogleCloudRunV2Volume)[];
  /** VPC Access configuration to use for this Task. For more information, visit https://cloud.google.com/run/docs/configuring/connecting-vpc. */
  vpcAccess?: GoogleCloudRunV2VpcAccess;
};

/** Holds a single traffic routing entry for the Service. Allocations can be done to a specific Revision name, or pointing to the latest Ready Revision. */
export type GoogleCloudRunV2TrafficTarget = {
  /** Specifies percent of the traffic to this Revision. This defaults to zero if unspecified. */
  percent?: number;
  /** Revision to which to send this portion of traffic, if traffic allocation is by revision. */
  revision?: string;
  /** Indicates a string to be part of the URI to exclusively reference this target. */
  tag?: string;
  /** The allocation type for this traffic target. */
  type?: "TRAFFIC_TARGET_ALLOCATION_TYPE_UNSPECIFIED" | "TRAFFIC_TARGET_ALLOCATION_TYPE_LATEST" | "TRAFFIC_TARGET_ALLOCATION_TYPE_REVISION";
};

/** Represents the observed state of a single `TrafficTarget` entry. */
export type GoogleCloudRunV2TrafficTargetStatus = {
  /** Specifies percent of the traffic to this Revision. */
  percent?: number;
  /** Revision to which this traffic is sent. */
  revision?: string;
  /** Indicates the string used in the URI to exclusively reference this target. */
  tag?: string;
  /** The allocation type for this traffic target. */
  type?: "TRAFFIC_TARGET_ALLOCATION_TYPE_UNSPECIFIED" | "TRAFFIC_TARGET_ALLOCATION_TYPE_LATEST" | "TRAFFIC_TARGET_ALLOCATION_TYPE_REVISION";
  /** Displays the target URI. */
  uri?: string;
};

/** VersionToPath maps a specific version of a secret to a relative file to mount to, relative to VolumeMount's mount_path. */
export type GoogleCloudRunV2VersionToPath = {
  /** Integer octal mode bits to use on this file, must be a value between 01 and 0777 (octal). If 0 or not set, the Volume's default mode will be used. Notes * Internally, a umask of 0222 will be applied to any non-zero value. * This is an integer representation of the mode bits. So, the octal integer value should look exactly as the chmod numeric notation with a leading zero. Some examples: for chmod 777 (a=rwx), set to 0777 (octal) or 511 (base-10). For chmod 640 (u=rw,g=r), set to 0640 (octal) or 416 (base-10). For chmod 755 (u=rwx,g=rx,o=rx), set to 0755 (octal) or 493 (base-10). * This might be in conflict with other options that affect the file mode, like fsGroup, and the result can be other mode bits set. */
  mode?: number;
  /** Required. The relative path of the secret in the container. */
  path?: string;
  /** The Cloud Secret Manager secret version. Can be 'latest' for the latest value, or an integer or a secret alias for a specific version. */
  version?: string;
};

/** Volume represents a named volume in a container. */
export type GoogleCloudRunV2Volume = {
  /** For Cloud SQL volumes, contains the specific instances that should be mounted. Visit https://cloud.google.com/sql/docs/mysql/connect-run for more information on how to connect Cloud SQL and Cloud Run. */
  cloudSqlInstance?: GoogleCloudRunV2CloudSqlInstance;
  /** Required. Volume's name. */
  name?: string;
  /** Secret represents a secret that should populate this volume. */
  secret?: GoogleCloudRunV2SecretVolumeSource;
};

/** VolumeMount describes a mounting of a Volume within a container. */
export type GoogleCloudRunV2VolumeMount = {
  /** Required. Path within the container at which the volume should be mounted. Must not contain ':'. For Cloud SQL volumes, it can be left empty, or must otherwise be `/cloudsql`. All instances defined in the Volume will be available as `/cloudsql/[instance]`. For more information on Cloud SQL volumes, visit https://cloud.google.com/sql/docs/mysql/connect-run */
  mountPath?: string;
  /** Required. This must match the Name of a Volume. */
  name?: string;
};

/** VPC Access settings. For more information on creating a VPC Connector, visit https://cloud.google.com/vpc/docs/configure-serverless-vpc-access For information on how to configure Cloud Run with an existing VPC Connector, visit https://cloud.google.com/run/docs/configuring/connecting-vpc */
export type GoogleCloudRunV2VpcAccess = {
  /** VPC Access connector name. Format: projects/{project}/locations/{location}/connectors/{connector}, where {project} can be project id or number. */
  connector?: string;
  /** Traffic VPC egress settings. */
  egress?: "VPC_EGRESS_UNSPECIFIED" | "ALL_TRAFFIC" | "PRIVATE_RANGES_ONLY";
};

/** Specifies the audit configuration for a service. The configuration determines which permission types are logged, and what identities, if any, are exempted from logging. An AuditConfig must have one or more AuditLogConfigs. If there are AuditConfigs for both `allServices` and a specific service, the union of the two AuditConfigs is used for that service: the log_types specified in each AuditConfig are enabled, and the exempted_members in each AuditLogConfig are exempted. Example Policy with multiple AuditConfigs: { "audit_configs": [ { "service": "allServices", "audit_log_configs": [ { "log_type": "DATA_READ", "exempted_members": [ "user:jose@example.com" ] }, { "log_type": "DATA_WRITE" }, { "log_type": "ADMIN_READ" } ] }, { "service": "sampleservice.googleapis.com", "audit_log_configs": [ { "log_type": "DATA_READ" }, { "log_type": "DATA_WRITE", "exempted_members": [ "user:aliya@example.com" ] } ] } ] } For sampleservice, this policy enables DATA_READ, DATA_WRITE and ADMIN_READ logging. It also exempts `jose@example.com` from DATA_READ logging, and `aliya@example.com` from DATA_WRITE logging. */
export type GoogleIamV1AuditConfig = {
  /** The configuration for logging of each type of permission. */
  auditLogConfigs?: (GoogleIamV1AuditLogConfig)[];
  /** Specifies a service that will be enabled for audit logging. For example, `storage.googleapis.com`, `cloudsql.googleapis.com`. `allServices` is a special value that covers all services. */
  service?: string;
};

/** Provides the configuration for logging a type of permissions. Example: { "audit_log_configs": [ { "log_type": "DATA_READ", "exempted_members": [ "user:jose@example.com" ] }, { "log_type": "DATA_WRITE" } ] } This enables 'DATA_READ' and 'DATA_WRITE' logging, while exempting jose@example.com from DATA_READ logging. */
export type GoogleIamV1AuditLogConfig = {
  /** Specifies the identities that do not cause logging for this type of permission. Follows the same format of Binding.members. */
  exemptedMembers?: (string)[];
  /** The log type that this config enables. */
  logType?: "LOG_TYPE_UNSPECIFIED" | "ADMIN_READ" | "DATA_WRITE" | "DATA_READ";
};

/** Associates `members`, or principals, with a `role`. */
export type GoogleIamV1Binding = {
  /** The condition that is associated with this binding. If the condition evaluates to `true`, then this binding applies to the current request. If the condition evaluates to `false`, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  condition?: GoogleTypeExpr;
  /** Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values: * `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. * `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. * `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com` . * `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`. * `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a [Kubernetes service account](https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. * `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. * `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. * `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. * `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. * `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. */
  members?: (string)[];
  /** Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. */
  role?: string;
};

/** An Identity and Access Management (IAM) policy, which specifies access controls for Google Cloud resources. A `Policy` is a collection of `bindings`. A `binding` binds one or more `members`, or principals, to a single `role`. Principals can be user accounts, service accounts, Google groups, and domains (such as G Suite). A `role` is a named list of permissions; each `role` can be an IAM predefined role or a user-created custom role. For some types of Google Cloud resources, a `binding` can also specify a `condition`, which is a logical expression that allows access to a resource only if the expression evaluates to `true`. A condition can add constraints based on attributes of the request, the resource, or both. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). **JSON example:** { "bindings": [ { "role": "roles/resourcemanager.organizationAdmin", "members": [ "user:mike@example.com", "group:admins@example.com", "domain:google.com", "serviceAccount:my-project-id@appspot.gserviceaccount.com" ] }, { "role": "roles/resourcemanager.organizationViewer", "members": [ "user:eve@example.com" ], "condition": { "title": "expirable access", "description": "Does not grant access after Sep 2020", "expression": "request.time < timestamp('2020-10-01T00:00:00.000Z')", } } ], "etag": "BwWWja0YfJA=", "version": 3 } **YAML example:** bindings: - members: - user:mike@example.com - group:admins@example.com - domain:google.com - serviceAccount:my-project-id@appspot.gserviceaccount.com role: roles/resourcemanager.organizationAdmin - members: - user:eve@example.com role: roles/resourcemanager.organizationViewer condition: title: expirable access description: Does not grant access after Sep 2020 expression: request.time < timestamp('2020-10-01T00:00:00.000Z') etag: BwWWja0YfJA= version: 3 For a description of IAM and its features, see the [IAM documentation](https://cloud.google.com/iam/docs/). */
export type GoogleIamV1Policy = {
  /** Specifies cloud audit logging configuration for this policy. */
  auditConfigs?: (GoogleIamV1AuditConfig)[];
  /** Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. */
  bindings?: (GoogleIamV1Binding)[];
  /** `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. */
  etag?: string;
  /** Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: * Getting a policy that includes a conditional role binding * Adding a conditional role binding to a policy * Changing a conditional role binding in a policy * Removing any role binding, with or without a condition, from a policy that includes conditions **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  version?: number;
};

/** Request message for `SetIamPolicy` method. */
export type GoogleIamV1SetIamPolicyRequest = {
  /** REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. */
  policy?: GoogleIamV1Policy;
  /** OPTIONAL: A FieldMask specifying which fields of the policy to modify. Only the fields in the mask will be modified. If no mask is provided, the following default mask is used: `paths: "bindings, etag"` */
  updateMask?: string;
};

/** Request message for `TestIamPermissions` method. */
export type GoogleIamV1TestIamPermissionsRequest = {
  /** The set of permissions to check for the `resource`. Permissions with wildcards (such as `*` or `storage.*`) are not allowed. For more information see [IAM Overview](https://cloud.google.com/iam/docs/overview#permissions). */
  permissions?: (string)[];
};

/** Response message for `TestIamPermissions` method. */
export type GoogleIamV1TestIamPermissionsResponse = {
  /** A subset of `TestPermissionsRequest.permissions` that the caller is allowed. */
  permissions?: (string)[];
};

/** The response message for Operations.ListOperations. */
export type GoogleLongrunningListOperationsResponse = {
  /** The standard List next-page token. */
  nextPageToken?: string;
  /** A list of operations that matches the specified filter in the request. */
  operations?: (GoogleLongrunningOperation)[];
};

/** This resource represents a long-running operation that is the result of a network API call. */
export type GoogleLongrunningOperation = {
  /** If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. */
  done?: boolean;
  /** The error result of the operation in case of failure or cancellation. */
  error?: GoogleRpcStatus;
  /** Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. */
  metadata?: { [key: string]: unknown | undefined };
  /** The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. */
  name?: string;
  /** The normal response of the operation in case of success. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. */
  response?: { [key: string]: unknown | undefined };
};

/** The request message for Operations.WaitOperation. */
export type GoogleLongrunningWaitOperationRequest = {
  /** The maximum duration to wait before timing out. If left blank, the wait will be at most the time permitted by the underlying HTTP/RPC protocol. If RPC context deadline is also specified, the shorter one will be used. */
  timeout?: string;
};

/** A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); } */
export type GoogleProtobufEmpty = { [key: string]: unknown };

/** The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the [API Design Guide](https://cloud.google.com/apis/design/errors). */
export type GoogleRpcStatus = {
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: ({ [key: string]: unknown | undefined })[];
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
};

/** Represents a textual expression in the Common Expression Language (CEL) syntax. CEL is a C-like expression language. The syntax and semantics of CEL are documented at https://github.com/google/cel-spec. Example (Comparison): title: "Summary size limit" description: "Determines if a summary is less than 100 chars" expression: "document.summary.size() < 100" Example (Equality): title: "Requestor is owner" description: "Determines if requestor is the document owner" expression: "document.owner == request.auth.claims.email" Example (Logic): title: "Public documents" description: "Determine whether the document should be publicly visible" expression: "document.type != 'private' && document.type != 'internal'" Example (Data Manipulation): title: "Notification string" description: "Create a notification string with a timestamp." expression: "'New message received at ' + string(document.create_time)" The exact variables and functions that may be referenced within an expression are determined by the service that evaluates it. See the service documentation for additional information. */
export type GoogleTypeExpr = {
  /** Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. */
  description?: string;
  /** Textual representation of an expression in Common Expression Language syntax. */
  expression?: string;
  /** Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. */
  location?: string;
  /** Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. */
  title?: string;
};
