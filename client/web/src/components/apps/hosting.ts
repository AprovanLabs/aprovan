/**
 * Hosting-mode helpers + exact disclosure copy (ux.md / PRD invariant 5).
 *
 * F4 declares a 3-way (`managed` | `creator-hosted` | `publisher-hosted`);
 * the install UI collapses the two hosted flavors into one user-facing
 * `hosted` bucket — which host is a displayed fact, never a third pick.
 */

export type HostModeDecl = "managed" | "creator-hosted" | "publisher-hosted";
export type HostingBucket = "managed" | "hosted";

/** Collapse F4 flavors into the managed/hosted buckets the installer picks. */
export function hostingBuckets(
  modes: readonly HostModeDecl[] | readonly string[],
): HostingBucket[] {
  const buckets = new Set<HostingBucket>();
  for (const mode of modes) {
    if (mode === "managed") buckets.add("managed");
    else if (mode === "creator-hosted" || mode === "publisher-hosted" || mode === "hosted") {
      buckets.add("hosted");
    }
  }
  return (["managed", "hosted"] as const).filter((b) => buckets.has(b));
}

/** True when the app declares both managed and a hosted flavor. */
export function needsHostingPick(modes: readonly string[]): boolean {
  return hostingBuckets(modes).length > 1;
}

/** Single declared bucket — install proceeds without a picker. */
export function soleHostingBucket(modes: readonly string[]): HostingBucket | null {
  const buckets = hostingBuckets(modes);
  return buckets.length === 1 ? buckets[0]! : null;
}

/** Exact managed disclosure (ux.md install flow step 2). */
export const MANAGED_DISCLOSURE =
  "Data lives in your own space. You can read, export, or delete it any time.";

/**
 * Exact hosted disclosure (ux.md install flow step 2). `publisher` is the
 * host identity shown as a displayed fact (publisher workspace or creator).
 */
export function hostedDisclosure(publisher: string): string {
  const host = publisher.trim() || "the publisher";
  return `Data lives in ${host}'s space. Everything they promise about it is a promise — not something you can verify or delete yourself.`;
}
