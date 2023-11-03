---
sidebarTitle: Inbound 入站
sidebarOrder: 3
---

# Inbound 入站

Clash 支持多种入站协议, 包括:

- SOCKS5
- HTTP(S)
- Redirect TCP
- TProxy TCP
- TProxy UDP
- Linux TUN 设备 (仅 Premium 版本)

任何入站协议的连接都将由同一个内部规则匹配引擎处理. 也就是说, Clash **目前**不支持为不同的入站协议设置不同的规则集.

## 配置

```yaml
# HTTP(S) 代理服务端口
# port: 7890

# SOCKS5 代理服务端口
socks-port: 7891

# HTTP(S) 和 SOCKS4(A)/SOCKS5 代理服务共用一个端口
mixed-port: 7890

# Linux 和 macOS 的透明代理服务端口 (TCP 和 TProxy UDP 重定向)
# redir-port: 7892

# Linux 的透明代理服务端口 (TProxy TCP 和 TProxy UDP)
# tproxy-port: 7893

# 设置为 true 以允许来自其他 LAN IP 地址的连接
# allow-lan: false
```

## Mixed 混合端口

混合端口是一个特殊的端口, 它同时支持 HTTP(S) 和 SOCKS5 协议. 您可以使用任何支持 HTTP 或 SOCKS 代理的程序连接到这个端口, 例如:

```shell
$ curl -x socks5h://127.0.0.1:7890 -v http://connect.rom.miui.com/generate_204
*   Trying 127.0.0.1:7890...
* SOCKS5 connect to connect.rom.miui.com:80 (remotely resolved)
* SOCKS5 request granted.
* Connected to (nil) (127.0.0.1) port 7890 (#0)
> GET /generate_204 HTTP/1.1
> Host: connect.rom.miui.com
> User-Agent: curl/7.81.0
> Accept: */*
>
* Mark bundle as not supporting multiuse
< HTTP/1.1 204 No Content
< Date: Thu, 11 May 2023 06:18:22 GMT
< Connection: keep-alive
< Content-Type: text/plain
<
* Connection #0 to host (nil) left intact
```

## Redirect 和 TProxy

Redirect 和 TProxy 是两种实现透明代理的不同方式, 均被 Clash 所支持.

然而, 您不一定需要手动设置这两个功能 - 我们建议您使用 [Clash Premium 版本](/zh_CN/premium/introduction) 来配置透明代理, 因为它内置了对操作系统路由表、规则和 nftables 的自动管理.
