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

/// Builds the availability report for this process. Stream 1 ships probes that
/// express the three D3 states; later streams replace stubs with real checks.
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

    /// `llm` remains a stub until stream 3; `esm` is available once the
    /// fetch-through cache is wired (stream 2).
    public static nonisolated func defaultCapabilities() -> [String: CapabilityState] {
        [
            "llm": llmCapability(),
            "esm": .available,
        ]
    }

    /// On-device model needs a newer OS than the app floor (macOS 14) and a
    /// user-enabled system feature. Until stream 3 wires the real model, we
    /// never report available — only unsupported or disabled.
    public static nonisolated func llmCapability(
        majorVersion: Int = ProcessInfo.processInfo.operatingSystemVersion.majorVersion
    ) -> CapabilityState {
        // Apple on-device foundation models require macOS 26+ (as of this change).
        let requiredMajor = 26
        if majorVersion < requiredMajor {
            return .unsupported(
                reason: "On-device model requires macOS \(requiredMajor) or later"
            )
        }
        return .disabled(
            reason: "Apple Intelligence is turned off or the on-device model is unavailable",
            remedy: "Enable Apple Intelligence in System Settings → Apple Intelligence & Siri"
        )
    }
}

public enum HelperVersion {
    public static let current = "0.1.0"
}
