---
sidebarTitle: "功能: Script Shortcuts 脚本捷径"
sidebarOrder: 6
---

# Script Shortcuts 脚本捷径

Clash Premium 实现了基于 Python3 的脚本功能, 允许用户以动态灵活的方式为数据包选择策略.

您可以使用单个 Python 脚本控制整个规则匹配引擎, 也可以定义一些 Shortcuts 捷径并将它们与常规规则一起使用. 本页参考后者功能. 有关前者, 请参见 [脚本](./script.md).

此功能使得在 `rules` 模式下使用脚本成为可能. 默认情况下, DNS 解析将在 SCRIPT 规则中进行. 可以在规则后面添加 `no-resolve` 来阻止解析. (例如: `SCRIPT,quic,DIRECT,no-resolve`)

```yaml
mode: Rule

script:
  engine: expr # or starlark (10x to 20x slower)
  shortcuts:
    quic: network == 'udp' and dst_port == 443
    curl: resolve_process_name() == 'curl'
    # curl: resolve_process_path() == '/usr/bin/curl'

rules:
  - SCRIPT,quic,REJECT
```

## 评估引擎

[Expr](https://expr.medv.io/) 作为 Script Shortcuts 的默认引擎, 相比 Starlark 提供了 10 倍到 20 倍的性能提升.

[Starlark](https://github.com/google/starlark-go) 是一种类似 Python 的配置语言, 您也可以将其用于 Script Shortcuts.

## 变量

- network: string
- type: string
- src_ip: string
- dst_ip: string
- src_port: uint16
- dst_port: uint16
- inbound_port: uint16
- host: string
- process_path: string

::: warning
Starlark 目前不包含 `process_path` 变量.
:::

## 函数

```ts
type resolve_ip = (host: string) => string // ip string
type in_cidr = (ip: string, cidr: string) => boolean // ip in cidr
type in_ipset = (name: string, ip: string) => boolean // ip in ipset
type geoip = (ip: string) => string // country code
type match_provider = (name: string) => boolean // in rule provider
type resolve_process_name = () => string // find process name (curl .e.g)
type resolve_process_path = () => string // find process path (/usr/bin/curl .e.g)
```
