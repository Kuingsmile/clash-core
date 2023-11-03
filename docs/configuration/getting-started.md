---
sidebarTitle: Getting Started
sidebarOrder: 2
---

# Getting Started

It's recommended that you read the [Introduction](/configuration/introduction) before proceeding. After you have a brief understanding of how Clash works, you can start writing your own configuration.

## Configuration Files

The main configuration file is called `config.yaml`. By default, Clash reads the configuration files at `$HOME/.config/clash`. If it doesn't exist, Clash will generate a minimal configuration file at that location.

If you want to place your configurations elsewhere (e.g. `/etc/clash`), you can use command-line option `-d` to specify a configuration directory:

```shell
clash -d . # current directory
clash -d /etc/clash
```

Or, you can use option `-f` to specify a configuration file:

```shell
clash -f ./config.yaml
clash -f /etc/clash/config.yaml
```

## Special Syntaxes

There are some special syntaxes in Clash configuration files, of which you might want to be aware:

### IPv6 Addresses

You should wrap IPv6 addresses in square brackets, for example:

```txt
[aaaa::a8aa:ff:fe09:57d8]
```

### DNS Wildcard Domain Matching

In some cases, you will need to match against wildcard domains. For example, when you're setting up [Clash DNS](/configuration/dns), you might want to match against all subdomains of `localdomain`.

Clash do offer support on matching different levels of wildcard domains in the DNS configuration, while the syntaxes defined below:

::: tip
Any domain with these characters should be wrapped with single quotes (`'`). For example, `'*.google.com'`.
Static domain has a higher priority than wildcard domain (foo.example.com > *.example.com > .example.com).
:::

Use an asterisk (`*`) to match against a single-level wildcard subdomain.

| Expression | Matches | Does Not Match |
| ---------- | ------- | -------------- |
| `*.google.com` | `www.google.com` | `google.com` |
| `*.bar.google.com` | `foo.bar.google.com` | `bar.google.com` |
| `*.*.google.com` | `thoughtful.sandbox.google.com` | `one.two.three.google.com` |

Use a dot sign (`.`) to match against multi-level wildcard subdomains.

| Expression | Matches | Does Not Match |
| ---------- | ------- | -------------- |
| `.google.com` | `www.google.com` | `google.com` |
| `.google.com` | `thoughtful.sandbox.google.com` | `google.com` |
| `.google.com` | `one.two.three.google.com` | `google.com` |

Use a plus sign (`+`) to match against multi-level wildcard subdomains.

`+` wildcard works like DOMAIN-SUFFIX, you can quickly match multi level at a time.

| Expression | Matches |
| ---------- | ------- |
| `+.google.com` | `google.com` |
| `+.google.com` | `www.google.com` |
| `+.google.com` | `thoughtful.sandbox.google.com` |
| `+.google.com` | `one.two.three.google.com` |
