---
sidebarTitle: Inbound
sidebarOrder: 3
---

# Inbound

Clash supports multiple inbound protocols, including:

- SOCKS5
- HTTP(S)
- Redirect TCP
- TProxy TCP
- TProxy UDP
- Linux TUN device (Premium only)

Connections to any inbound protocol listed above will be handled by the same internal rule-matching engine. That is to say, Clash does not (currently) support different rule sets for different inbounds.

## Configuration

```yaml
# Port of HTTP(S) proxy server on the local end
# port: 7890

# Port of SOCKS5 proxy server on the local end
# socks-port: 7891

# HTTP(S) and SOCKS4(A)/SOCKS5 server on the same port
mixed-port: 7890

# Transparent proxy server port for Linux and macOS (Redirect TCP and TProxy UDP)
# redir-port: 7892

# Transparent proxy server port for Linux (TProxy TCP and TProxy UDP)
# tproxy-port: 7893

# Allow clients other than 127.0.0.1 to connect to the inbounds
allow-lan: false
```

## The Mixed Port

The mixed port is a special port that supports both HTTP(S) and SOCKS5 protocols. You can have any programs that support either HTTP or SOCKS proxy to connect to this port, for example:

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

## Redirect and TProxy

Redirect and TProxy are two different ways of implementing transparent proxying. They are both supported by Clash.

However, you most likely don't need to mess with these two inbounds - we recommend using [Clash Premium](/premium/introduction) if you want to use transparent proxying, as it has built-in support of the automatic management of the route table, rules and nftables.
