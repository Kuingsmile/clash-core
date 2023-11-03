---
sidebarTitle: The External Controller
sidebarOrder: 1
---

# The External Controller

## Introduction

External Controller enables users to control Clash programmatically with the HTTP RESTful API. The third-party Clash GUIs are heavily based on this feature. Enable this feature by specifying an address in `external-controller`.

## Authentication

- External Controllers Accept `Bearer Tokens` as access authentication method.
  - Use `Authorization: Bearer <Your Secret>` as your request header in order to pass credentials.

## RESTful API Documentation

### Logs

- `/logs`
  - Method: `GET`
    - Full Path: `GET /logs`
    - Description: Get real-time logs

### Traffic

- `/traffic`
  - Method: `GET`
    - Full Path: `GET /traffic`
    - Description: Get real-time traffic data

### Version

- `/version`
  - Method: `GET`
    - Full Path: `GET /version`
    - Description: Get clash version

### Configs

- `/configs`
  - Method: `GET`
    - Full Path: `GET /configs`
    - Description: Get base configs

  - Method: `PUT`
    - Full Path: `PUT /configs`
    - Description: Reloading base configs

  - Method: `PATCH`
    - Full Path: `PATCH /configs`
    - Description: Update base configs

### Proxies

- `/proxies`
  - Method: `GET`
    - Full Path: `GET /proxies`
    - Description: Get proxies information

- `/proxies/:name`
  - Method: `GET`
    - Full Path: `GET /proxies/:name`
    - Description: Get specific proxy information

  - Method: `PUT`
    - Full Path: `PUT /proxies/:name`
    - Description: Select specific proxy

- `/proxies/:name/delay`
  - Method: `GET`
    - Full Path: `GET /proxies/:name/delay`
    - Description: Get specific proxy delay test information

### Rules

- `/rules`
  - Method: `GET`
    - Full Path: `GET /rules`
    - Description: Get rules information

### Connections

- `/connections`
  - Method: `GET`
    - Full Path: `GET /connections`
    - Description: Get connections information

  - Method: `DELETE`
    - Full Path: `DELETE /connections`
    - Description: Close all connections

- `/connections/:id`
  - Method: `DELETE`
    - Full Path: `DELETE /connections/:id`
    - Description: Close specific connection

### Providers

- `/providers/proxies`
  - Method: `GET`
    - Full Path: `GET /providers/proxies`
    - Description: Get all proxies information for all proxy-providers

- `/providers/proxies/:name`
  - Method: `GET`
    - Full Path: `GET /providers/proxies/:name`
    - Description: Get proxies information for specific proxy-provider

  - Method: `PUT`
    - Full Path: `PUT /providers/proxies/:name`
    - Description: Select specific proxy-provider

- `/providers/proxies/:name/healthcheck`
  - Method: `GET`
    - Full Path: `GET /providers/proxies/:name/healthcheck`
    - Description: Get proxies information for specific proxy-provider

### DNS Query

- `/dns/query`
  - Method: `GET`
  - Full Path: `GET /dns/query?name={name}[&type={type}]`
  - Description: Get DNS query data for a specified name and type.
  - Parameters:
    - `name` (required): The domain name to query.
    - `type` (optional): The DNS record type to query (e.g., A, MX, CNAME, etc.). Defaults to `A` if not provided.

  - Example: `GET /dns/query?name=example.com&type=A`
