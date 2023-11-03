---
sidebarTitle: 介绍
sidebarOrder: 1
---

# 介绍

在本章中, 我们将介绍 Clash 的常见功能以及如何使用和配置它们.

Clash 使用 [YAML](https://yaml.org) (YAML Ain't Markup Language) 作为配置文件格式. YAML 旨在易于阅读、编写和解析, 通常用于配置文件.

## 了解 Clash 的工作原理

在继续之前, 有必要了解 Clash 的工作原理, 其中有两个关键部分:

![](/assets/connection-flow.png)

<!-- https://excalidraw.com/clash-connection-flow#json=OHsOdaqAUPuuN7VPvdZ9Z,NT7rRrtzRgbVIM0tpkPnGA -->

### Inbound 入站

Inbound 入站是在本地端监听的部分, 它通过打开一个本地端口并监听传入的连接来工作. 当连接进来时, Clash 会查询配置文件中配置的规则, 并决定连接应该去哪个 Outbound 出站.

### Outbound 出站

Outbound 出站是连接到远程端的部分. 根据配置的不同, 它可以是一个特定的网络接口、一个代理服务器或一个[策略组](/zh_CN/configuration/outbound#proxy-groups-策略组).

## 基于规则的路由

Clash 支持基于规则的路由, 这意味着您可以根据各种规则将数据包路由到不同的出站. 规则可以在配置文件的 `rules` 部分中定义.

有许多可用的规则类型, 每种规则类型都有自己的语法. 规则的一般语法是:

```txt
# 类型,参数,策略(,no-resolve)
TYPE,ARGUMENT,POLICY(,no-resolve)
```

在下一步指南中, 您将了解有关如何配置规则的更多信息.
