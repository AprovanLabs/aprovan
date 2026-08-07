import Darwin
import Foundation
import EsmCache
import MacOSHelperLib
import ChatCompletions

struct CLIOptions {
    var host: String = "127.0.0.1"
    var port: UInt16 = 0
    var cacheDir: String?
    var seedDir: String?
}

func parseArgs(_ args: [String]) -> CLIOptions {
    var options = CLIOptions()
    var i = 0
    while i < args.count {
        let arg = args[i]
        if arg == "--host", i + 1 < args.count {
            options.host = args[i + 1]
            i += 2
            continue
        }
        if arg == "--port", i + 1 < args.count {
            options.port = UInt16(args[i + 1]) ?? 0
            i += 2
            continue
        }
        if arg == "--cache-dir", i + 1 < args.count {
            options.cacheDir = args[i + 1]
            i += 2
            continue
        }
        if arg == "--seed-dir", i + 1 < args.count {
            options.seedDir = args[i + 1]
            i += 2
            continue
        }
        i += 1
    }
    return options
}

/// Reserve an ephemeral loopback port when --port 0 / omitted, matching the
/// Electron supervisor's reserve-then-spawn pattern when the supervisor passes
/// an explicit port.
func resolvePort(_ requested: UInt16) throws -> UInt16 {
    if requested != 0 { return requested }
    let socketFD = socket(AF_INET, SOCK_STREAM, 0)
    guard socketFD >= 0 else {
        throw NSError(domain: "macos-helper", code: 1, userInfo: [
            NSLocalizedDescriptionKey: "Failed to create socket for ephemeral port",
        ])
    }
    defer { close(socketFD) }
    var addr = sockaddr_in()
    addr.sin_len = UInt8(MemoryLayout<sockaddr_in>.size)
    addr.sin_family = sa_family_t(AF_INET)
    addr.sin_port = 0
    addr.sin_addr = in_addr(s_addr: inet_addr("127.0.0.1"))
    let bindResult = withUnsafePointer(to: &addr) { ptr in
        ptr.withMemoryRebound(to: sockaddr.self, capacity: 1) {
            Darwin.bind(socketFD, $0, socklen_t(MemoryLayout<sockaddr_in>.size))
        }
    }
    guard bindResult == 0 else {
        throw NSError(domain: "macos-helper", code: 2, userInfo: [
            NSLocalizedDescriptionKey: "Failed to bind ephemeral loopback port",
        ])
    }
    var length = socklen_t(MemoryLayout<sockaddr_in>.size)
    let getsock = withUnsafeMutablePointer(to: &addr) { ptr in
        ptr.withMemoryRebound(to: sockaddr.self, capacity: 1) {
            getsockname(socketFD, $0, &length)
        }
    }
    guard getsock == 0 else {
        throw NSError(domain: "macos-helper", code: 3, userInfo: [
            NSLocalizedDescriptionKey: "Failed to read ephemeral port",
        ])
    }
    return UInt16(bigEndian: addr.sin_port)
}

func defaultCacheDirectory() -> URL {
    let base = FileManager.default.urls(for: .applicationSupportDirectory, in: .userDomainMask).first
        ?? FileManager.default.temporaryDirectory
    return base.appendingPathComponent("Aprovan/esm-cache", isDirectory: true)
}

func defaultSeedDirectory() -> URL? {
    // Packaged: Resources/esm-seed next to the binary's resource bundle.
    // Unpackaged / tests: native/macos-helper/Resources/esm-seed or CLI --seed-dir.
    let exe = URL(fileURLWithPath: CommandLine.arguments[0]).resolvingSymlinksInPath()
    let candidates = [
        exe.deletingLastPathComponent().appendingPathComponent("esm-seed", isDirectory: true),
        exe.deletingLastPathComponent().appendingPathComponent("Resources/esm-seed", isDirectory: true),
        exe
            .deletingLastPathComponent() // debug
            .deletingLastPathComponent() // .build
            .deletingLastPathComponent() // macos-helper package root? varies
            .appendingPathComponent("Resources/esm-seed", isDirectory: true),
    ]
    for url in candidates {
        var isDir: ObjCBool = false
        if FileManager.default.fileExists(atPath: url.path, isDirectory: &isDir), isDir.boolValue {
            return url
        }
    }
    return nil
}

let options = parseArgs(Array(CommandLine.arguments.dropFirst()))
let port = try resolvePort(options.port)
let cacheDir = URL(
    fileURLWithPath: options.cacheDir ?? defaultCacheDirectory().path,
    isDirectory: true
)
let seedDir: URL? = {
    if let seed = options.seedDir {
        return URL(fileURLWithPath: seed, isDirectory: true)
    }
    return defaultSeedDirectory()
}()

let localEsmBase = "http://\(options.host):\(port)/esm"
let esmCache = EsmCacheService(
    cacheDirectory: cacheDir,
    seedDirectory: seedDir,
    localEsmBase: localEsmBase
)
try esmCache.prepare()

let reporter = AvailabilityReporter()
let chat = ChatCompletionsService(engine: makeDefaultChatEngine())
let server = try LoopbackHTTPServer(
    host: options.host,
    port: port,
    router: makeRouter(reporter: reporter, esmCache: esmCache, chat: chat)
)

try await server.start()
FileHandle.standardError.write(Data("macos-helper listening on http://\(options.host):\(port)\n".utf8))

// Park the process until SIGTERM / SIGINT.
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
    let signalQueue = DispatchQueue(label: "aprovan.macos-helper.signals")
    let source = DispatchSource.makeSignalSource(signal: SIGTERM, queue: signalQueue)
    let sourceInt = DispatchSource.makeSignalSource(signal: SIGINT, queue: signalQueue)
    signal(SIGTERM, SIG_IGN)
    signal(SIGINT, SIG_IGN)
    let finish: @Sendable () -> Void = {
        once.run {
            source.cancel()
            sourceInt.cancel()
            server.stop()
            cont.resume()
        }
    }
    source.setEventHandler(handler: finish)
    sourceInt.setEventHandler(handler: finish)
    source.resume()
    sourceInt.resume()
}
