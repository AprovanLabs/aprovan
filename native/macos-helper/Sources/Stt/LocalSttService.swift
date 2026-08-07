import Foundation
import SttModels

/// Helper-facing service: owns `StreamingSttDriver` + model store selection.
public final class LocalSttService: @unchecked Sendable {
    public let store: SttModelStore
    public let driver: StreamingSttDriver
    public let egress: EgressGuard

    private let lock = NSLock()

    public init(store: SttModelStore, egress: EgressGuard = EgressGuard()) throws {
        self.store = store
        self.egress = egress
        let defaultEngine = try ModelBackedTranscriptionEngine.fromStore(store, egress: egress)
        self.driver = StreamingSttDriver(capabilities: defaultEngine.capabilities, egress: egress) {
            [store, egress] args in
            try ModelBackedTranscriptionEngine.fromStore(
                store,
                modelId: args.model,
                egress: egress
            )
        }
    }

    public var capabilities: SttCapabilities {
        driver.capabilities
    }
}
