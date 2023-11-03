---
sidebarTitle: "Feature: Script Shortcuts"
sidebarOrder: 6
---

# Script Shortcuts

Clash Premium implements the Scripting feature powered by Python3, enableing users to programmatically select policies for the packets with dynamic flexibility.

You can either controll the entire rule-matching engine with a single Python script, or define a number of shortcuts and use them in companion with the regular rules. This page refers to the latter feature. For the former, see [Script](./script.md).

This feature enables the use of script in `rules` mode. By default, DNS resolution takes place for SCRIPT rules. `no-resolve` can be appended to the rule to prevent the resolution. (i.e.: `SCRIPT,quic,DIRECT,no-resolve`)

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

## Evaluation Engines

[Expr](https://expr.medv.io/) is used as the default engine for Script Shortcuts, offering 10x to 20x performance boost compared to Starlark.

[Starlark](https://github.com/google/starlark-go) is a Python-like langauge for configuration purposes, you can also use it for Script Shortcuts.

## Variables

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
Starlark is missing `process_path` variable for now.
:::

## Functions

```ts
type resolve_ip = (host: string) => string // ip string
type in_cidr = (ip: string, cidr: string) => boolean // ip in cidr
type in_ipset = (name: string, ip: string) => boolean // ip in ipset
type geoip = (ip: string) => string // country code
type match_provider = (name: string) => boolean // in rule provider
type resolve_process_name = () => string // find process name (curl .e.g)
type resolve_process_path = () => string // find process path (/usr/bin/curl .e.g)
```
