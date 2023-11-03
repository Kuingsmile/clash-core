---
sidebarTitle: 外部控制设置
sidebarOrder: 1
---

# 外部控制设置

## 简介

外部控制允许用户通过 HTTP RESTful API 来控制 Clash. 第三方 Clash GUI 就是基于这个功能的. 通过在 `external-controller` 中指定地址来启用这个功能.

## 认证

- 外部控制器接受 `Bearer Tokens` 作为访问认证方式.
  - 使用 `Authorization: Bearer <Your Secret>` 作为请求头来传递凭证.

## RESTful API 文档

### 日志

- `/logs`
  - 方法: `GET`
    - 完整路径: `GET /logs`
    - 描述: 获取实时日志

### 流量

- `/traffic`
  - 方法: `GET`
    - 完整路径: `GET /traffic`
    - 描述: 获取实时流量数据

### 版本

- `/version`
  - 方法: `GET`
    - 完整路径: `GET /version`
    - 描述: 获取 Clash 版本

### 配置

- `/configs`
  - 方法: `GET`
    - 完整路径: `GET /configs`
    - 描述: 获取基础配置

  - 方法: `PUT`
    - 完整路径: `PUT /configs`
    - 描述: 重新加载配置文件

  - 方法: `PATCH`
    - 完整路径: `PATCH /configs`
    - 描述: 增量修改配置

### 节点

- `/proxies`
  - 方法: `GET`
    - 完整路径: `GET /proxies`
    - 描述: 获取所有节点信息

- `/proxies/:name`
  - 方法: `GET`
    - 完整路径: `GET /proxies/:name`
    - 描述: 获取指定节点信息

  - 方法: `PUT`
    - 完整路径: `PUT /proxies/:name`
    - 描述: 切换 Selector 中选中的节点

- `/proxies/:name/delay`
  - 方法: `GET`
    - 完整路径: `GET /proxies/:name/delay`
    - 描述: 获取指定节点的延迟测试信息

### 规则

- `/rules`
  - 方法: `GET`
    - 完整路径: `GET /rules`
    - 描述: 获取规则信息

### 连接

- `/connections`
  - 方法: `GET`
    - 完整路径: `GET /connections`
    - 描述: 获取连接信息

  - 方法: `DELETE`
    - 完整路径: `DELETE /connections`
    - 描述: 关闭所有连接

- `/connections/:id`
  - 方法: `DELETE`
    - 完整路径: `DELETE /connections/:id`
    - 描述: 关闭指定连接

### 代理集

- `/providers/proxies`
  - 方法: `GET`
    - 完整路径: `GET /providers/proxies`
    - 描述: 获取所有代理集的代理信息

- `/providers/proxies/:name`
  - 方法: `GET`
    - 完整路径: `GET /providers/proxies/:name`
    - 描述: 获取指定代理集的代理信息

  - 方法: `PUT`
    - 完整路径: `PUT /providers/proxies/:name`
    - 描述: 切换指定代理集

- `/providers/proxies/:name/healthcheck`
  - 方法: `GET`
    - 完整路径: `GET /providers/proxies/:name/healthcheck`
    - 描述: 获取指定代理集的代理信息

### DNS 查询

- `/dns/query`
  - 方法: `GET`
  - 完整路径: `GET /dns/query?name={name}[&type={type}]`
  - 描述: 获取指定域名和类型的 DNS 查询数据
  - 参数:
    - `name` (必填): 要查询的域名
    - `type` (可选): 要查询的 DNS 记录类型 (例如, A, MX, CNAME 等). 如果未提供, 则默认为 `A`.

  - 示例: `GET /dns/query?name=example.com&type=A`
