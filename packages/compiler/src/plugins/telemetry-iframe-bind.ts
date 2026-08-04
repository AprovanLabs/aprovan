/** Guest snippet injected into iframe sandboxes when a telemetry override is registered. */
export const TELEMETRY_IFRAME_BIND = String.raw`
(() => {
  const raw = globalThis.tools && globalThis.tools.telemetry;
  if (!raw) return;
  if (Object.prototype.hasOwnProperty.call(raw, "__aprovanSdkBound")) return;
  const call = (path, args) => {
    let target = raw;
    const parts = path.split(".");
    for (let i = 0; i < parts.length; i++) target = target[parts[i]];
    return target(...args);
  };
  const facade = {
    emit: function () { return call("emit", arguments); },
    export: function () { return call("export", arguments); },
    query: function () { return call("query", arguments); },
    traces: function () { return call("traces", arguments); },
    log: function () { return call("log", arguments); },
    counter: function () { return call("counter", arguments); },
    gauge: function () { return call("gauge", arguments); },
    histogram: function () { return call("histogram", arguments); },
    startSpan: function () { return call("startSpan", arguments); },
    flush: function () { return call("flush", arguments); },
    withSpan: async function (name, fn) {
      const span = await call("startSpan", [name]);
      const handle = {
        traceId: span.traceId,
        spanId: span.spanId,
        setAttribute: function (k, v) { return call("setSpanAttribute", [span.spanId, k, v]); },
        addEvent: function (n, a) { return call("addSpanEvent", [span.spanId, n, a]); },
        end: function (s) { return call("endSpan", [span.spanId, s]); },
      };
      try {
        const result = await fn(handle);
        await handle.end();
        return result;
      } catch (err) {
        await handle.end({ error: err && err.message ? err.message : String(err) });
        throw err;
      }
    },
    __aprovanSdkBound: true,
  };
  if (globalThis.tools) globalThis.tools.telemetry = new Proxy(facade, {
    get: function (t, prop) {
      if (typeof prop === "symbol") return undefined;
      if (prop in t) return t[prop];
      return raw[prop];
    },
  });
})();
`;
