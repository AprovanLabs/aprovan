import Foundation

/// OpenAI-compatible chat message (text-only subset matching @utdk/llm).
public struct ChatMessage: Codable, Sendable, Equatable {
    public var role: String
    public var content: String

    public init(role: String, content: String) {
        self.role = role
        self.content = content
    }
}

public struct ChatCompletionRequest: Codable, Sendable {
    public var model: String?
    public var messages: [ChatMessage]
    public var stream: Bool?
    public var temperature: Double?
    public var max_tokens: Int?

    public init(
        model: String? = nil,
        messages: [ChatMessage],
        stream: Bool? = nil,
        temperature: Double? = nil,
        max_tokens: Int? = nil
    ) {
        self.model = model
        self.messages = messages
        self.stream = stream
        self.temperature = temperature
        self.max_tokens = max_tokens
    }
}

public struct ChatCompletionChoice: Codable, Sendable, Equatable {
    public var index: Int
    public var message: ChatMessage
    public var finish_reason: String?

    public init(index: Int, message: ChatMessage, finish_reason: String? = "stop") {
        self.index = index
        self.message = message
        self.finish_reason = finish_reason
    }
}

public struct ChatCompletionUsage: Codable, Sendable, Equatable {
    public var prompt_tokens: Int?
    public var completion_tokens: Int?
    public var total_tokens: Int?

    public init(prompt_tokens: Int? = nil, completion_tokens: Int? = nil, total_tokens: Int? = nil) {
        self.prompt_tokens = prompt_tokens
        self.completion_tokens = completion_tokens
        self.total_tokens = total_tokens
    }
}

/// OpenAI `chat.completion` shape (@utdk/llm LlmChatCompletionResult).
public struct ChatCompletionResponse: Codable, Sendable, Equatable {
    public var id: String
    public var object: String
    public var created: Int
    public var model: String
    public var choices: [ChatCompletionChoice]
    public var usage: ChatCompletionUsage?

    public init(
        id: String,
        object: String = "chat.completion",
        created: Int,
        model: String,
        choices: [ChatCompletionChoice],
        usage: ChatCompletionUsage? = nil
    ) {
        self.id = id
        self.object = object
        self.created = created
        self.model = model
        self.choices = choices
        self.usage = usage
    }
}

public struct ChatCompletionChunkDelta: Codable, Sendable, Equatable {
    public var role: String?
    public var content: String?

    public init(role: String? = nil, content: String? = nil) {
        self.role = role
        self.content = content
    }
}

public struct ChatCompletionChunkChoice: Codable, Sendable, Equatable {
    public var index: Int
    public var delta: ChatCompletionChunkDelta
    public var finish_reason: String?

    public init(index: Int, delta: ChatCompletionChunkDelta, finish_reason: String? = nil) {
        self.index = index
        self.delta = delta
        self.finish_reason = finish_reason
    }
}

/// OpenAI `chat.completion.chunk` shape for SSE streaming.
public struct ChatCompletionChunk: Codable, Sendable, Equatable {
    public var id: String
    public var object: String
    public var created: Int
    public var model: String
    public var choices: [ChatCompletionChunkChoice]

    public init(
        id: String,
        object: String = "chat.completion.chunk",
        created: Int,
        model: String,
        choices: [ChatCompletionChunkChoice]
    ) {
        self.id = id
        self.object = object
        self.created = created
        self.model = model
        self.choices = choices
    }
}

public struct ModelSummary: Codable, Sendable, Equatable {
    public var id: String
    public var object: String
    public var owned_by: String

    public init(id: String, object: String = "model", owned_by: String = "apple") {
        self.id = id
        self.object = object
        self.owned_by = owned_by
    }
}

public struct ModelListResponse: Codable, Sendable, Equatable {
    public var object: String
    public var data: [ModelSummary]

    public init(object: String = "list", data: [ModelSummary]) {
        self.object = object
        self.data = data
    }
}

public enum ChatCompletionsError: Error, Sendable, Equatable {
    case badRequest(String)
    case unavailable(String)
    case internalError(String)
}
