import { type Namer } from "@aprovan/cdk";
import { CfnOutput, CfnResource, RemovalPolicy, Stack, type StackProps } from "aws-cdk-lib";
import { AttributeType, BillingMode, Table } from "aws-cdk-lib/aws-dynamodb";
import { Key } from "aws-cdk-lib/aws-kms";
import { BlockPublicAccess, Bucket, BucketEncryption } from "aws-cdk-lib/aws-s3";
import { type Construct } from "constructs";
import { WorkspaceService } from "./workspace-service.js";

export interface RegistryAppProps extends StackProps {
  environmentName: string;
  names: Namer;
  sharedEnv: Record<string, string>;
  /** Fully qualified workspace container image, resolved from SSM in app.ts. */
  workspaceImage: string;
}

export class RegistryApp extends Stack {
  constructor(scope: Construct, id: string, props: RegistryAppProps) {
    super(scope, id, props);
    const { environmentName, names, sharedEnv, workspaceImage } = props;
    const isProd = environmentName === "prd";

    // Which backend the workspace stores use. Stays "dynamo" until the
    // runbook'd cutover flips it (`cdk deploy -c storeBackend=dsql`); flipping
    // back is the rollback (tables are untouched either side of the flip).
    const storeBackend =
      (this.node.tryGetContext("storeBackend") as string | undefined) ?? "dynamo";
    if (!["dynamo", "dsql"].includes(storeBackend)) {
      throw new Error(`storeBackend context must be "dynamo" or "dsql" (got "${storeBackend}")`);
    }

    // Post-cutover cleanup (specs/storage-cutover, "CDK cleanup of retired
    // tables"): a SEPARATE deploy, only after the operator confirms the DSQL
    // deployment — removes the retired DynamoDB tables, their PITR specs,
    // deletion protection, env wiring, and IAM grants. The FS bucket, KMS
    // credentials key, and DSQL cluster remain.
    const dynamoRetired = this.node.tryGetContext("dynamoRetired") === "true";
    if (dynamoRetired && storeBackend !== "dsql") {
      throw new Error(
        "dynamoRetired=true requires storeBackend=dsql — the tables cannot be removed while the workspace still runs on them.",
      );
    }

    const storeTableProps = {
      billingMode: BillingMode.PAY_PER_REQUEST,
      pointInTimeRecoverySpecification: { pointInTimeRecoveryEnabled: true },
      deletionProtection: isProd,
      removalPolicy: isProd ? RemovalPolicy.RETAIN : RemovalPolicy.DESTROY,
    };

    // Customer-managed key for credential-payload envelope encryption
    // (gateway credentialCipher.ts). Rotation on; retained in prod so
    // encrypted payloads stay decryptable even if the stack is torn down.
    const credentialsKey = new Key(this, "CredentialsKey", {
      alias: names.regional("credentials"),
      description: "Envelope encryption for gateway credential payloads",
      enableKeyRotation: true,
      removalPolicy: isProd ? RemovalPolicy.RETAIN : RemovalPolicy.DESTROY,
    });

    // Retired-at-cleanup DynamoDB store tables. Until the operator confirms
    // the DSQL cutover, they exist exactly as before; the cleanup deploy
    // (-c dynamoRetired=true) removes them, their PITR specifications, and
    // every grant/env reference in one shot.
    let dynamoTables: import("./workspace-service.js").WorkspaceDynamoTables | undefined;
    if (!dynamoRetired) {
      const credentialsTable = new Table(this, "CredentialsTable", {
        ...storeTableProps,
        tableName: names.regional("credentials"),
        partitionKey: { name: "PK", type: AttributeType.STRING },
        sortKey: { name: "SK", type: AttributeType.STRING },
      });

      new CfnOutput(this, "CREDENTIALS_TABLE_NAME", {
        value: credentialsTable.tableName,
        exportName: names.regional("credentials-table-name"),
      });
      new CfnOutput(this, "CREDENTIALS_TABLE_ARN", {
        value: credentialsTable.tableArn,
        exportName: names.regional("credentials-table-arn"),
      });

      const apiKeysTable = new Table(this, "ApiKeysTable", {
        ...storeTableProps,
        tableName: names.regional("api-keys"),
        partitionKey: { name: "PK", type: AttributeType.STRING },
        sortKey: { name: "SK", type: AttributeType.STRING },
        timeToLiveAttribute: "ttl",
      });

      new CfnOutput(this, "APIKEYS_TABLE_NAME", {
        value: apiKeysTable.tableName,
        exportName: names.regional("api-keys-table-name"),
      });
      new CfnOutput(this, "APIKEYS_TABLE_ARN", {
        value: apiKeysTable.tableArn,
        exportName: names.regional("api-keys-table-arn"),
      });

      const permissionsTable = new Table(this, "PermissionsTable", {
        ...storeTableProps,
        tableName: names.regional("permissions"),
        partitionKey: { name: "PK", type: AttributeType.STRING },
        sortKey: { name: "SK", type: AttributeType.STRING },
      });

      new CfnOutput(this, "PERMISSIONS_TABLE_NAME", {
        value: permissionsTable.tableName,
        exportName: names.regional("permissions-table-name"),
      });
      new CfnOutput(this, "PERMISSIONS_TABLE_ARN", {
        value: permissionsTable.tableArn,
        exportName: names.regional("permissions-table-arn"),
      });

      const auditTable = new Table(this, "AuditStoreTable", {
        ...storeTableProps,
        tableName: names.regional("audit-store"),
        partitionKey: { name: "PK", type: AttributeType.STRING },
        sortKey: { name: "SK", type: AttributeType.STRING },
        timeToLiveAttribute: "ttl",
      });

      new CfnOutput(this, "AUDIT_TABLE_NAME", {
        value: auditTable.tableName,
        exportName: names.regional("audit-table-name"),
      });
      new CfnOutput(this, "AUDIT_TABLE_ARN", {
        value: auditTable.tableArn,
        exportName: names.regional("audit-table-arn"),
      });

      const sessionsTable = new Table(this, "SessionsTable", {
        ...storeTableProps,
        tableName: names.regional("sessions"),
        partitionKey: { name: "userId", type: AttributeType.STRING },
        timeToLiveAttribute: "expiresAt",
      });

      const groupsTable = new Table(this, "GroupsTable", {
        ...storeTableProps,
        tableName: names.regional("groups"),
        partitionKey: { name: "workspaceId", type: AttributeType.STRING },
        sortKey: { name: "groupId", type: AttributeType.STRING },
      });

      const userGroupsTable = new Table(this, "UserGroupsTable", {
        ...storeTableProps,
        tableName: names.regional("user-groups"),
        partitionKey: { name: "workspaceId#userId", type: AttributeType.STRING },
        sortKey: { name: "groupId", type: AttributeType.STRING },
      });

      // Workspace filesystem (WFS): version/pointer index rows in Dynamo,
      // content-addressed blobs in S3 (see apps/workspace/src/fs-store.ts).
      const fsTable = new Table(this, "FsFilesTable", {
        ...storeTableProps,
        tableName: names.regional("fs-files"),
        partitionKey: { name: "workspaceId", type: AttributeType.STRING },
        sortKey: { name: "sk", type: AttributeType.STRING },
      });

      dynamoTables = {
        credentialsTable,
        permissionsTable,
        auditTable,
        sessionsTable,
        groupsTable,
        userGroupsTable,
        fsTable,
        recordsTable: undefined as never, // assigned below
      };
    }

    const fsBucket = new Bucket(this, "FsBucket", {
      bucketName: names.regional("workspace-fs"),
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      encryption: BucketEncryption.S3_MANAGED,
      enforceSSL: true,
      removalPolicy: isProd ? RemovalPolicy.RETAIN : RemovalPolicy.DESTROY,
      autoDeleteObjects: !isProd,
    });

    if (dynamoTables) {
      new CfnOutput(this, "FS_TABLE_NAME", {
        value: dynamoTables.fsTable.tableName,
        exportName: names.regional("fs-table-name"),
      });
    }
    new CfnOutput(this, "FS_BUCKET_NAME", {
      value: fsBucket.bucketName,
      exportName: names.regional("fs-bucket-name"),
    });

    if (!dynamoRetired && dynamoTables) {
      // Record store (records.ts) — accumulated state (keyvalue rows, later
      // queues/queryable collections), split out from the workspace FS so it's
      // unversioned and invisible to the file plane. See docs/app-data.md.
      const recordsTable = new Table(this, "RecordsTable", {
        ...storeTableProps,
        tableName: names.regional("records"),
        partitionKey: { name: "PK", type: AttributeType.STRING },
        sortKey: { name: "SK", type: AttributeType.STRING },
        // Rows that opt into expiry (top-level epoch-seconds `expiresAt`) are
        // reclaimed by DynamoDB — seen notifications age out after 10 days.
        timeToLiveAttribute: "expiresAt",
      });

      new CfnOutput(this, "RECORDS_TABLE_NAME", {
        value: recordsTable.tableName,
        exportName: names.regional("records-table-name"),
      });
      new CfnOutput(this, "RECORDS_TABLE_ARN", {
        value: recordsTable.tableArn,
        exportName: names.regional("records-table-arn"),
      });

      dynamoTables.recordsTable = recordsTable;
    }

    // -----------------------------------------------------------------------
    // Aurora DSQL — the relational target every store migrates to (WS-5
    // tech-plan D4: one single-region cluster per environment). aws-cdk-lib
    // 2.180 ships no aws-dsql module yet, so this is the L1 resource by type.
    // Serverless, pay-per-DPU, permanent free tier — safe to keep dark while
    // STORE_BACKEND stays "dynamo".
    // -----------------------------------------------------------------------
    const dsqlCluster = new CfnResource(this, "DsqlCluster", {
      type: "AWS::DSQL::Cluster",
      properties: {
        DeletionProtectionEnabled: isProd,
        Tags: [{ Key: "Name", Value: names.regional("workspace-dsql") }],
      },
    });
    dsqlCluster.applyRemovalPolicy(isProd ? RemovalPolicy.RETAIN : RemovalPolicy.DESTROY);
    const dsqlEndpoint = `${dsqlCluster.getAtt("Identifier").toString()}.dsql.${this.region}.on.aws`;

    new CfnOutput(this, "DSQL_CLUSTER_ARN", {
      value: dsqlCluster.getAtt("ResourceArn").toString(),
      exportName: names.regional("workspace-dsql-arn"),
    });
    new CfnOutput(this, "DSQL_ENDPOINT_OUT", {
      value: dsqlEndpoint,
      exportName: names.regional("workspace-dsql-endpoint"),
    });

    const workspace = new WorkspaceService(this, "Workspace", {
      dynamoRetired,
      dsqlClusterArn: dsqlCluster.getAtt("ResourceArn").toString(),
      dsqlEndpoint,
      storeBackend,
      environmentName,
      names,
      sharedEnv,
      image: workspaceImage,
      credentialsKey,
      fsBucket,
      dynamoTables,
    });

    new CfnOutput(this, "WorkspaceClusterName", {
      value: workspace.cluster.clusterName,
      exportName: names.regional("workspace-cluster-name"),
    });
    new CfnOutput(this, "WorkspaceServiceName", {
      value: workspace.service.serviceName,
      exportName: names.regional("workspace-service-name"),
    });
    new CfnOutput(this, "WorkspaceLogGroup", {
      value: workspace.logGroup.logGroupName,
    });
  }
}
