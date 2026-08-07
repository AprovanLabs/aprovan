import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { app, BrowserWindow, dialog, net, protocol } from "electron";
import { ensureAppSupportLayout } from "./app-support.js";
import {
  createInitialBridgeState,
  publishGatewayStatus,
  registerBridgeHandlers,
} from "./bridge-handlers.js";
import { BundleManager } from "./bundle-manager.js";
import { BUNDLE_PUBLIC_KEY_PEM } from "./bundle-public-key.js";
import { appleLlmEnvFromHelperOrigin } from "./apple-helper-env.js";
import { createGatewaySupervisor } from "./gateway-supervisor.js";
import { createHelperSupervisor } from "./helper-supervisor.js";
import { createSafeStorageKeyProvider } from "./key-provider.js";
import {
  createElectronNotificationHost,
  createGatewayNotificationClient,
  createNotificationMirror,
  openApplicationToNotification,
  type NotificationMirror,
} from "./notifications.js";
import { evaluatePlatformFloor } from "./platform.js";
import {
  resolveActiveBundleDirWithSupport,
  resolveBundledNodeBinary,
  resolveEsmSeedDir,
  resolveGatewayVendorDir,
  resolveHelperBinary,
} from "./paths.js";
import {
  APP_SCHEME,
  filePathToResponseUrl,
  resolveAppProtocolPath,
} from "./protocol.js";
import { startShellUpdater } from "./shell-updater.js";
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

  const keyProvider = createSafeStorageKeyProvider({
    storageDir: layout.root,
  });

  let notificationMirror: NotificationMirror | null = null;
  let gatewayOrigin: string | null = null;
  /** Live helper loopback origin — drives `LLM_APPLE_BASE_URL` for the gateway. */
  let helperOrigin: string | null = null;
  let appliedAppleBaseUrl: string | undefined;

  const supervisor = createGatewaySupervisor({
    nodeBinary: resolveBundledNodeBinary(),
    gatewayDir: resolveGatewayVendorDir(),
    dataDir: layout.gatewayDataDir,
    extraEnv: () => appleLlmEnvFromHelperOrigin(helperOrigin),
    onStatus: (status) => {
      publishGatewayStatus(bridgeState, status);
      if (status.state === "ready") {
        gatewayOrigin = status.url;
        if (!notificationMirror) {
          notificationMirror = createNotificationMirror({
            host: createElectronNotificationHost(),
            gateway: createGatewayNotificationClient({
              getGatewayOrigin: () => gatewayOrigin,
            }),
            onOpenNotification: (id) => {
              openApplicationToNotification(id, () => {
                const existing = BrowserWindow.getAllWindows().find(
                  (w) => !w.isDestroyed(),
                );
                return existing ?? createMainWindow();
              });
            },
          });
          notificationMirror.start();
        }
      } else {
        gatewayOrigin = null;
        notificationMirror?.stop();
        notificationMirror = null;
      }
    },
    resolveWorkspaceKey: () => keyProvider.getKey(),
  });

  const syncGatewayAppleEnv = (): void => {
    const nextEnv = appleLlmEnvFromHelperOrigin(helperOrigin);
    const nextUrl = nextEnv["LLM_APPLE_BASE_URL"];
    if (nextUrl === appliedAppleBaseUrl) return;
    appliedAppleBaseUrl = nextUrl;
    // Reload only once supervision is running; the next spawn otherwise
    // picks up `extraEnv()` on its own.
    void supervisor.reload();
  };

  // Helper is optional: missing binary or crash → native caps unavailable;
  // gateway and the rest of the app continue (loopback-provider-host lifecycle).
  const helperSupervisor = createHelperSupervisor({
    helperBinary: resolveHelperBinary(),
    seedDir: resolveEsmSeedDir(),
    onStatus: (status) => {
      if (status.state === "ready") {
        bridgeState.helperUrl = status.url;
        helperOrigin = status.url;
        syncGatewayAppleEnv();
      } else if (
        status.state === "unavailable" ||
        status.state === "failed" ||
        status.state === "starting" ||
        status.state === "restarting"
      ) {
        if (status.state === "unavailable" || status.state === "failed") {
          bridgeState.helperUrl = null;
          helperOrigin = null;
          syncGatewayAppleEnv();
          console.warn("[helper]", status);
        }
      }
    },
  });

  let shuttingDown = false;
  app.on("before-quit", (event) => {
    if (shuttingDown) return;
    event.preventDefault();
    shuttingDown = true;
    notificationMirror?.stop();
    notificationMirror = null;
    void Promise.all([supervisor.stop(), helperSupervisor.stop()]).finally(
      () => {
        app.quit();
      },
    );
  });

  createMainWindow();

  // Window stays open regardless of gateway status (crash → restarting/failed).
  void supervisor.start();
  // Helper start never blocks the shell; absence degrades cleanly.
  void helperSupervisor.start();

  // Shell channel is independent of BundleManager's OTA renderer feed (D6).
  startShellUpdater({ isPackaged: app.isPackaged });

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
