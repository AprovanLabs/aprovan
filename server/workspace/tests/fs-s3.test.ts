/**
 * Integration tests for the S3+DynamoDB workspace-fs backend.
 *
 * Dynamo FS runtime retired after DSQL cutover — `getFsStore()` no longer
 * wires `FsStoreS3`. Contract coverage for `FsStoreS3` remains in
 * `cutover-snapshot.test.ts` (direct construction). This suite is skipped.
 *
 * Historically required the local compose stack (`docker compose up -d`):
 * DynamoDB at `DYNAMO_ENDPOINT` and MinIO at `S3_ENDPOINT`.
 */

import { describe, it } from "vitest";

describe.skip("workspace filesystem (S3+DynamoDB backend) — Dynamo runtime retired", () => {
  it("placeholder", () => {
    // Kept so the file remains discoverable; see cutover-snapshot for FsStoreS3.
  });
});
