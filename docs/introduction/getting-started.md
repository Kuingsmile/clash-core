---
sidebarTitle: Getting Started
sidebarOrder: 2
---

# Getting Started

To get started with Clash, you can either build it from source or download pre-built binaries.

## Using pre-built binaries

You can download Clash core binaries here: [https://github.com/Dreamacro/clash/releases](https://github.com/Dreamacro/clash/releases)

## Install from source

You can build Clash on your own device with Golang 1.19+:

```shell
$ go install github.com/Dreamacro/clash@latest
go: downloading github.com/Dreamacro/clash v1.15.1
```

The binary is built under `$GOPATH/bin`:

```shell
$ $GOPATH/bin/clash -v
Clash unknown version darwin arm64 with go1.20.3 unknown time
```

## Build for a different arch/os

Golang supports cross-compilation, so you can build for a device on a different architecture or operating system. You can use _make_ to build them easily - for example:

```shell
$ git clone --depth 1 https://github.com/Dreamacro/clash
Cloning into 'clash'...
remote: Enumerating objects: 359, done.
remote: Counting objects: 100% (359/359), done.
remote: Compressing objects: 100% (325/325), done.
remote: Total 359 (delta 25), reused 232 (delta 17), pack-reused 0
Receiving objects: 100% (359/359), 248.99 KiB | 1.63 MiB/s, done.
Resolving deltas: 100% (25/25), done.
$ cd clash && make darwin-arm64
fatal: No names found, cannot describe anything.
GOARCH=arm64 GOOS=darwin CGO_ENABLED=0 go build -trimpath -ldflags '-X "github.com/Dreamacro/clash/constant.Version=unknown version" -X "github.com/Dreamacro/clash/constant.BuildTime=Mon May  8 16:47:10 UTC 2023" -w -s -buildid=' -o bin/clash-darwin-arm64
$ file bin/clash-darwin-arm64
bin/clash-darwin-arm64: Mach-O 64-bit executable arm64
```

For other build targets, check out the [Makefile](https://github.com/Dreamacro/clash/blob/master/Makefile).
