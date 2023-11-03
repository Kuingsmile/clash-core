---
sidebarTitle: 快速入手
sidebarOrder: 2
---

# 快速入手

建议您在继续阅读本节之前, 先阅读[介绍](/zh_CN/configuration/introduction). 在您对Clash的工作原理有了简单的了解后, 您可以开始编写您自己的配置.

## 配置文件

主配置文件名为 `config.yaml`. 默认情况下, Clash会在 `$HOME/.config/clash` 目录读取配置文件. 如果该目录不存在, Clash会在该位置生成一个最小的配置文件.

如果您想将配置文件放在其他地方 (例如 `/etc/clash`) , 您可以使用命令行选项 `-d` 来指定配置目录:

```shell
clash -d . # current directory
clash -d /etc/clash
```

或者, 您可以使用选项 `-f` 来指定配置文件:

```shell
clash -f ./config.yaml
clash -f /etc/clash/config.yaml
```

## 特殊语法

Clash 配置文件中有一些特殊的语法, 您可能需要了解:

### IPv6 地址

您应该使用方括号 (`[]`) 来包裹 IPv6 地址, 例如:

```txt
[aaaa::a8aa:ff:fe09:57d8]
```

### DNS 通配符域名匹配

在某些情况下, 您需要匹配通配符域名. 例如, 当您设置 [Clash DNS](/zh_CN/configuration/dns) 时, 您可能想要匹配 `localdomain` 的所有子域名.

Clash 在 DNS 配置中提供了匹配不同级别通配符域名的支持, 其语法如下:

::: tip
任何包含这些字符的域名都应该用单引号 (`'`) 包裹. 例如, `'*.google.com'`.
静态域名的优先级高于通配符域名 (foo.example.com > *.example.com > .example.com) .
:::

使用星号 (`*`) 来匹配单级通配符子域名.

| 表达式 | 匹配 | 不匹配 |
| ---------- | ------- | -------------- |
| `*.google.com` | `www.google.com` | `google.com` |
| `*.bar.google.com` | `foo.bar.google.com` | `bar.google.com` |
| `*.*.google.com` | `thoughtful.sandbox.google.com` | `one.two.three.google.com` |

使用点号 (`.`) 来匹配多级通配符子域名.

| 表达式 | 匹配 | 不匹配 |
| ---------- | ------- | -------------- |
| `.google.com` | `www.google.com` | `google.com` |
| `.google.com` | `thoughtful.sandbox.google.com` | `google.com` |
| `.google.com` | `one.two.three.google.com` | `google.com` |

使用加号 (`+`) 来匹配多级通配符子域名.

`+` 通配符的工作方式类似于 `DOMAIN-SUFFIX`, 您可以一次进行多级的快速匹配.

| 表达式 | 匹配 |
| ---------- | ------- |
| `+.google.com` | `google.com` |
| `+.google.com` | `www.google.com` |
| `+.google.com` | `thoughtful.sandbox.google.com` |
| `+.google.com` | `one.two.three.google.com` |
