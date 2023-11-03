---
sidebarTitle: "Feature: Rule Providers"
sidebarOrder: 4
---

# Rule Providers

Rule Providers are pretty much the same compared to Proxy Providers. It enables users to load rules from external sources and overall cleaner configuration. This feature is currently Premium core only.

To define a Rule Provider, add the `rule-providers` field to the main configuration:

```yaml
rule-providers:
  apple:
    behavior: "domain" # domain, ipcidr or classical (premium core only)
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

There are three behavior types available:

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
  # MATCH is not necessary here
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
