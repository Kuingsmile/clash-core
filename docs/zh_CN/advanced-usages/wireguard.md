---
sidebarTitle: 基于规则的 Wireguard
sidebarOrder: 1
---

# 基于规则的 Wireguard

假设您的内核支持 Wireguard 并且您已经启用了它. `Table` 选项可以阻止 _wg-quick_ 覆写默认路由.

例如 `wg0.conf`:

```ini
[Interface]
PrivateKey = ...
Address = 172.16.0.1/32
MTU = ...
Table = off
PostUp = ip rule add from 172.16.0.1/32 table 6666

[Peer]
AllowedIPs = 0.0.0.0/0
AllowedIPs = ::/0
PublicKey = ...
Endpoint = ...
```

然后在 Clash 中您只需要有一个 DIRECT 策略组, 它包含一个指定的出站接口:

```yaml
proxy-groups:
  - name: Wireguard
    type: select
    interface-name: wg0
    proxies:
      - DIRECT
rules:
  - DOMAIN,google.com,Wireguard
```

这通常比 Clash 自己实现的用户空间 Wireguard 客户端性能更好. Wireguard 在内核中支持.
