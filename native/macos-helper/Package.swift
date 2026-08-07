// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "macos-helper",
    platforms: [.macOS(.v14)],
    products: [
        .executable(name: "macos-helper", targets: ["MacOSHelper"]),
        .library(name: "MacOSHelperLib", targets: ["MacOSHelperLib"]),
        .library(name: "ChatCompletions", targets: ["ChatCompletions"]),
        .library(name: "SttModels", targets: ["SttModels"]),
    ],
    targets: [
        // Widget dependency cache (stream 2). Separate target so stream 3 can
        // add ChatCompletions the same way without reshuffling MacOSHelperLib.
        .target(
            name: "EsmCache",
            path: "Sources/EsmCache"
        ),
        .target(
            name: "ChatCompletions",
            path: "Sources/ChatCompletions"
        ),
        // STT model store (voice-and-floating-widgets stream 1).
        .target(
            name: "SttModels",
            path: "Sources/SttModels"
        ),
        .target(
            name: "MacOSHelperLib",
            dependencies: ["EsmCache", "ChatCompletions", "SttModels"],
            path: "Sources/MacOSHelperLib"
        ),
        .executableTarget(
            name: "MacOSHelper",
            dependencies: ["MacOSHelperLib", "EsmCache", "ChatCompletions", "SttModels"],
            path: "Sources/MacOSHelper"
        ),
        .testTarget(
            name: "MacOSHelperTests",
            dependencies: ["MacOSHelperLib", "EsmCache", "ChatCompletions", "SttModels"],
            path: "Tests/MacOSHelperTests"
        ),
    ]
)
