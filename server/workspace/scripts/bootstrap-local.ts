/**
 * Bootstrap the local compose stack (docker-compose.yml at the repo root):
 * creates every gateway DynamoDB table against dynamodb-local and the
 * workspace-fs bucket against MinIO, so `pnpm dev:aws` runs the exact same
 * Dynamo/S3 code paths as the Lambda deployment — no SQLite involved.
 *
 *   docker compose up -d && pnpm bootstrap:local
 */

import {
  CreateTableCommand,
  DynamoDBClient,
  ResourceInUseException,
  UpdateTimeToLiveCommand,
} from "@aws-sdk/client-dynamodb";
import { CreateBucketCommand, S3Client } from "@aws-sdk/client-s3";
import { ALL_TABLES } from "../src/db/schema.js";

const DYNAMO_ENDPOINT = process.env["DYNAMO_ENDPOINT"] ?? "http://localhost:8000";
const S3_ENDPOINT = process.env["S3_ENDPOINT"] ?? "http://localhost:9000";
const FS_BUCKET = process.env["FS_BUCKET"] ?? "aprovan-fs";

const dynamo = new DynamoDBClient({
  endpoint: DYNAMO_ENDPOINT,
  region: "us-east-1",
  credentials: { accessKeyId: "local", secretAccessKey: "local" },
});

for (const table of ALL_TABLES) {
  try {
    await dynamo.send(new CreateTableCommand(table.createInput));
    console.log(`created table ${table.tableName}`);
  } catch (err) {
    if (!(err instanceof ResourceInUseException)) throw err;
    console.log(`table ${table.tableName} already exists`);
  }
  if (table.ttlAttribute) {
    try {
      await dynamo.send(
        new UpdateTimeToLiveCommand({
          TableName: table.tableName,
          TimeToLiveSpecification: {
            AttributeName: table.ttlAttribute,
            Enabled: true,
          },
        }),
      );
    } catch {
      // dynamodb-local accepts but does not enforce TTL; ignore failures.
    }
  }
}

const s3 = new S3Client({
  endpoint: S3_ENDPOINT,
  region: "us-east-1",
  forcePathStyle: true,
  credentials: {
    accessKeyId: process.env["FS_S3_ACCESS_KEY"] ?? "minioadmin",
    secretAccessKey: process.env["FS_S3_SECRET_KEY"] ?? "minioadmin",
  },
});

try {
  await s3.send(new CreateBucketCommand({ Bucket: FS_BUCKET }));
  console.log(`created bucket ${FS_BUCKET}`);
} catch (err) {
  const name = err instanceof Error ? err.name : "";
  if (name !== "BucketAlreadyOwnedByYou" && name !== "BucketAlreadyExists") throw err;
  console.log(`bucket ${FS_BUCKET} already exists`);
}

console.log("local AWS-parity stack ready");

// Nuke-and-reseed app scopes onto the id-keyed model (app-model-split).
try {
  const { spawnSync } = await import("node:child_process");
  const result = spawnSync(
    process.execPath,
    ["--import", "tsx", new URL("./reseed-apps.ts", import.meta.url).pathname, "local"],
    { stdio: "inherit", env: process.env },
  );
  if (result.status !== 0) {
    console.warn("reseed-apps exited non-zero — continuing bootstrap");
  }
} catch (err) {
  console.warn("reseed-apps skipped:", err instanceof Error ? err.message : err);
}
