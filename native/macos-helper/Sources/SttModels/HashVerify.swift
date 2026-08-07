import CryptoKit
import Foundation

public enum HashVerifyError: Error, Equatable, Sendable {
    case mismatch(expected: String, actual: String)
}

/// Verify weights against the published whisper.cpp SHA-1 (40 hex).
public enum WeightHash {
    public static func sha1Hex(of data: Data) -> String {
        Insecure.SHA1.hash(data: data).map { String(format: "%02x", $0) }.joined()
    }

    public static func sha1Hex(ofFileAt url: URL, fileManager: FileManager = .default) throws -> String {
        let handle = try FileHandle(forReadingFrom: url)
        defer { try? handle.close() }
        var hasher = Insecure.SHA1()
        while true {
            let chunk = try handle.read(upToCount: 1024 * 1024) ?? Data()
            if chunk.isEmpty { break }
            hasher.update(data: chunk)
        }
        return hasher.finalize().map { String(format: "%02x", $0) }.joined()
    }

    public static func verify(_ data: Data, expectedSha1: String) throws {
        let actual = sha1Hex(of: data)
        let expected = expectedSha1.lowercased()
        guard actual == expected else {
            throw HashVerifyError.mismatch(expected: expected, actual: actual)
        }
    }

    public static func verifyFile(at url: URL, expectedSha1: String) throws {
        let actual = try sha1Hex(ofFileAt: url)
        let expected = expectedSha1.lowercased()
        guard actual == expected else {
            throw HashVerifyError.mismatch(expected: expected, actual: actual)
        }
    }
}
