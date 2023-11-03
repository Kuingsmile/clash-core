---
sidebarTitle: "功能: TUN 设备"
sidebarOrder: 2
---

# TUN 设备

Premium 内核支持 TUN 设备. 作为网络层设备, 它可以用来处理 TCP、UDP、ICMP 流量. 它已经在生产环境中进行了广泛的测试和使用 - 您甚至可以用它来玩竞技游戏.

使用 Clash TUN 的最大优势之一是内置支持对操作系统路由表、路由规则和 nftable 的自动管理. 您可以通过选项 `tun.auto-route` 和 `tun.auto-redir` 来启用它. 这个功能替换了古老的配置选项 `redir-port`(TCP), 以方便配置和提高稳定性.

::: tip
`tun.auto-route` 仅在 macOS、Windows、Linux 和 Android 上可用, 并且仅接收 IPv4 流量。`tun.auto-redir` 仅在 Linux 上可用（需要内核 netlink 支持）。
:::

Clash 有两种可供选择的 TCP/IP 协议栈: `system` or `gvisor`. 为了获得最好的性能, 我们建议您优先使用 `system` 栈, 只有遇到兼容性问题时才使用 `gvisor`. 并且如果你遇到这样的情况, 请立即[提交 Issue](https://github.com/Dreamacro/clash/issues/new/choose).

## 技术限制

* 对于 Android, 控制设备位于 `/dev/tun` 而不是 `/dev/net/tun`, 您需要先创建一个软链接 (i.e. `ln -sf /dev/tun /dev/net/tun`)

* 如果系统 DNS 位于私有 IP 地址上, DNS 劫持可能会失败 (因为 `auto-route` 不会捕获私有网络流量).

## Linux, macOS 和 Windows

这是 TUN 功能的示例配置:

```yaml
interface-name: en0 # 与 `tun.auto-detect-interface` 冲突

tun:
  enable: true
  stack: system # or gvisor
  # dns-hijack:
  #   - 8.8.8.8:53
  #   - tcp://8.8.8.8:53
  #   - any:53
  #   - tcp://any:53
  auto-route: true # manage `ip route` and `ip rules`
  auto-redir: true # manage nftable REDIRECT
  auto-detect-interface: true # 与 `interface-name` 冲突
```

请注意, 由于使用了 TUN 设备和对系统路由表、nftable 的操作, Clash 在此处将需要超级用户权限来运行.

```shell
sudo ./clash
```

如果您的设备已经有一些 TUN 设备, Clash TUN 可能无法工作 - 您必须手动检查路由表和路由规则. 在这种情况下, `fake-ip-filter` 也许也有帮助.

## Windows

您需要访问 [WinTUN 网站](https://www.wintun.net) 并下载最新版本. 之后, 将 `wintun.dll` 复制到 Clash 主目录. 示例配置:

```yaml
tun:
  enable: true
  stack: gvisor # or system
  dns-hijack:
    - 198.18.0.2:53 # 当 `fake-ip-range` 是 198.18.0.1/16, 应该劫持 198.18.0.2:53
  auto-route: true # 为 Windows 自动设置全局路由
  # 推荐使用 `interface-name`
  auto-detect-interface: true # 自动检测接口, 与 `interface-name` 冲突
```
