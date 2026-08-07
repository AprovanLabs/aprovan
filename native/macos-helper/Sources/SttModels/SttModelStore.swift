import Foundation

public enum SttModelStoreError: Error, Equatable, Sendable {
    case unknownModel(String)
    case notInstalled(String)
    case bundledCannotBeRemoved(String)
    case alreadyInstalled(String)
    case hashMismatch(expected: String, actual: String)
    case downloadFailed(String)
    case bundledMissing(String)
}

public struct SttModelsListResponse: Codable, Equatable, Sendable {
    public var models: [SttModelInfo]

    public init(models: [SttModelInfo]) {
        self.models = models
    }
}

public struct SttInstallProgressEvent: Codable, Equatable, Sendable {
    public var phase: String
    public var id: String?
    public var bytesReceived: Int64?
    public var totalBytes: Int64?
    public var message: String?

    public init(
        phase: String,
        id: String? = nil,
        bytesReceived: Int64? = nil,
        totalBytes: Int64? = nil,
        message: String? = nil
    ) {
        self.phase = phase
        self.id = id
        self.bytesReceived = bytesReceived
        self.totalBytes = totalBytes
        self.message = message
    }
}

/// Resolves model ids to on-disk weights, installs/removes optional models, and
/// loads the bundled default at helper start (tech-plan D2).
public final class SttModelStore: @unchecked Sendable {
    public let installDirectory: URL
    public let bundledDirectory: URL?
    public let upstreamBase: URL
    public let tinydiarizeUpstreamBase: URL
    public let catalog: [SttModelDescriptor]

    private let fileManager: FileManager
    private let session: URLSession
    private let lock = NSLock()

    /// Model id loaded into memory at helper start (not on first session).
    public private(set) var loadedModelId: String?
    /// Weight bytes held after `loadBundledDefault()` so the first session does
    /// not wait on disk I/O for the default model.
    public private(set) var loadedWeights: Data?

    public init(
        installDirectory: URL,
        bundledDirectory: URL? = nil,
        upstreamBase: URL = SttModelCatalog.defaultUpstreamBase,
        tinydiarizeUpstreamBase: URL = SttModelCatalog.tinydiarizeUpstreamBase,
        catalog: [SttModelDescriptor] = SttModelCatalog.all,
        session: URLSession = .shared,
        fileManager: FileManager = .default
    ) {
        self.installDirectory = installDirectory
        self.bundledDirectory = bundledDirectory
        self.upstreamBase = upstreamBase
        self.tinydiarizeUpstreamBase = tinydiarizeUpstreamBase
        self.catalog = catalog
        self.session = session
        self.fileManager = fileManager
    }

    public func prepare() throws {
        try fileManager.createDirectory(at: installDirectory, withIntermediateDirectories: true)
    }

    /// Load bundled `whisper-tiny.en` into memory when the helper starts.
    public func loadBundledDefault() throws {
        let id = BundledSttModel.id
        guard let descriptor = catalog.first(where: { $0.id == id }) else {
            throw SttModelStoreError.unknownModel(id)
        }
        let url = try resolveWeightsURL(for: descriptor)
        let data = try Data(contentsOf: url)
        lock.lock()
        loadedWeights = data
        loadedModelId = id
        lock.unlock()
    }

    public var isBundledDefaultLoaded: Bool {
        lock.lock()
        defer { lock.unlock() }
        return loadedModelId == BundledSttModel.id && loadedWeights != nil
    }

    public func list() -> [SttModelInfo] {
        catalog.map { descriptor in
            SttModelInfo(
                id: descriptor.id,
                bundled: descriptor.bundled,
                installed: isInstalled(descriptor),
                sizeBytes: onDiskSize(descriptor) ?? descriptor.sizeBytes,
                capabilities: descriptor.capabilities
            )
        }
    }

    public func listResponse() -> SttModelsListResponse {
        SttModelsListResponse(models: list())
    }

    /// Absolute path to weights for an installed (or bundled) model.
    public func resolve(_ id: String) throws -> URL {
        guard let descriptor = catalog.first(where: { $0.id == id }) else {
            throw SttModelStoreError.unknownModel(id)
        }
        guard isInstalled(descriptor) else {
            throw SttModelStoreError.notInstalled(id)
        }
        return try resolveWeightsURL(for: descriptor)
    }

    public func isInstalled(_ id: String) -> Bool {
        guard let descriptor = catalog.first(where: { $0.id == id }) else { return false }
        return isInstalled(descriptor)
    }

    /// Fetch, verify SHA-1, and install. Emits progress events for SSE.
    public func install(
        id: String,
        onProgress: (@Sendable (SttInstallProgressEvent) -> Void)? = nil
    ) async throws {
        guard let descriptor = catalog.first(where: { $0.id == id }) else {
            throw SttModelStoreError.unknownModel(id)
        }
        if descriptor.bundled {
            // Bundled is always present; treat as no-op success.
            onProgress?(SttInstallProgressEvent(phase: "complete", id: id))
            return
        }
        if isInstalled(descriptor) {
            onProgress?(SttInstallProgressEvent(phase: "complete", id: id))
            return
        }

        try prepare()
        let url = SttModelCatalog.upstreamURL(
            for: descriptor,
            upstreamBase: upstreamBase,
            tinydiarizeBase: tinydiarizeUpstreamBase
        )
        let tempURL = installDirectory.appendingPathComponent(".\(descriptor.filename).partial")
        defer { try? fileManager.removeItem(at: tempURL) }

        do {
            try await download(from: url, to: tempURL, expectedSize: descriptor.sizeBytes, onProgress: onProgress)
        } catch let error as SttModelStoreError {
            throw error
        } catch {
            throw SttModelStoreError.downloadFailed(error.localizedDescription)
        }

        onProgress?(SttInstallProgressEvent(phase: "verify", id: id))
        do {
            try WeightHash.verifyFile(at: tempURL, expectedSha1: descriptor.sha1)
        } catch let HashVerifyError.mismatch(expected, actual) {
            try? fileManager.removeItem(at: tempURL)
            throw SttModelStoreError.hashMismatch(expected: expected, actual: actual)
        }

        let finalURL = installDirectory.appendingPathComponent(descriptor.filename)
        if fileManager.fileExists(atPath: finalURL.path) {
            try fileManager.removeItem(at: finalURL)
        }
        try fileManager.moveItem(at: tempURL, to: finalURL)
        onProgress?(SttInstallProgressEvent(phase: "complete", id: id))
    }

    /// Build an SSE body for `POST /stt/models/:id/install` (same batch-SSE
    /// pattern as chat completions — progress events collected during the work).
    public func installSSE(id: String) async -> (status: Int, body: Data) {
        final class EventBox: @unchecked Sendable {
            var events: [SttInstallProgressEvent] = []
            let lock = NSLock()
            func append(_ event: SttInstallProgressEvent) {
                lock.lock()
                defer { lock.unlock() }
                events.append(event)
            }
            func snapshot() -> [SttInstallProgressEvent] {
                lock.lock()
                defer { lock.unlock() }
                return events
            }
        }
        let box = EventBox()
        let encoder = JSONEncoder()
        encoder.outputFormatting = [.sortedKeys]

        do {
            try await install(id: id) { event in
                box.append(event)
            }
        } catch let error as SttModelStoreError {
            box.append(
                SttInstallProgressEvent(
                    phase: "error",
                    id: id,
                    message: errorMessage(error)
                )
            )
            return (statusFor(error), sseBody(events: box.snapshot(), encoder: encoder))
        } catch {
            box.append(
                SttInstallProgressEvent(
                    phase: "error",
                    id: id,
                    message: error.localizedDescription
                )
            )
            return (500, sseBody(events: box.snapshot(), encoder: encoder))
        }
        return (200, sseBody(events: box.snapshot(), encoder: encoder))
    }

    public func remove(id: String) throws {
        guard let descriptor = catalog.first(where: { $0.id == id }) else {
            throw SttModelStoreError.unknownModel(id)
        }
        if descriptor.bundled || id == BundledSttModel.id {
            throw SttModelStoreError.bundledCannotBeRemoved(id)
        }
        let url = installDirectory.appendingPathComponent(descriptor.filename)
        guard fileManager.fileExists(atPath: url.path) else {
            throw SttModelStoreError.notInstalled(id)
        }
        try fileManager.removeItem(at: url)
    }

    // MARK: - Internals

    private func isInstalled(_ descriptor: SttModelDescriptor) -> Bool {
        if descriptor.bundled {
            return bundledWeightsURL(for: descriptor) != nil
                || fileManager.fileExists(
                    atPath: installDirectory.appendingPathComponent(descriptor.filename).path
                )
        }
        return fileManager.fileExists(
            atPath: installDirectory.appendingPathComponent(descriptor.filename).path
        )
    }

    private func resolveWeightsURL(for descriptor: SttModelDescriptor) throws -> URL {
        if descriptor.bundled {
            if let bundled = bundledWeightsURL(for: descriptor) {
                return bundled
            }
            let installed = installDirectory.appendingPathComponent(descriptor.filename)
            if fileManager.fileExists(atPath: installed.path) {
                return installed
            }
            throw SttModelStoreError.bundledMissing(descriptor.id)
        }
        let installed = installDirectory.appendingPathComponent(descriptor.filename)
        guard fileManager.fileExists(atPath: installed.path) else {
            throw SttModelStoreError.notInstalled(descriptor.id)
        }
        return installed
    }

    private func bundledWeightsURL(for descriptor: SttModelDescriptor) -> URL? {
        guard let bundledDirectory else { return nil }
        let url = bundledDirectory.appendingPathComponent(descriptor.filename)
        guard fileManager.fileExists(atPath: url.path) else { return nil }
        return url
    }

    private func onDiskSize(_ descriptor: SttModelDescriptor) -> Int64? {
        guard let url = try? resolveWeightsURL(for: descriptor) else { return nil }
        guard let attrs = try? fileManager.attributesOfItem(atPath: url.path),
              let size = attrs[.size] as? NSNumber
        else { return nil }
        return size.int64Value
    }

    private func download(
        from url: URL,
        to destination: URL,
        expectedSize: Int64,
        onProgress: (@Sendable (SttInstallProgressEvent) -> Void)?
    ) async throws {
        var request = URLRequest(url: url)
        request.timeoutInterval = 600
        onProgress?(
            SttInstallProgressEvent(phase: "download", bytesReceived: 0, totalBytes: expectedSize)
        )
        let (tempDownload, response) = try await session.download(for: request)
        guard let http = response as? HTTPURLResponse, (200..<300).contains(http.statusCode) else {
            throw SttModelStoreError.downloadFailed(
                "HTTP \((response as? HTTPURLResponse)?.statusCode ?? -1)"
            )
        }
        let attrs = try fileManager.attributesOfItem(atPath: tempDownload.path)
        let received = (attrs[.size] as? NSNumber)?.int64Value ?? expectedSize
        let total = http.expectedContentLength > 0 ? http.expectedContentLength : expectedSize
        if fileManager.fileExists(atPath: destination.path) {
            try fileManager.removeItem(at: destination)
        }
        try fileManager.moveItem(at: tempDownload, to: destination)
        onProgress?(
            SttInstallProgressEvent(
                phase: "download",
                bytesReceived: received,
                totalBytes: total
            )
        )
    }

    private func sseBody(events: [SttInstallProgressEvent], encoder: JSONEncoder) -> Data {
        var text = ""
        for event in events {
            if let data = try? encoder.encode(event),
               let line = String(data: data, encoding: .utf8)
            {
                text += "data: \(line)\n\n"
            }
        }
        return Data(text.utf8)
    }

    private func statusFor(_ error: SttModelStoreError) -> Int {
        switch error {
        case .unknownModel: return 404
        case .notInstalled: return 404
        case .bundledCannotBeRemoved: return 403
        case .alreadyInstalled: return 200
        case .hashMismatch: return 422
        case .downloadFailed: return 502
        case .bundledMissing: return 503
        }
    }

    private func errorMessage(_ error: SttModelStoreError) -> String {
        switch error {
        case .unknownModel(let id):
            return "Unknown model: \(id)"
        case .notInstalled(let id):
            return "Model not installed: \(id)"
        case .bundledCannotBeRemoved(let id):
            return "Bundled model cannot be removed: \(id)"
        case .alreadyInstalled(let id):
            return "Already installed: \(id)"
        case .hashMismatch(let expected, let actual):
            return "Hash mismatch: expected \(expected), got \(actual)"
        case .downloadFailed(let message):
            return "Download failed: \(message)"
        case .bundledMissing(let id):
            return "Bundled model missing on disk: \(id)"
        }
    }
}

extension SttModelStoreError: LocalizedError {
    public var errorDescription: String? {
        switch self {
        case .unknownModel(let id): return "Unknown model: \(id)"
        case .notInstalled(let id): return "Model not installed: \(id)"
        case .bundledCannotBeRemoved(let id): return "Bundled model cannot be removed: \(id)"
        case .alreadyInstalled(let id): return "Already installed: \(id)"
        case .hashMismatch(let expected, let actual):
            return "Hash mismatch: expected \(expected), got \(actual)"
        case .downloadFailed(let message): return "Download failed: \(message)"
        case .bundledMissing(let id): return "Bundled model missing on disk: \(id)"
        }
    }
}
