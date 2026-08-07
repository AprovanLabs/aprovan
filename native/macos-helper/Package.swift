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
        .target(
            name: "MacOSHelperLib",
            path: "Sources/MacOSHelperLib"
        ),
        .executableTarget(
            name: "MacOSHelper",
            dependencies: ["MacOSHelperLib"],
            path: "Sources/MacOSHelper"
        ),
        .testTarget(
            name: "MacOSHelperTests",
            dependencies: ["MacOSHelperLib"],
            path: "Tests/MacOSHelperTests"
        ),
    ]
)
