---
sidebarTitle: Rules
sidebarOrder: 5
---

# Rules

In the Getting Started guide, we covered the basics of rule-based matching in Clash. In this chapter, we'll cover all available rule types in the latest version of Clash.

```txt
TYPE,ARGUMENT,POLICY(,no-resolve)
```

The `no-resolve` option is optional, and it's used to skip DNS resolution for the rule. It's useful when you want to use `GEOIP`, `IP-CIDR`, `IP-CIDR6`, `SCRIPT` rules, but don't want to resolve the domain name to an IP address just yet.

[[toc]]

## Policy

There are four types of POLICY for now, in which:

- DIRECT: directly connects to the target through `interface-name` (does not lookup system route table)
- REJECT: drops the packet
- Proxy: routes the packet to the specified proxy server
- Proxy Group: routes the packet to the specified proxy group

## Types of rules

There are a number of rules where one might find useful. The following section covers each rule type and how they should be used.

### DOMAIN

`DOMAIN,www.google.com,policy` routes only `www.google.com` to `policy`.

### DOMAIN-SUFFIX

`DOMAIN-SUFFIX,youtube.com,policy` routes any domain names that ends with `youtube.com`.

In this case, `www.youtube.com` and `foo.bar.youtube.com` will be routed to `policy`.

### DOMAIN-KEYWORD

`DOMAIN-KEYWORD,google,policy` routes any domain names to policy that contains `google`.

In this case, `www.google.com` or `googleapis.com` are routed to `policy`.

### GEOIP

GEOIP rules are used to route packets based on the **country code** of the target IP address. Clash uses [MaxMind GeoLite2](https://dev.maxmind.com/geoip/geoip2/geolite2/) database for this feature.

::: warning
When encountering this rule, Clash will resolve the domain name to an IP address and then look up the country code of the IP address. If you want to skip the DNS resolution, use `no-resolve` option.
:::

`GEOIP,CN,policy` routes any packets destined to a China IP address to `policy`.

### IP-CIDR

IP-CIDR rules are used to route packets based on the **destination IPv4 address** of the packet.

::: warning
When encountering this rule, Clash will resolve the domain name to an IP address. If you want to skip the DNS resolution, use `no-resolve` option.
:::

`IP-CIDR,127.0.0.0/8,DIRECT` routes any packets destined to `127.0.0.0/8` to the `DIRECT` outbound.

### IP-CIDR6

IP-CIDR6 rules are used to route packets based on the **destination IPv6 address** of the packet.

::: warning
When encountering this rule, Clash will resolve the domain name to an IP address. If you want to skip the DNS resolution, use `no-resolve` option.
:::

`IP-CIDR6,2620:0:2d0:200::7/32,policy` routes any packets destined to `2620:0:2d0:200::7/32` to `policy`.

### SRC-IP-CIDR

SRC-IP-CIDR rules are used to route packets based on the **source IPv4 address** of the packet.

`SRC-IP-CIDR,192.168.1.201/32,DIRECT` routes any packets **from** `192.168.1.201/32` to the `DIRECT` policy.

### SRC-PORT

SRC-PORT rules are used to route packets based on the **source port** of the packet.

`SRC-PORT,80,policy` routes any packets **from** the port 80 to `policy`.

### DST-PORT

DST-PORT rules are used to route packets based on the **destination port** of the packet.

`DST-PORT,80,policy` routes any packets **to** the port 80 to `policy`.

### PROCESS-NAME

PROCESS-NAME rules are used to route packets based on the name of process that is sending the packet.

::: warning
Currently, only macOS, Linux, FreeBSD and Windows are supported.
:::

`PROCESS-NAME,nc,DIRECT` routes all packets from the process `nc` to the `DIRECT` outbound.

### PROCESS-PATH

PROCESS-PATH rules are used to route packets based on the PATH of process that is sending the packet.

::: warning
Currently, only macOS, Linux, FreeBSD and Windows are supported.
:::

`PROCESS-PATH,/bin/sh,DIRECT` routes all packets from the process `/bin/sh` to the `DIRECT` outbound.

### IPSET

IPSET rules are used to match against an IP set and route packets based on the result. According to the [official website of IPSET](https://ipset.netfilter.org/):

> IP sets are a framework inside the Linux kernel, which can be administered by the ipset utility. Depending on the type, an IP set may store IP addresses, networks, (TCP/UDP) port numbers, MAC addresses, interface names or combinations of them in a way, which ensures lightning speed when matching an entry against a set.

Therefore, this feature only works on Linux and requires `ipset` to be installed.

::: warning
When encountering this rule, Clash will resolve the domain name to an IP address. If you want to skip the DNS resolution, use `no-resolve` option.
:::

`IPSET,chinaip,DIRECT` routes all packets with destination IPs matching the `chinaip` IPSET to DIRECT outbound.

### RULE-SET

::: info
This feature is only available in the [Premium](/premium/introduction) edtion.
:::

RULE-SET rules are used to route packets based on the result of a [rule provider](/premium/rule-providers). When Clash encounters this rule, it loads the rules from the specified rule provider and then matches the packet against the rules. If the packet matches any of the rules, the packet will be routed to the specified policy, otherwise the rule is skipped.

::: warning
When encountering RULE-SET, Clash will resolve the domain name to an IP address **when the ruleset is of type IPCIDR**. If you want to skip the DNS resolution, use `no-resolve` option for the RULE-SET entry.
:::

`RULE-SET,my-rule-provider,DIRECT` loads all rules from `my-rule-provider` and sends the matched packets to the `DIRECT` outbound.

### SCRIPT

::: info
This feature is only available in the [Premium](/premium/introduction) edtion.
:::

SCRIPT rules are special rules that are used to route packets based on the result of a [script shortcut](/premium/script-shortcuts). When Clash encounters this rule, it evaluates the expression. If it returns `true`, the packet will be routed to the specified policy, otherwise the rule is skipped.

::: warning
When encountering this rule, Clash will resolve the domain name to an IP address. If you want to skip the DNS resolution, use `no-resolve` option.
:::

`SCRIPT,SHORTCUT-NAME,policy` routes any packets to `policy` if they have the shortcut evaluated `true`.

### MATCH

`MATCH,policy` routes the rest of the packets to `policy`. This rule is **required** and is usually used as the last rule.
