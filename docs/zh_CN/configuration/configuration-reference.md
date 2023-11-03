---
sidebarTitle: 参考配置
sidebarOrder: 7
---

# 参考配置

```yaml
# HTTP(S) 代理服务端口
port: 7890

# SOCKS5 代理服务端口
socks-port: 7891

# Linux 和 macOS 的透明代理服务端口 (TCP 和 TProxy UDP 重定向)
# redir-port: 7892

# Linux 的透明代理服务端口 (TProxy TCP 和 TProxy UDP)
# tproxy-port: 7893

# HTTP(S) 和 SOCKS4(A)/SOCKS5 代理服务共用一个端口
# mixed-port: 7890

# 本地 SOCKS5/HTTP(S) 代理服务的认证
# authentication:
#  - "user1:pass1"
#  - "user2:pass2"

# 设置为 true 以允许来自其他 LAN IP 地址的连接
# allow-lan: false

# 仅当 `allow-lan` 为 `true` 时有效
# '*': 绑定所有 IP 地址
# 192.168.122.11: 绑定单个 IPv4 地址
# "[aaaa::a8aa:ff:fe09:57d8]": 绑定单个 IPv6 地址
# bind-address: '*'

# Clash 路由工作模式
# rule: 基于规则的数据包路由
# global: 所有数据包将被转发到单个节点
# direct: 直接将数据包转发到互联网
mode: rule

# 默认情况下, Clash 将日志打印到 STDOUT
# 日志级别: info / warning / error / debug / silent
# log-level: info

# 当设置为 false 时, 解析器不会将主机名解析为 IPv6 地址
# ipv6: false

# RESTful Web API 监听地址
external-controller: 127.0.0.1:9090

# 配置目录的相对路径或静态 Web 资源目录的绝对路径. Clash core 将在
# `http://{{external-controller}}/ui` 中提供服务.
# external-ui: folder

# RESTful API 密钥 (可选)
# 通过指定 HTTP 头 `Authorization: Bearer ${secret}` 进行身份验证
# 如果RESTful API在 0.0.0.0 上监听, 务必设置一个 secret 密钥.
# secret: ""

# 出站接口名称
# interface-name: en0

# fwmark (仅在 Linux 上有效)
# routing-mark: 6666

# 用于DNS服务器和连接建立的静态主机 (如/etc/hosts) .
#
# 支持通配符主机名 (例如 *.clash.dev, *.foo.*.example.com)
# 非通配符域名优先级高于通配符域名
# 例如 foo.example.com > *.example.com > .example.com
# P.S. +.foo.com 等于 .foo.com 和 foo.com
# hosts:
  # '*.clash.dev': 127.0.0.1
  # '.dev': 127.0.0.1
  # 'alpha.clash.dev': '::1'

# profile:
  # 将 `select` 手动选择 结果存储在 $HOME/.config/clash/.cache 中
  # 如果不需要此行为, 请设置为 false
  # 当两个不同的配置具有同名的组时, 将共享所选值
  # store-selected: true

  # 持久化 fakeip
  # store-fake-ip: false

# DNS 服务设置
# 此部分是可选的. 当不存在时, DNS 服务将被禁用.
dns:
  enable: false
  listen: 0.0.0.0:53
  # ipv6: false # 当为 false 时, AAAA 查询的响应将为空

  # 这些 名称服务器(nameservers) 用于解析下列 DNS 名称服务器主机名.
  # 仅指定 IP 地址
  default-nameserver:
    - 114.114.114.114
    - 8.8.8.8
  # enhanced-mode: fake-ip
  fake-ip-range: 198.18.0.1/16 # Fake IP 地址池 CIDR
  # use-hosts: true # 查找 hosts 并返回 IP 记录

  # search-domains: [local] # A/AAAA 记录的搜索域

  # 此列表中的主机名将不会使用 Fake IP 解析
  # 即, 对这些域名的请求将始终使用其真实 IP 地址进行响应
  # fake-ip-filter:
  #   - '*.lan'
  #   - localhost.ptlogin2.qq.com

  # 支持 UDP、TCP、DoT、DoH. 您可以指定要连接的端口.
  # 所有 DNS 查询都直接发送到名称服务器, 无需代理
  # Clash 使用第一个收到的响应作为 DNS 查询的结果.
  nameserver:
    - 114.114.114.114 # 默认值
    - 8.8.8.8 # 默认值
    - tls://dns.rubyfish.cn:853 # DNS over TLS
    - https://1.1.1.1/dns-query # DNS over HTTPS
    - dhcp://en0 # 来自 dhcp 的 dns
    # - '8.8.8.8#en0'

  # 当 `fallback` 存在时, DNS 服务器将向此部分中的服务器
  # 与 `nameservers` 中的服务器发送并发请求
  # 当 GEOIP 国家不是 `CN` 时, 将使用 fallback 服务器的响应
  # fallback:
  #   - tcp://1.1.1.1
  #   - 'tcp://1.1.1.1#en0'

  # 如果使用 `nameservers` 解析的 IP 地址在下面指定的子网中,
  # 则认为它们无效, 并使用 `fallback` 服务器的结果.
  #
  # 当 `fallback-filter.geoip` 为 true 且 IP 地址的 GEOIP 为 `CN` 时,
  # 将使用 `nameservers` 服务器解析的 IP 地址.
  #
  # 如果 `fallback-filter.geoip` 为 false, 且不匹配 `fallback-filter.ipcidr`,
  # 则始终使用 `nameservers` 服务器的结果
  #
  # 这是对抗 DNS 污染攻击的一种措施.
  # fallback-filter:
  #   geoip: true
  #   geoip-code: CN
  #   ipcidr:
  #     - 240.0.0.0/4
  #   domain:
  #     - '+.google.com'
  #     - '+.facebook.com'
  #     - '+.youtube.com'

  # 通过特定的名称服务器查找域名
  # nameserver-policy:
  #   'www.baidu.com': '114.114.114.114'
  #   '+.internal.crop.com': '10.0.0.1'

proxies:
  # Shadowsocks
  # 支持的加密方法:
  #   aes-128-gcm aes-192-gcm aes-256-gcm
  #   aes-128-cfb aes-192-cfb aes-256-cfb
  #   aes-128-ctr aes-192-ctr aes-256-ctr
  #   rc4-md5 chacha20-ietf xchacha20
  #   chacha20-ietf-poly1305 xchacha20-ietf-poly1305
  - name: "ss1"
    type: ss
    server: server
    port: 443
    cipher: chacha20-ietf-poly1305
    password: "password"
    # udp: true

  - name: "ss2"
    type: ss
    server: server
    port: 443
    cipher: chacha20-ietf-poly1305
    password: "password"
    plugin: obfs
    plugin-opts:
      mode: tls # or http
      # host: bing.com

  - name: "ss3"
    type: ss
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

  # vmess
  # 支持的加密方法:
  #  auto/aes-128-gcm/chacha20-poly1305/none
  - name: "vmess"
    type: vmess
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

  - name: "vmess-h2"
    type: vmess
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

  - name: "vmess-http"
    type: vmess
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

  - name: vmess-grpc
    server: server
    port: 443
    type: vmess
    uuid: uuid
    alterId: 32
    cipher: auto
    network: grpc
    tls: true
    servername: example.com
    # skip-cert-verify: true
    grpc-opts:
      grpc-service-name: "example"

  # socks5
  - name: "socks"
    type: socks5
    server: server
    port: 443
    # username: username
    # password: password
    # tls: true
    # skip-cert-verify: true
    # udp: true

  # http
  - name: "http"
    type: http
    server: server
    port: 443
    # username: username
    # password: password
    # tls: true # https
    # skip-cert-verify: true
    # sni: custom.com

  # Snell
  # 请注意, 目前还没有UDP支持.
  - name: "snell"
    type: snell
    server: server
    port: 44046
    psk: yourpsk
    # version: 2
    # obfs-opts:
      # mode: http # or tls
      # host: bing.com

  # Trojan
  - name: "trojan"
    type: trojan
    server: server
    port: 443
    password: yourpsk
    # udp: true
    # sni: example.com # aka 服务器名称
    # alpn:
    #   - h2
    #   - http/1.1
    # skip-cert-verify: true

  - name: trojan-grpc
    server: server
    port: 443
    type: trojan
    password: "example"
    network: grpc
    sni: example.com
    # skip-cert-verify: true
    udp: true
    grpc-opts:
      grpc-service-name: "example"

  - name: trojan-ws
    server: server
    port: 443
    type: trojan
    password: "example"
    network: ws
    sni: example.com
    # skip-cert-verify: true
    udp: true
    # ws-opts:
      # path: /path
      # headers:
      #   Host: example.com

  # ShadowsocksR
  # 支持的加密方法: ss 中的所有流加密方法
  # 支持的混淆方式:
  #   plain http_simple http_post
  #   random_head tls1.2_ticket_auth tls1.2_ticket_fastauth
  # 支持的协议:
  #   origin auth_sha1_v4 auth_aes128_md5
  #   auth_aes128_sha1 auth_chain_a auth_chain_b
  - name: "ssr"
    type: ssr
    server: server
    port: 443
    cipher: chacha20-ietf
    password: "password"
    obfs: tls1.2_ticket_auth
    protocol: auth_sha1_v4
    # obfs-param: domain.tld
    # protocol-param: "#"
    # udp: true

proxy-groups:
  # 中继链路代理节点. 节点不应包含中继. 不支持 UDP.
  # 流量节点链路: clash <-> http <-> vmess <-> ss1 <-> ss2 <-> Internet
  - name: "relay"
    type: relay
    proxies:
      - http
      - vmess
      - ss1
      - ss2

  # url-test 通过对 指定URL 进行基准速度测试来选择将使用哪个代理.
  - name: "auto"
    type: url-test
    proxies:
      - ss1
      - ss2
      - vmess1
    # tolerance: 150
    # lazy: true
    url: 'http://www.gstatic.com/generate_204'
    interval: 300

  # fallback-auto 基于优先级选择可用策略. 可用性通过访问 指定URL 来测试, 就像自动 url-test 组一样.
  - name: "fallback-auto"
    type: fallback
    proxies:
      - ss1
      - ss2
      - vmess1
    url: 'http://www.gstatic.com/generate_204'
    interval: 300

  # 负载均衡: 同一 eTLD+1 的请求将拨号到同一代理.
  - name: "load-balance"
    type: load-balance
    proxies:
      - ss1
      - ss2
      - vmess1
    url: 'http://www.gstatic.com/generate_204'
    interval: 300
    # strategy: consistent-hashing # or round-robin

  # select 手动选择, 用于选择代理或策略组
  # 您可以使用 RESTful API 来切换代理, 建议在GUI中切换.
  - name: Proxy
    type: select
    # disable-udp: true
    # filter: 'someregex'
    proxies:
      - ss1
      - ss2
      - vmess1
      - auto

  # 直接连接到另一个接口名称或 fwmark, 也支持代理
  - name: en1
    type: select
    interface-name: en1
    routing-mark: 6667
    proxies:
      - DIRECT

  - name: UseProvider
    type: select
    use:
      - provider1
    proxies:
      - Proxy
      - DIRECT

proxy-providers:
  provider1:
    type: http
    url: "url"
    interval: 3600
    path: ./provider1.yaml
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

tunnels:
  # 单行配置
  - tcp/udp,127.0.0.1:6553,114.114.114.114:53,proxy
  - tcp,127.0.0.1:6666,rds.mysql.com:3306,vpn
  # 全 yaml 配置
  - network: [tcp, udp]
    address: 127.0.0.1:7777
    target: target.com
    proxy: proxy

rules:
  - DOMAIN-SUFFIX,google.com,auto
  - DOMAIN-KEYWORD,google,auto
  - DOMAIN,google.com,auto
  - DOMAIN-SUFFIX,ad.com,REJECT
  - SRC-IP-CIDR,192.168.1.201/32,DIRECT
  # 用于 IP 规则 (GEOIP, IP-CIDR, IP-CIDR6) 的可选参数 "no-resolve"
  - IP-CIDR,127.0.0.0/8,DIRECT
  - GEOIP,CN,DIRECT
  - DST-PORT,80,DIRECT
  - SRC-PORT,7777,DIRECT
  - RULE-SET,apple,REJECT # 仅 Premium 版本支持
  - MATCH,auto
```
