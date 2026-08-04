/**
 * Unified profile configuration — one record shape for namespace-keyed
 * (provider / interface) and path-keyed (mount) bindings.
 *
 * Exactly one of `namespace` / `path` is set per record. Path profiles are
 * singly-bound (no `name`). Namespace profile names are any non-empty string.
 */

/** Keys that configure transport and must not arrive as call-site options. */
export const TRANSPORT_OPTION_KEYS = ["baseUrl", "headers", "auth"] as const;
export type TransportOptionKey = (typeof TRANSPORT_OPTION_KEYS)[number];

/**
 * Call-site options — call arguments only. Transport-shaped keys are
 * forbidden at the type level (D4); runtime rejection is the backstop for
 * untyped callers.
 */
export type CallOptions = {
  [K in string]: K extends TransportOptionKey ? never : unknown;
};

/** Profile-stored options — may include transport configuration. */
export type ProfileOptions = Record<string, unknown>;

/** Reserved name for the default namespace profile. */
export const DEFAULT_PROFILE_NAME = "default";

export interface ProfileValue {
  provider?: string;
  /** Credential id (not label). */
  credential?: string;
  options?: ProfileOptions;
}

export interface NamespaceProfileKey {
  namespace: string;
  /** Omitted / undefined means the default profile. */
  name?: string;
  path?: never;
}

export interface PathProfileKey {
  path: string;
  namespace?: never;
  name?: never;
}

export type ProfileKey = NamespaceProfileKey | PathProfileKey;

export type ProfileRecord = ProfileKey & ProfileValue;

export function isTransportOptionKey(key: string): key is TransportOptionKey {
  return (TRANSPORT_OPTION_KEYS as readonly string[]).includes(key);
}

/** Reject transport-shaped keys in call-site options (runtime backstop). */
export function assertCallOptions(options: Record<string, unknown>): void {
  for (const key of Object.keys(options)) {
    if (isTransportOptionKey(key)) {
      throw new Error(
        `Call-site option "${key}" is transport configuration and cannot be set at the call site — set it on the profile instead`,
      );
    }
  }
}

/**
 * Merge option layers: call-site > profile > compat defaults.
 * Transport keys in the profile layer are preserved; call-site must not
 * carry them (see {@link assertCallOptions}).
 */
export function mergeOptions(
  compatDefaults: Record<string, unknown> | undefined,
  profileOptions: ProfileOptions | undefined,
  callSiteOptions: CallOptions | undefined,
): Record<string, unknown> {
  return {
    ...(compatDefaults ?? {}),
    ...(profileOptions ?? {}),
    ...(callSiteOptions ?? {}),
  };
}
