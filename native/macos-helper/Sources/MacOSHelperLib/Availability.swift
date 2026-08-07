import Foundation

/// Three-state capability report (tech-plan D3).
public enum CapabilityState: Equatable, Sendable {
    case available
    case unsupported(reason: String)
    case disabled(reason: String, remedy: String)
}

extension CapabilityState: Codable {
    private enum CodingKeys: String, CodingKey {
        case state, reason, remedy
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        switch self {
        case .available:
            try container.encode("available", forKey: .state)
        case .unsupported(let reason):
            try container.encode("unsupported", forKey: .state)
            try container.encode(reason, forKey: .reason)
        case .disabled(let reason, let remedy):
            try container.encode("disabled", forKey: .state)
            try container.encode(reason, forKey: .reason)
            try container.encode(remedy, forKey: .remedy)
        }
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        let state = try container.decode(String.self, forKey: .state)
        switch state {
        case "available":
            self = .available
        case "unsupported":
            self = .unsupported(reason: try container.decode(String.self, forKey: .reason))
        case "disabled":
            self = .disabled(
                reason: try container.decode(String.self, forKey: .reason),
                remedy: try container.decode(String.self, forKey: .remedy)
            )
        default:
            throw DecodingError.dataCorruptedError(
                forKey: .state,
                in: container,
                debugDescription: "Unknown capability state \(state)"
            )
        }
    }
}

public struct AvailabilityReport: Codable, Equatable, Sendable {
    public var helperVersion: String
    public var capabilities: [String: CapabilityState]

    public init(helperVersion: String, capabilities: [String: CapabilityState]) {
        self.helperVersion = helperVersion
        self.capabilities = capabilities
    }
}

/// Builds the availability report for this process.
public struct AvailabilityReporter: Sendable {
    public var helperVersion: String
    public var capabilities: @Sendable () -> [String: CapabilityState]

    public init(
        helperVersion: String = HelperVersion.current,
        capabilities: (@Sendable () -> [String: CapabilityState])? = nil
    ) {
        self.helperVersion = helperVersion
        self.capabilities = capabilities ?? { Self.defaultCapabilities() }
    }

    public func report() -> AvailabilityReport {
        AvailabilityReport(helperVersion: helperVersion, capabilities: capabilities())
    }

    /// `llm` probes on-device model availability (stream 3); `esm` is available
    /// once the fetch-through cache is wired (stream 2).
    public static nonisolated func defaultCapabilities() -> [String: CapabilityState] {
        [
            "llm": llmCapability(),
            "esm": .available,
        ]
    }

    /// On-device model needs macOS 26+ and an enabled system feature. Distinguishes
    /// unsupported OS from user-disabled (tech-plan D3).
    public static nonisolated func llmCapability(
        majorVersion: Int = ProcessInfo.processInfo.operatingSystemVersion.majorVersion
    ) -> CapabilityState {
        let requiredMajor = 26
        if majorVersion < requiredMajor {
            return .unsupported(
                reason: "On-device model requires macOS \(requiredMajor) or later"
            )
        }
        return probeFoundationModels()
    }
}

#if canImport(FoundationModels)
import FoundationModels

private nonisolated func probeFoundationModels() -> CapabilityState {
    guard #available(macOS 26.0, *) else {
        return .unsupported(reason: "On-device model requires macOS 26 or later")
    }
    switch SystemLanguageModel.default.availability {
    case .available:
        return .available
    case .unavailable(.appleIntelligenceNotEnabled):
        return .disabled(
            reason: "Apple Intelligence is turned off",
            remedy: "Enable Apple Intelligence in System Settings → Apple Intelligence & Siri"
        )
    case .unavailable(.deviceNotEligible):
        return .unsupported(reason: "This Mac is not eligible for the on-device model")
    case .unavailable(.modelNotReady):
        return .disabled(
            reason: "The on-device model is not ready yet",
            remedy: "Wait for the model download to finish, then try again"
        )
    case .unavailable(let other):
        return .disabled(
            reason: "On-device model unavailable (\(String(describing: other)))",
            remedy: "Enable Apple Intelligence in System Settings → Apple Intelligence & Siri"
        )
    @unknown default:
        return .disabled(
            reason: "On-device model unavailable",
            remedy: "Enable Apple Intelligence in System Settings → Apple Intelligence & Siri"
        )
    }
}
#else
private nonisolated func probeFoundationModels() -> CapabilityState {
    .disabled(
        reason: "Apple Intelligence is turned off or the on-device model is unavailable",
        remedy: "Enable Apple Intelligence in System Settings → Apple Intelligence & Siri"
    )
}
#endif

public enum HelperVersion {
    public static let current = "0.2.0"
}
