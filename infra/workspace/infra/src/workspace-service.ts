import { type Namer } from "@aprovan/cdk";
import { Duration, Stack } from "aws-cdk-lib";
import { type ITable, Table } from "aws-cdk-lib/aws-dynamodb";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as ecs from "aws-cdk-lib/aws-ecs";
import * as iam from "aws-cdk-lib/aws-iam";
import { type IKey } from "aws-cdk-lib/aws-kms";
import { LogGroup, RetentionDays } from "aws-cdk-lib/aws-logs";
import { type IBucket } from "aws-cdk-lib/aws-s3";
import * as ssm from "aws-cdk-lib/aws-ssm";
import { Construct } from "constructs";

/**
 * The workspace as a persistent container.
 *
 * Three decisions carry this design, and they are all about cost:
 *
 * **Fargate Spot on ARM64.** ~$0.0097 per vCPU-hour and ~$0.0011 per GB-hour,
 * so 0.5 vCPU / 1 GB runs continuously for about $4.30 a month. `FARGATE` is
 * listed as a second capacity provider so placement falls back to on-demand
 * when Spot capacity is unavailable rather than leaving the service at zero.
 * Spot reclamation arrives as SIGTERM with two minutes' notice, which the
 * server's drain (src/server.ts) and the cron lease (src/runtime/leader.ts)
 * are built around.
 *
 * **No load balancer.** An ALB costs $16.40 a month — four times the compute —
 * and every free AWS alternative breaks streaming: API Gateway HTTP APIs cap
 * integrations at 30 seconds and buffer the response, while completions here
 * run one to two minutes and stream. A `cloudflared` sidecar dials out to the
 * Cloudflare zone we already own instead, so the task needs no inbound path at
 * all and CloudFront keeps serving aprovan.com unchanged.
 *
 * **No NAT gateway.** Tasks sit in public subnets with public IPs
 * ($3.65/month for the IPv4 address) instead of paying $32/month for NAT.
 * Nothing listens: inbound is closed by the security group, and the only
 * reason the address exists is egress to model providers and GHCR.
 */
/** The Dynamo store tables — absent once retired by the cleanup deploy. */
export interface WorkspaceDynamoTables {
  credentialsTable: ITable;
  permissionsTable: ITable;
  auditTable: ITable;
  sessionsTable: ITable;
  groupsTable: ITable;
  userGroupsTable: ITable;
  /** Workspace filesystem index table (fs-store.ts `FsStoreS3`). */
  fsTable: ITable;
  /** Record store — accumulated state (records.ts `RecordStoreDynamodb`). */
  recordsTable: ITable;
}

export interface WorkspaceServiceProps {
  environmentName: string;
  names: Namer;
  /** Envelope-encryption key for credential payloads (credentialCipher.ts). */
  credentialsKey: IKey;
  /** Workspace filesystem content-blob bucket (retained forever). */
  fsBucket: IBucket;
  /** Dynamo store tables; undefined after the cleanup deploy retires them. */
  dynamoTables?: WorkspaceDynamoTables;
  /** True on the post-confirmation cleanup deploy (no grants, no env). */
  dynamoRetired: boolean;
  /** Aurora DSQL cluster ARN (IAM connect grant). */
  dsqlClusterArn: string;
  /** DSQL cluster endpoint hostname (DSQL_ENDPOINT env). */
  dsqlEndpoint: string;
  /** Active store backend for the workspace task ("dynamo" until cutover). */
  storeBackend: string;
  sharedEnv: Record<string, string>;
  /**
   * Fully qualified image, e.g. `ghcr.io/aprovanlabs/workspace:1a2b3c4d5e6f`.
   * Resolved from SSM in app.ts rather than through a CloudFormation dynamic
   * reference or `valueFromLookup`: the tag then appears literally in the
   * template, so `cdk diff` shows the release, CloudFormation reliably sees a
   * changed property and registers a new task-definition revision, and a
   * credential-less synth cannot silently substitute a dummy value.
   */
  image: string;
}

/** Reserved by the ECS agent / task metadata endpoint. */
const RESERVED_ENV_VARS = new Set([
  "AWS_REGION",
  "AWS_DEFAULT_REGION",
  "AWS_ACCESS_KEY_ID",
  "AWS_SECRET_ACCESS_KEY",
  "AWS_SESSION_TOKEN",
  "AWS_CONTAINER_CREDENTIALS_RELATIVE_URI",
  "ECS_CONTAINER_METADATA_URI",
  "ECS_CONTAINER_METADATA_URI_V4",
  "TZ",
]);

function containerEnv(sharedEnv: Record<string, string>): Record<string, string> {
  return Object.fromEntries(
    Object.entries(sharedEnv).filter(([key]) => !RESERVED_ENV_VARS.has(key)),
  );
}

export class WorkspaceService extends Construct {
  readonly cluster: ecs.Cluster;
  readonly service: ecs.FargateService;
  readonly taskDefinition: ecs.FargateTaskDefinition;
  readonly logGroup: LogGroup;

  constructor(scope: Construct, id: string, props: WorkspaceServiceProps) {
    super(scope, id);

    const {
      environmentName,
      names,
      sharedEnv,
      credentialsKey,
      fsBucket,
      dynamoTables,
      dynamoRetired,
      dsqlClusterArn,
      dsqlEndpoint,
      storeBackend,
      image,
    } = props;

    const stack = Stack.of(this);

    // -----------------------------------------------------------------------
    // Network — two AZs of public subnets, nothing else. `natGateways: 0` is
    // the single most valuable line in this file.
    // -----------------------------------------------------------------------
    const vpc = new ec2.Vpc(this, "Vpc", {
      vpcName: names.regional("workspace"),
      maxAzs: 2,
      natGateways: 0,
      subnetConfiguration: [
        { name: "public", subnetType: ec2.SubnetType.PUBLIC, cidrMask: 24 },
      ],
    });

    // Egress only. The task is reachable exclusively through the Cloudflare
    // tunnel, which is an outbound connection — there is no inbound rule to
    // add, and the public IP exists solely so the task can reach the internet.
    const securityGroup = new ec2.SecurityGroup(this, "SecurityGroup", {
      vpc,
      // ASCII only: EC2 rejects a GroupDescription containing anything else,
      // and does so at create time with a message that names the parameter but
      // not the offending character.
      description: "Workspace task - egress only, ingress via Cloudflare tunnel",
      allowAllOutbound: true,
    });

    this.cluster = new ecs.Cluster(this, "Cluster", {
      clusterName: names.regional("workspace"),
      vpc,
      enableFargateCapacityProviders: true,
      containerInsightsV2: ecs.ContainerInsights.DISABLED,
    });

    this.logGroup = new LogGroup(this, "Logs", {
      logGroupName: `/aprovan/${environmentName}/workspace`,
      retention: RetentionDays.TWO_WEEKS,
    });

    // -----------------------------------------------------------------------
    // Task definition
    // -----------------------------------------------------------------------
    this.taskDefinition = new ecs.FargateTaskDefinition(this, "TaskDefinition", {
      family: names.regional("workspace"),
      cpu: 512,
      memoryLimitMiB: 1024,
      runtimePlatform: {
        cpuArchitecture: ecs.CpuArchitecture.ARM64,
        operatingSystemFamily: ecs.OperatingSystemFamily.LINUX,
      },
    });

    const environment: Record<string, string> = {
      NODE_ENV: "production",
      WORKSPACE_MODE: "aws",
      APROVAN_ENVIRONMENT: environmentName,
      WORKSPACE_PORT: "4000",
      CREDENTIALS_KMS_KEY_ID: credentialsKey.keyId,
      FS_BUCKET: fsBucket.bucketName,
      STORE_BACKEND: storeBackend,
      DSQL_ENDPOINT: dsqlEndpoint,
      GATEWAY_REGISTRY_BASE_URL: "https://aprovan.com/registry",
      // Table env wiring dies with the tables on the cleanup deploy.
      ...(dynamoTables
        ? {
            CREDENTIALS_TABLE: dynamoTables.credentialsTable.tableName,
            PERMISSIONS_TABLE: dynamoTables.permissionsTable.tableName,
            AUDIT_TABLE: dynamoTables.auditTable.tableName,
            SESSIONS_TABLE: dynamoTables.sessionsTable.tableName,
            GROUPS_TABLE: dynamoTables.groupsTable.tableName,
            USER_GROUPS_TABLE: dynamoTables.userGroupsTable.tableName,
            USERGROUPS_TABLE: dynamoTables.userGroupsTable.tableName,
            FS_TABLE: dynamoTables.fsTable.tableName,
            RECORDS_TABLE: dynamoTables.recordsTable.tableName,
          }
        : {}),
      ...containerEnv(sharedEnv),
    };

    const workspace = this.taskDefinition.addContainer("workspace", {
      containerName: "workspace",
      // Published to GHCR by scripts/image.sh (and the workspace-image
      // workflow); pinned to an immutable sha tag so what is running is
      // always identifiable and a rollback is `deploy-infra.sh <old-sha>`.
      image: ecs.ContainerImage.fromRegistry(image),
      environment,
      essential: true,
      logging: ecs.LogDrivers.awsLogs({ streamPrefix: "workspace", logGroup: this.logGroup }),
      portMappings: [{ containerPort: 4000, protocol: ecs.Protocol.TCP }],
      healthCheck: {
        command: [
          "CMD",
          "node",
          "-e",
          "fetch('http://127.0.0.1:4000/health').then(r=>process.exit(r.ok?0:1),()=>process.exit(1))",
        ],
        interval: Duration.seconds(30),
        timeout: Duration.seconds(5),
        retries: 3,
        startPeriod: Duration.seconds(30),
      },
      // The drain in src/server.ts finishes in-flight requests before exiting;
      // give it room to do so rather than having the agent SIGKILL mid-stream.
      stopTimeout: Duration.seconds(60),
    });

    // The tunnel is a sidecar rather than its own service so its lifecycle is
    // exactly the task's: a reclaimed task takes its route with it, and a new
    // one registers a fresh connector on start. During a rolling deploy both
    // connectors are briefly registered and Cloudflare balances across them,
    // which is what makes the cutover seamless.
    const tunnelToken = ssm.StringParameter.fromSecureStringParameterAttributes(
      this,
      "TunnelToken",
      { parameterName: `/aprovan/${environmentName}/workspace/tunnel-token` },
    );

    const cloudflared = this.taskDefinition.addContainer("cloudflared", {
      containerName: "cloudflared",
      image: ecs.ContainerImage.fromRegistry("cloudflare/cloudflared:latest"),
      command: ["tunnel", "--no-autoupdate", "run"],
      secrets: { TUNNEL_TOKEN: ecs.Secret.fromSsmParameter(tunnelToken) },
      essential: true,
      logging: ecs.LogDrivers.awsLogs({ streamPrefix: "cloudflared", logGroup: this.logGroup }),
    });

    // The tunnel token is a SecureString, so fetching it is two permissions,
    // not one: CDK grants the execution role `ssm:GetParameters` when the
    // secret is attached, but decryption is a separate KMS call. Without this
    // the task fails to start with a ResourceInitializationError that names
    // the parameter but not the missing permission. Scoped by ViaService so
    // the role can only decrypt through SSM, and only in this region.
    this.taskDefinition.obtainExecutionRole().addToPrincipalPolicy(
      new iam.PolicyStatement({
        actions: ["kms:Decrypt"],
        resources: ["*"],
        conditions: {
          StringEquals: { "kms:ViaService": `ssm.${stack.region}.amazonaws.com` },
        },
      }),
    );

    // Don't open a route to a workspace that isn't serving yet.
    cloudflared.addContainerDependencies({
      container: workspace,
      condition: ecs.ContainerDependencyCondition.HEALTHY,
    });

    // -----------------------------------------------------------------------
    // Service
    // -----------------------------------------------------------------------
    this.service = new ecs.FargateService(this, "Service", {
      serviceName: names.regional("workspace"),
      cluster: this.cluster,
      taskDefinition: this.taskDefinition,
      desiredCount: 1,
      assignPublicIp: true,
      vpcSubnets: { subnetType: ec2.SubnetType.PUBLIC },
      securityGroups: [securityGroup],
      capacityProviderStrategies: [
        { capacityProvider: "FARGATE_SPOT", weight: 4 },
        { capacityProvider: "FARGATE", weight: 1 },
      ],
      // Start the replacement before stopping the incumbent; the cron lease
      // makes two concurrent tasks safe, and the tunnel makes the handover
      // invisible.
      minHealthyPercent: 100,
      maxHealthyPercent: 200,
      circuitBreaker: { rollback: true },
      // Free, and the only way into a task with no inbound port.
      enableExecuteCommand: true,
      healthCheckGracePeriod: Duration.seconds(60),
    });

    // -----------------------------------------------------------------------
    // Permissions — carried over unchanged from the Lambda execution role.
    // -----------------------------------------------------------------------
    const { taskRole } = this.taskDefinition;

    for (const table of dynamoTables ? Object.values(dynamoTables) : []) {
      table.grantReadWriteData(taskRole);
    }

    // WFS content blobs — includes presigned PUT/GET, which sign with the
    // task's own credentials and therefore need object-level grants.
    fsBucket.grantReadWrite(taskRole);

    // Credential envelope encryption: generate data keys + unwrap them.
    credentialsKey.grantEncryptDecrypt(taskRole);

    // Core identity tables live in the aprovan stack and are imported by name.
    // `fromTableName` does not know about GSIs, so `grantReadWriteData` would
    // omit `/index/*` ARNs and deny Query on ByUserId / ByEmail / etc.
    // Declare each index explicitly via `fromTableAttributes`.
    // Once Dynamo is retired here, identity reads come from DSQL and the
    // core-table imports/grants go too (the tables themselves retire in the
    // core stack once nothing references them).
    const coreTables: Array<{ envKey: string; globalIndexes?: string[] }> = dynamoRetired
      ? []
      : [
          { envKey: "DYNAMODB_USERS_TABLE", globalIndexes: ["ByEmail"] },
          { envKey: "DYNAMODB_WORKSPACES_TABLE" },
          { envKey: "DYNAMODB_MEMBERSHIPS_TABLE", globalIndexes: ["ByUserId"] },
          {
            envKey: "DYNAMODB_INVITES_TABLE",
            globalIndexes: ["ByEmailWorkspace", "ByWorkspace"],
          },
        ];
    for (const { envKey, globalIndexes } of coreTables) {
      const tableName = sharedEnv[envKey];
      if (!tableName) continue;
      Table.fromTableAttributes(this, `Core-${tableName}`, {
        tableName,
        globalIndexes,
      }).grantReadWriteData(taskRole);
    }

    const userPoolId = sharedEnv["COGNITO_USER_POOL_ID"];
    if (userPoolId) {
      taskRole.addToPrincipalPolicy(
        new iam.PolicyStatement({
          actions: [
            "cognito-idp:CreateUserPoolClient",
            "cognito-idp:DescribeUserPoolClient",
            "cognito-idp:UpdateUserPoolClient",
            "cognito-idp:DeleteUserPoolClient",
          ],
          resources: [
            `arn:aws:cognito-idp:${stack.region}:${stack.account}:userpool/${userPoolId}`,
          ],
        }),
      );
    }

    taskRole.addToPrincipalPolicy(
      new iam.PolicyStatement({
        actions: ["ses:SendEmail", "ses:SendRawEmail"],
        resources: ["*"],
      }),
    );

    // Aurora DSQL: the task connects with IAM auth tokens (db/dsql.ts signs
    // them per connection). DbConnectAdmin covers schema DDL + DML on the
    // default `admin` database role; scoped to this environment's cluster.
    taskRole.addToPrincipalPolicy(
      new iam.PolicyStatement({
        actions: ["dsql:DbConnect", "dsql:DbConnectAdmin"],
        resources: [dsqlClusterArn],
      }),
    );

    // `loadWorkspaceConfig` reads the shared identity bundle from SSM at boot
    // in aws mode (runtime/config.ts). The Lambda never needed this because
    // every value was baked into its environment at synth; a long-lived
    // process reads the parameter itself, so a config change does not require
    // a redeploy. Without the grant the container exits immediately with an
    // AccessDenied and the deployment circuit breaker rolls the service back.
    taskRole.addToPrincipalPolicy(
      new iam.PolicyStatement({
        actions: ["ssm:GetParameter", "ssm:GetParameters"],
        resources: [
          `arn:${stack.partition}:ssm:${stack.region}:${stack.account}:parameter/aprovan/${environmentName}/*`,
        ],
      }),
    );
  }
}
