/**
 * Main ↔ floating-panel bridge. Deliberately tiny — summon / hide / resize
 * only. Kept in lockstep with openspec voice tech-plan PanelBridge.
 */

export interface PanelBridge {
  onSummon(cb: (context: { hotkey: string }) => void): () => void;
  hidePanel(): void;
  resizePanel(height: number): void;
}

/** Exact method names exposed on the panel bridge. Nothing else. */
export const PANEL_BRIDGE_METHODS = [
  "onSummon",
  "hidePanel",
  "resizePanel",
] as const satisfies ReadonlyArray<keyof PanelBridge>;

export type PanelBridgeMethod = (typeof PANEL_BRIDGE_METHODS)[number];

/**
 * Assert that `value` exposes exactly the PanelBridge method surface —
 * every declared method, and no additional own enumerable keys.
 */
export function assertPanelBridgeSurface(
  value: object,
): asserts value is PanelBridge {
  const keys = Reflect.ownKeys(value).filter(
    (k): k is string => typeof k === "string",
  );
  const expected = new Set<string>(PANEL_BRIDGE_METHODS);
  const actual = new Set(keys);

  const missing = [...expected].filter((k) => !actual.has(k));
  const extra = [...actual].filter((k) => !expected.has(k));

  if (missing.length > 0 || extra.length > 0) {
    const parts: string[] = [];
    if (missing.length > 0) parts.push(`missing: ${missing.join(", ")}`);
    if (extra.length > 0) parts.push(`extra: ${extra.join(", ")}`);
    throw new Error(`PanelBridge surface mismatch (${parts.join("; ")})`);
  }

  for (const method of PANEL_BRIDGE_METHODS) {
    if (typeof (value as Record<string, unknown>)[method] !== "function") {
      throw new Error(`PanelBridge.${method} must be a function`);
    }
  }
}

export const PANEL_IPC = {
  summon: "panel:summon",
  hide: "panel:hide",
  resize: "panel:resize",
} as const;
