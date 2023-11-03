---
sidebarTitle: "功能: 用户空间 Wireguard"
sidebarOrder: 7
---

# 用户空间 Wireguard

由于依赖 gvisor TCP/IP 栈, 用户空间 Wireguard 目前仅在 Premium 内核中可用.

```yaml
proxies:
  - name: "wg"
    type: wireguard
    server: 127.0.0.1
    port: 443
    ip: 172.16.0.2
    # ipv6: your_ipv6
    private-key: eCtXsJZ27+4PbhDkHnB923tkUn2Gj59wZw5wFA75MnU=
    public-key: Cr8hWlKvtDt7nrvf+f0brNQQzabAqrjfBvas9pmowjo=
    # preshared-key: base64
    # remote-dns-resolve: true # 远程解析 DNS, 使用 `dns` 字段, 默认为 true
    # dns: [1.1.1.1, 8.8.8.8]
    # mtu: 1420
    udp: true
```
