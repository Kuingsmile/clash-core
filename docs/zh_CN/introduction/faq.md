---
sidebarTitle: 常见问题
sidebarOrder: 4
---

# 常见问题

这里是一些大家遇到的常见问题. 如果您有任何此处未列出的问题, 请随时[提交一个 issue](https://github.com/Dreamacro/clash/issues/new/choose).

[[toc]]

## amd64 和 amd64-v3 有什么区别？

引用自 [golang/go](https://github.com/golang/go/wiki/MinimumRequirements#amd64):

> 在 Go 1.17 之前, Go 编译器总是生成任何 64 位 x86 处理器都可以执行的 x86 二进制文件.
>
> Go 1.18 引入了 AMD64 的 [4 个架构级别](https://en.wikipedia.org/wiki/X86-64#Microarchitecture_levels).
> 每个级别都有不同的x86指令集, 编译器可以在生成的二进制文件中包含这些指令:
>
> - GOAMD64=v1 (默认) : 基线. 仅生成所有 64 位 x86 处理器都可以执行的指令.
> - GOAMD64=v2: 所有 v1 指令, 加上 CMPXCHG16B、LAHF、SAHF、POPCNT、SSE3、SSE4.1、SSE4.2、SSSE3.
> - GOAMD64=v3: 所有 v2 指令, 加上 AVX、AVX2、BMI1、BMI2、F16C、FMA、LZCNT、MOVBE、OSXSAVE.
> - GOAMD64=v4: 所有 v3 指令, 加上 AVX512F、AVX512BW、AVX512CD、AVX512DQ、AVX512VL.
>
> 例如, 设置 `GOAMD64=v3` 将允许 Go 编译器在生成的二进制文件中使用 AVX2 指令 (这可能会在某些情况下提高性能) ；但是这些二进制文件将无法在不支持 AVX2 的旧 x86 处理器上运行.
>
> Go工具链也可能生成较新的指令, 但会存在动态检查保护, 确保它们只在有能力的处理器上执行. 例如在 `GOAMD64=v1` 的情况下, 如果 [CPUID](https://www.felixcloutier.com/x86/cpuid) 报告说 [POPCNT](https://www.felixcloutier.com/x86/popcnt) 指令可用, [math/bits.OnesCount](https://pkg.go.dev/math/bits#OnesCount) 仍将使用该指令. 否则, 它就会退回到一个通用的实现.
>
> Go 工具链目前不会生成任何 AVX512 指令.
>
> 请注意, 在这种情况下, *处理器*是一个简化. 实际上, 整个系统 (固件、hypervisor、内核) 都需要支持.

## 我的系统应该使用哪个版本？

这里是一些人们在 Clash 上使用的常见系统, 以及每个系统的推荐版本:

- NETGEAR WNDR3700v2: mips-hardfloat [#846](https://github.com/Dreamacro/clash/issues/846)
- NETGEAR WNDR3800: mips-softfloat [#579](https://github.com/Dreamacro/clash/issues/579)
- 华硕RT-AC5300: armv5 [#2356](https://github.com/Dreamacro/clash/issues/2356)
- 联发科MT7620A, MT7621A: mipsle-softfloat ([#136](https://github.com/Dreamacro/clash/issues/136))
- mips_24kc: [#192](https://github.com/Dreamacro/clash/issues/192)

如果您的设备未在此处列出, 您可以使用 `uname -m` 检查设备的 CPU 架构, 并在发布页面中找到相应的版本.

## 不会修复的问题

官方 Clash 内核项目不会实现/修复以下内容:

- [Snell](https://github.com/Dreamacro/clash/issues/2466)
- [Custom CA](https://github.com/Dreamacro/clash/issues/2333)
- [VMess Mux](https://github.com/Dreamacro/clash/issues/450)
- [VLess](https://github.com/Dreamacro/clash/issues/1185)
- [KCP](https://github.com/Dreamacro/clash/issues/16)
- [mKCP](https://github.com/Dreamacro/clash/issues/2308)
- [TLS Encrypted Client Hello](https://github.com/Dreamacro/clash/issues/2295)
- [TCP support for Clash DNS server](https://github.com/Dreamacro/clash/issues/368)
- [MITM](https://github.com/Dreamacro/clash/issues/227#issuecomment-508693628)

当官方Go QUIC库发布时, 以下内容将被考虑实施:

- [TUIC](https://github.com/Dreamacro/clash/issues/2222)
- [Hysteria](https://github.com/Dreamacro/clash/issues/1863)

## 在本地机器上节点正常工作, 但在路由器或容器中不起作用

您的系统可能未与世界时间同步. 请参考您的平台关于时间同步的文件 - 如果时间不同步, 某些协议可能无法正常工作.

## 规则匹配的时间复杂度

请参考这个讨论: [#422](https://github.com/Dreamacro/clash/issues/422)

## Clash Premium 无法访问互联网

您可以参考这些相关讨论:

- [#432](https://github.com/Dreamacro/clash/issues/432#issuecomment-571634905)
- [#2480](https://github.com/Dreamacro/clash/issues/2480)

## 错误: 不支持的 RULE-SET 规则类型

如果您遇到了这个错误信息:

```txt
FATA[0000] Parse config error: Rules[0] [RULE-SET,apple,REJECT] error: unsupported rule type RULE-SET
```

您正在使用 Clash 开源版. 规则 Providers 目前仅在 [免费 Premium 内核](https://github.com/Dreamacro/clash/releases/tag/premium) 中可用.

## DNS 劫持不起作用

由于 `tun.auto-route` 不会拦截局域网流量, 如果您的系统 DNS 设置为私有子网中的服务器, 则 DNS 劫持将不起作用. 您可以:

1. 使用非私有 DNS 服务器作为系统 DNS, 如 `1.1.1.1`
2. 或者手动将系统 DNS 设置为 Clash DNS (默认为 `198.18.0.1`)
