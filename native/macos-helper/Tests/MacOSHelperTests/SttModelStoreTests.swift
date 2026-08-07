import Darwin
import Foundation
import Testing
@testable import SttModels
@testable import MacOSHelperLib

@Suite("SttModelStore")
struct SttModelStoreTests {
    @Test("lists bundled and available models with sizes and capabilities")
    func catalogue() throws {
        let root = makeTempRoot("stt-cat")
        defer { try? FileManager.default.removeItem(at: root) }

        let bundled = root.appendingPathComponent("bundled", isDirectory: true)
        try FileManager.default.createDirectory(at: bundled, withIntermediateDirectories: true)
        let fixture = Data("tiny-en-fixture".utf8)
        try fixture.write(to: bundled.appendingPathComponent(BundledSttModel.filename))

        let store = SttModelStore(
            installDirectory: root.appendingPathComponent("install"),
            bundledDirectory: bundled,
            catalog: testCatalog(bundledSha1: WeightHash.sha1Hex(of: fixture))
        )
        try store.prepare()
        let list = store.list()
        #expect(list.count == 2)
        let tiny = list.first { $0.id == BundledSttModel.id }!
        #expect(tiny.bundled)
        #expect(tiny.installed)
        #expect(tiny.capabilities.languages == ["en"])
        #expect(tiny.capabilities.diarization == false)
        let base = list.first { $0.id == "whisper-base.en" }!
        #expect(!base.bundled)
        #expect(!base.installed)
        #expect(base.sizeBytes > 0)
    }

    @Test("resolves installed id to on-disk weights")
    func resolvePath() throws {
        let root = makeTempRoot("stt-resolve")
        defer { try? FileManager.default.removeItem(at: root) }
        let bundled = root.appendingPathComponent("bundled", isDirectory: true)
        try FileManager.default.createDirectory(at: bundled, withIntermediateDirectories: true)
        let fixture = Data("resolve-me".utf8)
        let path = bundled.appendingPathComponent(BundledSttModel.filename)
        try fixture.write(to: path)

        let store = SttModelStore(
            installDirectory: root.appendingPathComponent("install"),
            bundledDirectory: bundled,
            catalog: testCatalog(bundledSha1: WeightHash.sha1Hex(of: fixture))
        )
        let url = try store.resolve(BundledSttModel.id)
        #expect(url.path == path.path)
    }

    @Test("loads bundled default at start into memory")
    func loadAtStart() throws {
        let root = makeTempRoot("stt-load")
        defer { try? FileManager.default.removeItem(at: root) }
        let bundled = root.appendingPathComponent("bundled", isDirectory: true)
        try FileManager.default.createDirectory(at: bundled, withIntermediateDirectories: true)
        let fixture = Data("loaded-at-start".utf8)
        try fixture.write(to: bundled.appendingPathComponent(BundledSttModel.filename))

        let store = SttModelStore(
            installDirectory: root.appendingPathComponent("install"),
            bundledDirectory: bundled,
            catalog: testCatalog(bundledSha1: WeightHash.sha1Hex(of: fixture))
        )
        #expect(!store.isBundledDefaultLoaded)
        try store.loadBundledDefault()
        #expect(store.isBundledDefaultLoaded)
        #expect(store.loadedModelId == BundledSttModel.id)
        #expect(store.loadedWeights == fixture)
    }

    @Test("refuses deletion of the bundled default")
    func refuseBundledDelete() throws {
        let root = makeTempRoot("stt-del")
        defer { try? FileManager.default.removeItem(at: root) }
        let bundled = root.appendingPathComponent("bundled", isDirectory: true)
        try FileManager.default.createDirectory(at: bundled, withIntermediateDirectories: true)
        let fixture = Data("keep-me".utf8)
        try fixture.write(to: bundled.appendingPathComponent(BundledSttModel.filename))

        let store = SttModelStore(
            installDirectory: root.appendingPathComponent("install"),
            bundledDirectory: bundled,
            catalog: testCatalog(bundledSha1: WeightHash.sha1Hex(of: fixture))
        )
        do {
            try store.remove(id: BundledSttModel.id)
            Issue.record("expected bundled delete to fail")
        } catch let error as SttModelStoreError {
            #expect(error == .bundledCannotBeRemoved(BundledSttModel.id))
        }
        #expect(store.isInstalled(BundledSttModel.id))
    }

    @Test("install verifies hash and leaves prior models untouched on mismatch")
    func hashMismatchDiscards() async throws {
        let root = makeTempRoot("stt-hash")
        defer { try? FileManager.default.removeItem(at: root) }

        let good = Data("good-weights".utf8)
        let bad = Data("bad-weights!!".utf8)
        let goodSha = WeightHash.sha1Hex(of: good)

        let bundled = root.appendingPathComponent("bundled", isDirectory: true)
        try FileManager.default.createDirectory(at: bundled, withIntermediateDirectories: true)
        try good.write(to: bundled.appendingPathComponent(BundledSttModel.filename))

        let installDir = root.appendingPathComponent("install", isDirectory: true)
        try FileManager.default.createDirectory(at: installDir, withIntermediateDirectories: true)
        // Pre-install a neighbour model that must survive a failed install.
        let neighbour = Data("neighbour".utf8)
        try neighbour.write(to: installDir.appendingPathComponent("ggml-neighbour.bin"))

        let upstreamPort = try ephemeralPort()
        let upstream = try LoopbackHTTPServer(
            host: "127.0.0.1",
            port: upstreamPort,
            router: { request in
                if request.path.hasSuffix("/ggml-base.en.bin") {
                    return HTTPResponse(
                        status: 200,
                        contentType: "application/octet-stream",
                        body: bad
                    )
                }
                return .text(404, "no")
            }
        )
        try await upstream.start()
        defer { upstream.stop() }

        let catalog = [
            SttModelDescriptor(
                id: BundledSttModel.id,
                filename: BundledSttModel.filename,
                sha1: goodSha,
                sizeBytes: Int64(good.count),
                bundled: true,
                capabilities: SttModelCatalog.english
            ),
            SttModelDescriptor(
                id: "whisper-base.en",
                filename: "ggml-base.en.bin",
                sha1: goodSha, // expect good; upstream serves bad
                sizeBytes: Int64(good.count),
                bundled: false,
                capabilities: SttModelCatalog.english
            ),
            SttModelDescriptor(
                id: "whisper-neighbour",
                filename: "ggml-neighbour.bin",
                sha1: WeightHash.sha1Hex(of: neighbour),
                sizeBytes: Int64(neighbour.count),
                bundled: false,
                capabilities: SttModelCatalog.english
            ),
        ]

        let store = SttModelStore(
            installDirectory: installDir,
            bundledDirectory: bundled,
            upstreamBase: URL(string: "http://127.0.0.1:\(upstreamPort)/")!,
            catalog: catalog
        )

        do {
            try await store.install(id: "whisper-base.en")
            Issue.record("expected hash mismatch")
        } catch let error as SttModelStoreError {
            guard case .hashMismatch = error else {
                Issue.record("expected hashMismatch, got \(error)")
                return
            }
        }

        #expect(!store.isInstalled("whisper-base.en"))
        #expect(FileManager.default.fileExists(atPath: installDir.appendingPathComponent("ggml-neighbour.bin").path))
        #expect(store.isInstalled(BundledSttModel.id))
        // No partial left behind.
        let leftovers = try FileManager.default.contentsOfDirectory(atPath: installDir.path)
            .filter { $0.contains("partial") || $0.contains("base.en") }
        #expect(leftovers.isEmpty)
    }

    @Test("install succeeds with matching hash and SSE progress phases")
    func installWithProgress() async throws {
        let root = makeTempRoot("stt-ok")
        defer { try? FileManager.default.removeItem(at: root) }

        let payload = Data("install-ok-payload".utf8)
        let sha = WeightHash.sha1Hex(of: payload)

        let bundled = root.appendingPathComponent("bundled", isDirectory: true)
        try FileManager.default.createDirectory(at: bundled, withIntermediateDirectories: true)
        try Data("bundled".utf8).write(to: bundled.appendingPathComponent(BundledSttModel.filename))

        let upstreamPort = try ephemeralPort()
        let upstream = try LoopbackHTTPServer(
            host: "127.0.0.1",
            port: upstreamPort,
            router: { request in
                if request.path.hasSuffix("/ggml-base.en.bin") {
                    return HTTPResponse(
                        status: 200,
                        contentType: "application/octet-stream",
                        body: payload
                    )
                }
                return .text(404, "no")
            }
        )
        try await upstream.start()
        defer { upstream.stop() }

        let store = SttModelStore(
            installDirectory: root.appendingPathComponent("install"),
            bundledDirectory: bundled,
            upstreamBase: URL(string: "http://127.0.0.1:\(upstreamPort)/")!,
            catalog: [
                SttModelDescriptor(
                    id: BundledSttModel.id,
                    filename: BundledSttModel.filename,
                    sha1: WeightHash.sha1Hex(of: Data("bundled".utf8)),
                    sizeBytes: 7,
                    bundled: true,
                    capabilities: SttModelCatalog.english
                ),
                SttModelDescriptor(
                    id: "whisper-base.en",
                    filename: "ggml-base.en.bin",
                    sha1: sha,
                    sizeBytes: Int64(payload.count),
                    bundled: false,
                    capabilities: SttModelCatalog.english
                ),
            ]
        )
        try store.prepare()

        let phaseBox = LockBox<[String]>([])
        try await store.install(id: "whisper-base.en") { event in
            phaseBox.mutate { $0.append(event.phase) }
        }
        let phases = phaseBox.value
        #expect(phases.contains("download"))
        #expect(phases.contains("verify"))
        #expect(phases.contains("complete"))
        #expect(store.isInstalled("whisper-base.en"))
        let resolved = try store.resolve("whisper-base.en")
        #expect(try Data(contentsOf: resolved) == payload)

        let sse = await store.installSSE(id: "whisper-base.en")
        #expect(sse.status == 200)
        let text = String(data: sse.body, encoding: .utf8) ?? ""
        #expect(text.contains("data: "))
        #expect(text.contains("complete"))
    }
}

@Suite("Stt models HTTP")
struct SttModelsHTTPTests {
    @Test("GET /stt/models, DELETE refuse bundled, install SSE")
    func httpSurface() async throws {
        let root = makeTempRoot("stt-http")
        defer { try? FileManager.default.removeItem(at: root) }

        let payload = Data("http-install".utf8)
        let sha = WeightHash.sha1Hex(of: payload)
        let bundledFixture = Data("http-bundled".utf8)

        let bundled = root.appendingPathComponent("bundled", isDirectory: true)
        try FileManager.default.createDirectory(at: bundled, withIntermediateDirectories: true)
        try bundledFixture.write(to: bundled.appendingPathComponent(BundledSttModel.filename))

        let upstreamPort = try ephemeralPort()
        let upstream = try LoopbackHTTPServer(
            host: "127.0.0.1",
            port: upstreamPort,
            router: { request in
                if request.path.hasSuffix("/ggml-base.en.bin") {
                    return HTTPResponse(
                        status: 200,
                        contentType: "application/octet-stream",
                        body: payload
                    )
                }
                return .text(404, "no")
            }
        )
        try await upstream.start()
        defer { upstream.stop() }

        let store = SttModelStore(
            installDirectory: root.appendingPathComponent("install"),
            bundledDirectory: bundled,
            upstreamBase: URL(string: "http://127.0.0.1:\(upstreamPort)/")!,
            catalog: [
                SttModelDescriptor(
                    id: BundledSttModel.id,
                    filename: BundledSttModel.filename,
                    sha1: WeightHash.sha1Hex(of: bundledFixture),
                    sizeBytes: Int64(bundledFixture.count),
                    bundled: true,
                    capabilities: SttModelCatalog.english
                ),
                SttModelDescriptor(
                    id: "whisper-base.en",
                    filename: "ggml-base.en.bin",
                    sha1: sha,
                    sizeBytes: Int64(payload.count),
                    bundled: false,
                    capabilities: SttModelCatalog.english
                ),
            ]
        )
        try store.prepare()
        try store.loadBundledDefault()

        let port = try ephemeralPort()
        let server = try LoopbackHTTPServer(
            host: "127.0.0.1",
            port: port,
            router: makeRouter(
                reporter: AvailabilityReporter(helperVersion: "test", capabilities: {
                    ["esm": .available]
                }),
                sttModels: store
            )
        )
        try await server.start()
        defer { server.stop() }

        let listed = try await http("GET", "http://127.0.0.1:\(port)/stt/models")
        #expect(listed.status == 200)
        let decoded = try JSONDecoder().decode(SttModelsListResponse.self, from: listed.body)
        #expect(decoded.models.contains { $0.id == BundledSttModel.id && $0.installed && $0.bundled })

        let refuse = try await http("DELETE", "http://127.0.0.1:\(port)/stt/models/\(BundledSttModel.id)")
        #expect(refuse.status == 403)
        #expect(String(data: refuse.body, encoding: .utf8)?.contains("cannot be removed") == true)

        let install = try await http(
            "POST",
            "http://127.0.0.1:\(port)/stt/models/whisper-base.en/install"
        )
        #expect(install.status == 200)
        #expect(install.contentType.contains("text/event-stream"))
        let sse = String(data: install.body, encoding: .utf8) ?? ""
        #expect(sse.contains("\"phase\":\"complete\""))
        #expect(store.isInstalled("whisper-base.en"))

        let remove = try await http("DELETE", "http://127.0.0.1:\(port)/stt/models/whisper-base.en")
        #expect(remove.status == 200)
        #expect(!store.isInstalled("whisper-base.en"))
    }

    @Test("path helpers parse install and delete ids")
    func pathHelpers() {
        #expect(sttInstallModelId(path: "/stt/models/whisper-base.en/install") == "whisper-base.en")
        #expect(sttInstallModelId(path: "/stt/models") == nil)
        #expect(sttDeleteModelId(path: "/stt/models/whisper-tiny.en") == "whisper-tiny.en")
        #expect(sttDeleteModelId(path: "/stt/models/whisper-tiny.en/install") == nil)
        #expect(sttDeleteModelId(path: "/stt/models") == nil)
    }
}

// MARK: - Helpers

private final class LockBox<T>: @unchecked Sendable {
    private let lock = NSLock()
    private var storage: T
    init(_ value: T) { storage = value }
    var value: T {
        lock.lock()
        defer { lock.unlock() }
        return storage
    }
    func mutate(_ body: (inout T) -> Void) {
        lock.lock()
        defer { lock.unlock() }
        body(&storage)
    }
}

private func testCatalog(bundledSha1: String) -> [SttModelDescriptor] {
    [
        SttModelDescriptor(
            id: BundledSttModel.id,
            filename: BundledSttModel.filename,
            sha1: bundledSha1,
            sizeBytes: BundledSttModel.sizeBytes,
            bundled: true,
            capabilities: SttModelCatalog.english
        ),
        SttModelDescriptor(
            id: "whisper-base.en",
            filename: "ggml-base.en.bin",
            sha1: "137c40403d78fd54d454da0f9bd998f78703390c",
            sizeBytes: 147_964_211,
            bundled: false,
            capabilities: SttModelCatalog.english
        ),
    ]
}

private func makeTempRoot(_ prefix: String) -> URL {
    FileManager.default.temporaryDirectory
        .appendingPathComponent("\(prefix)-\(UUID().uuidString)", isDirectory: true)
}

private struct HTTPCallResult {
    var status: Int
    var body: Data
    var contentType: String
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

private func http(_ method: String, _ urlString: String) async throws -> HTTPCallResult {
    var request = URLRequest(url: URL(string: urlString)!)
    request.httpMethod = method
    let (data, response) = try await URLSession.shared.data(for: request)
    let http = response as? HTTPURLResponse
    return HTTPCallResult(
        status: http?.statusCode ?? 0,
        body: data,
        contentType: http?.value(forHTTPHeaderField: "Content-Type") ?? ""
    )
}
