import {
  createPluginRegistry,
  type NamespaceNode,
  type OverrideContext,
  type PluginRegistry,
} from "@aprovan/patchwork-compiler";
import { widgetTelemetrySdk, type WidgetTelemetrySdkOptions } from "./telemetry";

const TELEMETRY_OVERRIDE_TYPES = `declare namespace telemetry {
  log(level: "debug" | "info" | "warn" | "error", message: string, attrs?: Record<string, string | number | boolean>): void;
  counter(name: string, value?: number, attrs?: Record<string, string>): void;
  gauge(name: string, value: number, attrs?: Record<string, string>): void;
  histogram(name: string, value: number, attrs?: Record<string, string>): void;
  export(args: import("@utdk/telemetry").TelemetryExportArgs): Promise<import("@utdk/telemetry").TelemetryExportResult>;
  withSpan<T>(name: string, fn: (span: { setAttribute(k: string, v: string | number | boolean): void }) => Promise<T>): Promise<T>;
}`;

/** Register a telemetry override that delegates export to the underlying node. */
export function registerTelemetryOverride(
  registry: PluginRegistry,
  options: WidgetTelemetrySdkOptions,
): void {
  registry.registerOverride("telemetry", (delegate) => {
    const sdk = widgetTelemetrySdk(options);
    const node = delegate as NamespaceNode | undefined;
    return {
      log: (level: "debug" | "info" | "warn" | "error", message: string, attrs?: Record<string, string | number | boolean>) =>
        sdk.log(level, message, attrs),
      counter: (name: string, value?: number, attrs?: Record<string, string>) =>
        sdk.counter(name, value, attrs),
      gauge: (name: string, value: number, attrs?: Record<string, string>) =>
        sdk.gauge(name, value, attrs),
      histogram: (name: string, value: number, attrs?: Record<string, string>) =>
        sdk.histogram(name, value, attrs),
      export: (args: Parameters<typeof sdk.export>[0]) =>
        node ? (node.export(args) as ReturnType<typeof sdk.export>) : sdk.export(args),
      emit: (...args: unknown[]) => node?.emit?.(...args),
      query: (...args: unknown[]) => node?.query?.(...args),
      traces: (...args: unknown[]) => node?.traces?.(...args),
      flush: () => sdk.flush(),
      withSpan: <T>(name: string, fn: (span: { setAttribute(k: string, v: string | number | boolean): void }) => Promise<T>) =>
        sdk.withSpan(name, fn),
      types: TELEMETRY_OVERRIDE_TYPES,
    };
  });
}

/** Plugin-provided notification namespace (static payload, no gateway counterpart). */
export function registerNotificationOverride(
  registry: PluginRegistry,
  payload: unknown,
): void {
  registry.registerOverride("notification", () => ({
    ...(payload && typeof payload === "object" ? (payload as Record<string, unknown>) : { value: payload }),
    types: "declare const notification: Record<string, unknown>;",
  }));
}

/** Default widget plugins for a preview mount. */
export function createWidgetPlugins(ctx: OverrideContext & WidgetTelemetrySdkOptions): PluginRegistry {
  const registry = createPluginRegistry();
  if (ctx.sourcePath) {
    registerTelemetryOverride(registry, { path: ctx.sourcePath, sessionId: ctx.sessionId });
  }
  return registry;
}
