/**
 * DynamoDB access, loaded on demand.
 *
 * The AWS SDK is only ever reachable from the `aws` branch of a store (every
 * store picks its backend through `isAwsMode()` — see runtime/config.ts), but
 * a static `import` would still drag the whole client into memory at boot in
 * local mode, where nothing will ever call it. So both the client package and
 * the command classes arrive through `await import(...)`, memoized on the
 * first call: local mode never pays for AWS, `aws` mode resolves once.
 *
 * `dynamo()` hands back the document client together with the entire
 * `@aws-sdk/lib-dynamodb` surface, so a call site needs one await rather than
 * one per command class:
 *
 *   const { client, PutCommand } = await dynamo();
 *   await client.send(new PutCommand({ … }));
 *
 * Types are still imported statically (`import type`) — those are erased at
 * compile time and cost nothing at runtime.
 */

import type { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

/** The `lib-dynamodb` module surface plus the shared document client. */
export type Dynamo = typeof import("@aws-sdk/lib-dynamodb") & {
  client: DynamoDBDocumentClient;
};

let _dynamo: Promise<Dynamo> | undefined;

export function dynamo(): Promise<Dynamo> {
  _dynamo ??= (async () => {
    const [{ DynamoDBClient }, lib] = await Promise.all([
      import("@aws-sdk/client-dynamodb"),
      import("@aws-sdk/lib-dynamodb"),
    ]);
    const base = new DynamoDBClient({
      endpoint: process.env["DYNAMO_ENDPOINT"],
      region: process.env["AWS_REGION"] ?? "us-east-1",
      credentials:
        process.env["DYNAMO_ENDPOINT"]
          ? {
              accessKeyId: process.env["AWS_ACCESS_KEY_ID"] ?? "local",
              secretAccessKey: process.env["AWS_SECRET_ACCESS_KEY"] ?? "local",
            }
          : undefined,
    });
    return { ...lib, client: lib.DynamoDBDocumentClient.from(base) };
  })();
  return _dynamo;
}

/** The shared document client on its own, for call sites that build no command. */
export async function getDynamoDocClient(): Promise<DynamoDBDocumentClient> {
  return (await dynamo()).client;
}

/**
 * Drop the memoized client so the next call re-reads the environment (tests
 * point `DYNAMO_ENDPOINT` at dynamodb-local between suites).
 */
export function resetDynamoDocClient(): void {
  _dynamo = undefined;
}
