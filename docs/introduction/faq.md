---
sidebarTitle: Frequently Asked Questions
sidebarOrder: 4
---

# Frequently Asked Questions

Here we have some common questions people ask. If you have any questions not listed here, feel free to [open an issue](https://github.com/Dreamacro/clash/issues/new/choose).

[[toc]]

## What is the difference between amd64 and amd64-v3?

Quoting from [golang/go](https://github.com/golang/go/wiki/MinimumRequirements#amd64):

> Until Go 1.17, the Go compiler always generated x86 binaries that could be executed by any 64-bit x86 processor.
> 
> Go 1.18 introduced [4 architectural levels](https://en.wikipedia.org/wiki/X86-64#Microarchitecture_levels) for AMD64.
> Each level differs in the set of x86 instructions that the compiler can include in the generated binaries:
> 
> * GOAMD64=v1 (default): The baseline. Exclusively generates instructions that all 64-bit x86 processors can execute.
> * GOAMD64=v2: all v1 instructions, plus CMPXCHG16B, LAHF, SAHF, POPCNT, SSE3, SSE4.1, SSE4.2, SSSE3.
> * GOAMD64=v3: all v2 instructions, plus AVX, AVX2, BMI1, BMI2, F16C, FMA, LZCNT, MOVBE, OSXSAVE.
> * GOAMD64=v4: all v3 instructions, plus AVX512F, AVX512BW, AVX512CD, AVX512DQ, AVX512VL.
> 
> Setting, for example, GOAMD64=v3, will allow the Go compiler to use AVX2 instructions in the generated binaries (which may improve performance in some cases); but these binaries will not run on older x86 processors that don't support AVX2.
> 
> The Go toolchain may also generate newer instructions, but guarded by dynamic checks to ensure they're only executed on capable processors. For example, with GOAMD64=v1, [math/bits.OnesCount](https://pkg.go.dev/math/bits#OnesCount) will still use the [POPCNT](https://www.felixcloutier.com/x86/popcnt) instruction if [CPUID](https://www.felixcloutier.com/x86/cpuid) reports that it's available. Otherwise, it falls back to a generic implementation.
> 
> The Go toolchain does not currently generate any AVX512 instructions.
> 
> Note that *processor* is a simplification in this context. In practice, support from the entire system (firmware, hypervisor, kernel) is needed.

## Which release should I use for my system?

Here are some common systems that people use Clash on, and the recommended release for each of them:

- NETGEAR WNDR3700v2: mips-hardfloat [#846](https://github.com/Dreamacro/clash/issues/846)
- NETGEAR WNDR3800: mips-softfloat [#579](https://github.com/Dreamacro/clash/issues/579)
- ASUS RT-AC5300: armv5 [#2356](https://github.com/Dreamacro/clash/issues/2356)
- MediaTek MT7620A, MT7621A: mipsle-softfloat ([#136](https://github.com/Dreamacro/clash/issues/136))
- mips_24kc: [#192](https://github.com/Dreamacro/clash/issues/192)

If your device is not listed here, you can check the CPU architecture of your device with `uname -m` and find the corresponding release in the release page.

## List of wontfix

The official Clash core project will not implement/fix these things:

- [Snell](https://github.com/Dreamacro/clash/issues/2466)
- [Custom CA](https://github.com/Dreamacro/clash/issues/2333)
- [VMess Mux](https://github.com/Dreamacro/clash/issues/450)
- [VLess](https://github.com/Dreamacro/clash/issues/1185)
- [KCP](https://github.com/Dreamacro/clash/issues/16)
- [mKCP](https://github.com/Dreamacro/clash/issues/2308)
- [TLS Encrypted Client Hello](https://github.com/Dreamacro/clash/issues/2295)
- [TCP support for Clash DNS server](https://github.com/Dreamacro/clash/issues/368)
- [MITM](https://github.com/Dreamacro/clash/issues/227#issuecomment-508693628)

The following will be considered implementing when the official Go QUIC library releases.

- [TUIC](https://github.com/Dreamacro/clash/issues/2222)
- [Hysteria](https://github.com/Dreamacro/clash/issues/1863)

## Proxies work on my local machine, but not on my router or in a container

Your system might be out of sync in time. Refer to your platform documentations about time synchronisation - things will break if time is not in sync.

## Time complexity of rule matching

Refer to this discussion: [#422](https://github.com/Dreamacro/clash/issues/422)

## Clash Premium unable to access Internet

You can refer to these relevant discussions:

- [#432](https://github.com/Dreamacro/clash/issues/432#issuecomment-571634905)
- [#2480](https://github.com/Dreamacro/clash/issues/2480)

## error: unsupported rule type RULE-SET

If you stumbled on this error message:

```txt
FATA[0000] Parse config error: Rules[0] [RULE-SET,apple,REJECT] error: unsupported rule type RULE-SET
```

You're using Clash open-source edition. Rule Providers is currently only available in the [Premium core](https://github.com/Dreamacro/clash/releases/tag/premium). (it's free)

## DNS Hijack does not work

Since `tun.auto-route` does not intercept LAN traffic, if your system DNS is set to servers in private subnets, DNS hijack will not work. You can either:

1. Use a non-private DNS server as your system DNS like `1.1.1.1`
2. Or manually set up your system DNS to the Clash DNS (by default, `198.18.0.1`)
