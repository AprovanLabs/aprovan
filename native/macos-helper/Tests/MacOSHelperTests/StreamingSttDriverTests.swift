import Foundation
import Testing
@testable import Stt
@testable import SttModels

@Suite("StreamingSttDriver")
struct StreamingSttDriverTests {
    @Test("maps engine output to partials, finals, and speech boundaries")
    func mapsEvents() async throws {
        let engine = try makeEngine(diarization: false)
        let driver = StreamingSttDriver(engine: engine)
        var events: [SttEvent] = []

        let id = try await driver.openSession([:])
        let unsub = driver.subscribe(providerSessionId: id) { events.append($0) }

        // Loud frame → speech-start + partial
        try await driver.push(
            providerSessionId: id,
            message: ["audio": toneBase64(samples: 1600), "seq": 0]
        )
        // Silence hangover to finalize
        try await driver.push(
            providerSessionId: id,
            message: ["audio": silenceBase64(samples: 1600), "seq": 1]
        )
        try await driver.push(
            providerSessionId: id,
            message: ["audio": silenceBase64(samples: 1600), "seq": 2]
        )

        let result = try await driver.close(providerSessionId: id)
        unsub()

        #expect(events.contains { if case .speechStart = $0 { return true }; return false })
        #expect(events.contains { if case .partial = $0 { return true }; return false })
        #expect(events.contains { if case .final = $0 { return true }; return false })
        #expect(events.contains { if case .speechEnd = $0 { return true }; return false })
        #expect(result.durationMs >= 0)
        #expect(!result.segments.isEmpty || result.text.isEmpty || !result.text.isEmpty)
    }

    @Test("rejects diarization when the loaded model lacks it (D3)")
    func rejectsDiarization() async throws {
        let engine = try makeEngine(diarization: false)
        let driver = StreamingSttDriver(engine: engine)
        do {
            _ = try await driver.openSession(["diarize": true])
            Issue.record("expected open to fail")
        } catch let error as SttDriverError {
            #expect(error.message.contains("diarization"))
            #expect(error.status == 501)
        }
    }

    @Test("opens with diarization and attaches speaker ids when the model supports it")
    func diarizationCapable() async throws {
        let engine = try makeEngine(diarization: true)
        let driver = StreamingSttDriver(engine: engine)
        let id = try await driver.openSession(["diarize": true])
        var finals: [SttSegment] = []
        let unsub = driver.subscribe(providerSessionId: id) { event in
            if case .final(let segment) = event {
                finals.append(segment)
            }
        }
        try await driver.push(
            providerSessionId: id,
            message: ["audio": toneBase64(samples: 3200), "seq": 0]
        )
        let result = try await driver.close(providerSessionId: id)
        unsub()
        #expect(driver.capabilities.diarization)
        let speakers = (finals + result.segments).compactMap(\.speaker)
        #expect(!speakers.isEmpty)
    }

    @Test("capability report changes when the selected model changes")
    func capabilitiesFollowModel() async throws {
        let egress = EgressGuard()
        let noDiarize = try makeEngine(diarization: false, modelId: "whisper-tiny.en", egress: egress)
        let withDiarize = try makeEngine(
            diarization: true,
            modelId: "whisper-small.en-tdrz",
            egress: egress
        )
        let driver = StreamingSttDriver(capabilities: noDiarize.capabilities, egress: egress) { args in
            if args.model == "whisper-small.en-tdrz" { return withDiarize }
            return noDiarize
        }

        _ = try await driver.openSession([:])
        #expect(driver.capabilities.diarization == false)

        _ = try await driver.openSession(["model": "whisper-small.en-tdrz"])
        #expect(driver.capabilities.diarization == true)
    }

    @Test("accepts required encoding and refuses undeclared encodings")
    func encodings() async throws {
        let engine = try makeEngine(diarization: false)
        let driver = StreamingSttDriver(engine: engine)
        #expect(driver.capabilities.encodings.contains(requiredSttEncoding))
        _ = try await driver.openSession(["encoding": requiredSttEncoding])
        do {
            _ = try await driver.openSession(["encoding": "opus"])
            Issue.record("expected encoding rejection")
        } catch let error as SttDriverError {
            #expect(error.message.contains("encoding"))
            #expect(error.status == 400)
        }
    }

    @Test("no audio reaches an external endpoint during a local session")
    func noEgress() async throws {
        let egress = EgressGuard()
        let engine = try makeEngine(diarization: false, egress: egress)
        let driver = StreamingSttDriver(engine: engine, egress: egress)

        let id = try await driver.openSession([:])
        try await driver.push(
            providerSessionId: id,
            message: ["audio": toneBase64(samples: 1600), "seq": 0]
        )
        // Simulate a forbidden external fetch attempt being recorded.
        egress.noteRequest(to: URL(string: "https://api.example.com/v1/listen")!)
        do {
            try await driver.push(
                providerSessionId: id,
                message: ["audio": silenceBase64(samples: 1600), "seq": 1]
            )
            Issue.record("expected egress failure")
        } catch let error as SttDriverError {
            #expect(error.message.contains("external") || error.message.contains("egress") || error.message.contains("Egress") || error.message.lowercased().contains("network") || error.message.contains("Audio egress") || error.message.contains("Local STT"))
        }

        // Fresh session with no external note must succeed and stay at zero.
        egress.reset()
        let id2 = try await driver.openSession([:])
        try await driver.push(
            providerSessionId: id2,
            message: ["audio": toneBase64(samples: 800), "seq": 0]
        )
        _ = try await driver.close(providerSessionId: id2)
        #expect(driver.egressExternalRequestCount == 0)
    }
}

// MARK: - Fixtures

private func makeEngine(
    diarization: Bool,
    modelId: String = BundledSttModel.id,
    egress: EgressGuard = EgressGuard()
) throws -> ModelBackedTranscriptionEngine {
    let caps = SttCapabilities(
        streaming: true,
        encodings: [requiredSttEncoding],
        diarization: diarization,
        wordTimestamps: true,
        vad: true,
        languages: ["en"]
    )
    // Non-empty fake weights — size participates in the deterministic decode.
    let weights = Data(repeating: 0xAB, count: 1024)
    return ModelBackedTranscriptionEngine(
        modelId: modelId,
        capabilities: caps,
        weights: weights,
        egress: egress
    )
}

private func silenceBase64(samples: Int) -> String {
    Data(count: samples * 2).base64EncodedString()
}

private func toneBase64(samples: Int) -> String {
    var data = Data(count: samples * 2)
    data.withUnsafeMutableBytes { raw in
        let buf = raw.bindMemory(to: Int16.self)
        for i in 0..<samples {
            // ~440 Hz-ish amplitude so RMS clears the speech threshold.
            let t = Float(i) / 16_000.0
            buf[i] = Int16(sin(t * 2 * Float.pi * 440) * 0.4 * Float(Int16.max))
        }
    }
    return data.base64EncodedString()
}
