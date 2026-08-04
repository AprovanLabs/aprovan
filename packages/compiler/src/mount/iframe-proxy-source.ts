/**
 * Iframe-side namespace proxy factory source.
 *
 * The iframe bootstrap cannot import `@utdk/remote` (null-origin srcdoc, no
 * bundler), so this string is the transport-adapted serialization of the same
 * depth-0 configure / depth ≥ 1 dispatch algorithm. Host-side construction
 * always goes through `@utdk/remote` via {@link createCallableNamespaceNode}.
 *
 * Keep this in lockstep with `@utdk/remote`'s `proxy.ts`.
 */
export const IFRAME_NAMESPACE_PROXY_SOURCE = `
function createNamespaceNode(namespace, pin) {
  function nested(path, callPin) {
    var fn = function() {
      var args = Array.prototype.slice.call(arguments);
      if (!path) {
        var config = args[0];
        var nextPin = callPin ? Object.assign({}, callPin) : {};
        if (typeof config === 'string' && config) nextPin.profile = config;
        else if (config && typeof config === 'object') {
          if (typeof config.name === 'string' && config.name) nextPin.profile = config.name;
          else if (typeof config.profile === 'string' && config.profile) nextPin.profile = config.profile;
          if (config.options && typeof config.options === 'object' && !Array.isArray(config.options)) {
            nextPin.options = Object.assign({}, nextPin.options || {}, config.options);
          }
        }
        return createNamespaceNode(namespace, nextPin);
      }
      return proxyCall(namespace, path, args, callPin);
    };
    return new Proxy(fn, {
      get: function(_, nestedName) {
        if (typeof nestedName === 'symbol') return undefined;
        if (path === '' && nestedName === 'then') return undefined;
        if (path === '' && nestedName === 'client') {
          return function(config) {
            return createNamespaceNode(namespace, callPin)(config);
          };
        }
        return nested(path ? path + '.' + nestedName : nestedName, callPin);
      }
    });
  }
  return nested('', pin);
}
`;
