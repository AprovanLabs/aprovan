import Foundation

/// Contract shapes mirrored from `@utdk/stt` (no contract change — adapt the engine).

public let requiredSttEncoding = "pcm_s16le_16k"

public struct SttCapabilities: Codable, Equatable, Sendable {
    public var streaming: Bool
    public var encodings: [String]
    public var diarization: Bool
    public var wordTimestamps: Bool
    public var vad: Bool
    /// BCP-47 tags, or `["auto"]` when the provider picks.
    public var languages: [String]

    public init(
        streaming: Bool = true,
        encodings: [String] = [requiredSttEncoding],
        diarization: Bool = false,
        wordTimestamps: Bool = false,
        vad: Bool = false,
        languages: [String] = ["auto"]
    ) {
        self.streaming = streaming
        self.encodings = encodings
        self.diarization = diarization
        self.wordTimestamps = wordTimestamps
        self.vad = vad
        self.languages = languages
    }

    public var languagesIsAuto: Bool {
        languages == ["auto"]
    }
}

public struct SttOpenArgs: Codable, Equatable, Sendable {
    public var language: String?
    public var diarize: Bool?
    public var wordTimestamps: Bool?
    public var encoding: String?
    public var model: String?

    public init(
        language: String? = nil,
        diarize: Bool? = nil,
        wordTimestamps: Bool? = nil,
        encoding: String? = nil,
        model: String? = nil
    ) {
        self.language = language
        self.diarize = diarize
        self.wordTimestamps = wordTimestamps
        self.encoding = encoding
        self.model = model
    }
}

public struct SttPushMessage: Codable, Equatable, Sendable {
    public var audio: String
    public var seq: Int

    public init(audio: String, seq: Int) {
        self.audio = audio
        self.seq = seq
    }
}

public struct SttWord: Codable, Equatable, Sendable {
    public var text: String
    public var startMs: Int
    public var endMs: Int
    public var speaker: String?

    public init(text: String, startMs: Int, endMs: Int, speaker: String? = nil) {
        self.text = text
        self.startMs = startMs
        self.endMs = endMs
        self.speaker = speaker
    }
}

public struct SttSegment: Codable, Equatable, Sendable {
    public var text: String
    public var startMs: Int
    public var endMs: Int
    public var speaker: String?
    public var words: [SttWord]?

    public init(
        text: String,
        startMs: Int,
        endMs: Int,
        speaker: String? = nil,
        words: [SttWord]? = nil
    ) {
        self.text = text
        self.startMs = startMs
        self.endMs = endMs
        self.speaker = speaker
        self.words = words
    }
}

public enum SttEvent: Equatable, Sendable {
    case partial(text: String, segment: SttSegment?)
    case final(segment: SttSegment)
    case speechStart(atMs: Int)
    case speechEnd(atMs: Int)
    case error(message: String, retryable: Bool)

    public var typeName: String {
        switch self {
        case .partial: return "partial"
        case .final: return "final"
        case .speechStart: return "speech-start"
        case .speechEnd: return "speech-end"
        case .error: return "error"
        }
    }
}

extension SttEvent: Codable {
    private enum CodingKeys: String, CodingKey {
        case type, data
    }

    private struct PartialData: Codable {
        var text: String
        var segment: SttSegment?
    }

    private struct FinalData: Codable {
        var segment: SttSegment
    }

    private struct SpeechData: Codable {
        var atMs: Int
    }

    private struct ErrorData: Codable {
        var message: String
        var retryable: Bool
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(typeName, forKey: .type)
        switch self {
        case .partial(let text, let segment):
            try container.encode(PartialData(text: text, segment: segment), forKey: .data)
        case .final(let segment):
            try container.encode(FinalData(segment: segment), forKey: .data)
        case .speechStart(let atMs):
            try container.encode(SpeechData(atMs: atMs), forKey: .data)
        case .speechEnd(let atMs):
            try container.encode(SpeechData(atMs: atMs), forKey: .data)
        case .error(let message, let retryable):
            try container.encode(ErrorData(message: message, retryable: retryable), forKey: .data)
        }
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        let type = try container.decode(String.self, forKey: .type)
        switch type {
        case "partial":
            let data = try container.decode(PartialData.self, forKey: .data)
            self = .partial(text: data.text, segment: data.segment)
        case "final":
            let data = try container.decode(FinalData.self, forKey: .data)
            self = .final(segment: data.segment)
        case "speech-start":
            let data = try container.decode(SpeechData.self, forKey: .data)
            self = .speechStart(atMs: data.atMs)
        case "speech-end":
            let data = try container.decode(SpeechData.self, forKey: .data)
            self = .speechEnd(atMs: data.atMs)
        case "error":
            let data = try container.decode(ErrorData.self, forKey: .data)
            self = .error(message: data.message, retryable: data.retryable)
        default:
            throw DecodingError.dataCorruptedError(
                forKey: .type,
                in: container,
                debugDescription: "Unknown SttEvent type \(type)"
            )
        }
    }
}

public struct SttResult: Codable, Equatable, Sendable {
    public var text: String
    public var segments: [SttSegment]
    public var durationMs: Int

    public init(text: String, segments: [SttSegment], durationMs: Int) {
        self.text = text
        self.segments = segments
        self.durationMs = durationMs
    }
}

public enum SttDriverError: Error, Equatable, Sendable {
    case badRequest(String)
    case unsupported(String)
    case notFound(String)
    case internalError(String)

    public var status: Int {
        switch self {
        case .badRequest: return 400
        case .unsupported: return 501
        case .notFound: return 404
        case .internalError: return 500
        }
    }

    public var message: String {
        switch self {
        case .badRequest(let m), .unsupported(let m), .notFound(let m), .internalError(let m):
            return m
        }
    }
}

/// Validate open args against declared capabilities (mirrors `assertOpenSupported`).
public func assertOpenSupported(
    capabilities: SttCapabilities,
    provider: String,
    args: SttOpenArgs
) throws {
    if !capabilities.streaming {
        throw SttDriverError.unsupported(
            "\(provider) does not support streaming sessions (streaming=false)"
        )
    }
    if !capabilities.encodings.contains(requiredSttEncoding) {
        throw SttDriverError.unsupported(
            "\(provider) must advertise encoding \"\(requiredSttEncoding)\" " +
                "(advertised: \(formatEncodings(capabilities.encodings)))"
        )
    }
    if args.diarize == true && !capabilities.diarization {
        throw SttDriverError.unsupported(
            "\(provider) does not support \"diarization\" " +
                "(requested diarize=true; capabilities.diarization=false)"
        )
    }
    if args.wordTimestamps == true && !capabilities.wordTimestamps {
        throw SttDriverError.unsupported(
            "\(provider) does not support \"wordTimestamps\" " +
                "(requested wordTimestamps=true; capabilities.wordTimestamps=false)"
        )
    }
    let encoding = args.encoding ?? requiredSttEncoding
    if !capabilities.encodings.contains(encoding) {
        throw SttDriverError.badRequest(
            "\(provider) does not support encoding \"\(encoding)\" " +
                "(supported: \(formatEncodings(capabilities.encodings)))"
        )
    }
    if let language = args.language,
       !capabilities.languagesIsAuto,
       !capabilities.languages.contains(language)
    {
        throw SttDriverError.badRequest(
            "\(provider) does not support language \"\(language)\" " +
                "(supported: \(capabilities.languages.joined(separator: ", ")))"
        )
    }
}

private func formatEncodings(_ encodings: [String]) -> String {
    encodings.isEmpty ? "(none)" : encodings.joined(separator: ", ")
}
