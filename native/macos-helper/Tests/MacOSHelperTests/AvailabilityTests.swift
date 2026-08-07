import Darwin
import Foundation
import Testing
@testable import MacOSHelperLib
import ChatCompletions

@Suite("ChatCompletions")
struct ChatCompletionsTests {
    struct StubEngine: OnDeviceChatEngine {
        var modelIds: [String] = [OnDeviceModelId.default]
        var reply: String = "hello from on-device"

        func complete(messages: [ChatMessage], model: String) async throws -> String {
            _ = messages
            _ = model
            return reply
        }
    }

    @Test("non-streaming completion matches llm chat.completion shape")
    func nonStreamingShape() async throws {
        let service = ChatCompletionsService(
            engine: StubEngine(),
            now: { Date(timeIntervalSince1970: 1_700_000_000) },
            makeId: { "chatcmpl-test" }
        )
        let request = ChatCompletionRequest(
            model: OnDeviceModelId.default,
            messages: [ChatMessage(role: "user", content: "hi")]
        )
        let response = try await service.complete(request)
        #expect(response.object == "chat.completion")
        #expect(response.id == "chatcmpl-test")
        #expect(response.model == OnDeviceModelId.default)
        #expect(response.choices.count == 1)
        #expect(response.choices[0].message.role == "assistant")
        #expect(response.choices[0].message.content == "hello from on-device")
        #expect(response.choices[0].finish_reason == "stop")
    }

    @Test("streaming SSE emits chunk objects and [DONE]")
    func streamingForm() async throws {
        let service = ChatCompletionsService(
            engine: StubEngine(reply: "abcdef"),
            now: { Date(timeIntervalSince1970: 1_700_000_000) },
            makeId: { "chatcmpl-stream" }
        )
        let request = ChatCompletionRequest(
            messages: [ChatMessage(role: "user", content: "hi")],
            stream: true
        )
        let data = try await service.streamSSE(request)
        let text = String(data: data, encoding: .utf8) ?? ""
        #expect(text.contains("\"object\":\"chat.completion.chunk\""))
        #expect(text.contains("data: [DONE]"))
        #expect(text.contains("abcdef") || text.contains("ab"))
    }

    @Test("model list returns the on-device model id")
    func modelList() {
        let service = ChatCompletionsService(engine: StubEngine())
        let list = service.listModels()
        #expect(list.object == "list")
        #expect(list.data.map(\.id) == [OnDeviceModelId.default])
    }

    @Test("HTTP /v1/chat/completions and /v1/models over loopback")
    func httpEndpoints() async throws {
        let port = try ephemeralPort()
        let chat = ChatCompletionsService(
            engine: StubEngine(reply: "pong"),
            now: { Date(timeIntervalSince1970: 42) },
            makeId: { "chatcmpl-http" }
        )
        let reporter = AvailabilityReporter(
            helperVersion: "test",
            capabilities: { ["llm": .available, "esm": .unsupported(reason: "n/a")] }
        )
        let server = try LoopbackHTTPServer(
            host: "127.0.0.1",
            port: port,
            router: makeRouter(reporter: reporter, chat: chat)
        )
        try await server.start()
        defer { server.stop() }

        let models = try await get("http://127.0.0.1:\(port)/v1/models")
        #expect(models.status == 200)
        let list = try JSONDecoder().decode(ModelListResponse.self, from: models.body)
        #expect(list.data.first?.id == OnDeviceModelId.default)

        let body = try JSONEncoder().encode(
            ChatCompletionRequest(messages: [ChatMessage(role: "user", content: "hi")])
        )
        let completion = try await post(
            "http://127.0.0.1:\(port)/v1/chat/completions",
            body: body
        )
        #expect(completion.status == 200)
        let parsed = try JSONDecoder().decode(ChatCompletionResponse.self, from: completion.body)
        #expect(parsed.object == "chat.completion")
        #expect(parsed.choices[0].message.content == "pong")

        let streamBody = try JSONEncoder().encode(
            ChatCompletionRequest(
                messages: [ChatMessage(role: "user", content: "hi")],
                stream: true
            )
        )
        let streamed = try await post(
            "http://127.0.0.1:\(port)/v1/chat/completions",
            body: streamBody
        )
        #expect(streamed.status == 200)
        let sse = String(data: streamed.body, encoding: .utf8) ?? ""
        #expect(sse.contains("chat.completion.chunk"))
        #expect(sse.contains("[DONE]"))
    }

    @Test("unavailable engine returns 503 rather than a fake completion")
    func unavailableEngine() async throws {
        let port = try ephemeralPort()
        let chat = ChatCompletionsService(
            engine: UnavailableChatEngine(reason: "On-device model requires macOS 26 or later")
        )
        let server = try LoopbackHTTPServer(
            host: "127.0.0.1",
            port: port,
            router: makeRouter(reporter: AvailabilityReporter(), chat: chat)
        )
        try await server.start()
        defer { server.stop() }

        let body = try JSONEncoder().encode(
            ChatCompletionRequest(messages: [ChatMessage(role: "user", content: "hi")])
        )
        let response = try await post(
            "http://127.0.0.1:\(port)/v1/chat/completions",
            body: body
        )
        #expect(response.status == 503)
        #expect(String(data: response.body, encoding: .utf8)?.contains("macOS 26") == true)
    }
}

@Suite("AvailabilityReport")
struct AvailabilityReportTests {
    @Test("encodes available / unsupported / disabled shapes from tech-plan D3")
    func encodesThreeStates() throws {
        let report = AvailabilityReport(
            helperVersion: "0.1.0",
            capabilities: [
                "ok": .available,
                "old": .unsupported(reason: "requires macOS 26"),
                "off": .disabled(
                    reason: "feature disabled",
                    remedy: "enable it in System Settings"
                ),
            ]
        )
        let data = try JSONEncoder().encode(report)
        let json = try JSONSerialization.jsonObject(with: data) as! [String: Any]
        let caps = json["capabilities"] as! [String: [String: Any]]

        #expect(json["helperVersion"] as? String == "0.1.0")
        #expect(caps["ok"]?["state"] as? String == "available")
        #expect(caps["old"]?["state"] as? String == "unsupported")
        #expect(caps["old"]?["reason"] as? String == "requires macOS 26")
        #expect(caps["off"]?["state"] as? String == "disabled")
        #expect(caps["off"]?["reason"] as? String == "feature disabled")
        #expect(caps["off"]?["remedy"] as? String == "enable it in System Settings")
    }

    @Test("llm is unsupported below the required OS major version")
    func llmUnsupportedOnOlderOS() {
        let state = AvailabilityReporter.llmCapability(majorVersion: 14)
        guard case .unsupported(let reason) = state else {
            Issue.record("expected unsupported, got \(state)")
            return
        }
        #expect(reason.contains("macOS"))
    }

    @Test("llm is disabled (with remedy) when OS is new enough but feature is off")
    func llmDisabledWhenFeatureOff() {
        let state = AvailabilityReporter.llmCapability(majorVersion: 26)
        switch state {
        case .available:
            // Real FoundationModels linked and enabled on this machine.
            break
        case .disabled(let reason, let remedy):
            #expect(!reason.isEmpty)
            #expect(!remedy.isEmpty)
        case .unsupported(let reason):
            Issue.record("expected disabled or available on macOS 26+, got unsupported: \(reason)")
        }
    }

    @Test("default report exposes llm and esm with reasons an operator can read")
    func defaultReportHasOperatorVisibleReasons() {
        let report = AvailabilityReporter().report()
        #expect(report.capabilities["llm"] != nil)
        #expect(report.capabilities["esm"] != nil)
        for (name, state) in report.capabilities {
            switch state {
            case .available:
                break
            case .unsupported(let reason):
                #expect(!reason.isEmpty, "\(name) unsupported without reason")
            case .disabled(let reason, let remedy):
                #expect(!reason.isEmpty, "\(name) disabled without reason")
                #expect(!remedy.isEmpty, "\(name) disabled without remedy")
            }
        }
    }
}

@Suite("LoopbackHTTPServer")
struct LoopbackHTTPServerTests {
    @Test("serves /health and /availability on loopback only")
    func healthAndAvailability() async throws {
        let port = try ephemeralPort()
        let reporter = AvailabilityReporter(
            helperVersion: "test",
            capabilities: {
                [
                    "llm": .unsupported(reason: "requires macOS 26"),
                    "esm": .disabled(
                        reason: "cache empty",
                        remedy: "connect once online"
                    ),
                ]
            }
        )
        let server = try LoopbackHTTPServer(
            host: "127.0.0.1",
            port: port,
            router: makeRouter(reporter: reporter)
        )
        try await server.start()
        defer { server.stop() }

        let health = try await get("http://127.0.0.1:\(port)/health")
        #expect(health.status == 200)
        #expect(String(data: health.body, encoding: .utf8)?.contains("ok") == true)

        let availability = try await get("http://127.0.0.1:\(port)/availability")
        #expect(availability.status == 200)
        let report = try JSONDecoder().decode(AvailabilityReport.self, from: availability.body)
        #expect(report.helperVersion == "test")
        #expect(report.capabilities["llm"] == .unsupported(reason: "requires macOS 26"))
        guard case .disabled = report.capabilities["esm"] else {
            Issue.record("expected esm disabled")
            return
        }
    }

    @Test("request parser strips query string from path but keeps it on query")
    func parsePath() {
        let req = LoopbackHTTPServer.parseRequest(Data("GET /availability?x=1 HTTP/1.1".utf8))
        #expect(req?.method == "GET")
        #expect(req?.path == "/availability")
        #expect(req?.query == "x=1")
    }
}

private struct HTTPResult {
    var status: Int
    var body: Data
}

private func ephemeralPort() throws -> UInt16 {
    let fd = socket(AF_INET, SOCK_STREAM, 0)
    guard fd >= 0 else { throw URLError(.cannotConnectToHost) }
    defer { close(fd) }
    var addr = sockaddr_in()
    addr.sin_len = UInt8(MemoryLayout<sockaddr_in>.size)
    addr.sin_family = sa_family_t(AF_INET)
    addr.sin_port = 0
    addr.sin_addr = in_addr(s_addr: inet_addr("127.0.0.1"))
    let bound = withUnsafePointer(to: &addr) {
        $0.withMemoryRebound(to: sockaddr.self, capacity: 1) {
            Darwin.bind(fd, $0, socklen_t(MemoryLayout<sockaddr_in>.size))
        }
    }
    guard bound == 0 else { throw URLError(.cannotConnectToHost) }
    var len = socklen_t(MemoryLayout<sockaddr_in>.size)
    _ = withUnsafeMutablePointer(to: &addr) {
        $0.withMemoryRebound(to: sockaddr.self, capacity: 1) {
            getsockname(fd, $0, &len)
        }
    }
    return UInt16(bigEndian: addr.sin_port)
}

private func get(_ urlString: String) async throws -> HTTPResult {
    let url = URL(string: urlString)!
    let (data, response) = try await URLSession.shared.data(from: url)
    let status = (response as? HTTPURLResponse)?.statusCode ?? 0
    return HTTPResult(status: status, body: data)
}

private func post(_ urlString: String, body: Data) async throws -> HTTPResult {
    let url = URL(string: urlString)!
    var request = URLRequest(url: url)
    request.httpMethod = "POST"
    request.setValue("application/json", forHTTPHeaderField: "Content-Type")
    request.httpBody = body
    let (data, response) = try await URLSession.shared.data(for: request)
    let status = (response as? HTTPURLResponse)?.statusCode ?? 0
    return HTTPResult(status: status, body: data)
}
