import {
  DynamoDBClient,
  CreateTableCommand,
  UpdateTimeToLiveCommand,
  ResourceInUseException,
} from "@aws-sdk/client-dynamodb";
import { ALL_TABLES } from "../src/db/schema.js";

const endpoint = process.env["DYNAMO_ENDPOINT"];
const region = process.env["AWS_REGION"] ?? "us-east-1";

const client = new DynamoDBClient({
  endpoint,
  region,
  credentials: endpoint
    ? {
        accessKeyId: process.env["AWS_ACCESS_KEY_ID"] ?? "local",
        secretAccessKey: process.env["AWS_SECRET_ACCESS_KEY"] ?? "local",
      }
    : undefined,
});

async function createTable(
  tableName: string,
  input: (typeof ALL_TABLES)[number]["createInput"],
  ttlAttribute: string | undefined,
): Promise<void> {
  try {
    await client.send(new CreateTableCommand(input));
    process.stdout.write(`  created ${tableName}\n`);
  } catch (err) {
    if (err instanceof ResourceInUseException) {
      process.stdout.write(`  exists   ${tableName} (skipped)\n`);
    } else {
      throw err;
    }
  }

  if (ttlAttribute) {
    await client.send(
      new UpdateTimeToLiveCommand({
        TableName: tableName,
        TimeToLiveSpecification: {
          AttributeName: ttlAttribute,
          Enabled: true,
        },
      }),
    );
    process.stdout.write(`  ttl      ${tableName} (attribute=${ttlAttribute})\n`);
  }
}

async function main(): Promise<void> {
  // Without DYNAMO_ENDPOINT this points at real AWS with whatever ambient
  // credentials the shell has, and silently creates the full table set in the
  // developer's account — the tables are unprefixed ("Users", "Sessions"), so
  // the mistake is invisible until something reads the wrong data. Local use is
  // the overwhelmingly common case, so require an explicit opt-in for the
  // remote one.
  if (!endpoint && process.env["CREATE_TABLES_ALLOW_AWS"] !== "1") {
    throw new Error(
      "DYNAMO_ENDPOINT is not set, which would create tables in real AWS " +
        `(region ${region}) using ambient credentials.\n` +
        "For local development, start the compose stack and point at it:\n" +
        "  docker compose up -d\n" +
        "  DYNAMO_ENDPOINT=http://localhost:8000 npx tsx bin/create-tables.ts\n" +
        "If you genuinely mean to provision the account, re-run with CREATE_TABLES_ALLOW_AWS=1.",
    );
  }

  process.stdout.write(`Creating tables (endpoint=${endpoint ?? `AWS ${region}`})…\n`);
  for (const schema of ALL_TABLES) {
    await createTable(schema.tableName, schema.createInput, schema.ttlAttribute);
  }
  process.stdout.write("Done.\n");
}

main().catch((err) => {
  process.stderr.write(`Fatal: ${err instanceof Error ? err.message : String(err)}\n`);
  process.exit(1);
});
