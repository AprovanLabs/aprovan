import Foundation
import Network

public struct HTTPRequest: Sendable {
    public var method: String
    public var path: String

    public init(method: String, path: String) {
        self.method = method
        self.path = path
    }
}

public struct HTTPResponse: Sendable {
    public var status: Int
    public var contentType: String
    public var body: Data

    public init(status: Int = 200, contentType: String = "application/json", body: Data) {
        self.status = status
        self.contentType = contentType
        self.body = body
    }

    public static func json(_ status: Int = 200, object: some Encodable) throws -> HTTPResponse {
        let encoder = JSONEncoder()
        encoder.outputFormatting = [.sortedKeys]
        let data = try encoder.encode(object)
        return HTTPResponse(status: status, contentType: "application/json", body: data)
    }

    public static func text(_ status: Int, _ message: String) -> HTTPResponse {
        HTTPResponse(
            status: status,
            contentType: "text/plain; charset=utf-8",
            body: Data(message.utf8)
        )
    }
}

public typealias HTTPRouter = @Sendable (HTTPRequest) -> HTTPResponse

/// Minimal loopback-only HTTP/1.1 server for GET health and availability.
public final class LoopbackHTTPServer: @unchecked Sendable {
    private let listener: NWListener
    private let router: HTTPRouter
    private let queue = DispatchQueue(label: "aprovan.macos-helper.http")

    public var port: NWEndpoint.Port? {
        listener.port
    }

    public init(host: String = "127.0.0.1", port: UInt16, router: @escaping HTTPRouter) throws {
        self.router = router
        let parameters = NWParameters.tcp
        // Bind loopback only — refuse connections from other hosts.
        let nwPort = NWEndpoint.Port(rawValue: port)!
        parameters.requiredLocalEndpoint = NWEndpoint.hostPort(
            host: NWEndpoint.Host(host),
            port: nwPort
        )
        listener = try NWListener(using: parameters)
    }

    public func start() async throws {
        try await withCheckedThrowingContinuation { (cont: CheckedContinuation<Void, Error>) in
            final class Once: @unchecked Sendable {
                private var done = false
                private let lock = NSLock()
                func run(_ body: () -> Void) {
                    lock.lock()
                    defer { lock.unlock() }
                    guard !done else { return }
                    done = true
                    body()
                }
            }
            let once = Once()
            listener.stateUpdateHandler = { state in
                switch state {
                case .ready:
                    once.run { cont.resume() }
                case .failed(let error):
                    once.run { cont.resume(throwing: error) }
                case .cancelled:
                    once.run { cont.resume(throwing: CancellationError()) }
                default:
                    break
                }
            }
            listener.newConnectionHandler = { [weak self] connection in
                self?.handle(connection)
            }
            listener.start(queue: queue)
        }
    }

    public func stop() {
        listener.cancel()
    }

    private func handle(_ connection: NWConnection) {
        connection.start(queue: queue)
        receiveRequest(on: connection, buffer: Data())
    }

    private func receiveRequest(on connection: NWConnection, buffer: Data) {
        connection.receive(minimumIncompleteLength: 1, maximumLength: 64 * 1024) { [weak self] data, _, isComplete, error in
            guard let self else {
                connection.cancel()
                return
            }
            if let error {
                connection.cancel()
                _ = error
                return
            }
            var next = buffer
            if let data {
                next.append(data)
            }
            if let range = next.range(of: Data("\r\n\r\n".utf8)) {
                let headerData = next.subdata(in: next.startIndex..<range.lowerBound)
                let request = Self.parseRequest(headerData) ?? HTTPRequest(method: "GET", path: "/")
                let response = self.router(request)
                self.send(response, on: connection)
                return
            }
            if isComplete {
                connection.cancel()
                return
            }
            self.receiveRequest(on: connection, buffer: next)
        }
    }

    private func send(_ response: HTTPResponse, on connection: NWConnection) {
        let reason = Self.statusText(response.status)
        var message = "HTTP/1.1 \(response.status) \(reason)\r\n"
        message += "Content-Type: \(response.contentType)\r\n"
        message += "Content-Length: \(response.body.count)\r\n"
        message += "Connection: close\r\n\r\n"
        var payload = Data(message.utf8)
        payload.append(response.body)
        connection.send(content: payload, completion: .contentProcessed { _ in
            connection.cancel()
        })
    }

    static func parseRequest(_ headerData: Data) -> HTTPRequest? {
        guard let text = String(data: headerData, encoding: .utf8) else { return nil }
        let firstLine = text.split(separator: "\r\n", maxSplits: 1).first ?? Substring()
        let parts = firstLine.split(separator: " ")
        guard parts.count >= 2 else { return nil }
        let method = String(parts[0])
        let rawPath = String(parts[1])
        let path = rawPath.split(separator: "?", maxSplits: 1).first.map(String.init) ?? rawPath
        return HTTPRequest(method: method, path: path)
    }

    static func statusText(_ code: Int) -> String {
        switch code {
        case 200: return "OK"
        case 404: return "Not Found"
        case 405: return "Method Not Allowed"
        default: return "Error"
        }
    }
}

public func makeRouter(reporter: AvailabilityReporter) -> HTTPRouter {
    { request in
        guard request.method == "GET" else {
            return .text(405, "Method Not Allowed")
        }
        switch request.path {
        case "/health":
            return HTTPResponse(
                status: 200,
                contentType: "application/json",
                body: Data(#"{"ok":true}"#.utf8)
            )
        case "/availability":
            do {
                return try .json(object: reporter.report())
            } catch {
                return .text(500, "Failed to encode availability")
            }
        default:
            return .text(404, "Not Found")
        }
    }
}
