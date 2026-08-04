/**
 * Iframe-side namespace proxy factory source.
 *
 * The iframe bootstrap cannot import `@utdk/remote` (null-origin srcdoc, no
 * bundler), so this string is the transport-adapted serialization of the same
 * depth-0 configure / depth ≥ 1 dispatch algorithm. Host-side construction
 * always goes through `@utdk/remote` via {@link createCallableNamespaceNode}.
 *
 * Keep this in lockstep with `packages/remote/src/proxy.ts`.
 */
export const IFRAME_NAMESPACE_PROXY_SOURCE = `
function createNamespaceNode(namespace) {
  function nested(path, profile) {
    var fn = function() {
      var args = Array.prototype.slice.call(arguments);
      if (!path) {
        var config = args[0];
        var pinned = profile;
        if (typeof config === 'string' && config) pinned = config;
        else if (config && typeof config === 'object') {
          if (typeof config.name === 'string' && config.name) pinned = config.name;
          else if (typeof config.profile === 'string' && config.profile) pinned = config.profile;
        }
        return nested('', pinned);
      }
      return proxyCall(namespace, path, args);
    };
    return new Proxy(fn, {
      get: function(_, nestedName) {
        if (typeof nestedName === 'symbol') return undefined;
        if (path === '' && nestedName === 'then') return undefined;
        return nested(path ? path + '.' + nestedName : nestedName, profile);
      }
    });
  }
  return nested('', undefined);
}
`;
