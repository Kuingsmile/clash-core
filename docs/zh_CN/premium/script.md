---
sidebarTitle: "功能: Script 脚本"
sidebarOrder: 5
---

# Script 脚本

Clash Premium 实现了基于 Python3 的脚本功能, 使用户能够以动态灵活的方式为数据包选择策略.

您可以使用单个 Python 脚本控制整个规则匹配引擎, 也可以定义一些快捷方式, 并与常规规则一起使用. 本页介绍了第一种功能, 有关后者, 请参见[Script Shortcuts 脚本捷径](./script-shortcuts.md).

## 控制整个规则匹配引擎

```yaml
mode: Script

# https://lancellc.gitbook.io/clash/clash-config-file/script
script:
  code: |
    def main(ctx, metadata):
      ip = metadata["dst_ip"] = ctx.resolve_ip(metadata["host"])
      if ip == "":
        return "DIRECT"

      code = ctx.geoip(ip)
      if code == "LAN" or code == "CN":
        return "DIRECT"

      return "Proxy" # default policy for requests which are not matched by any other script
```

如果您想使用 IP 规则 (即: IP-CIDR、GEOIP 等) , 您首先需要手动解析 IP 地址并将其分配给 metadata:

```python
def main(ctx, metadata):
    # ctx.rule_providers["geoip"].match(metadata) return false

    ip = ctx.resolve_ip(metadata["host"])
    if ip == "":
        return "DIRECT"
    metadata["dst_ip"] = ip

    # ctx.rule_providers["iprule"].match(metadata) return true

    return "Proxy"
```

Metadata 和 Context 的接口定义:

```ts
interface Metadata {
  type: string // socks5、http
  network: string // tcp
  host: string
  src_ip: string
  src_port: string
  dst_ip: string
  dst_port: string
  inbound_port: number
}

interface Context {
  resolve_ip: (host: string) => string // ip string
  resolve_process_name: (metadata: Metadata) => string
  resolve_process_path: (metadata: Metadata) => string
  geoip: (ip: string) => string // country code
  log: (log: string) => void
  proxy_providers: Record<string, Array<{ name: string, alive: boolean, delay: number }>>
  rule_providers: Record<string, { match: (metadata: Metadata) => boolean }>
}
```
