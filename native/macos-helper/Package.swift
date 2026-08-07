// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "macos-helper",
    platforms: [.macOS(.v14)],
    products: [
        .executable(name: "macos-helper", targets: ["MacOSHelper"]),
        .library(name: "MacOSHelperLib", targets: ["MacOSHelperLib"]),
    ],
    targets: [
        // Widget dependency cache (stream 2). Separate target so stream 3 can
        // add ChatCompletions the same way without reshuffling MacOSHelperLib.
        .target(
            name: "EsmCache",
            path: "Sources/EsmCache"
        ),
        .target(
            name: "MacOSHelperLib",
            dependencies: ["EsmCache"],
            path: "Sources/MacOSHelperLib"
        ),
        .executableTarget(
            name: "MacOSHelper",
            dependencies: ["MacOSHelperLib", "EsmCache"],
            path: "Sources/MacOSHelper"
        ),
        .testTarget(
            name: "MacOSHelperTests",
            dependencies: ["MacOSHelperLib", "EsmCache"],
            path: "Tests/MacOSHelperTests"
        ),
    ]
)
