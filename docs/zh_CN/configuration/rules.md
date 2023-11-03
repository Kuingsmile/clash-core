---
sidebarTitle: Rules 规则
sidebarOrder: 5
---

# Rules 规则

在[快速入手](/zh_CN/configuration/getting-started)中, 我们介绍了Clash中基于规则的匹配的基本知识. 在本章中, 我们将介绍最新版本的 Clash 中所有可用的规则类型.

```txt
# 类型,参数,策略(,no-resolve)
TYPE,ARGUMENT,POLICY(,no-resolve)
```

`no-resolve` 选项是可选的, 它用于跳过规则的 DNS 解析. 当您想要使用 `GEOIP`、`IP-CIDR`、`IP-CIDR6`、`SCRIPT` 规则, 但又不想立即将域名解析为 IP 地址时, 这个选项就很有用了.

[[toc]]

## 策略

目前有四种策略类型, 其中:

- DIRECT: 通过 `interface-name` 直接连接到目标 (不查找系统路由表)
- REJECT: 丢弃数据包
- Proxy: 将数据包路由到指定的代理服务器
- Proxy Group: 将数据包路由到指定的策略组

## 规则类型

以下部分介绍了每种规则类型及其使用方法:

### DOMAIN 域名

`DOMAIN,www.google.com,policy` 将 `www.google.com` 路由到 `policy`.

### DOMAIN-SUFFIX 域名后缀

`DOMAIN-SUFFIX,youtube.com,policy` 将任何以 `youtube.com` 结尾的域名路由到 `policy`.

在这种情况下, `www.youtube.com` 和 `foo.bar.youtube.com` 都将路由到 `policy`.

### DOMAIN-KEYWORD 域名关键字

`DOMAIN-KEYWORD,google,policy` 将任何包含 `google` 关键字的域名路由到 `policy`.

在这种情况下, `www.google.com` 或 `googleapis.com` 都将路由到 `policy`.

### GEOIP IP地理位置 (国家代码)

GEOIP 规则用于根据数据包的目标 IP 地址的**国家代码**路由数据包. Clash 使用 [MaxMind GeoLite2](https://dev.maxmind.com/geoip/geoip2/geolite2/) 数据库来实现这一功能.

::: warning
使用这种规则时, Clash 将域名解析为 IP 地址, 然后查找 IP 地址的国家代码.
如果要跳过 DNS 解析, 请使用 `no-resolve` 选项.
:::

`GEOIP,CN,policy` 将任何目标 IP 地址为中国的数据包路由到 `policy`.

### IP-CIDR IPv4地址段

IP-CIDR 规则用于根据数据包的**目标 IPv4 地址**路由数据包.

::: warning
使用这种规则时, Clash 将域名解析为 IPv4 地址.
如果要跳过 DNS 解析, 请使用 `no-resolve` 选项.
:::

`IP-CIDR,127.0.0.0/8,DIRECT` 将任何目标 IP 地址为 `127.0.0.0/8` 的数据包路由到 `DIRECT`.

### IP-CIDR6 IPv6地址段

IP-CIDR6 规则用于根据数据包的**目标 IPv6 地址**路由数据包.

::: warning
使用这种规则时, Clash 将域名解析为 IPv6 地址.
如果要跳过 DNS 解析, 请使用 `no-resolve` 选项.
:::

`IP-CIDR6,2620:0:2d0:200::7/32,policy` 将任何目标 IP 地址为 `2620:0:2d0:200::7/32` 的数据包路由到 `policy`.

### SRC-IP-CIDR 源IP段地址

SRC-IP-CIDR 规则用于根据数据包的**源 IPv4 地址**路由数据包.

`SRC-IP-CIDR,192.168.1.201/32,DIRECT` 将任何源 IP 地址为 `192.168.1.201/32` 的数据包路由到 `DIRECT`.

### SRC-PORT 源端口

SRC-PORT 规则用于根据数据包的**源端口**路由数据包.

`SRC-PORT,80,policy` 将任何源端口为 `80` 的数据包路由到 `policy`.

### DST-PORT 目标端口

DST-PORT 规则用于根据数据包的**目标端口**路由数据包.

`DST-PORT,80,policy` 将任何目标端口为 `80` 的数据包路由到 `policy`.

### PROCESS-NAME 源进程名

PROCESS-NAME 规则用于根据发送数据包的进程名称路由数据包.

::: warning
目前, 仅支持 macOS、Linux、FreeBSD 和 Windows.
:::

`PROCESS-NAME,nc,DIRECT` 将任何来自进程 `nc` 的数据包路由到 `DIRECT`.

### PROCESS-PATH 源进程路径

PROCESS-PATH 规则用于根据发送数据包的进程路径路由数据包.

::: warning
目前, 仅支持 macOS、Linux、FreeBSD 和 Windows.
:::

`PROCESS-PATH,/usr/local/bin/nc,DIRECT` 将任何来自路径为 `/usr/local/bin/nc` 的进程的数据包路由到 `DIRECT`.

### IPSET IP集

IPSET 规则用于根据 IP 集匹配并路由数据包. 根据 [IPSET 的官方网站](https://ipset.netfilter.org/) 的介绍:

> IP 集是 Linux 内核中的一个框架, 可以通过 ipset 程序进行管理. 根据类型, IP 集可以存储 IP 地址、网络、 (TCP/UDP) 端口号、MAC 地址、接口名称或它们以某种方式的组合, 以确保在集合中匹配条目时具有闪电般的速度.

因此, 此功能仅在 Linux 上工作, 并且需要安装 `ipset`.

::: warning
使用此规则时, Clash 将解析域名以获取 IP 地址, 然后查找 IP 地址是否在 IP 集中.
如果要跳过 DNS 解析, 请使用 `no-resolve` 选项.
:::

`IPSET,chnroute,policy` 将任何目标 IP 地址在 IP 集 `chnroute` 中的数据包路由到 `policy`.

### RULE-SET 规则集

::: info
此功能仅在 [Premium 版本](/zh_CN/premium/introduction) 中可用.
:::

RULE-SET 规则用于根据 [Rule Providers 规则集](/zh_CN/premium/rule-providers) 的结果路由数据包. 当 Clash 使用此规则时, 它会从指定的 Rule Providers 规则集中加载规则, 然后将数据包与规则进行匹配. 如果数据包与任何规则匹配, 则将数据包路由到指定的策略, 否则跳过此规则.

::: warning
使用 RULE-SET 时, 当规则集的类型为 IPCIDR , Clash 将解析域名以获取 IP 地址.
如果要跳过 DNS 解析, 请使用 `no-resolve` 选项.
:::

`RULE-SET,my-rule-provider,DIRECT` 从 `my-rule-provider` 加载所有规则

### SCRIPT 脚本

::: info
此功能仅在 [Premium 版本](/zh_CN/premium/introduction) 中可用.
:::

SCRIPT 规则用于根据脚本的结果路由数据包. 当 Clash 使用此规则时, 它会执行指定的脚本, 然后将数据包路由到脚本的输出.

::: warning
使用 SCRIPT 时, Clash 将解析域名以获取 IP 地址.
如果要跳过 DNS 解析, 请使用 `no-resolve` 选项.
:::

`SCRIPT,script-path,DIRECT` 将数据包路由到脚本 `script-path` 的输出.

### MATCH 全匹配

MATCH 规则用于路由剩余的数据包. 该规则是**必需**的, 通常用作最后一条规则.

`MATCH,policy` 将剩余的数据包路由到 `policy`.
