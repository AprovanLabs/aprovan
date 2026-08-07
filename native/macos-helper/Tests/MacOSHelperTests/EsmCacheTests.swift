import Darwin
import Foundation
import Testing
@testable import EsmCache
@testable import MacOSHelperLib

@Suite("EsmCache")
struct EsmCacheTests {
    @Test("cache keys include version — different versions do not collide")
    func versionExactKeys() {
        let a = EsmCacheService.cacheKey(for: "react@18.2.0")
        let b = EsmCacheService.cacheKey(for: "react@18.3.1")
        let c = EsmCacheService.cacheKey(for: "react@18.2.0?deps=react-dom@18")
        #expect(a != b)
        #expect(a != c)
        #expect(b != c)
    }

    @Test("seeded dependency resolves offline without contacting upstream")
    func seededResolvesOffline() async throws {
        let root = FileManager.default.temporaryDirectory
            .appendingPathComponent("esm-seed-\(UUID().uuidString)", isDirectory: true)
        let cache = root.appendingPathComponent("cache", isDirectory: true)
        let seed = root.appendingPathComponent("seed", isDirectory: true)
        defer { try? FileManager.default.removeItem(at: root) }

        // Upstream that always fails — proves we never needed the network.
        let upstream = URL(string: "http://127.0.0.1:1")!
        let service = EsmCacheService(
            cacheDirectory: cache,
            seedDirectory: seed,
            upstreamBase: upstream,
            localEsmBase: "http://127.0.0.1:9/esm"
        )
        try service.prepare()
        let body = Data("export default 'seeded-react';".utf8)
        try service.installSeed(specifier: "react@18", data: body)

        let hit = try await service.resolve(specifier: "react@18")
        #expect(String(data: hit.data, encoding: .utf8) == "export default 'seeded-react';")
        #expect(service.hasLocal("react@18"))
    }

    @Test("different version is a miss even when another version is seeded")
    func differentVersionIsMiss() async throws {
        let root = FileManager.default.temporaryDirectory
            .appendingPathComponent("esm-ver-\(UUID().uuidString)", isDirectory: true)
        let cache = root.appendingPathComponent("cache", isDirectory: true)
        let seed = root.appendingPathComponent("seed", isDirectory: true)
        defer { try? FileManager.default.removeItem(at: root) }

        let service = EsmCacheService(
            cacheDirectory: cache,
            seedDirectory: seed,
            upstreamBase: URL(string: "http://127.0.0.1:1")!,
            localEsmBase: "http://127.0.0.1:9/esm"
        )
        try service.prepare()
        try service.installSeed(
            specifier: "lodash@4.17.21",
            data: Data("export default 4;".utf8)
        )

        do {
            _ = try await service.resolve(specifier: "lodash@4.17.20")
            Issue.record("expected unresolvable for a different version")
        } catch let error as UnresolvedDependencyError {
            #expect(error.specifier == "lodash@4.17.20")
            #expect(error.message.contains("lodash@4.17.20"))
        }
    }

    @Test("unseen dependency offline fails with a message naming it")
    func unseenOfflineNamesDependency() async throws {
        let root = FileManager.default.temporaryDirectory
            .appendingPathComponent("esm-miss-\(UUID().uuidString)", isDirectory: true)
        defer { try? FileManager.default.removeItem(at: root) }

        let service = EsmCacheService(
            cacheDirectory: root.appendingPathComponent("cache"),
            seedDirectory: root.appendingPathComponent("seed"),
            upstreamBase: URL(string: "http://127.0.0.1:1")!,
            localEsmBase: "http://127.0.0.1:9/esm"
        )
        try service.prepare()

        do {
            _ = try await service.resolve(specifier: "left-pad@1.3.0")
            Issue.record("expected failure")
        } catch let error as UnresolvedDependencyError {
            #expect(error.message == "Unresolvable dependency: left-pad@1.3.0")
        }
    }

    @Test("fetch-through retains a miss so a later offline resolve hits disk")
    func fetchThroughRetains() async throws {
        let root = FileManager.default.temporaryDirectory
            .appendingPathComponent("esm-ft-\(UUID().uuidString)", isDirectory: true)
        defer { try? FileManager.default.removeItem(at: root) }

        // Tiny local upstream that serves one package once.
        let upstreamPort = try ephemeralPort()
        let upstream = try LoopbackHTTPServer(
            host: "127.0.0.1",
            port: upstreamPort,
            router: { request in
                if request.path == "/once@1.0.0" {
                    return HTTPResponse(
                        status: 200,
                        contentType: "application/javascript",
                        body: Data("export default 1;".utf8)
                    )
                }
                return .text(404, "no")
            }
        )
        try await upstream.start()
        defer { upstream.stop() }

        let service = EsmCacheService(
            cacheDirectory: root.appendingPathComponent("cache"),
            seedDirectory: nil,
            upstreamBase: URL(string: "http://127.0.0.1:\(upstreamPort)")!,
            localEsmBase: "http://127.0.0.1:9/esm"
        )
        try service.prepare()

        let first = try await service.resolve(specifier: "once@1.0.0")
        #expect(String(data: first.data, encoding: .utf8) == "export default 1;")

        // Stop upstream — retained cache must still serve.
        upstream.stop()
        let second = try await service.resolve(specifier: "once@1.0.0")
        #expect(String(data: second.data, encoding: .utf8) == "export default 1;")
    }

    @Test("rewrites absolute esm.sh URLs to the local helper base")
    func rewritesUpstreamUrls() {
        let service = EsmCacheService(
            cacheDirectory: FileManager.default.temporaryDirectory,
            localEsmBase: "http://127.0.0.1:4242/esm"
        )
        let input = Data("export * from \"https://esm.sh/stable/react@18.3.1/react.mjs\";".utf8)
        let out = String(data: service.rewriteUpstreamURLs(in: input), encoding: .utf8)!
        #expect(out.contains("http://127.0.0.1:4242/esm/stable/react@18.3.1/react.mjs"))
        #expect(!out.contains("https://esm.sh/"))
    }

    @Test("rewrites root-relative esm.sh imports under /esm/")
    func rewritesRootRelative() {
        let input = #"export * from "/react@18.3.1/es2022/react.mjs";"#
        let out = EsmCacheService.rewriteRootRelativeEsmImports(
            input,
            localBase: "http://127.0.0.1:9/esm/"
        )
        #expect(out.contains("http://127.0.0.1:9/esm/react@18.3.1/es2022/react.mjs"))
    }
}

@Suite("Esm HTTP route")
struct EsmHTTPRouteTests {
    @Test("GET /esm/* serves seeded bytes and names misses")
    func esmRoute() async throws {
        let root = FileManager.default.temporaryDirectory
            .appendingPathComponent("esm-http-\(UUID().uuidString)", isDirectory: true)
        defer { try? FileManager.default.removeItem(at: root) }

        let cache = EsmCacheService(
            cacheDirectory: root.appendingPathComponent("cache"),
            seedDirectory: root.appendingPathComponent("seed"),
            upstreamBase: URL(string: "http://127.0.0.1:1")!,
            localEsmBase: "http://127.0.0.1/esm"
        )
        try cache.prepare()
        try cache.installSeed(
            specifier: "clsx@2.0.0",
            data: Data("export default function clsx(){}".utf8)
        )

        let port = try ephemeralPort()
        let server = try LoopbackHTTPServer(
            host: "127.0.0.1",
            port: port,
            router: makeRouter(
                reporter: AvailabilityReporter(helperVersion: "test", capabilities: {
                    ["esm": .available, "llm": .unsupported(reason: "test")]
                }),
                esmCache: cache
            )
        )
        try await server.start()
        defer { server.stop() }

        let hit = try await get("http://127.0.0.1:\(port)/esm/clsx@2.0.0")
        #expect(hit.status == 200)
        #expect(String(data: hit.body, encoding: .utf8)?.contains("clsx") == true)

        let miss = try await get("http://127.0.0.1:\(port)/esm/nope@9.9.9")
        #expect(miss.status == 502)
        #expect(String(data: miss.body, encoding: .utf8) == "Unresolvable dependency: nope@9.9.9")

        let availability = try await get("http://127.0.0.1:\(port)/availability")
        let report = try JSONDecoder().decode(AvailabilityReport.self, from: availability.body)
        #expect(report.capabilities["esm"] == .available)
    }

    @Test("query string is part of the cache key")
    func queryPreserved() {
        let req = LoopbackHTTPServer.parseRequest(
            Data("GET /esm/react@18?deps=react-dom@18 HTTP/1.1".utf8)
        )
        #expect(req?.path == "/esm/react@18")
        #expect(req?.query == "deps=react-dom@18")
        #expect(esmSpecifier(path: req!.path, query: req!.query) == "react@18?deps=react-dom@18")
    }
}

private struct HTTPResult {
    var status: Int
    var body: Data
}

private func ephemeralPort() throws -> UInt16 {
    let fd = socket(AF_INET, SOCK_STREAM, 0)
    guard fd >= 0 else { throw URLError(.cannotConnectToHost) }
    defer { close(fd) }
    var addr = sockaddr_in()
    addr.sin_len = UInt8(MemoryLayout<sockaddr_in>.size)
    addr.sin_family = sa_family_t(AF_INET)
    addr.sin_port = 0
    addr.sin_addr = in_addr(s_addr: inet_addr("127.0.0.1"))
    let bound = withUnsafePointer(to: &addr) {
        $0.withMemoryRebound(to: sockaddr.self, capacity: 1) {
            Darwin.bind(fd, $0, socklen_t(MemoryLayout<sockaddr_in>.size))
        }
    }
    guard bound == 0 else { throw URLError(.cannotConnectToHost) }
    var len = socklen_t(MemoryLayout<sockaddr_in>.size)
    _ = withUnsafeMutablePointer(to: &addr) {
        $0.withMemoryRebound(to: sockaddr.self, capacity: 1) {
            getsockname(fd, $0, &len)
        }
    }
    return UInt16(bigEndian: addr.sin_port)
}

private func get(_ urlString: String) async throws -> HTTPResult {
    let url = URL(string: urlString)!
    let (data, response) = try await URLSession.shared.data(from: url)
    let status = (response as? HTTPURLResponse)?.statusCode ?? 0
    return HTTPResult(status: status, body: data)
}
