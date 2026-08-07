import Foundation

/// Counts non-loopback HTTP attempts during a local STT session (task 2.6).
public final class EgressGuard: @unchecked Sendable {
    private let lock = NSLock()
    private var externalAttempts = 0
    private var messages: [String] = []

    public init() {}

    public func noteRequest(to url: URL) {
        let host = url.host?.lowercased() ?? ""
        let isLocal =
            host.isEmpty
            || host == "localhost"
            || host == "127.0.0.1"
            || host == "::1"
            || host.hasSuffix(".local")
        if !isLocal {
            lock.lock()
            externalAttempts += 1
            messages.append(url.absoluteString)
            lock.unlock()
        }
    }

    public var externalRequestCount: Int {
        lock.lock()
        defer { lock.unlock() }
        return externalAttempts
    }

    public var externalURLs: [String] {
        lock.lock()
        defer { lock.unlock() }
        return messages
    }

    public func reset() {
        lock.lock()
        externalAttempts = 0
        messages = []
        lock.unlock()
    }
}

/// URLProtocol that records every request so tests can assert local sessions
/// never reach an external host.
public final class EgressRecordingProtocol: URLProtocol, @unchecked Sendable {
    public static let guardKey = "aprovan.stt.egressGuard"

    public override class func canInit(with request: URLRequest) -> Bool {
        true
    }

    public override class func canonicalRequest(for request: URLRequest) -> URLRequest {
        request
    }

    public override func startLoading() {
        if let url = request.url,
           let guardRef = URLProtocol.property(forKey: Self.guardKey, in: request) as? EgressGuard
        {
            guardRef.noteRequest(to: url)
        }
        let error = NSError(
            domain: "aprovan.stt.egress",
            code: 1,
            userInfo: [NSLocalizedDescriptionKey: "Local STT sessions must not leave the machine"]
        )
        client?.urlProtocol(self, didFailWithError: error)
    }

    public override func stopLoading() {}
}
