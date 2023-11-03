---
sidebarTitle: Rule-based Wireguard
sidebarOrder: 1
---

# Rule-based Wireguard

Suppose your kernel supports Wireguard and you have it enabled. The `Table` option stops _wg-quick_ from overriding default routes.

Example `wg0.conf`:

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

Then in Clash you would only need to have a DIRECT proxy group that has a specific outbound interface:

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

This should perform better than whereas if Clash implemented its own userspace Wireguard client. Wireguard is supported in the kernel.
