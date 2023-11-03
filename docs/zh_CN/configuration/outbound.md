---
sidebarTitle: Outbound 出站
sidebarOrder: 4
---

# Outbound 出站

Clash 中有几种类型的出站. 每种类型都有自己的特点和使用场景. 在本页中, 我们将介绍每种类型的通用特点以及如何使用和配置它们.

[[toc]]

## Proxies 代理节点

Proxies 代理节点是您可以配置的一些出站目标. 就像代理服务器一样, 您在这里为数据包定义目的地.

### Shadowsocks

Clash 支持以下 Shadowsocks 的加密方法:

| 系列 | 加密方法 |
| ------ | ------- |
| AEAD | aes-128-gcm, aes-192-gcm, aes-256-gcm, chacha20-ietf-poly1305, xchacha20-ietf-poly1305 |
| 流式 | aes-128-cfb, aes-192-cfb, aes-256-cfb, rc4-md5, chacha20-ietf, xchacha20 |
| 块式 | aes-128-ctr, aes-192-ctr, aes-256-ctr |

此外, Clash 还支持流行的 Shadowsocks 插件 `obfs` 和 `v2ray-plugin`.

::: code-group

```yaml [basic]
- name: "ss1"
  type: ss
  # interface-name: eth0
  # routing-mark: 1234
  server: server
  port: 443
  cipher: chacha20-ietf-poly1305
  password: "password"
  # udp: true
```

```yaml [obfs]
- name: "ss2"
  type: ss
  # interface-name: eth0
  # routing-mark: 1234
  server: server
  port: 443
  cipher: chacha20-ietf-poly1305
  password: "password"
  plugin: obfs
  plugin-opts:
    mode: tls # or http
    # host: bing.com
```

```yaml [ws (websocket)]
- name: "ss3"
  type: ss
  # interface-name: eth0
  # routing-mark: 1234
  server: server
  port: 443
  cipher: chacha20-ietf-poly1305
  password: "password"
  plugin: v2ray-plugin
  plugin-opts:
    mode: websocket # 暂不支持 QUIC
    # tls: true # wss
    # skip-cert-verify: true
    # host: bing.com
    # path: "/"
    # mux: true
    # headers:
    #   custom: value
```

:::

### ShadowsocksR

Clash 也支持声名狼藉的反审查协议 ShadowsocksR.

支持以下 ShadowsocksR 的加密方法:

| 系列 | 加密方法 |
| ------ | ------- |
| 流式 | aes-128-cfb, aes-192-cfb, aes-256-cfb, rc4-md5, chacha20-ietf, xchacha20 |

支持的混淆方法:

- plain
- http_simple
- http_post
- random_head
- tls1.2_ticket_auth
- tls1.2_ticket_fastauth

支持的协议:

- origin
- auth_sha1_v4
- auth_aes128_md5
- auth_aes128_sha1
- auth_chain_a
- auth_chain_b

```yaml
- name: "ssr"
  type: ssr
  # interface-name: eth0
  # routing-mark: 1234
  server: server
  port: 443
  cipher: chacha20-ietf
  password: "password"
  obfs: tls1.2_ticket_auth
  protocol: auth_sha1_v4
  # obfs-param: domain.tld
  # protocol-param: "#"
  # udp: true
```

### Vmess

Clash 支持以下 Vmess 的加密方法:

- auto
- aes-128-gcm
- chacha20-poly1305
- none

::: code-group

```yaml [basic]
- name: "vmess"
  type: vmess
  # interface-name: eth0
  # routing-mark: 1234
  server: server
  port: 443
  uuid: uuid
  alterId: 32
  cipher: auto
  # udp: true
  # tls: true
  # skip-cert-verify: true
  # servername: example.com # 优先于 wss 主机
  # network: ws
  # ws-opts:
  #   path: /path
  #   headers:
  #     Host: v2ray.com
  #   max-early-data: 2048
  #   early-data-header-name: Sec-WebSocket-Protocol
```

```yaml [HTTP]
- name: "vmess-http"
  type: vmess
  # interface-name: eth0
  # routing-mark: 1234
  server: server
  port: 443
  uuid: uuid
  alterId: 32
  cipher: auto
  # udp: true
  # network: http
  # http-opts:
  #   # method: "GET"
  #   # path:
  #   #   - '/'
  #   #   - '/video'
  #   # headers:
  #   #   Connection:
  #   #     - keep-alive
```

```yaml [HTTP/2]
- name: "vmess-h2"
  type: vmess
  # interface-name: eth0
  # routing-mark: 1234
  server: server
  port: 443
  uuid: uuid
  alterId: 32
  cipher: auto
  network: h2
  tls: true
  h2-opts:
    host:
      - http.example.com
      - http-alt.example.com
    path: /
```

```yaml [gRPC]
- name: vmess-grpc
  type: vmess
  # interface-name: eth0
  # routing-mark: 1234
  server: server
  port: 443
  uuid: uuid
  alterId: 32
  cipher: auto
  network: grpc
  tls: true
  servername: example.com
  # skip-cert-verify: true
  grpc-opts:
    grpc-service-name: "example"
```

:::

### Socks5

此外, Clash 还支持 Socks5 代理.

```yaml
- name: "socks"
  type: socks5
  # interface-name: eth0
  # routing-mark: 1234
  server: server
  port: 443
  # username: username
  # password: password
  # tls: true
  # skip-cert-verify: true
  # udp: true
```

### HTTP

Clash 也支持 HTTP 代理:

::: code-group

```yaml [HTTP]
- name: "http"
  type: http
  # interface-name: eth0
  # routing-mark: 1234
  server: server
  port: 443
  # username: username
  # password: password
```

```yaml [HTTPS]
- name: "http"
  type: http
  # interface-name: eth0
  # routing-mark: 1234
  server: server
  port: 443
  # username: username
  # password: password
  tls: true
  skip-cert-verify: true
```

:::

### Snell

作为可选的反审查协议, Clash也集成了对Snell的支持.

```yaml
# 暂不支持 UDP
- name: "snell"
  type: snell
  # interface-name: eth0
  # routing-mark: 1234
  server: server
  port: 44046
  psk: yourpsk
  # version: 2
  # obfs-opts:
    # mode: http # or tls
    # host: bing.com
```

### Trojan

Clash 内置了对流行协议 Trojan 的支持:

::: code-group

```yaml [basic]
- name: "trojan"
  type: trojan
  # interface-name: eth0
  # routing-mark: 1234
  server: server
  port: 443
  password: yourpsk
  # udp: true
  # sni: example.com # aka server name
  # alpn:
  #   - h2
  #   - http/1.1
  # skip-cert-verify: true
```

```yaml [gRPC]
- name: trojan-grpc
  type: trojan
  # interface-name: eth0
  # routing-mark: 1234
  server: server
  port: 443
  password: "example"
  network: grpc
  sni: example.com
  # skip-cert-verify: true
  udp: true
  grpc-opts:
    grpc-service-name: "example"
```

```yaml  [ws (websocket)]
- name: trojan-ws
  type: trojan
  # interface-name: eth0
  # routing-mark: 1234
  server: server
  port: 443
  password: "example"
  network: ws
  sni: example.com
  # skip-cert-verify: true
  udp: true
  # ws-opts:
    # path: /path
    # headers:
    #   Host: example.com
```

:::

## Proxy Groups 策略组

Proxy Groups 策略组用于根据不同策略分发规则传递过来的请求, 其可以直接被规则引用, 也可以被其他策略组引用, 而最上级策略组被规则引用.

### relay 中继

请求将依次通过指定的代理服务器进行中继, 目前不支持 UDP. 指定的代理服务器不应包含另一个 relay 中继.

### url-test 延迟测试

Clash 会周期性地通过指定的 URL 向列表中的代理服务器发送 HTTP HEAD 请求来测试每个代理服务器的**延迟**. 可以设置最大容忍值、测试间隔和目标 URL.

### fallback 可用性测试

Clash 会周期性地通过指定的 URL 向列表中的代理服务器发送 HTTP HEAD 请求来测试每个代理服务器的**可用性**. 第一个可用的服务器将被使用.

### load-balance 负载均衡

相同 eTLD+1 的请求将使用同一个代理服务器.

### select 手动选择

Clash 启动时默认使用策略组中的第一个代理服务器. 用户可以使用 RESTful API 选择要使用的代理服务器. 在此模式下, 您可以在配置中硬编码服务器或使用 [Proxy Providers 代理集](#proxy-providers-代理集) 动态添加服务器.

无论哪种方式, 有时您也可以使用直接连接来路由数据包. 在这种情况下, 您可以使用 `DIRECT` 直连出站.

要使用不同的网络接口, 您需要使用包含 `DIRECT` 直连出站的策略组, 并设置 `interface-name` 选项.

```yaml
- name: "My Wireguard Outbound"
  type: select
  interface-name: wg0
  proxies: [ 'DIRECT' ]
```

## Proxy Providers 代理集

代理集使用户可以动态加载代理服务器列表, 而不是在配置文件中硬编码. 目前有两种代理集可以加载服务器列表:

- `http`: Clash 会在启动时从指定的 URL 加载服务器列表. 如果设置了 `interval` 选项, Clash 会定期从远程拉取服务器列表.
- `file`: Clash 会在启动时从指定的文件位置加载服务器列表.

健康检查对两种模式都可用, 并且与策略组中的 `fallback` 完全相同. 服务器列表文件的配置格式在主配置文件中也完全相同:

::: code-group

```yaml [config.yaml]
proxy-providers:
  provider1:
    type: http
    url: "url"
    interval: 3600
    path: ./provider1.yaml
    # filter: 'a|b' # golang regex 正则表达式
    health-check:
      enable: true
      interval: 600
      # lazy: true
      url: http://www.gstatic.com/generate_204
  test:
    type: file
    path: /test.yaml
    health-check:
      enable: true
      interval: 36000
      url: http://www.gstatic.com/generate_204
```

```yaml [test.yaml]
proxies:
  - name: "ss1"
    type: ss
    server: server
    port: 443
    cipher: chacha20-ietf-poly1305
    password: "password"

  - name: "ss2"
    type: ss
    server: server
    port: 443
    cipher: chacha20-ietf-poly1305
    password: "password"
    plugin: obfs
    plugin-opts:
      mode: tls
```

:::
