/** Client-side prefix shape checks before `vcs.mounts.add`. */

const HIDDEN = /^\./u;
const ABSOLUTE = /^[/\\]/u;
const TRAVERSAL = /(^|\/)\.\.(\/|$)/u;
const DOUBLE_SLASH = /\/{2,}/u;

/**
 * Returns a validation message when `prefix` is not a workspace-relative
 * mount path, or `null` when it looks acceptable.
 */
export function validateMountPrefix(raw: string): string | null {
  const prefix = raw.trim();
  if (!prefix) return "Prefix is required";
  if (ABSOLUTE.test(prefix)) return "Prefix must be workspace-relative (no leading slash)";
  if (HIDDEN.test(prefix) || prefix.split("/").some((part) => part.startsWith("."))) {
    return "Prefix must not be hidden (no leading '.')";
  }
  if (TRAVERSAL.test(prefix)) return "Prefix must not contain '..'";
  if (DOUBLE_SLASH.test(prefix)) return "Prefix must not contain empty segments";
  if (prefix.endsWith("/")) return "Prefix must not end with '/'";
  if (/\s/u.test(prefix)) return "Prefix must not contain spaces";
  return null;
}

export function validateGitDraft(fields: {
  prefix: string;
  repo: string;
  ref: string;
}): string | null {
  const prefixErr = validateMountPrefix(fields.prefix);
  if (prefixErr) return prefixErr;
  if (!fields.repo.trim()) return "Repository is required (owner/name)";
  if (!/^[^/\s]+\/[^/\s]+$/u.test(fields.repo.trim())) {
    return 'Repository must look like "owner/name"';
  }
  if (!fields.ref.trim()) return "Ref is required (branch, tag, or SHA)";
  return null;
}

export function validateS3Draft(fields: {
  prefix: string;
  bucket: string;
}): string | null {
  const prefixErr = validateMountPrefix(fields.prefix);
  if (prefixErr) return prefixErr;
  if (!fields.bucket.trim()) return "Bucket is required";
  return null;
}
