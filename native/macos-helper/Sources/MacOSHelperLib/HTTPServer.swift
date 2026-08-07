import Foundation
import Network
import EsmCache
import ChatCompletions

public struct HTTPRequest: Sendable {
    public var method: String
    /// Path without query string (used for routing).
    public var path: String
    /// Raw query string without leading `?`, if present.
    public var query: String?
    public var headers: [String: String]
    public var body: Data

    public init(
        method: String,
        path: String,
        query: String? = nil,
        headers: [String: String] = [:],
        body: Data = Data()
    ) {
        self.method = method
        self.path = path
        self.query = query
        self.headers = headers
        self.body = body
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

public typealias HTTPRouter = @Sendable (HTTPRequest) async -> HTTPResponse

/// Minimal loopback-only HTTP/1.1 server for health, availability, `/esm/*`, and chat.
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
                let parsed = Self.parseRequest(headerData) ?? HTTPRequest(method: "GET", path: "/")
                let contentLength = Self.contentLength(from: parsed.headers)
                let bodyStart = range.upperBound
                let available = next.count - bodyStart
                if available < contentLength {
                    if isComplete {
                        connection.cancel()
                        return
                    }
                    self.receiveRequest(on: connection, buffer: next)
                    return
                }
                let bodyEnd = bodyStart + contentLength
                let body = contentLength > 0
                    ? next.subdata(in: bodyStart..<bodyEnd)
                    : Data()
                let request = HTTPRequest(
                    method: parsed.method,
                    path: parsed.path,
                    query: parsed.query,
                    headers: parsed.headers,
                    body: body
                )
                Task {
                    let response = await self.router(request)
                    self.send(response, on: connection)
                }
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
        let lines = text.split(separator: "\r\n", omittingEmptySubsequences: false)
        guard let firstLine = lines.first else { return nil }
        let parts = firstLine.split(separator: " ")
        guard parts.count >= 2 else { return nil }
        let method = String(parts[0])
        let rawPath = String(parts[1])
        let split = rawPath.split(separator: "?", maxSplits: 1).map(String.init)
        let path = split.first ?? rawPath
        let query = split.count > 1 ? split[1] : nil
        var headers: [String: String] = [:]
        for line in lines.dropFirst() {
            guard let idx = line.firstIndex(of: ":") else { continue }
            let name = String(line[..<idx]).trimmingCharacters(in: .whitespaces).lowercased()
            let value = String(line[line.index(after: idx)...]).trimmingCharacters(in: .whitespaces)
            headers[name] = value
        }
        return HTTPRequest(method: method, path: path, query: query, headers: headers)
    }

    static func contentLength(from headers: [String: String]) -> Int {
        guard let raw = headers["content-length"], let value = Int(raw), value >= 0 else {
            return 0
        }
        return value
    }

    static func statusText(_ code: Int) -> String {
        switch code {
        case 200: return "OK"
        case 400: return "Bad Request"
        case 404: return "Not Found"
        case 405: return "Method Not Allowed"
        case 502: return "Bad Gateway"
        case 503: return "Service Unavailable"
        default: return "Error"
        }
    }
}

/// Core routes from stream 1 (`/health`, `/availability`).
public func makeBaseRouter(reporter: AvailabilityReporter) -> HTTPRouter {
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

/// Additive `/esm/*` registration — keeps stream 3 ChatCompletions rebases easy.
public func makeEsmRouter(cache: EsmCacheService) -> HTTPRouter {
    { request in
        guard request.path == "/esm" || request.path.hasPrefix("/esm/") else {
            return .text(404, "Not Found")
        }
        guard request.method == "GET" else {
            return .text(405, "Method Not Allowed")
        }
        guard let specifier = esmSpecifier(path: request.path, query: request.query) else {
            return .text(400, "Unresolvable dependency: (empty)")
        }
        do {
            let hit = try await cache.resolve(specifier: specifier)
            return HTTPResponse(status: 200, contentType: hit.contentType, body: hit.data)
        } catch let error as UnresolvedDependencyError {
            return .text(502, error.message)
        } catch {
            return .text(502, UnresolvedDependencyError(specifier: specifier).message)
        }
    }
}

/// Additive `/v1/models` + `/v1/chat/completions` registration (stream 3).
public func makeChatRouter(chat: ChatCompletionsService) -> HTTPRouter {
    { request in
        switch (request.method, request.path) {
        case ("GET", "/v1/models"):
            do {
                return try .json(object: chat.listModels())
            } catch {
                return .text(500, "Failed to encode models")
            }
        case ("POST", "/v1/chat/completions"):
            return await handleChatCompletion(chat: chat, request: request)
        default:
            return .text(404, "Not Found")
        }
    }
}

/// Compose routers left-to-right; first non-404 wins. Additive registration for later streams.
public func composeRouters(_ routers: HTTPRouter...) -> HTTPRouter {
    { request in
        for router in routers {
            let response = await router(request)
            if response.status != 404 {
                return response
            }
        }
        return .text(404, "Not Found")
    }
}

/// Stream 1+2+3 default: health/availability + optional ESM cache + optional chat.
public func makeRouter(
    reporter: AvailabilityReporter,
    esmCache: EsmCacheService? = nil,
    chat: ChatCompletionsService? = nil
) -> HTTPRouter {
    var built: [HTTPRouter] = []
    if let esmCache {
        built.append(makeEsmRouter(cache: esmCache))
    }
    if let chat {
        built.append(makeChatRouter(chat: chat))
    }
    built.append(makeBaseRouter(reporter: reporter))
    let routers = built
    return { request in
        for router in routers {
            let response = await router(request)
            if response.status != 404 {
                return response
            }
        }
        return .text(404, "Not Found")
    }
}

private func handleChatCompletion(chat: ChatCompletionsService, request: HTTPRequest) async -> HTTPResponse {
    let decoded: ChatCompletionRequest
    do {
        decoded = try chat.decodeRequest(request.body)
    } catch let error as ChatCompletionsError {
        return chatErrorResponse(error)
    } catch {
        return .text(400, "invalid chat completion body")
    }

    do {
        if decoded.stream == true {
            let body = try await chat.streamSSE(decoded)
            return HTTPResponse(
                status: 200,
                contentType: "text/event-stream; charset=utf-8",
                body: body
            )
        }
        let completion = try await chat.complete(decoded)
        return try .json(object: completion)
    } catch let error as ChatCompletionsError {
        return chatErrorResponse(error)
    } catch {
        return chatErrorResponse(.internalError(error.localizedDescription))
    }
}

private func chatErrorResponse(_ error: ChatCompletionsError) -> HTTPResponse {
    switch error {
    case .badRequest(let message):
        return .text(400, message)
    case .unavailable(let message):
        return .text(503, message)
    case .internalError(let message):
        return .text(500, message)
    }
}
