/** Workspace VFS mount as returned by `vcs.mounts.list` / `add`. */
export interface VfsMountRecord {
  prefix: string;
  type: "git" | "s3" | string;
  mode: "read" | "readwrite";
  config: Record<string, unknown>;
  createdBy: string;
  createdAt: string;
}

export type MountBackendType = "git" | "s3";

export interface GitMountDraft {
  type: "git";
  prefix: string;
  repo: string;
  ref: string;
  /** Optional subpath within the repo. */
  subpath: string;
}

export interface S3MountDraft {
  type: "s3";
  prefix: string;
  bucket: string;
  /** Optional key prefix inside the bucket. */
  keyPrefix: string;
  region: string;
}

export type MountDraft = GitMountDraft | S3MountDraft;

/** Structured client error preserving HTTP status for 409 vs 400 UI. */
export class MountsApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "MountsApiError";
    this.status = status;
  }
}

export type MountFormErrorKind = "overlap" | "unreachable" | "validation" | "generic";

export interface MountFormError {
  kind: MountFormErrorKind;
  message: string;
}
