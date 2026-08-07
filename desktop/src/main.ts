import fs from "node:fs";
import os from "node:os";
import { app, dialog, net, protocol } from "electron";
import {
  createInitialBridgeState,
  registerBridgeHandlers,
} from "./bridge-handlers.js";
import { evaluatePlatformFloor } from "./platform.js";
import { resolveActiveBundleDir } from "./paths.js";
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

  await app.whenReady();

  const activeBundleDir = resolveActiveBundleDir();
  if (!fs.existsSync(activeBundleDir)) {
    await refuseAndQuit(
      `Active renderer bundle is missing at ${activeBundleDir}.`,
    );
    return;
  }

  registerAppProtocol(() => activeBundleDir);

  const bridgeState = createInitialBridgeState();
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
