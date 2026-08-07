// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "macos-helper",
    platforms: [.macOS(.v14)],
    products: [
        .executable(name: "macos-helper", targets: ["MacOSHelper"]),
        .library(name: "MacOSHelperLib", targets: ["MacOSHelperLib"]),
        .library(name: "ChatCompletions", targets: ["ChatCompletions"]),
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
        .target(
            name: "MacOSHelperLib",
            dependencies: ["EsmCache", "ChatCompletions"],
            path: "Sources/MacOSHelperLib"
        ),
        .executableTarget(
            name: "MacOSHelper",
            dependencies: ["MacOSHelperLib", "EsmCache", "ChatCompletions"],
            path: "Sources/MacOSHelper"
        ),
        .testTarget(
            name: "MacOSHelperTests",
            dependencies: ["MacOSHelperLib", "EsmCache", "ChatCompletions"],
            path: "Tests/MacOSHelperTests"
        ),
    ]
)
