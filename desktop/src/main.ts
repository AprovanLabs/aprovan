import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { app, dialog, net, protocol } from "electron";
import { ensureAppSupportLayout } from "./app-support.js";
import {
  createInitialBridgeState,
  registerBridgeHandlers,
} from "./bridge-handlers.js";
import { BundleManager } from "./bundle-manager.js";
import { BUNDLE_PUBLIC_KEY_PEM } from "./bundle-public-key.js";
import { evaluatePlatformFloor } from "./platform.js";
import { resolveActiveBundleDirWithSupport } from "./paths.js";
import {
  APP_SCHEME,
  filePathToResponseUrl,
  resolveAppProtocolPath,
} from "./protocol.js";
import { createMainWindow } from "./window.js";

// Must be registered before the app is ready.
protocol.registerSchemesAsPrivileged([
  {
    scheme: APP_SCHEME,
    privileges: {
      standard: true,
      secure: true,
      supportFetchAPI: true,
      corsEnabled: true,
      stream: true,
    },
  },
]);

function shellVersion(): string {
  try {
    const pkgPath = path.join(
      path.dirname(fileURLToPath(import.meta.url)),
      "..",
      "package.json",
    );
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8")) as {
      version?: string;
    };
    return pkg.version ?? "0.0.0";
  } catch {
    return "0.0.0";
  }
}

async function refuseAndQuit(message: string): Promise<void> {
  if (app.isReady()) {
    dialog.showErrorBox("Unsupported Mac", message);
  } else {
    await app.whenReady();
    dialog.showErrorBox("Unsupported Mac", message);
  }
  app.quit();
}

function registerAppProtocol(getActiveBundleDir: () => string): void {
  protocol.handle(APP_SCHEME, async (request) => {
    const resolved = resolveAppProtocolPath(
      getActiveBundleDir(),
      request.url,
    );
    if (!resolved.ok) {
      return new Response(resolved.message, {
        status: resolved.status,
        headers: { "content-type": "text/plain; charset=utf-8" },
      });
    }
    return net.fetch(filePathToResponseUrl(resolved.filePath));
  });
}

export async function startDesktopApp(): Promise<void> {
  const floor = evaluatePlatformFloor({
    platform: process.platform,
    arch: process.arch,
    release: os.release(),
  });

  if (!floor.ok) {
    await refuseAndQuit(floor.message);
    return;
  }

  // Clean Application Support path (not `@aprovan/desktop`).
  app.setName("Aprovan");

  await app.whenReady();

  // Tech-plan layout: bundles/ + gateway-data/ under Application Support.
  const layout = ensureAppSupportLayout(app.getPath("userData"));

  const bundles = new BundleManager({
    bundlesDir: layout.bundlesDir,
    shellVersion: shellVersion(),
    publicKey: BUNDLE_PUBLIC_KEY_PEM,
  });
  bundles.discardPartialStaging();
  bundles.handleLaunch();

  const activeBundleDir = resolveActiveBundleDirWithSupport();
  if (!fs.existsSync(activeBundleDir)) {
    await refuseAndQuit(
      `Active renderer bundle is missing at ${activeBundleDir}.`,
    );
    return;
  }

  registerAppProtocol(() => resolveActiveBundleDirWithSupport());

  const bridgeState = createInitialBridgeState(bundles);
  registerBridgeHandlers(bridgeState);

  createMainWindow();

  app.on("activate", () => {
    createMainWindow();
  });
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

void startDesktopApp().catch((err) => {
  console.error(err);
  app.quit();
});
