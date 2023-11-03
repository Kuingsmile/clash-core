---
sidebarTitle: "Feature: Script"
sidebarOrder: 5
---

# Script

Clash Premium implements the Scripting feature powered by Python3, enableing users to programmatically select policies for the packets with dynamic flexibility.

You can either control the entire rule-matching engine with a single Python script, or define a number of shortcuts and use them in companion with the regular rules. This page refers to the first feature, for the latter, see [Script Shortcuts](./script-shortcuts.md).

## Scripting the entire rule-matching engine

```yaml
mode: Script

# https://lancellc.gitbook.io/clash/clash-config-file/script
script:
  code: |
    def main(ctx, metadata):
      ip = ctx.resolve_ip(metadata["host"])
      if ip == "":
        return "DIRECT"
      metadata["dst_ip"] = ip

      code = ctx.geoip(ip)
      if code == "LAN" or code == "CN":
        return "DIRECT"

      return "Proxy" # default policy for requests which are not matched by any other script
```

If you want to use ip rules (i.e.: IP-CIDR, GEOIP, etc), you will first need to manually resolve IP addresses and assign them to metadata:

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

Interface definition for Metadata and Context:

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
