/** Hard requirements for the renderer webPreferences. */
export const MAIN_WINDOW_PREFERENCES = {
  contextIsolation: true,
  nodeIntegration: false,
  sandbox: true,
} as const;

/** Options used to construct the main window — exported for tests. */
export function mainWindowWebPreferences(preloadPath: string) {
  return {
    preload: preloadPath,
    contextIsolation: true as const,
    nodeIntegration: false as const,
    sandbox: true as const,
  };
}
