import fs from "node:fs";
import path from "node:path";

/**
 * On-disk layout under Application Support (tech-plan):
 *
 *   bundles/
 *     active            -> <version>     (symlink; swap is a rename)
 *     previous          -> <version>
 *     <version>/
 *   gateway-data/       (WORKSPACE_DATA_DIR)
 *
 * BundleManager (stream 5) owns active/previous swaps; this helper only
 * ensures the directories exist so later streams have a stable root.
 */
export type AppSupportLayout = {
  root: string;
  bundlesDir: string;
  gatewayDataDir: string;
};

export function resolveAppSupportPaths(userDataPath: string): AppSupportLayout {
  const root = path.resolve(userDataPath);
  return {
    root,
    bundlesDir: path.join(root, "bundles"),
    gatewayDataDir: path.join(root, "gateway-data"),
  };
}

/**
 * Create `bundles/` and `gateway-data/` under Application Support.
 * Idempotent — safe to call on every launch.
 */
export function ensureAppSupportLayout(userDataPath: string): AppSupportLayout {
  const layout = resolveAppSupportPaths(userDataPath);
  fs.mkdirSync(layout.bundlesDir, { recursive: true });
  fs.mkdirSync(layout.gatewayDataDir, { recursive: true });
  return layout;
}
