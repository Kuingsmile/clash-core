---
sidebarTitle: "功能: Rule Providers 规则集"
sidebarOrder: 4
---

# Rule Providers 规则集

Rule Providers 规则集和 [Proxy Providers 代理集](/zh_CN/configuration/outbound#proxy-providers-代理集) 基本相同. 它允许用户从外部源加载规则, 从而使配置更加简洁. 该功能目前仅适用于 Clash Premium 内核.

要定义 Rule Providers 规则集, 请将 `rule-providers` 规则集字段添加到主配置中:

```yaml
rule-providers:
  apple:
    behavior: "domain" # domain, ipcidr or classical (仅限 Clash Premium 内核)
    type: http
    url: "url"
    # format: 'yaml' # or 'text'
    interval: 3600
    path: ./apple.yaml
  microsoft:
    behavior: "domain"
    type: file
    path: /microsoft.yaml

rules:
  - RULE-SET,apple,REJECT
  - RULE-SET,microsoft,policy
```

有三种行为类型可用:

## `domain`

yaml:

```yaml
payload:
  - '.blogger.com'
  - '*.*.microsoft.com'
  - 'books.itunes.apple.com'
```

text:

```txt
# comment
.blogger.com
*.*.microsoft.com
books.itunes.apple.com
```

## `ipcidr`

yaml

```yaml
payload:
  - '192.168.1.0/24'
  - '10.0.0.0.1/32'
```

text:

```txt
# comment
192.168.1.0/24
10.0.0.0.1/32
```

## `classical`

yaml:

```yaml
payload:
  - DOMAIN-SUFFIX,google.com
  - DOMAIN-KEYWORD,google
  - DOMAIN,ad.com
  - SRC-IP-CIDR,192.168.1.201/32
  - IP-CIDR,127.0.0.0/8
  - GEOIP,CN
  - DST-PORT,80
  - SRC-PORT,7777
  # MATCH 在这里并不是必须的
```

text:

```txt
# comment
DOMAIN-SUFFIX,google.com
DOMAIN-KEYWORD,google
DOMAIN,ad.com
SRC-IP-CIDR,192.168.1.201/32
IP-CIDR,127.0.0.0/8
GEOIP,CN
DST-PORT,80
SRC-PORT,7777
```
