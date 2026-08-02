#!/usr/bin/env tsx
/**
 * seed-workspace.ts
 *
 * Insert an initial workspace record + admin membership into the DDB tables.
 * Safe to re-run — uses ConditionExpression to skip if the workspace already exists.
 *
 * ## Usage
 *
 *   pnpm tsx scripts/seed-workspace.ts \
 *     --workspace-name "My Workspace" \
 *     --user-sub "cognito-sub-uuid"
 *
 *   # Specify a fixed workspace ID (useful for local dev)
 *   pnpm tsx scripts/seed-workspace.ts \
 *     --workspace-name "Dev Workspace" \
 *     --user-sub "dev-user-sub" \
 *     --workspace-id "00000000-0000-0000-0000-000000000001"
 *
 * ## Environment
 *
 *   AWS_REGION           — defaults to us-east-1
 *   AWS_PROFILE          — optional; picks up a named profile from ~/.aws/credentials
 *   DYNAMODB_WORKSPACES_TABLE_NAME — defaults to gateway-prd-use1-workspaces
 *   DYNAMODB_MEMBERSHIPS_TABLE_NAME — defaults to gateway-prd-use1-memberships
 */

import { parseArgs } from "node:util";
import { DynamoDBClient, ConditionalCheckFailedException } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const { values: args } = parseArgs({
  options: {
    "workspace-name": { type: "string" },
    "user-sub": { type: "string" },
    "workspace-id": { type: "string" },
  },
  strict: true,
});

const workspaceName = args["workspace-name"];
const userId = args["user-sub"];

if (!workspaceName || !userId) {
  console.error("Usage: seed-workspace.ts --workspace-name <name> --user-sub <sub> [--workspace-id <uuid>]");
  process.exit(1);
}

const region = process.env.AWS_REGION ?? "us-east-1";
const regionCode = region === "us-east-1" ? "use1" : region === "us-east-2" ? "use2" : "usw1";
const env = process.env.ENVIRONMENT ?? "prd";

const DYNAMODB_WORKSPACES_TABLE =
  process.env.DYNAMODB_WORKSPACES_TABLE_NAME ?? `gateway-${env}-${regionCode}-workspaces`;
const DYNAMODB_MEMBERSHIPS_TABLE =
  process.env.DYNAMODB_MEMBERSHIPS_TABLE_NAME ?? `gateway-${env}-${regionCode}-memberships`;

const baseClient = new DynamoDBClient({ region });
const ddb = DynamoDBDocumentClient.from(baseClient);

const workspaceId = args["workspace-id"] ?? crypto.randomUUID();
const now = new Date().toISOString();

async function run() {
  console.log(`Seeding workspace "${workspaceName}" (${workspaceId}) for user ${userId}`);
  console.log(`  Workspaces table : ${DYNAMODB_WORKSPACES_TABLE}`);
  console.log(`  Memberships table: ${DYNAMODB_MEMBERSHIPS_TABLE}`);

  try {
    await ddb.send(
      new PutCommand({
        TableName: DYNAMODB_WORKSPACES_TABLE,
        Item: {
          workspaceId,
          name: workspaceName,
          createdAt: now,
          plan: "free",
          limits: {
            dailyChatCap: 50,
            maxModels: ["openrouter/auto"],
            maxToolSteps: 5,
            maxTokensPerRequest: 4096,
          },
          features: {
            advancedTools: false,
            customPrompts: false,
          },
          updatedAt: now,
        },
        ConditionExpression: "attribute_not_exists(workspaceId)",
      }),
    );
    console.log("✓ Workspace created");
  } catch (err) {
    if (err instanceof ConditionalCheckFailedException) {
      console.log("✓ Workspace already exists — skipping");
    } else {
      throw err;
    }
  }

  try {
    await ddb.send(
      new PutCommand({
        TableName: DYNAMODB_MEMBERSHIPS_TABLE,
        Item: {
          workspaceId,
          userId,
          role: "admin",
          createdAt: now,
        },
        ConditionExpression:
          "attribute_not_exists(workspaceId) AND attribute_not_exists(userId)",
      }),
    );
    console.log("✓ Membership created");
  } catch (err) {
    if (err instanceof ConditionalCheckFailedException) {
      console.log("✓ Membership already exists — skipping");
    } else {
      throw err;
    }
  }

  console.log(`\nDone. workspaceId=${workspaceId}`);
}

run().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
