import Foundation

/// Pluggable on-device chat engine. Production uses Foundation Models when the
/// SDK can import them; tests inject a deterministic stub.
public protocol OnDeviceChatEngine: Sendable {
    /// Model ids exposed by GET /v1/models.
    var modelIds: [String] { get }

    /// Generate a full assistant reply for the given messages.
    func complete(messages: [ChatMessage], model: String) async throws -> String
}

public enum OnDeviceModelId {
    public static let `default` = "apple-on-device"
}

/// Engine used when FoundationModels is not linkable (current Xcode SDK) or
/// when the capability probe reports unavailable. Completions refuse loudly.
public struct UnavailableChatEngine: OnDeviceChatEngine {
    public var reason: String
    public var modelIds: [String] { [OnDeviceModelId.default] }

    public init(reason: String) {
        self.reason = reason
    }

    public func complete(messages: [ChatMessage], model: String) async throws -> String {
        _ = messages
        _ = model
        throw ChatCompletionsError.unavailable(reason)
    }
}

#if canImport(FoundationModels)
import FoundationModels

/// Real on-device engine backed by Apple's SystemLanguageModel.
@available(macOS 26.0, *)
public struct FoundationModelsChatEngine: OnDeviceChatEngine {
    public var modelIds: [String] { [OnDeviceModelId.default] }

    public init() {}

    public func complete(messages: [ChatMessage], model: String) async throws -> String {
        _ = model
        let system = SystemLanguageModel.default
        switch system.availability {
        case .available:
            break
        case .unavailable(let reason):
            throw ChatCompletionsError.unavailable(String(describing: reason))
        @unknown default:
            throw ChatCompletionsError.unavailable("On-device model is unavailable")
        }

        var instructions: String?
        var transcript: [String] = []
        for message in messages {
            switch message.role {
            case "system", "developer":
                instructions = (instructions.map { $0 + "\n" } ?? "") + message.content
            default:
                transcript.append("\(message.role): \(message.content)")
            }
        }
        let prompt = transcript.joined(separator: "\n")
        let session: LanguageModelSession
        if let instructions, !instructions.isEmpty {
            session = LanguageModelSession(instructions: instructions)
        } else {
            session = LanguageModelSession()
        }
        let response = try await session.respond(to: prompt)
        return response.content
    }
}
#endif

/// Pick the best available engine for this process.
public func makeDefaultChatEngine() -> any OnDeviceChatEngine {
    #if canImport(FoundationModels)
    if #available(macOS 26.0, *) {
        let model = SystemLanguageModel.default
        if case .available = model.availability {
            return FoundationModelsChatEngine()
        }
        if case .unavailable(let reason) = model.availability {
            return UnavailableChatEngine(reason: String(describing: reason))
        }
    }
    #endif
    return UnavailableChatEngine(
        reason: "On-device model SDK is not available in this helper build"
    )
}
