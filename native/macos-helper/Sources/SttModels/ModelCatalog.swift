import Foundation

/// Capability slice published on `GET /stt/models` (tech-plan `SttModelInfo`).
public struct SttModelCapabilities: Codable, Equatable, Sendable {
    public var diarization: Bool
    public var wordTimestamps: Bool
    public var vad: Bool
    public var languages: [String]

    public init(
        diarization: Bool,
        wordTimestamps: Bool,
        vad: Bool,
        languages: [String]
    ) {
        self.diarization = diarization
        self.wordTimestamps = wordTimestamps
        self.vad = vad
        self.languages = languages
    }
}

/// Catalogue row for installed + available models.
public struct SttModelInfo: Codable, Equatable, Sendable {
    public var id: String
    public var bundled: Bool
    public var installed: Bool
    public var sizeBytes: Int64
    public var capabilities: SttModelCapabilities

    public init(
        id: String,
        bundled: Bool,
        installed: Bool,
        sizeBytes: Int64,
        capabilities: SttModelCapabilities
    ) {
        self.id = id
        self.bundled = bundled
        self.installed = installed
        self.sizeBytes = sizeBytes
        self.capabilities = capabilities
    }
}

/// Static descriptor for a known model (bundled or fetchable).
public struct SttModelDescriptor: Equatable, Sendable {
    public var id: String
    public var filename: String
    /// Published whisper.cpp SHA-1 (40 hex) — ADR 0001 / models README.
    public var sha1: String
    public var sizeBytes: Int64
    public var bundled: Bool
    public var capabilities: SttModelCapabilities
    /// Path under the upstream base (e.g. `ggml-tiny.en.bin`).
    public var remotePath: String

    public init(
        id: String,
        filename: String,
        sha1: String,
        sizeBytes: Int64,
        bundled: Bool,
        capabilities: SttModelCapabilities,
        remotePath: String? = nil
    ) {
        self.id = id
        self.filename = filename
        self.sha1 = sha1
        self.sizeBytes = sizeBytes
        self.bundled = bundled
        self.capabilities = capabilities
        self.remotePath = remotePath ?? filename
    }
}

/// Fixed bundled default (ADR 0001).
public enum BundledSttModel {
    public static let id = "whisper-tiny.en"
    public static let filename = "ggml-tiny.en.bin"
    /// whisper.cpp models README SHA for `tiny.en`.
    public static let sha1 = "c78c86eb1a8faa21b369bcd33207cc90d64ae9df"
    public static let sizeBytes: Int64 = 77_676_013
}

/// Built-in catalogue: bundled default + optional installs (MIT ggml redistributor).
public enum SttModelCatalog {
    public static let english: SttModelCapabilities = .init(
        diarization: false,
        wordTimestamps: true,
        vad: true,
        languages: ["en"]
    )

    public static let multilingual: SttModelCapabilities = .init(
        diarization: false,
        wordTimestamps: true,
        vad: true,
        languages: ["*"]
    )

    public static let englishDiarize: SttModelCapabilities = .init(
        diarization: true,
        wordTimestamps: true,
        vad: true,
        languages: ["en"]
    )

    /// Default Hugging Face ggml redistributor (hash-pinned; override in tests / controlled CDN).
    public static let defaultUpstreamBase = URL(
        string: "https://huggingface.co/ggerganov/whisper.cpp/resolve/main/"
    )!

    public static let tinydiarizeUpstreamBase = URL(
        string: "https://huggingface.co/akashmjn/tinydiarize-whisper.cpp/resolve/main/"
    )!

    public static let all: [SttModelDescriptor] = [
        SttModelDescriptor(
            id: BundledSttModel.id,
            filename: BundledSttModel.filename,
            sha1: BundledSttModel.sha1,
            sizeBytes: BundledSttModel.sizeBytes,
            bundled: true,
            capabilities: english
        ),
        SttModelDescriptor(
            id: "whisper-tiny",
            filename: "ggml-tiny.bin",
            sha1: "bd577a113a864445d4c299885e0cb97d4ba92b5f",
            sizeBytes: 77_676_131,
            bundled: false,
            capabilities: multilingual
        ),
        SttModelDescriptor(
            id: "whisper-base.en",
            filename: "ggml-base.en.bin",
            sha1: "137c40403d78fd54d454da0f9bd998f78703390c",
            sizeBytes: 147_964_211,
            bundled: false,
            capabilities: english
        ),
        SttModelDescriptor(
            id: "whisper-small.en-tdrz",
            filename: "ggml-small.en-tdrz.bin",
            sha1: "b6c6e7e89af1a35c08e6de56b66ca6a02a2fdfa1",
            sizeBytes: 487_601_967,
            bundled: false,
            capabilities: englishDiarize,
            remotePath: "ggml-small.en-tdrz.bin"
        ),
    ]

    public static func descriptor(id: String) -> SttModelDescriptor? {
        all.first { $0.id == id }
    }

    public static func upstreamURL(
        for descriptor: SttModelDescriptor,
        upstreamBase: URL = defaultUpstreamBase,
        tinydiarizeBase: URL = tinydiarizeUpstreamBase
    ) -> URL {
        let base = descriptor.id.contains("tdrz") ? tinydiarizeBase : upstreamBase
        return URL(string: descriptor.remotePath, relativeTo: base)!.absoluteURL
    }
}
