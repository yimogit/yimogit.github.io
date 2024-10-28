---
title: linux中使用docker-compose部署软件配置分享
date: 2018-12-15 21:07:00
category:
  - Docker
tag:
  - docker
  - docker-compose
  - linux
---

本篇将分享一些 docker-compose 的配置，可参考其总结自己的一套基于docker的开发/生产环境配置。

## 安装docker及docker-compose

### install docker

```
curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun
```

### install docker-compose

```
sudo curl -L https://github.com/docker/compose/releases/download/1.23.2/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```


## 创建专属网络

使用 docker network 创建自己的专属常用网络 me_gateway，使得 docker 的软件能够互相访问

```
docker network create me_gateway
```

## docker-compose 部署 Traefik

> 一个反向代理服务器，它非常快，有自动发现服务，自动申请 https 等非常棒的特性，[项目地址](https://github.com/containous/traefik),[中文文档](http://docs.traefik.cn/)。

### docker-compose.yml

这是一个使用 traefik 的 docker-compose.yml 配置示例
其中，挂载的 `./traefik.toml` 为其配置，
挂载的 `acme.json` 为 Let's Encrypt 的配置（需要设置权限：`chmod 600 acme.json`）

```yml
version: '3'

services:
  me_traefik:
    image: traefik:1.7.4
    container_name: me_traefik
    ports:
      - '80:80'
      - '443:443'
      - '8090:8090'
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

### traefik.toml

> 配置详细说明：http://docs.traefik.cn/toml#acme-lets-encrypt-configuration
> 以下为一个示例，在配置验证的时候遇到一些问题，可参考下面配置或者[这篇文章的评论](https://www.digitalocean.com/community/tutorials/how-to-use-traefik-as-a-reverse-proxy-for-docker-containers-on-ubuntu-18-04)

```
################################################################
# Global configuration
################################################################

# Enable debug mode
#
# Optional
# Default: false
#
debug = false

# Log level
#
# Optional
# Default: "ERROR"
#
logLevel = "ERROR"

# Entrypoints to be used by frontends that do not specify any entrypoint.
# Each frontend can specify its own entrypoints.
#
# Optional
# Default: ["http"]
#
defaultEntryPoints = ["http","https"]
################################################################
# Entrypoints configuration
################################################################

# Entrypoints definition
#
# Optional
# Default:
# 要为一个入口点开启基础认证（basic auth）
# 使用2组用户名/密码: test:test 与 test2:test2
# 密码可以以MD5、SHA1或BCrypt方式加密：你可以使用htpasswd来生成这些用户名密码。
# [entryPoints]
#   [entryPoints.http]
#   address = ":80"
#   [entryPoints.http.auth.basic]
#   users = ["test:$apr1$H6uskkkW$IgXLP6ewTrSuBkTrqE8wj/", "test2:$apr1$d9hr9HBB$4HxwgUir3HP4EsggP/QNo0"]
#
# 要为一个入口点开启摘要认证（digest auth）
# 使用2组用户名/域/密码： test:traefik:test 与 test2:traefik:test2
# 你可以使用htdigest来生成这些用户名/域/密码
[entryPoints]
  [entryPoints.http]
  address = ":80"
#    [entryPoints.http.redirect]
#      entryPoint = "https"
  [entryPoints.https]
  address = ":443"
    [entryPoints.https.tls]
  [entryPoints.webentry]
    address = ":8090"
    [entryPoints.webentry.auth]
      [entryPoints.webentry.auth.basic]
         users = ["test:$apr1$H6uskkkW$IgXLP6ewTrSuBkTrqE8wj/"]
################################################################
# API and dashboard configuration
################################################################

# Enable API and dashboard
[api]
dashboard = true
entrypoint = "webentry"

################################################################
# Ping configuration
################################################################

# Enable ping
[ping]

  # Name of the related entry point
  #
  # Optional
  # Default: "traefik"
  #
  # entryPoint = "traefik"

################################################################
# Docker 后端配置
################################################################

# 使用默认域名。
# 可以通过为容器设置"traefik.domain" label来覆盖。
# 启用Docker后端配置
[docker]
endpoint = "unix:///var/run/docker.sock"
domain = "yimo.link"
watch = true
exposedByDefault = false
usebindportip = true
swarmMode = false
network = "me_gateway"

[acme]
email = "yimo666666@qq.com"
storage = "acme.json"
entryPoint = "https"
onDemand = false
onHostRule = true
  [acme.httpChallenge]
  entryPoint="http"

```

## docker-compose 部署 Gogs，并使用 traefik 绑定域名

如果想要与 mysql 一起构建，可参考[此配置](https://github.com/nanoninja/docker-gogs-mysql/blob/master/docker-compose.yml)

### docker-compose.yml

```yml
version: '3'
services:
  me_gogs:
    restart: always
    image: gogs/gogs
    container_name: me_gogs
    volumes:
      - ./data:/data
      - ./logs:/app/gogs/log
    ports:
      - '10022:22'
      - '10080:3000'
    labels:
      - 'traefik.backend=me_gogs'
      - 'traefik.frontend.rule=Host:git.yimo.link'
      - 'traefik.enable=true'
      - 'traefik.protocol=http'
      - 'traefik.port=3000'
    networks:
      - webgateway
networks:
  webgateway:
    external:
      name: me_gateway
```

初始化时需要将域名设置为 `0.0.0.0` 或者`git.yimo.link`
即 `./data/gogs/conf/app.ini` 项为

```
DOMAIN           = git.yimo.link
```

## docker-compose 部署 mysql

这个值得说明的就是，同一网络下，可直接使用 me_mysql 连接

### docker-compose.yml

```yml
version: '3'
services:
  me_mysql:
    image: mysql:5.7.21
    container_name: me_mysql
    volumes:
      - ./data:/var/lib/mysql
    ports:
      - '3306:3306'
    environment:
      - MYSQL_ROOT_PASSWORD=root
    networks:
      - webgateway
networks:
  webgateway:
    external:
      name: me_gateway
```
## docker-compose 部署 Jenkins  
[具体介绍见](https://www.cnblogs.com/morang/p/docker-jenkins-use.html)

```
version: '3'
services:
  me_jenkins:
    restart: always
    image: jenkins/jenkins:lts
    container_name: me_jenkins
    networks:
      - webgateway
    ports:
      - '50000:50000'
    labels:
      - 'traefik.backend=me_jenkins'
      - 'traefik.frontend.rule=Host:jenkins.yimo.link'
      - 'traefik.enable=true'
      - 'traefik.protocol=http'
      - 'traefik.port=8080'
    volumes:
      - ./data/:/var/jenkins_home
      - /var/run/docker.sock:/var/run/docker.sock
      - /usr/bin/docker:/usr/bin/docker
      - /usr/lib/x86_64-linux-gnu/libltdl.so.7:/usr/lib/x86_64-linux-gnu/libltdl.so.7

networks:
  webgateway:
    external:
      name: me_gateway

```

## docker-compose 部署开发环境依赖

示例：sqlserver,redis,rabbitmq,es,seq。

```
version: '3'
services:

# 注意： sqlserver 需要执行以下命令授予目录权限
# chgrp -R 0 ./mssql_data/&&chmod -R g=u ./mssql_data/&&chown -R 10001:0 ./mssql_data/

  mssql:
    image: mcr.microsoft.com/mssql/server:2019-latest
    container_name: me_mssql
    restart: always
    ports:
      - '1433:1433'
    volumes:
      - ./mssql_data/data:/var/opt/mssql/data
      - ./mssql_data/log:/var/opt/mssql/log
      - ./mssql_data/secrets:/var/opt/mssql/secrets
    environment:
      - ACCEPT_EULA=Y
      - SA_PASSWORD=mssql@pwd

  redis:
    image: redis:alpine
    container_name: me_redis
    restart: always
    ports:
      - '6379:6379'
    volumes:
      - ./redis_data:/data
  rabbitmq:
    image: rabbitmq:3-management
    container_name: me_rabbitmq
    restart: always
    ports:
      - '5672:5672'
      - '15672:15672'
    volumes:
      - ./rabbitmq_data:/var/lib/rabbitmq
  es:
    image: elasticsearch
    container_name: me_es
    restart: always
    ports:
      - '9200:9200'
      - '9300:9300'
    environment:
      - discovery.type=single-node
  seq:
    image: datalust/seq
    container_name: me_seq
    restart: always
    ports:
      - '15341:80'
      - '5341:5341'
    environment:
      - ACCEPT_EULA=Y
    volumes:
      - ./seq_data:/data

```

