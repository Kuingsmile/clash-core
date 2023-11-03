---
sidebarTitle: 基于规则的 OpenConnect
sidebarOrder: 2
---

# 基于规则的 OpenConnect

支持以下 OpenConnect:

- Cisco AnyConnect SSL VPN
- Juniper Network Connect
- Palo Alto Networks (PAN) GlobalProtect SSL VPN
- Pulse Connect Secure SSL VPN
- F5 BIG-IP SSL VPN
- FortiGate SSL VPN
- Array Networks SSL VPN

例如, 您的公司使用 Cisco AnyConnect 作为内部网络访问的方式. 这里我将向您展示如何使用 Clash 提供的策略路由来使用 OpenConnect.

首先, [安装 vpn-slice](https://github.com/dlenski/vpn-slice#requirements). 这个工具会覆写 OpenConnect 的默认路由表行为. 简单来说, 它会阻止 VPN 覆写您的默认路由.

接下来您需要一个脚本 (比如 `tun0.sh`) 类似于这样:

```sh
#!/bin/bash
ANYCONNECT_HOST="vpn.example.com"
ANYCONNECT_USER="john"
ANYCONNECT_PASSWORD="foobar"
ROUTING_TABLE_ID="6667"
TUN_INTERFACE="tun0"

# 如果服务器在中国大陆, 请添加 --no-dtls. 中国大陆的 UDP 会很卡.
echo "$ANYCONNECT_PASSWORD" | \
  openconnect \
    --non-inter \
    --passwd-on-stdin \
    --protocol=anyconnect \
    --interface $TUN_INTERFACE \
    --script "vpn-slice
if [ \"\$reason\" = 'connect' ]; then
  ip rule add from \$INTERNAL_IP4_ADDRESS table $ROUTING_TABLE_ID
  ip route add default dev \$TUNDEV scope link table $ROUTING_TABLE_ID
elif [ \"\$reason\" = 'disconnect' ]; then
  ip rule del from \$INTERNAL_IP4_ADDRESS table $ROUTING_TABLE_ID
  ip route del default dev \$TUNDEV scope link table $ROUTING_TABLE_ID
fi" \
    --user $ANYCONNECT_USER \
    https://$ANYCONNECT_HOST
```

之后, 我们将其配置成一个 systemd 服务. 创建 `/etc/systemd/system/tun0.service`:

```ini
[Unit]
Description=Cisco AnyConnect VPN
After=network-online.target
Conflicts=shutdown.target sleep.target

[Service]
Type=simple
ExecStart=/path/to/tun0.sh
KillSignal=SIGINT
Restart=always
RestartSec=3
StartLimitIntervalSec=0

[Install]
WantedBy=multi-user.target
```

然后我们启用并启动服务.

```shell
chmod +x /path/to/tun0.sh
systemctl daemon-reload
systemctl enable tun0
systemctl start tun0
```

这里您可以查看日志来查看它是否正常运行. 简单的方法是查看 `tun0` 接口是否已经创建.

和 Wireguard 类似, 将 TUN 设备作为出站很简单, 只需要添加一个策略组:

```yaml
proxy-groups:
  - name: Cisco AnyConnect VPN
    type: select
    interface-name: tun0
    proxies:
      - DIRECT
```

... 然后就可以使用了!

添加您想要的规则:

```yaml
rules:
  - DOMAIN-SUFFIX,internal.company.com,Cisco AnyConnect VPN
```

当您发现有问题时, 您应该查看 debug 级别的日志.
