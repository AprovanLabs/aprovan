/**
 * `utdk/cloudflare/sandbox` — sandboxes on Cloudflare's Sandbox SDK.
 *
 * Cloudflare's sandboxes have no vendor REST API to point a client at: the
 * SDK runs *inside* a Worker (`getSandbox(env.Sandbox, "user-123")` over
 * Containers + Durable Objects), so the only reachable surface is whatever
 * that Worker chooses to expose. This provider therefore talks to **your own
 * deployed sandbox Worker**, over the shared Aprovan sandbox RPC protocol
 * (`@utdk/sandbox/rpc`) — an adapter on the far side is a switch statement
 * over the driver surface onto the SDK's own `exec` / `readFile` /
 * `writeFile` / `mkdir` / `exposePort` methods.
 *
 * That is the honest shape rather than a limitation: Cloudflare's own model
 * is that a sandbox is addressable by a name you choose, and the Worker is
 * where that naming and any per-tenant routing lives.
 *
 * ## What the adapter must do
 *
 * Verified against `@cloudflare/sandbox@0.12.4`'s published types. Each RPC
 * op maps onto the SDK almost directly, with three places where it must do
 * real work rather than forward:
 *
 * - **`listFiles` must hash.** `sandbox.listFiles()` returns
 *   `{name, absolutePath, relativePath, type, size, modifiedAt, mode,
 *   permissions}` — no digest; the container implementation is a
 *   `find -printf` parse. Reading every body would cost a round trip per
 *   file, so the adapter should run
 *   `find . -type f -print0 | xargs -0 sha256sum` via `exec` and return the
 *   parsed pairs. `@utdk/sandbox` exports `shellManifestCommand` and
 *   `parseShellManifest` for exactly this.
 * - **`exposePort` needs a hostname**, which only the Worker knows:
 *   `exposePort(port, { hostname })` yields
 *   `https://{port}-{sandboxId}-{token}.{hostname}`. The adapter fills it in
 *   from the incoming request and returns `{ url }`.
 * - **Ids are validated.** `getSandbox` rejects ids over 63 characters, with
 *   a leading or trailing hyphen, or matching a reserved name (`www`, `api`,
 *   `admin`, `root`, `system`, `cloudflare`, `workers`), and `exposePort`
 *   throws on an uppercase id without `normalizeId`. Lowercase ids only.
 *
 * Two settings on the Worker side are worth pinning: `transport: "rpc"`
 * (collapses a whole operation to one subrequest, against a 50/1000 cap) and
 * a `sleepAfter` long enough for the work — a 10-minute default that destroys
 * the filesystem is a surprising way to lose a build.
 *
 * Credential: a `bearer_token` the Worker checks. Base URL: the Worker's
 * origin, set on the `sandbox` interface binding.
 */

import {
  NO_CAPABILITIES,
  SandboxError,
  sandboxToolEntries,
  secretFromHeaders,
  type SandboxCapabilities,
  type SandboxClientOptions,
  type SandboxDriver,
} from "@utdk/sandbox";
import { createRpcSandboxDriver } from "@utdk/sandbox/rpc";
import { createLazyClient } from "../../client.js";

const PROVIDER = "cloudflare/sandbox";

/**
 * `persist: false` is the important one, and it is not a limitation of this
 * client. A Cloudflare sandbox is a container behind a Durable Object with a
 * `sleepAfter` idle timeout (default 10 minutes), and **eviction destroys the
 * filesystem** — files deleted, processes terminated, shell state reset. The
 * container is durable *within* a working session and not across one.
 *
 * The consequence for the workspace is concrete: sync before a long gap, and
 * treat a sandbox that has been idle as empty rather than assuming its mounts
 * survived. Marking this `true` would make the gateway promise something the
 * platform does not.
 */
export const CLOUDFLARE_CAPABILITIES: SandboxCapabilities = {
  ...NO_CAPABILITIES,
  ports: true,
  // The SDK's `listFiles` returns {name, size, mode, modifiedAt} and no
  // digest, so the adapter hashes in-container — see the header note.
  hashes: true,
};

export type CloudflareSandboxClient = SandboxDriver;

export async function createCloudflareSandboxClient(
  options: SandboxClientOptions = {},
): Promise<CloudflareSandboxClient> {
  if (!options.baseUrl) {
    throw new SandboxError(
      "cloudflare/sandbox needs the URL of your deployed sandbox Worker. " +
        'Set it on the binding: interfaces.bind { interface: "sandbox", provider: "cloudflare/sandbox", options: { baseUrl: "https://sandbox.<you>.workers.dev" } }',
      400,
    );
  }
  return createRpcSandboxDriver(PROVIDER, options, {
    baseUrl: options.baseUrl,
    secret: secretFromHeaders(options.headers, PROVIDER, "Worker access token"),
    capabilities: CLOUDFLARE_CAPABILITIES,
  });
}

const defaultClient = createLazyClient(() => createCloudflareSandboxClient());

export default defaultClient;

/** Discovery entries for GET /tools. */
export const tools = sandboxToolEntries(PROVIDER, {
  label: "Cloudflare Sandbox",
  capabilities: CLOUDFLARE_CAPABILITIES,
});
