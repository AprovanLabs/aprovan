import Foundation

/// `StreamingSessionDriver` over a `TranscriptionEngine` (tech-plan local STT driver).
///
/// Maps engine output to `SttEvent` partials, finals, and speech boundaries.
/// Capabilities come from the loaded engine/model (D3) — not a static descriptor.
public final class StreamingSttDriver: @unchecked Sendable {
    public static let providerId = "local"

    private let lock = NSLock()
    private var engineFactory: @Sendable (SttOpenArgs) async throws -> any TranscriptionEngine
    private var sessions = [String: SessionState]()
    private var nextId = 0
    private let egress: EgressGuard

    /// Capabilities of the *current* default engine (updated when model selection changes).
    public private(set) var capabilities: SttCapabilities

    public init(
        capabilities: SttCapabilities,
        egress: EgressGuard = EgressGuard(),
        engineFactory: @escaping @Sendable (SttOpenArgs) async throws -> any TranscriptionEngine
    ) {
        self.capabilities = capabilities
        self.egress = egress
        self.engineFactory = engineFactory
    }

    /// Convenience: fixed engine instance (tests / single-model helper start).
    public convenience init(engine: any TranscriptionEngine, egress: EgressGuard = EgressGuard()) {
        let caps = engine.capabilities
        self.init(capabilities: caps, egress: egress) { args in
            _ = args
            return engine
        }
    }

    public func replaceEngineFactory(
        capabilities: SttCapabilities,
        factory: @escaping @Sendable (SttOpenArgs) async throws -> any TranscriptionEngine
    ) {
        lock.lock()
        self.capabilities = capabilities
        self.engineFactory = factory
        lock.unlock()
    }

    public var egressExternalRequestCount: Int {
        egress.externalRequestCount
    }

    // MARK: - StreamingSessionDriver

    public func openSession(_ rawArgs: [String: Any] = [:]) async throws -> String {
        let args = Self.parseOpenArgs(rawArgs)
        let engine = try await engineFactory(args)
        // D3: capabilities follow the loaded model for this session.
        let sessionCaps = engine.capabilities

        try assertOpenSupported(
            capabilities: sessionCaps,
            provider: Self.providerId,
            args: args
        )

        try await engine.reset(
            diarize: args.diarize == true,
            wordTimestamps: args.wordTimestamps == true
        )

        lock.lock()
        nextId += 1
        let id = "local-\(nextId)"
        sessions[id] = SessionState(
            id: id,
            engine: engine,
            capabilities: sessionCaps,
            args: args,
            openedAt: Date(),
            audioDurationMs: 0,
            segments: [],
            sink: nil,
            closed: false
        )
        // Publish current capabilities from the session's model.
        capabilities = sessionCaps
        lock.unlock()

        return id
    }

    public func push(providerSessionId: String, message: [String: Any]) async throws {
        let session = try session(providerSessionId)
        guard let audioB64 = message["audio"] as? String else {
            throw SttDriverError.badRequest(
                "\(Self.providerId) push requires { audio: string, seq: number }"
            )
        }
        let seq = (message["seq"] as? Int) ?? 0
        guard let pcm = Data(base64Encoded: audioB64) else {
            throw SttDriverError.badRequest("\(Self.providerId) push audio must be base64 PCM")
        }

        // 16 kHz mono s16le → 2 bytes/sample.
        let frameMs = Int((Double(pcm.count) / 2.0 / 16_000.0) * 1000.0)
        let offsetBefore: Int
        lock.lock()
        offsetBefore = session.audioDurationMs
        session.audioDurationMs += max(0, frameMs)
        lock.unlock()

        let outputs = try await session.engine.process(
            pcm: pcm,
            seq: seq,
            audioOffsetMs: offsetBefore
        )
        try emit(outputs, on: session)

        if egress.externalRequestCount > 0 {
            throw SttDriverError.internalError(
                "Local STT session attempted external network access: \(egress.externalURLs.joined(separator: ", "))"
            )
        }
    }

    public func close(providerSessionId: String) async throws -> SttResult {
        let session = try session(providerSessionId)
        lock.lock()
        if session.closed {
            let result = SttResult(
                text: session.segments.map(\.text).joined(separator: " ").trimmingCharacters(in: .whitespaces),
                segments: session.segments,
                durationMs: max(session.audioDurationMs, Int(Date().timeIntervalSince(session.openedAt) * 1000))
            )
            lock.unlock()
            return result
        }
        session.closed = true
        let offset = session.audioDurationMs
        lock.unlock()

        let outputs = try await session.engine.finish(audioOffsetMs: offset)
        try emit(outputs, on: session)

        if egress.externalRequestCount > 0 {
            throw SttDriverError.internalError(
                "Local STT session attempted external network access"
            )
        }

        lock.lock()
        let result = SttResult(
            text: session.segments.map(\.text).joined(separator: " ").trimmingCharacters(in: .whitespaces),
            segments: session.segments,
            durationMs: max(
                session.audioDurationMs,
                Int(Date().timeIntervalSince(session.openedAt) * 1000)
            )
        )
        sessions.removeValue(forKey: providerSessionId)
        lock.unlock()
        return result
    }

    public func subscribe(
        providerSessionId: String,
        sink: @escaping @Sendable (SttEvent) -> Void
    ) -> () -> Void {
        lock.lock()
        defer { lock.unlock() }
        guard let session = sessions[providerSessionId] else {
            return {}
        }
        session.sink = sink
        return {
            self.lock.lock()
            if session.sink != nil { session.sink = nil }
            self.lock.unlock()
        }
    }

    // MARK: - Helpers

    private func session(_ id: String) throws -> SessionState {
        lock.lock()
        defer { lock.unlock() }
        guard let session = sessions[id], !session.closed else {
            throw SttDriverError.notFound("\(Self.providerId) session not found: \(id)")
        }
        return session
    }

    private func emit(_ outputs: [EngineOutput], on session: SessionState) throws {
        for output in outputs {
            let event: SttEvent
            switch output {
            case .partial(let text, let segment):
                event = .partial(text: text, segment: segment)
            case .final(let segment):
                lock.lock()
                session.segments.append(segment)
                lock.unlock()
                event = .final(segment: segment)
            case .speechStart(let atMs):
                event = .speechStart(atMs: atMs)
            case .speechEnd(let atMs):
                event = .speechEnd(atMs: atMs)
            }
            lock.lock()
            let sink = session.sink
            lock.unlock()
            sink?(event)
        }
    }

    public static func parseOpenArgs(_ raw: [String: Any]) -> SttOpenArgs {
        SttOpenArgs(
            language: raw["language"] as? String,
            diarize: raw["diarize"] as? Bool,
            wordTimestamps: raw["wordTimestamps"] as? Bool,
            encoding: raw["encoding"] as? String,
            model: raw["model"] as? String
        )
    }
}

private final class SessionState: @unchecked Sendable {
    let id: String
    let engine: any TranscriptionEngine
    let capabilities: SttCapabilities
    let args: SttOpenArgs
    let openedAt: Date
    var audioDurationMs: Int
    var segments: [SttSegment]
    var sink: (@Sendable (SttEvent) -> Void)?
    var closed: Bool

    init(
        id: String,
        engine: any TranscriptionEngine,
        capabilities: SttCapabilities,
        args: SttOpenArgs,
        openedAt: Date,
        audioDurationMs: Int,
        segments: [SttSegment],
        sink: (@Sendable (SttEvent) -> Void)?,
        closed: Bool
    ) {
        self.id = id
        self.engine = engine
        self.capabilities = capabilities
        self.args = args
        self.openedAt = openedAt
        self.audioDurationMs = audioDurationMs
        self.segments = segments
        self.sink = sink
        self.closed = closed
    }
}
