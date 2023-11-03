---
sidebarTitle: "功能: eBPF 重定向到 TUN"
sidebarOrder: 3
---

# 功能: eBPF 重定向到 TUN

eBPF 重定向到 TUN 是一项拦截特定网络接口上的所有网络流量, 并将其重定向到 TUN 接口的功能. 该功能需要[内核支持](https://github.com/iovisor/bcc/blob/master/INSTALL.md#kernel-configuration).

::: warning
此功能与 `tun.auto-route` 冲突.
:::

虽然它通常与 `tun.auto-redir` 和 `tun.auto-route` 相比具有更好的性能, 但与 `auto-route` 相比, 它并不够成熟. 因此, 您应该谨慎使用.

## 配置

```yaml
ebpf:
  redirect-to-tun:
    - eth0
```

## 已知问题

- 此功能与 Tailscaled 冲突, 因此您应该使用 `tun.auto-route` 作为替代.
