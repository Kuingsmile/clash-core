---
sidebarTitle: "Feature: eBPF Redirect to TUN"
sidebarOrder: 3
---

# eBPF Redirect to TUN

eBPF redirect to TUN is a feature that intercepts all network traffic on a specific network interface and redirects it to the TUN interface. [Support from your kernel](https://github.com/iovisor/bcc/blob/master/INSTALL.md#kernel-configuration) is required.

::: warning
This feature conflicts with `tun.auto-route`.
:::

While it usually brings better performance compared to `tun.auto-redir` and `tun.auto-route`, it's less tested compared to `auto-route`. Therefore, you should proceed with caution.

## Configuration

```yaml
ebpf:
  redirect-to-tun:
    - eth0
```

## Known Issues

- This feature breaks Tailscaled, so you should use `tun.auto-route` instead.
