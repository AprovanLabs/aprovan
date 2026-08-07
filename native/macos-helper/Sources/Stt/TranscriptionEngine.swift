import Foundation

/// One unit of engine output before the driver maps it onto `SttEvent`.
public enum EngineOutput: Equatable, Sendable {
    case partial(text: String, segment: SttSegment?)
    case final(segment: SttSegment)
    case speechStart(atMs: Int)
    case speechEnd(atMs: Int)
}

/// Pluggable transcription backend. Production uses model-backed ggml weights;
/// tests inject a deterministic stub.
public protocol TranscriptionEngine: Sendable {
    var modelId: String { get }
    /// Capability descriptor for the loaded model (D3).
    var capabilities: SttCapabilities { get }

    /// Process one PCM s16le 16 kHz frame. May emit partials / VAD / finals.
    func process(pcm: Data, seq: Int, audioOffsetMs: Int) async throws -> [EngineOutput]

    /// Flush any buffered speech into finals at session close.
    func finish(audioOffsetMs: Int) async throws -> [EngineOutput]

    /// Prepare for a new session (clear buffers). Called from `openSession`.
    func reset(diarize: Bool, wordTimestamps: Bool) async throws
}
