---
title: traefik v1 结合 docker-compose 的快速安装及使用
date: 2019-02-20 16:58:00
category:
  - Docker
tag:
  - docker
  - docker-compose
---

## traefik 介绍
> [traefik](http://docs.traefik.cn/) 是一个为了让部署微服务更加便捷而诞生的现代HTTP反向代理、负载均衡工具。 它支持多种后台 (Docker, Swarm, Kubernetes, Marathon, Mesos, Consul, Etcd, Zookeeper, BoltDB, Rest API, file…) 来自动化、动态的应用它的配置文件设置。

### 特性一览

- 它非常快
- 无需安装其他依赖，通过 Go 语言编写的单一可执行文件
- 支持 Rest API
- 多种后台支持：Docker, Swarm, Kubernetes, Marathon, Mesos, Consul, Etcd, 并且还会更多
- 后台监控, 可以监听后台变化进而自动化应用新的配置文件设置
- 配置文件热更新。无需重启进程
- 正常结束 http 连接
- 后端断路器
- 轮询，rebalancer 负载均衡
- Rest Metrics
- 支持最小化 官方 docker 镜像
- 后台支持 SSL
- 前台支持 SSL（包括 SNI）
- 清爽的 AngularJS 前端页面
- 支持 Websocket
- 支持 HTTP/2
- 网络错误重试
- 支持 Let’s Encrypt (自动更新 HTTPS 证书)
- 高可用集群模式

本文将分享 traefik 结合 docker-compose 的一点使用经验。

## docker(docker-ce) 及 docker-compose(1.23.2) 的快速安装

```
sudo curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun
sudo curl -L https://github.com/docker/compose/releases/download/1.23.2/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

## docker-compose 安装 traefik 及使用

用其搭配 docker-compose 部署网站，可轻松绑定域名，设置 https , 负载均衡，已在多个项目使用，文档可靠，强烈推荐！

以下为使用的基本操作

1. 创建 network，使 traefik 及网站处于同一网络
2. 创建 traefik.toml([官方文档](http://docs.traefik.cn/toml))
3. 创建 acme.json (`touch acme.json && chmod 600 ./acme.json`)
4. 创建 docker-compose.yml

### docker-compose.yml

使用 `docker-compose up -d` 即可构建 traefik 服务,
根据 labels 标签通过监听其内部的 8090 端口，并绑定了域名 traefik.testdomain.com

docker-compose 可使用的 labes 配置见文档：http://docs.traefik.cn/toml#docker-backend
traefik.toml 配置见文档：http://docs.traefik.cn/toml

使用之前需要先创建一个网络(`docker network create me_gateway`)，让 traefik 及所有网站都使用一个网络，这样就能够自动将域名绑定到对应的容器中

下面是一个 traefik 的 docker-compose.yml 配置

```yml
version: '3'
services:
  me_traefik:
    restart: always
    image: traefik:1.7.4
    ports:
      - '80:80'
      - '443:443'
    labels:
      - 'traefik.backend=me_traefik'
      - 'traefik.frontend.rule=Host:traefik.testdomain.com'
      - 'traefik.enable=true'
      - 'traefik.passHostHeader=true'
      - 'traefik.protocol=https'
      - 'traefik.port=8090'
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - ./traefik.toml:/traefik.toml
      - ./acme.json:/acme.json
    networks:
      - webgateway
networks:
  webgateway:
    external:
      name: me_gateway
```

volumes 说明

- `/var/run/docker.sock`:主机 docker
- `./traefik.toml`:traefik 配置文件
- `./acme.json`:Let's Encrypt 配置，会根据 traefik.toml 生成，映射出来,后续重启数据将不会丢失，但是需要为其添加读写权限(chmod 600 acme.json),初始化时可以 `touch acme.json` 生成一个空文件

下面是一个 traefik 的 traefik.toml 配置示例

```ini
################################################################
# Global configuration
################################################################
debug = false
logLevel = "ERROR"
defaultEntryPoints = ["http","https"]
[entryPoints]
  [entryPoints.http]
  address = ":80"
#    [entryPoints.http.redirect]
#      entryPoint = "https"
# 启用https
  [entryPoints.https]
  address = ":443"
    [entryPoints.https.tls]
  [entryPoints.webentry]
    address = ":8090"
    [entryPoints.webentry.auth]
      [entryPoints.webentry.auth.basic]
         users = ["test:$apr1$H6uskkkW$IgXLP6ewTrSuBkTrqE8wj/"]
[api]
dashboard = true
entrypoint = "webentry"

[ping]

[docker]
endpoint = "unix:///var/run/docker.sock"
domain = "testdomain.com"
watch = true
exposedByDefault = false
usebindportip = true
swarmMode = false
network = "me_gateway"

[acme]
# 用于注册的邮箱地址
email = "wsyimo@qq.com"
# 证书存储使用的文件或键。
storage = "acme.json"
# 代理acme验证证书challenge/apply的入口点。
# 警告, 必需指向到一个443端口作为入口点
entryPoint = "https"
# 启用按需证书。如果这个主机名还没有证书，这将会在与一个主机名发起请求的第一个TLS握手中向Let's Encrypt请求一个证书。
# 警告，第一次在请求中获取主机证书会导致TLS握手会非常慢，这会引起Dos攻击。
# 警告，值得注意的是Let's Encrypt是有请求上限的：https://letsencrypt.org/docs/rate-limits
onDemand = false
# 启用根据前端Host规则来生成证书。这将会为每个具有Host规则的前端生成一个Let's Encrypt的证书。
# 举个例子，一个具有规则的Host:test1.traefik.cn,test2.traefik.cn 将会为主域名test1.traefik.cn与SAN(替代域名) test2.traefik.cn生成一个证书。
onHostRule = true
  [acme.httpChallenge]
  entryPoint="http"

```

### traefik 自动申请 https 证书(Let’s Encrypt)

文档地址：http://docs.traefik.cn/toml#acme-lets-encrypt-configuration

```ini
defaultEntryPoints = ["http","https"]
[entryPoints]
  [entryPoints.http]
  address = ":80"
#    [entryPoints.http.redirect]
#      entryPoint = "https"
# 启用https
  [entryPoints.https]
  address = ":443"
    [entryPoints.https.tls]
  [entryPoints.webentry]
    address = ":8090"
```

### traefik 自定义入口并配置账户密码

文档地址：http://docs.traefik.cn/toml#entrypoints-definition
但是，按照文档来，可能并不一定能够配置成功~,如果不成功就参考下面的配置吧,

```ini
defaultEntryPoints = ["http","https"]
[entryPoints]
  [entryPoints.http]
  address = ":80"
#    [entryPoints.http.redirect]
#      entryPoint = "https"
# 启用https
  [entryPoints.https]
  address = ":443"
    [entryPoints.https.tls]
  [entryPoints.webentry]
    address = ":8090"
    [entryPoints.webentry.auth]
      [entryPoints.webentry.auth.basic]
         users = ["test:$apr1$H6uskkkW$IgXLP6ewTrSuBkTrqE8wj/"]
[api]
dashboard = true
entrypoint = "webentry"
```

1. 在 api 节点指定 entrypoint= 入口点
2. 配置 entryPoints 节点

```
[entryPoints]
    [entryPoints.入口点]
        address = ":8090"
        [entryPoints.webentry.auth]
        [entryPoints.webentry.auth.basic]
            users = ["test:$apr1$H6uskkkW$IgXLP6ewTrSuBkTrqE8wj/"]
```

上诉密码需要使用 htpasswd 生成，可在服务器生成，也可使用新鲜出炉的 metools 的[htpasswd 密码生成](https://metools.js.org/#/genpwd?type=htpasswd)
在线生成了。(不支持traefik v2)

当 traefik 部署完成，后续网站绑定域名只需要在 docker-compose.yml 中指定 labels对应值即可自动绑定域名，申请 https 等操作了(指定到同一个网络)，关于更多使用场景及方法，还是需要去查看文档 ，[简单的可以参考我的配置](https://github.com/moxycoding/moxy.config.docker/tree/master/provider.traefik)，clone 后通过 docker-compose.yml 就可快速在服务器构建你的项目了


## 相关地址

- 完整使用示例：[参考时需注意域名端口的绑定](https://github.com/moxycoding/moxy.config.docker/tree/master/provider.traefik)
- traefik 文档地址：http://docs.traefik.cn/
- traefik 仓库地址：https://github.com/containous/traefik
