---
sidebarTitle: Clash DNS
sidebarOrder: 6
---

# Clash DNS

Since some parts of Clash run on the Layer 3 (Network Layer), they would've been impossible to obtain domain names of the packets for rule-based routing.

*Enter fake-ip*. It enables rule-based routing, minimises the impact of DNS pollution attack and improves network performance, sometimes drastically.

## fake-ip

The concept of "fake IP" addresses is originated from [RFC 3089](https://tools.ietf.org/rfc/rfc3089):

> A "fake IP" address is used as a key to look up the corresponding "FQDN" information.

The default CIDR for the fake-ip pool is `198.18.0.1/16`, a reserved IPv4 address space, which can be changed in `dns.fake-ip-range`.

When a DNS request is sent to the Clash DNS, the core allocates a *free* fake-ip address from the pool, by managing an internal mapping of domain names and their fake-ip addresses.

Take an example of accessing `http://google.com` with your browser.

1. The browser asks Clash DNS for the IP address of `google.com`
2. Clash checks the internal mapping and returned `198.18.1.5`
3. The browser sends an HTTP request to `198.18.1.5` on `80/tcp`
4. When receiving the inbound packet for `198.18.1.5`, Clash looks up the internal mapping and realises the client is actually sending a packet to `google.com`
5. Depending on the rules:

    1. Clash may just send the domain name to an outbound proxy like SOCKS5 or shadowsocks and establish the connection with the proxy server

    2. or Clash might look for the real IP address of `google.com`, in the case of encountering a `SCRIPT`, `GEOIP`, `IP-CIDR` rule, or the case of DIRECT outbound

Being a confusing concept, I'll take another example of accessing `http://google.com` with the cURL utility:

```txt{2,3,5,6,8,9}
$ curl -v http://google.com
<---- cURL asks your system DNS (Clash) about the IP address of google.com
----> Clash decided 198.18.1.70 should be used as google.com and remembers it
*   Trying 198.18.1.70:80...
<---- cURL connects to 198.18.1.70 tcp/80
----> Clash will accept the connection immediately, and..
* Connected to google.com (198.18.1.70) port 80 (#0)
----> Clash looks up in its memory and found 198.18.1.70 being google.com
----> Clash looks up in the rules and sends the packet via the matching outbound
> GET / HTTP/1.1
> Host: google.com
> User-Agent: curl/8.0.1
> Accept: */*
> 
< HTTP/1.1 301 Moved Permanently
< Location: http://www.google.com/
< Content-Type: text/html; charset=UTF-8
< Content-Security-Policy-Report-Only: object-src 'none';base-uri 'self';script-src 'nonce-ahELFt78xOoxhySY2lQ34A' 'strict-dynamic' 'report-sample' 'unsafe-eval' 'unsafe-inline' https: http:;report-uri https://csp.withgoogle.com/csp/gws/other-hp
< Date: Thu, 11 May 2023 06:52:19 GMT
< Expires: Sat, 10 Jun 2023 06:52:19 GMT
< Cache-Control: public, max-age=2592000
< Server: gws
< Content-Length: 219
< X-XSS-Protection: 0
< X-Frame-Options: SAMEORIGIN
< 
<HTML><HEAD><meta http-equiv="content-type" content="text/html;charset=utf-8">
<TITLE>301 Moved</TITLE></HEAD><BODY>
<H1>301 Moved</H1>
The document has moved
<A HREF="http://www.google.com/">here</A>.
</BODY></HTML>
* Connection #0 to host google.com left intact
```

<!-- TODO: nameserver, fallback, fallback-filter, hosts, search-domains, fake-ip-filter, nameserver-policy -->
