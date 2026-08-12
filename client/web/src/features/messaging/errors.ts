/**
 * Distinguishable send failures for Chat messaging (ux.md / F2 D22).
 */

/** Thrown when a send is rejected because the instance hit its storage cap. */
export class StorageCapError extends Error {
  readonly code = "storage_cap" as const;

  constructor(
    message = "Message not sent — this instance hit its storage cap. The host can raise it.",
  ) {
    super(message);
    this.name = "StorageCapError";
  }
}

export function isStorageCapError(err: unknown): err is StorageCapError {
  if (err instanceof StorageCapError) return true;
  if (!err || typeof err !== "object") return false;
  const e = err as { code?: unknown; message?: unknown; status?: unknown };
  if (e.code === "storage_cap") return true;
  if (e.status === 413) return true;
  if (typeof e.message === "string") {
    const m = e.message.toLowerCase();
    if (m.includes("storage cap") || m.includes("413")) return true;
  }
  return false;
}

export function toStorageCapError(err: unknown): StorageCapError {
  if (err instanceof StorageCapError) return err;
  return new StorageCapError();
}
