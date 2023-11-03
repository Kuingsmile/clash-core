---
sidebarTitle: Rule-based OpenConnect
sidebarOrder: 2
---

# Rule-based OpenConnect

OpenConnect supports Cisco AnyConnect SSL VPN, Juniper Network Connect, Palo Alto Networks (PAN) GlobalProtect SSL VPN, Pulse Connect Secure SSL VPN, F5 BIG-IP SSL VPN, FortiGate SSL VPN and Array Networks SSL VPN.

For example, there would be a use case where your company uses Cisco AnyConnect for internal network access. Here I'll show you how you can use OpenConnect with policy routing powered by Clash.

First, [install vpn-slice](https://github.com/dlenski/vpn-slice#requirements). This tool overrides default routing table behaviour of OpenConnect. Simply saying, it stops the VPN from overriding your default routes.

Next you would have a script (let's say `tun0.sh`) similar to this:

```sh
#!/bin/bash
ANYCONNECT_HOST="vpn.example.com"
ANYCONNECT_USER="john"
ANYCONNECT_PASSWORD="foobar"
ROUTING_TABLE_ID="6667"
TUN_INTERFACE="tun0"

# Add --no-dtls if the server is in mainland China. UDP in China is choppy.
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

After that, we configure it as a systemd service. Create `/etc/systemd/system/tun0.service`:

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

Then we enable & start the service.

```shell
chmod +x /path/to/tun0.sh
systemctl daemon-reload
systemctl enable tun0
systemctl start tun0
```

From here you can look at the logs to see if it's running properly. Simple way is to look at if `tun0` interface has been created.

Similar to the Wireguard one, having an outbound to a TUN device is simple as adding a proxy group:

```yaml
proxy-groups:
  - name: Cisco AnyConnect VPN
    type: select
    interface-name: tun0
    proxies:
      - DIRECT
```

... and it's ready to use! Add the desired rules:

```yaml
rules:
  - DOMAIN-SUFFIX,internal.company.com,Cisco AnyConnect VPN
```

You should look at the debug level logs when something does not seem right.

