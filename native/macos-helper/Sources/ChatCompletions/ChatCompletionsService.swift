import Foundation

/// Serves OpenAI-compatible `/v1/chat/completions` and `/v1/models` over an
/// on-device chat engine (tech-plan D2).
public struct ChatCompletionsService: Sendable {
    public var engine: any OnDeviceChatEngine
    public var defaultModel: String
    public var now: @Sendable () -> Date
    public var makeId: @Sendable () -> String

    public init(
        engine: any OnDeviceChatEngine,
        defaultModel: String = OnDeviceModelId.default,
        now: @escaping @Sendable () -> Date = { Date() },
        makeId: @escaping @Sendable () -> String = { "chatcmpl-\(UUID().uuidString.lowercased())" }
    ) {
        self.engine = engine
        self.defaultModel = defaultModel
        self.now = now
        self.makeId = makeId
    }

    public func listModels() -> ModelListResponse {
        ModelListResponse(
            data: engine.modelIds.map { ModelSummary(id: $0) }
        )
    }

    public func decodeRequest(_ data: Data) throws -> ChatCompletionRequest {
        let decoder = JSONDecoder()
        do {
            let request = try decoder.decode(ChatCompletionRequest.self, from: data)
            guard !request.messages.isEmpty else {
                throw ChatCompletionsError.badRequest("messages must be a non-empty array")
            }
            for message in request.messages {
                guard !message.role.isEmpty else {
                    throw ChatCompletionsError.badRequest("each message must have a role")
                }
            }
            return request
        } catch let error as ChatCompletionsError {
            throw error
        } catch {
            throw ChatCompletionsError.badRequest("invalid chat completion body")
        }
    }

    public func complete(_ request: ChatCompletionRequest) async throws -> ChatCompletionResponse {
        let model = request.model?.isEmpty == false ? request.model! : defaultModel
        let content = try await engine.complete(messages: request.messages, model: model)
        let created = Int(now().timeIntervalSince1970)
        return ChatCompletionResponse(
            id: makeId(),
            created: created,
            model: model,
            choices: [
                ChatCompletionChoice(
                    index: 0,
                    message: ChatMessage(role: "assistant", content: content),
                    finish_reason: "stop"
                ),
            ]
        )
    }

    /// Build an OpenAI SSE body (`data: {chunk}\\n\\n` … `data: [DONE]\\n\\n`).
    public func streamSSE(_ request: ChatCompletionRequest) async throws -> Data {
        let response = try await complete(request)
        let encoder = JSONEncoder()
        encoder.outputFormatting = [.sortedKeys]
        var lines: [String] = []

        let first = ChatCompletionChunk(
            id: response.id,
            created: response.created,
            model: response.model,
            choices: [
                ChatCompletionChunkChoice(
                    index: 0,
                    delta: ChatCompletionChunkDelta(role: "assistant", content: ""),
                    finish_reason: nil
                ),
            ]
        )
        lines.append(sseLine(try encoder.encode(first)))

        let content = response.choices.first?.message.content ?? ""
        // Emit content in small chunks so callers exercise the streaming form.
        let chunkSize = max(1, content.count / 3)
        var index = content.startIndex
        while index < content.endIndex {
            let end = content.index(index, offsetBy: chunkSize, limitedBy: content.endIndex) ?? content.endIndex
            let piece = String(content[index..<end])
            let chunk = ChatCompletionChunk(
                id: response.id,
                created: response.created,
                model: response.model,
                choices: [
                    ChatCompletionChunkChoice(
                        index: 0,
                        delta: ChatCompletionChunkDelta(content: piece),
                        finish_reason: nil
                    ),
                ]
            )
            lines.append(sseLine(try encoder.encode(chunk)))
            index = end
        }

        let done = ChatCompletionChunk(
            id: response.id,
            created: response.created,
            model: response.model,
            choices: [
                ChatCompletionChunkChoice(
                    index: 0,
                    delta: ChatCompletionChunkDelta(),
                    finish_reason: "stop"
                ),
            ]
        )
        lines.append(sseLine(try encoder.encode(done)))
        lines.append("data: [DONE]\n\n")
        return Data(lines.joined().utf8)
    }

    private func sseLine(_ data: Data) -> String {
        let json = String(data: data, encoding: .utf8) ?? "{}"
        return "data: \(json)\n\n"
    }
}
