---
sidebarTitle: Introduction
sidebarOrder: 1
---

# Introduction

In this chapter, we'll cover the common features of Clash and how they should be used and configured.

Clash uses [YAML](https://yaml.org), _YAML Ain't Markup Language_, for configuration files. YAML is designed to be easy to be read, be written, and be interpreted by computers, and is commonly used for exact configuration files.

## Understanding how Clash works

Before proceeding, it's important to understand how Clash works, in which there are two critical components:

![](/assets/connection-flow.png)

<!-- https://excalidraw.com/clash-connection-flow#json=OHsOdaqAUPuuN7VPvdZ9Z,NT7rRrtzRgbVIM0tpkPnGA -->

### Inbound

Inbound is the component that listens on the local end. It works by opening a local port and listening for incoming connections. When a connection comes in, Clash looks up the rules that are configured in the configuration file, and decides which outbound that the connection should go next.

### Outbound

Outbound is the component that connects to the remote end. Depending on the configuration, it can be a specific network interface, a proxy server, or a [proxy group](./outbound#proxy-groups).

## Rule-based Routing

Clash supports rule-based routing, which means you can route packets to different outbounds based on the a variety of contraints. The rules can be defined in the `rules` section of the configuration file.

There's a number of available rule types, and each rule type has its own syntax. The general syntax of a rule is:

```txt
TYPE,ARGUMENT,POLICY(,no-resolve)
```

In the upcoming guides, you will learn more about how rules can be configured.
