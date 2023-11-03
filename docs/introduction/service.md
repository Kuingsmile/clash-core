---
sidebarTitle: Clash as a Service
sidebarOrder: 3
---

# Clash as a Service

While Clash is meant to be run in the background, there's currently no elegant way to implement daemons with Golang, hence we recommend you to daemonize Clash with third-party tools.

## systemd

Copy Clash binary to `/usr/local/bin` and configuration files to `/etc/clash`:

```shell
cp clash /usr/local/bin
cp config.yaml /etc/clash/
cp Country.mmdb /etc/clash/
```

Create the systemd configuration file at `/etc/systemd/system/clash.service`:

```ini
[Unit]
Description=Clash daemon, A rule-based proxy in Go.
After=network-online.target

[Service]
Type=simple
Restart=always
ExecStart=/usr/local/bin/clash -d /etc/clash

[Install]
WantedBy=multi-user.target
```

After that you're supposed to reload systemd:

```shell
systemctl daemon-reload
```

Launch clashd on system startup with:

```shell
systemctl enable clash
```

Launch clashd immediately with:

```shell
systemctl start clash
```

Check the health and logs of Clash with:

```shell
systemctl status clash
journalctl -xe
```

Credits to [ktechmidas](https://github.com/ktechmidas) for this guide. ([#754](https://github.com/Dreamacro/clash/issues/754))

## Docker

We provide pre-built images of Clash and Clash Premium. Therefore you can deploy Clash with [Docker Compose](https://docs.docker.com/compose/) if you're on Linux. However, you should be advised that it's [not recommended](https://github.com/Dreamacro/clash/issues/2249#issuecomment-1203494599) to run **Clash Premium** in a container.

::: warning
This setup will not work on macOS systems due to the lack of [host networking and TUN support](https://github.com/Dreamacro/clash/issues/770#issuecomment-650951876) in Docker for Mac.
:::


::: code-group

```yaml [Clash]
services:
  clash:
    image: ghcr.io/dreamacro/clash
    restart: always
    volumes:
      - ./config.yaml:/root/.config/clash/config.yaml:ro
      # - ./ui:/ui:ro # dashboard volume
    ports:
      - "7890:7890"
      - "7891:7891"
      # - "8080:8080" # The External Controller (RESTful API)
    network_mode: "bridge"
```

```yaml [Clash Premium]
services:
  clash:
    image: ghcr.io/dreamacro/clash-premium
    restart: always
    volumes:
      - ./config.yaml:/root/.config/clash/config.yaml:ro
      # - ./ui:/ui:ro # dashboard volume
    ports:
      - "7890:7890"
      - "7891:7891"
      # - "8080:8080" # The External Controller (RESTful API)
    cap_add:
      - NET_ADMIN
    devices:
      - /dev/net/tun
    network_mode: "host"
```

:::

Save as `docker-compose.yaml` and place your `config.yaml` in the same directory.

::: tip
Before proceeding, refer to your platform documentations about time synchronisation - things will break if time is not in sync.
:::

When you're ready, run the following commands to bring up Clash:

```shell
docker-compose up -d
```

You can view the logs with:

```shell
docker-compose logs
```

Stop Clash with:

```shell
docker-compose stop
```
