/**
 * electron-builder excludes `node_modules` from extraResources copies, which
 * left packaged apps with a gateway that cannot start. Copy the full vendored
 * gateway tree (including hoisted node_modules) after pack.
 */
const fs = require("node:fs");
const path = require("node:path");

exports.default = async function copyGatewayResources(context) {
  if (context.electronPlatformName !== "darwin") return;

  const productName = context.packager.appInfo.productFilename;
  const resourcesDir = path.join(
    context.appOutDir,
    `${productName}.app`,
    "Contents",
    "Resources",
  );
  const src = path.join(context.packager.projectDir, "build", "gateway");
  const dest = path.join(resourcesDir, "gateway");

  if (!fs.existsSync(path.join(src, "dist", "cli.js"))) {
    throw new Error(`afterPack: vendored gateway missing at ${src}`);
  }

  fs.rmSync(dest, { recursive: true, force: true });
  fs.cpSync(src, dest, { recursive: true });

  const probe = path.join(
    dest,
    "node_modules",
    "@hono",
    "node-server",
    "package.json",
  );
  if (!fs.existsSync(probe)) {
    throw new Error(
      `afterPack: gateway node_modules incomplete (missing ${probe})`,
    );
  }

  console.log(
    `afterPack: gateway → ${dest} (${fs.readdirSync(path.join(dest, "node_modules")).length} top-level modules)`,
  );
};
