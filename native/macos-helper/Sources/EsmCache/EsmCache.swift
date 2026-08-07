import Foundation

/// Error returned when a dependency cannot be resolved from cache, seed, or upstream.
public struct UnresolvedDependencyError: Error, Sendable, Equatable {
    public let specifier: String

    public init(specifier: String) {
        self.specifier = specifier
    }

    public var message: String {
        "Unresolvable dependency: \(specifier)"
    }
}

public struct EsmCacheHit: Sendable {
    public var data: Data
    public var contentType: String

    public init(data: Data, contentType: String) {
        self.data = data
        self.contentType = contentType
    }
}

/// Fetch-through dependency cache keyed by the fully resolved specifier
/// (path + query), mirroring esm.sh grammar under `/esm/*`.
public final class EsmCacheService: @unchecked Sendable {
    public let cacheDirectory: URL
    public let seedDirectory: URL?
    public let upstreamBase: URL
    /// Base URL rewritten into upstream bodies so transitive imports stay local
    /// (e.g. `http://127.0.0.1:12345/esm`).
    public let localEsmBase: String

    private let fileManager: FileManager
    private let session: URLSession
    private let lock = NSLock()

    public init(
        cacheDirectory: URL,
        seedDirectory: URL? = nil,
        upstreamBase: URL = URL(string: "https://esm.sh")!,
        localEsmBase: String = "http://127.0.0.1/esm",
        session: URLSession = .shared,
        fileManager: FileManager = .default
    ) {
        self.cacheDirectory = cacheDirectory
        self.seedDirectory = seedDirectory
        self.upstreamBase = upstreamBase
        self.localEsmBase = localEsmBase
        self.session = session
        self.fileManager = fileManager
    }

    public func prepare() throws {
        try fileManager.createDirectory(at: cacheDirectory, withIntermediateDirectories: true)
        if let seedDirectory {
            try fileManager.createDirectory(at: seedDirectory, withIntermediateDirectories: true)
        }
    }

    /// Resolve a specifier (everything after `/esm/`, including query) to bytes.
    public func resolve(specifier: String) async throws -> EsmCacheHit {
        let key = Self.cacheKey(for: specifier)

        if let hit = try read(key: key, from: cacheDirectory) {
            return hit
        }
        if let seedDirectory, let hit = try read(key: key, from: seedDirectory) {
            try write(key: key, hit: hit, to: cacheDirectory)
            return hit
        }

        let upstream = try await fetchUpstream(specifier: specifier)
        let rewritten = EsmCacheHit(
            data: rewriteUpstreamURLs(in: upstream.data),
            contentType: upstream.contentType
        )
        try write(key: key, hit: rewritten, to: cacheDirectory)
        return rewritten
    }

    /// Install seed bytes for a specifier (build-time / tests).
    public func installSeed(
        specifier: String,
        data: Data,
        contentType: String = "application/javascript"
    ) throws {
        guard let seedDirectory else {
            throw UnresolvedDependencyError(specifier: specifier)
        }
        try fileManager.createDirectory(at: seedDirectory, withIntermediateDirectories: true)
        try write(
            key: Self.cacheKey(for: specifier),
            hit: EsmCacheHit(data: data, contentType: contentType),
            to: seedDirectory
        )
    }

    /// Whether a specifier is present in cache or seed (no upstream).
    public func hasLocal(_ specifier: String) -> Bool {
        let key = Self.cacheKey(for: specifier)
        if fileManager.fileExists(atPath: cacheDirectory.appendingPathComponent(key).path) {
            return true
        }
        if let seedDirectory,
           fileManager.fileExists(atPath: seedDirectory.appendingPathComponent(key).path)
        {
            return true
        }
        return false
    }

    /// Cache key is the full specifier including version and query — never bare name.
    public static func cacheKey(for specifier: String) -> String {
        let trimmed = specifier.hasPrefix("/") ? String(specifier.dropFirst()) : specifier
        let allowed = CharacterSet.alphanumerics.union(CharacterSet(charactersIn: "-._@%"))
        return trimmed.addingPercentEncoding(withAllowedCharacters: allowed) ?? trimmed
    }

    // MARK: - Internals

    private func read(key: String, from directory: URL) throws -> EsmCacheHit? {
        let bodyURL = directory.appendingPathComponent(key)
        let metaURL = directory.appendingPathComponent(key + ".meta")
        guard fileManager.fileExists(atPath: bodyURL.path) else { return nil }
        let data = try Data(contentsOf: bodyURL)
        var contentType = "application/javascript"
        if let meta = try? String(contentsOf: metaURL, encoding: .utf8) {
            let trimmed = meta.trimmingCharacters(in: .whitespacesAndNewlines)
            if !trimmed.isEmpty { contentType = trimmed }
        }
        return EsmCacheHit(data: data, contentType: contentType)
    }

    private func write(key: String, hit: EsmCacheHit, to directory: URL) throws {
        lock.lock()
        defer { lock.unlock() }
        try fileManager.createDirectory(at: directory, withIntermediateDirectories: true)
        let bodyURL = directory.appendingPathComponent(key)
        let metaURL = directory.appendingPathComponent(key + ".meta")
        try hit.data.write(to: bodyURL, options: .atomic)
        try Data(hit.contentType.utf8).write(to: metaURL, options: .atomic)
    }

    private func fetchUpstream(specifier: String) async throws -> EsmCacheHit {
        let trimmed = specifier.hasPrefix("/") ? String(specifier.dropFirst()) : specifier
        guard let url = URL(string: trimmed, relativeTo: upstreamBase)?.absoluteURL else {
            throw UnresolvedDependencyError(specifier: specifier)
        }
        var request = URLRequest(url: url)
        request.timeoutInterval = 30
        request.setValue("application/javascript,*/*", forHTTPHeaderField: "Accept")
        do {
            let (data, response) = try await session.data(for: request)
            guard let http = response as? HTTPURLResponse,
                  (200..<300).contains(http.statusCode)
            else {
                throw UnresolvedDependencyError(specifier: specifier)
            }
            let contentType = http.value(forHTTPHeaderField: "Content-Type")
                ?? "application/javascript"
            return EsmCacheHit(data: data, contentType: contentType)
        } catch is UnresolvedDependencyError {
            throw UnresolvedDependencyError(specifier: specifier)
        } catch {
            throw UnresolvedDependencyError(specifier: specifier)
        }
    }

    func rewriteUpstreamURLs(in data: Data) -> Data {
        guard var text = String(data: data, encoding: .utf8) else { return data }
        let replacement = localEsmBase.hasSuffix("/") ? localEsmBase : localEsmBase + "/"
        text = text.replacingOccurrences(of: "https://esm.sh/", with: replacement)
        text = text.replacingOccurrences(of: "http://esm.sh/", with: replacement)
        // esm.sh often emits root-relative `/pkg@version/…` imports; point them at /esm/.
        text = Self.rewriteRootRelativeEsmImports(text, localBase: replacement)
        return text.data(using: .utf8) ?? data
    }

    /// Rewrite `from "/react@18…"` → `from "<localBase>react@18…"` when not already under /esm/.
    static func rewriteRootRelativeEsmImports(_ text: String, localBase: String) -> String {
        let pattern = #"([`"'])/(?!esm/)([^"'`\s]+)(["`'])"#
        guard let regex = try? NSRegularExpression(pattern: pattern) else { return text }
        let range = NSRange(text.startIndex..<text.endIndex, in: text)
        return regex.stringByReplacingMatches(
            in: text,
            range: range,
            withTemplate: "$1\(localBase)$2$3"
        )
    }
}

/// Parse `/esm/…` request path + query into a cache specifier.
public func esmSpecifier(path: String, query: String?) -> String? {
    guard path == "/esm" || path.hasPrefix("/esm/") else { return nil }
    let after: String
    if path == "/esm" {
        after = ""
    } else {
        after = String(path.dropFirst("/esm/".count))
    }
    if after.isEmpty && (query == nil || query?.isEmpty == true) {
        return nil
    }
    if let query, !query.isEmpty {
        return after.isEmpty ? "?\(query)" : "\(after)?\(query)"
    }
    return after
}
