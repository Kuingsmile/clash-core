---
sidebarTitle: Outbound
sidebarOrder: 4
---

# Outbound

There are several types of outbound targets in Clash. Each type has its own features and usage scenarios. In this page, we'll cover the common features of each type and how they should be used and configured.

[[toc]]

## Proxies

Proxies are some outbound targets that you can configure. Like proxy servers, you define destinations for the packets here.

### Shadowsocks

Clash supports the following ciphers (encryption methods) for Shadowsocks:

| Family | Ciphers |
| ------ | ------- |
| AEAD | aes-128-gcm, aes-192-gcm, aes-256-gcm, chacha20-ietf-poly1305, xchacha20-ietf-poly1305 |
| Stream | aes-128-cfb, aes-192-cfb, aes-256-cfb, rc4-md5, chacha20-ietf, xchacha20 |
| Block | aes-128-ctr, aes-192-ctr, aes-256-ctr |

In addition, Clash also supports popular Shadowsocks plugins `obfs` and `v2ray-plugin`.

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
    mode: websocket # no QUIC now
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

Clash supports the infamous anti-censorship protocol ShadowsocksR as well. The supported ciphers:

| Family | Ciphers |
| ------ | ------- |
| Stream | aes-128-cfb, aes-192-cfb, aes-256-cfb, rc4-md5, chacha20-ietf, xchacha20 |

Supported obfuscation methods:

- plain
- http_simple
- http_post
- random_head
- tls1.2_ticket_auth
- tls1.2_ticket_fastauth

Supported protocols:

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

Clash supports the following ciphers (encryption methods) for Vmess:

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
  # servername: example.com # priority over wss host
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

### SOCKS5

In addition, Clash supports SOCKS5 outbound as well:

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

Clash also supports HTTP outbound:

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
  tls: true
  # skip-cert-verify: true
  # sni: custom.com
  # username: username
  # password: password
```

:::

### Snell

Being an alternative protocol for anti-censorship, Clash has integrated support for Snell as well.

::: tip
Clash does not support Snell v4. ([#2466](https://github.com/Dreamacro/clash/issues/2466))
:::

```yaml
# No UDP support yet
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

Clash has built support for the popular protocol Trojan:

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

## Proxy Groups

Proxy Groups are groups of proxies that you can use directly as a rule policy.

### relay

The request sent to this proxy group will be relayed through the specified proxy servers sequently. There's currently no UDP support on this. The specified proxy servers should not contain another relay.

### url-test

Clash benchmarks each proxy servers in the list, by sending HTTP HEAD requests to a specified URL through these servers periodically. It's possible to set a maximum tolerance value, benchmarking interval, and the target URL.

### fallback

Clash periodically tests the availability of servers in the list with the same mechanism of `url-test`. The first available server will be used.

### load-balance

The request to the same eTLD+1 will be dialed with the same proxy.

### select

The first server is by default used when Clash starts up. Users can choose the server to use with the RESTful API. In this mode, you can hardcode servers in the config or use [Proxy Providers](#proxy-providers).

Either way, sometimes you might as well just route packets with a direct connection. In this case, you can use the `DIRECT` outbound.

To use a different network interface, you will need to use a Proxy Group that contains a `DIRECT` outbound with the `interface-name` option set.

```yaml
- name: "My Wireguard Outbound"
  type: select
  interface-name: wg0
  proxies: [ 'DIRECT' ]
```

## Proxy Providers

Proxy Providers give users the power to load proxy server lists dynamically, instead of hardcoding them in the configuration file. There are currently two sources for a proxy provider to load server list from:

- `http`: Clash loads the server list from a specified URL on startup. Clash periodically pulls the server list from remote if the `interval` option is set.
- `file`: Clash loads the server list from a specified location on the filesystem on startup.

Health check is available for both modes, and works exactly like `fallback` in Proxy Groups. The configuration format for the server list files is also exactly the same in the main configuration file:

::: code-group

```yaml [config.yaml]
proxy-providers:
  provider1:
    type: http
    url: "url"
    interval: 3600
    path: ./provider1.yaml
    # filter: 'a|b' # golang regex string
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
