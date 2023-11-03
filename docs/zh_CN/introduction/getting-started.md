---
sidebarTitle: 快速开始
sidebarOrder: 2
---

# 快速开始

为了开始使用 Clash, 您可以从源码编译或者下载预编译的二进制文件.

## 使用预编译的二进制文件

您可以在这里下载 Clash 的内核二进制文件: [https://github.com/Dreamacro/clash/releases](https://github.com/Dreamacro/clash/releases)

## 从源码编译

您可以使用 Golang 1.19+ 在您的设备上编译 Clash:

```shell
$ go install github.com/Dreamacro/clash@latest
go: downloading github.com/Dreamacro/clash v1.15.1
```

二进制文件将会被编译到 `$GOPATH/bin` 目录下:

```shell
$ $GOPATH/bin/clash -v
Clash unknown version darwin arm64 with go1.20.3 unknown time
```

## 跨平台/操作系统编译

Golang 支持交叉编译, 所以您可以为不同架构或操作系统的设备编译 Clash. 您可以使用 _make_ 来轻松地编译它们, 例如:

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

对于其他构建目标, 请查看 [Makefile](https://github.com/Dreamacro/clash/blob/master/Makefile).