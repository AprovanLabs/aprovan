/**
 * LLM completion job records.
 *
 * Widget-edit completions run 1–2 minutes; mobile browsers kill the fetch the
 * moment the screen locks or the tab backgrounds, even though the gateway and
 * the upstream model keep going. A job record is how the result survives
 * that: the streaming route (`POST /llm/:provider/completions`, see
 * src/routes/llm.ts) persists the accumulated text here as it consumes the
 * upstream stream, independent of whether the client is still attached, and
 * `GET /llm/jobs/:id` lets a client that lost its connection pick the result
 * back up by polling.
 *
 * Records live in the record store under `svc#llm-jobs` in the caller's
 * workspace tenant — cross-workspace access is denied for free by the record
 * store's tenancy partitioning (specs/record-store).
 */

import { readSvcRecord, svcScope, writeSvcRecord } from "./svc-records.js";

const JOBS_SCOPE = svcScope("llm-jobs");

export type LlmJobStatus = "running" | "succeeded" | "failed";

export interface LlmJobRecord {
  id: string;
  status: LlmJobStatus;
  provider: string;
  model?: string;
  /** Accumulated completion text so far (final text once terminal). */
  text: string;
  error?: string;
  createdAt: string;
  updatedAt: string;
}

export async function readLlmJob(workspaceId: string, id: string): Promise<LlmJobRecord | undefined> {
  return readSvcRecord<LlmJobRecord>(workspaceId, JOBS_SCOPE, id).catch(() => undefined);
}

export async function writeLlmJob(workspaceId: string, record: LlmJobRecord): Promise<void> {
  await writeSvcRecord(workspaceId, JOBS_SCOPE, record.id, record);
}
