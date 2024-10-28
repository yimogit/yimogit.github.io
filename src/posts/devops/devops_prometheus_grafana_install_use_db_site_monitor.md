---
title: Prometheus+Grafana 监控平台实践-搭建&常用服务监控&告警
date: 2023-12-07 08:07:00
category:
  - DevOps
tag:
  - devops
  - docker
  - docker-compose
  - grafana
  - prometheus
---

## 前言

> Prometheus 是一个开放性的监控解决方案，通过各种 Exporter 采集当前主机/服务的数据，和 Grafana 相结合可以实现强大的监控和可视化功能
>
> 本篇将分享使用 docker compose 构建 Prometheus+Grafana，并监控之前文章所搭建的主机&服务，分享日常使用的一些使用经验
> 文章较长，已安装可略过，推荐先看第三节 [常用服务的 Prometheus+Grafana 配置](https://www.cnblogs.com/morang/p/devops-prometheus-grafana-install-use-db-site-monitor.html#%E5%B8%B8%E7%94%A8%E6%9C%8D%E5%8A%A1%E7%9A%84-prometheusgrafana-%E9%85%8D%E7%BD%AE)

### 特点

-   成熟稳定且强大
-   丰富的插件，大部分情况都能满足
-   轻量级部署，资源占用少

### 使用情况

-   主要用来作为监控面板使用
-   使用 Grafana 监控：linux ，windows，redis，clickhouse，mongodb，mysql， RabbitMQ，站点情况
-   使用 Grafana 设置告警当服务出现无法访问时通知到企业微信群
-   Grafana 版本问题，可能存在面板失效，需要做一些调整   

## 使用 docker compose 安装 Prometheus

### 配置文件说明

-   prometheus 版本：v2.47.2

-   指定运行参数：

    -   启动配置文件路径：`'--config.file=/etc/prometheus/prometheus.yml'`
    -   数据存储目录：`'--storage.tsdb.path=/prometheus'`
    -   数据保留时间：`'--storage.tsdb.retention.time=30d'`
    -   允许使用 ` curl -X POST  ``http://localhost:9090/-/reload` 重载其配置：`'--web.enable-lifecycle'`
    -   指定 web 控制台配置，添加了账号密码：`'--web.config.file=/etc/prometheus/web-config.yml'`

-   开放端口：9090

-   指定网络：devopsnetwork （`docker network create devopsnetwork`）

-   挂载配置文件及数据目录，需要对数据目录进行创建及赋予权限：`mkdir prometheus_data && chown 65534 ./prometheus_data` [关于持久化权限的讨论](https://github.com/prometheus/prometheus/pull/8747)

-   用到了三个配置文件：compose.yml prometheus.yml web-config.yml

-   docker compose 文件：compose.yml

```
version: '3.1'
services:
  prometheus:
    restart: always
    container_name: prometheus
    image: prom/prometheus:v2.47.2
    command:
      # 配置文件
      - '--config.file=/etc/prometheus/prometheus.yml'
      # 指定web面板账号密码访问
      - '--web.config.file=/etc/prometheus/web-config.yml'
      # 数据目录
      - '--storage.tsdb.path=/prometheus'
      # 数据保留时间
      - '--storage.tsdb.retention.time=30d'
      # 运行使用 curl -X POST http://localhost:9090/-/reload  重载其配置
      - '--web.enable-lifecycle'
    volumes:
      # 需要权限 mkdir prometheus_data && chown 65534 ./prometheus_data
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
      - ./prometheus_data:/prometheus
      - ./web-config.yml:/etc/prometheus/web-config.yml
    ports:
      - 9090:9090
    networks:
      - devopsnetwork
      
networks:
  devopsnetwork:
    external: true
```

-   prometheus 配置文件示例：prometheus.yml，

    -   指定了 prometheus ，并设置了访问密码 root devops666

```
global:
  scrape_interval:     15s # By default, scrape targets every 15 seconds.

  # Attach these labels to any time series or alerts when communicating with
  # external systems (federation, remote storage, Alertmanager).
  external_labels:
    monitor: 'codelab-monitor'

# A scrape configuration containing exactly one endpoint to scrape:
# Here it's Prometheus itself.
scrape_configs:
   - job_name: 'prometheus'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9090']
    # 启用了账号密码 web-config.yml basic_auth_users 需要配置
    basic_auth:
      username: root
      password: devops666
```

-   web 控制台配置：web-config.yml

    -   指定账号密码 root devops666

```
basic_auth_users:
  root: $2a$10$c6OOt9f6LuhiabPyW0nkNOprb1ndQ/HHSfqjB/exe7yh5FaYUqvBy
```

-   启动：`docker compose up -d`

### Prometheus 指定账号密码访问

-   设置 https 或基础密码验证[文档](https://prometheus.io/docs/prometheus/latest/configuration/https/)
-   要启用 web 面板账号密码访问，指定 web 访问配置文件 `'--web.config.file=/etc/prometheus/web-config.yml'`
-   映射 web-config.yml 指定账号密码 root devops666 ，Prometheus 密码需要使用 htpasswd 生成 bcrypt 密码 [在线生成工具](https://www.bejson.com/encrypt/bcrpyt_encode/)

```
basic_auth_users:
  root: $2a$10$kmkC.lHR3Kwl19DE9l1KRerMDinEejEbNmJigrJZYAGkgzbVBUpa2
```

-   如果需要使用 Prometheus 监听 Prometheus ，并且 Prometheus 启用了身份验证，需要在配置出增加 basic_auth 配置节

```
scrape_configs:
   - job_name: 'prometheus'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9090']
    # 启用了账号密码 web-config.yml basic_auth_users 需要配置
    basic_auth:
      username: root
      password: devops666
```

-   掉坑里去了，如果一开始 basic_auth 没有配置对，重载配置是无效的，需要重启

    -   ![](devops_prometheus_grafana_install_use_db_site_monitor/662652-20231206233226148-9931.png)
    -   ![](devops_prometheus_grafana_install_use_db_site_monitor/662652-20231206233226264-260127102.png)

### 重载配置

修改了配置文件后，可以使用 api 接口重载配置，如果启用了账号密码可以使用 -u 参数指定（basic_auth 修改重载配置无效），没有就不需要加 -u 参数

```
curl -X POST http://localhost:9090/-/reload
或
curl -X POST -u root:devops666 http://localhost:9090/-/reload
```

### 添加 nginx 配置

还不会在局域网申请 ssl 及配置的可以参考之前的文章 [前后端都用得上的 Nginx 日常使用经验](https://juejin.cn/post/7296754422750232576)

```
server {

    listen 80;
    listen       443 ssl;
    server_name prometheus.devops.test.com;  # 自行修改成你的域名

    ssl_certificate      /certs/prometheus.devops.test.com/server.crt;
    ssl_certificate_key  /certs/prometheus.devops.test.com/server.key;
    ssl_session_cache    shared:SSL:1m;
    ssl_session_timeout  5m;
    ssl_ciphers  HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers  on;

    location / {
            proxy_pass http://prometheus:9090;
            proxy_http_version 1.1;
            proxy_buffering off;
            proxy_request_buffering off;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
            proxy_set_header Host $host;
            proxy_set_header X-Forwarded-For $remote_addr;
    }
}
```

### 安装成功

根据上面的配置，完成了 Prometheus 的搭建，监听本身 Prometheus 的情况

通过`https://prometheus.devops.test.com/` 使用账号密码 root devops666 登陆后即可

![](devops_prometheus_grafana_install_use_db_site_monitor/662652-20231206233226200-1982732548.png)

## 使用 docker compose 安装 Grafana

Grafana 是一个开源的数据可视化和监控平台，它提供了丰富的图表和面板，用于展示各种指标和数据。提到 Prometheus，Grafana 自然是不不能落下，基于官方和社区，可以很快的制作出监控可视化面板，助力日常运维检测

### 配置文件说明

-   grafana 版本：v10.2.0
-   指定账号密码： root devops666
-   端口映射：3000
-   挂载数据目录 ./grafana_data， 需要赋予权限：`mkdir -p grafana_data && chown -R 472:472 ./grafana_data`
-   指定网络为 devopsnetwork（`docker network create devopsnetwork`）
-   docker compose 文件：compose.yml ，安装 v10.2.0 替换版本号即可

```
version: '3.1'
services:
    grafana:
      restart: always
      container_name: grafana
      image: grafana/grafana:10.2.0
      ports:
        - "3000:3000"
      volumes:
        - ./grafana_data:/var/lib/grafana
      environment:
        - GF_SECURITY_ADMIN_USER=root
        - GF_SECURITY_ADMIN_PASSWORD=devops666
        - GF_USERS_ALLOW_SIGN_UP=false
      networks:
        - devopsnetwork
      
networks:
  devopsnetwork:
    external: true
```

-   启动：`docker compose up -d`

### 添加 nginx 配置

```
server {

    listen 80;
    listen       443 ssl;
    server_name grafana.devops.test.com;  # 自行修改成你的域名

    ssl_certificate      /certs/grafana.devops.test.com/server.crt;
    ssl_certificate_key  /certs/grafana.devops.test.com/server.key;
    ssl_session_cache    shared:SSL:1m;
    ssl_session_timeout  5m;
    ssl_ciphers  HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers  on;

    location / {
            proxy_pass http://grafana:3000;
            proxy_http_version 1.1;
            proxy_buffering off;
            proxy_request_buffering off;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
            proxy_set_header Host $host;
            proxy_set_header X-Forwarded-For $remote_addr;
    }
}
```

### 安装成功

通过`https://grafana.devops.test.com/`使用账号密码 root devops666 登陆后即可

![](devops_prometheus_grafana_install_use_db_site_monitor/662652-20231206233226178-953874498.png)

![](devops_prometheus_grafana_install_use_db_site_monitor/662652-20231206233226384-1085445792.png)

制作监控面板步骤：

1.  指定一个数据源，数据源采集各组件的信息，提供给 Grafana 进行显示
1.  可以从官方/社区/自行制作面板

### 添加 Prometheus 数据源

![](devops_prometheus_grafana_install_use_db_site_monitor/662652-20231206233226384-975081172.png)

! ! ! 数据源最好是用 IP+端口，避免容器内无法解析 test.com 域名

![](devops_prometheus_grafana_install_use_db_site_monitor/662652-20231206233226233-240129930.png)

### 从 Grafana 导入仪表板

-   从[官网](https://grafana.com/grafana/dashboards/?dataSource=prometheus) 获取一个监控 Prometheus 的面板 [Prometheus 2.0 Overview](https://grafana.com/grafana/dashboards/3662-prometheus-2-0-overview/) Id：3662

![](devops_prometheus_grafana_install_use_db_site_monitor/662652-20231206233226218-2088451690.png)

-   选择数据源确认导入

![](devops_prometheus_grafana_install_use_db_site_monitor/662652-20231206233226227-1936114631.png)

-   查看面板，可以看到面板中有许多数据已经无法正常显示，这个在后续的一些面板中也经常会遇到，之前以为是 Grafana 不对，但我创建了一个依赖版本 4.5.0-beta1 测试发现依旧不行，应该还是是因为监控数据的问题

![](devops_prometheus_grafana_install_use_db_site_monitor/662652-20231206233226177-751499377.png)

### Grafana v10.2.0 常用操作

之前使用的 v6.7.2，当前已经是 v10.2.0 了，故还是选择将 grafana 升级到 v10，升级需要重新创建数据目录

#### 设置中文

在写完文章发现原来已经支持中文了，补上～

![](devops_prometheus_grafana_install_use_db_site_monitor/662652-20231206233226283-1448019694.png)

#### 导入面板

-   新建面板的入口在右上方

![](devops_prometheus_grafana_install_use_db_site_monitor/662652-20231206233226492-814156810.png)

#### 添加数据源

-   测试了常用的几个数据源： Prometheus ClickHouse Redis
-   MongoDB 需要企业版，开源版可以使用 Prometheus 监控

![](devops_prometheus_grafana_install_use_db_site_monitor/662652-20231206233226482-317795304.png)

-   添加了数据源后有推荐的仪表盘可以直接启用

![](devops_prometheus_grafana_install_use_db_site_monitor/662652-20231206233226392-530739934.png)

#### 添加插件

-   之前 v6.7.2 无法在线安装（墙），v10 可以在线安装了，方便许多
-   准备安装插件时记得切换 State 到 All

![](devops_prometheus_grafana_install_use_db_site_monitor/662652-20231206233226466-500555965.png)

## 常用服务的 Prometheus+Grafana 配置

![](devops_prometheus_grafana_install_use_db_site_monitor/662652-20231206233213629-611425215.png)

常用的一些组件可以在[官方下载页](https://prometheus.io/download/#node_exporter)中去寻找，使用 Docker 可以去[ DockerHub ](https://hub.docker.com/u/prom)去找对应的镜像即可

-   Grafana 版本：已升级到 v10.2.0
-   Prometheus 版本：v2.47.2

![](devops_prometheus_grafana_install_use_db_site_monitor/662652-20231206233226438-236974707.png)

![](devops_prometheus_grafana_install_use_db_site_monitor/662652-20231206233226253-134620872.png)

### Linux 监控配置

-   Prometheus 组件：[node_exporter](https://github.com/prometheus/node_exporter) v1.7.0

-   Grafana 面板推荐：

    -   [Node Exporter Dashboard 220417 通用 Job 分组版](https://grafana.com/grafana/dashboards/16098-1-node-exporter-for-prometheus-dashboard-cn-0417-job/) ID: 16098
    -   [Linux Hosts Metrics | Base](https://grafana.com/grafana/dashboards/10180-kds-linux-hosts/) ID: 10180

-   指定映射端口：9100

-   docker 运行 node_exporter

```
docker run -d \
  -p 9100:9100 \
  -v "/:/host:ro,rslave" \
  --name node_exporter  \
  --restart always \
  quay.io/prometheus/node-exporter:v1.7.0 \
  --path.rootfs=/host
```

![](devops_prometheus_grafana_install_use_db_site_monitor/662652-20231206233227258-534608648.png)

-   运行成功并将其配置到 prometheus.yml

```
#global:
#  xxx
#...
scrape_configs:
  - job_name: 'linux'
    # 每隔5秒从该作业中抓取目标
    scrape_interval: 5s
    static_configs:
      - targets: ['192.168.123.214:9100','192.168.123.216:9100','192.168.123.219:9100','192.168.123.222:9100']
```

-   重载配置后配置生效（` curl -X POST -u root:devops666  ``http://localhost:9090/-/reload`）

![](devops_prometheus_grafana_install_use_db_site_monitor/662652-20231206233226586-292447382.png)

-   可以使用前面安装的 JumpServer 工作台-作业中心-快捷命令 直接远程在四台 Linux 主机运行

![](devops_prometheus_grafana_install_use_db_site_monitor/662652-20231206233226497-1072163184.png)

-   v6 导入 Grafana 面板 10180

![](devops_prometheus_grafana_install_use_db_site_monitor/662652-20231206233226485-1973815573.png)

![](devops_prometheus_grafana_install_use_db_site_monitor/662652-20231206233226546-786889192.png)

-   v10 导入面板 16098

![](devops_prometheus_grafana_install_use_db_site_monitor/662652-20231206233226491-783573140.png)

### Windows 监控配置

-   Prometheus 组件：[windows_exporter ](https://github.com/prometheus-community/windows_exporter)v0.24

-   Grafana 面板推荐：

    -   [Windows Exporter Dashboard 20230531-StarsL.cn](https://grafana.com/grafana/dashboards/10467) ID: 10467
    -   [Windows Exporter](https://grafana.com/grafana/dashboards/12566) ID: 12566

-   从 Github Release 下载安装程序即可：[从 release 页下载 v0.24](https://github.com/prometheus-community/windows_exporter/releases/download/v0.24.0/windows_exporter-0.24.0-386.exe)

-   运行使用本机 IP+9182 端口访问即可：http://192.168.123.201:9182/

![](devops_prometheus_grafana_install_use_db_site_monitor/662652-20231206233226441-101574175.png)

-   运行成功并将其配置到 prometheus.yml

```
#global:
#  xxx
#...
scrape_configs:
  - job_name: 'win-node'
    # 每隔5秒从该作业中抓取目标
    scrape_interval: 5s
    static_configs:
      - targets: ['192.168.123.201:9182']
```

-   重载配置后配置生效（` curl -X POST -u root:devops666  ``http://localhost:9090/-/reload`）

![](devops_prometheus_grafana_install_use_db_site_monitor/662652-20231206233226435-595558435.png)

-   v10 导入 Grafana 面板 12566

![](devops_prometheus_grafana_install_use_db_site_monitor/662652-20231206233226447-1468281611.png)

![](devops_prometheus_grafana_install_use_db_site_monitor/662652-20231206233226238-696034576.png)

可以修改时间范围查看监控情况

![](devops_prometheus_grafana_install_use_db_site_monitor/662652-20231206233226396-230392120.png)

-   导入 10467

![](devops_prometheus_grafana_install_use_db_site_monitor/662652-20231206233226201-1050828575.png)

### Nginx 监控配置

-   Prometheus 组件：[nginx-prometheus-exporter](https://github.com/nginxinc/nginx-prometheus-exporter) v0.11

-   Grafana 面板推荐：

    -   [NGINX exporter](https://grafana.com/grafana/dashboards/12708) ID: 12708
    -   [Nginx 日志支持扩展，需要插件](https://grafana.com/grafana/dashboards/12268) ID：12268

-   首先需要修改 nginx 配置启用 stub_status ，默认是建议新开一个端口来，我这里是局域网所以直接使用 80 端口配置：通过 192.168.123.214：80/basic_status 即可访问到 nginx 状态

```
server {
    listen       80;
    #...其他配置
    location = /stub_status {
        stub_status;
    }
}
```

![](devops_prometheus_grafana_install_use_db_site_monitor/662652-20231206233226299-1899152957.png)

-   指定映射端口：9113
-   docker 运行 nginx-prometheus-exporter

```
docker run -d -p 9113:9113 \
--name nginx_exporter  \
--restart always \
nginx/nginx-prometheus-exporter:0.11 --nginx.scrape-uri=http://192.168.123.214:80/stub_status
```

-   运行使用 IP+9113 端口访问即可：http://192.168.123.214:9113/

![](devops_prometheus_grafana_install_use_db_site_monitor/662652-20231206233226314-1965041747.png)

![](devops_prometheus_grafana_install_use_db_site_monitor/662652-20231206233226323-1280685302.png)

-   将其配置到 prometheus.yml

```
  - job_name: 'nginx'
    # 每隔5秒从该作业中抓取目标
    scrape_interval: 5s
    static_configs:
      - targets: ['192.168.123.214:9113']
```

重载配置后生效：` curl -X POST -u root:devops666  ``http://localhost:9090/-/reload`

![](devops_prometheus_grafana_install_use_db_site_monitor/662652-20231206233226437-399382414.png)

-   导入 Grafana 面板：12708

![](devops_prometheus_grafana_install_use_db_site_monitor/662652-20231206233226484-1018189335.png)

### MySQL 监控配置

-   Prometheus 组件：[mysqld_exporter ](https://github.com/prometheus/mysqld_exporter#general-flags)v0.15.0

-   Grafana 面板推荐：

    -   [MYSQL 监控指标](https://grafana.com/grafana/dashboards/11329) ID:11329
    -   [MySQL Overview](https://grafana.com/grafana/dashboards/7362) ID:7362
    -   [MySQL Exporter Quickstart and Dashboard](https://grafana.com/grafana/dashboards/14057) ID: 14057

-   mysql 监控账号创建

    -   监控账号密码： exporter devops666
    -   限制最大连接数：MAX_USER_CONNECTIONS ：3
    -   并授权查询权限及外部访问权限，允许的 Host 不能用 localhost，容器内部访问时会带上容器 IP 无法连接

```
CREATE USER 'exporter'@'%' IDENTIFIED BY 'devops666' WITH MAX_USER_CONNECTIONS 3;
GRANT PROCESS, REPLICATION CLIENT, SELECT ON *.* TO 'exporter'@'%';
```

可以使用之前搭建的 JumpServer 进行执行

![](devops_prometheus_grafana_install_use_db_site_monitor/662652-20231206233226383-688266648.png)

-   指定映射端口：9104

-   docker 运行 mysqld_exporter

    -   建议指定和 mysql 服务同一网络，使用 mysql 的服务名加端口访问，不在同一网络的适合账号授权访问时需要将 localhost 修改为%，dockerhub 文档没有更新，以 GitHub 文档为主
    -   主机名和端口：--mysqld.address mysql:3306 （一个网络就用服务名，或者使用 ip:port）
    -   账号：--mysqld.username exporter
    -   密码：-e MYSQLD_EXPORTER_PASSWORD=devops666
    -   指定网络：--network devopsnetwork（和 mysql 一个网络，可以不需要）

```
docker run -d \
  -p 9104:9104 \
  -e MYSQLD_EXPORTER_PASSWORD=devops666 \
  --name mysql_exporter  \
  --restart always \
  prom/mysqld-exporter:v0.15.0 \
  --mysqld.address 192.168.123.214:3306  \
  --mysqld.username exporter
```

-   运行使用 IP+9104 端口访问即可：http://192.168.123.214:9104/

![](devops_prometheus_grafana_install_use_db_site_monitor/662652-20231206233226294-689292347.png)

-   将其配置到 prometheus.yml

```
  - job_name: mysql 
    static_configs:
      - targets:
        - 192.168.123.214:3306
    relabel_configs:
      - source_labels: [__address__]
        target_label: __param_target
      - source_labels: [__param_target]
        target_label: instance
      - target_label: __address__
        # The mysqld_exporter host:port
        replacement: 192.168.123.214:9104
```

重载配置后生效` curl -X POST -u root:devops666  ``http://localhost:9090/-/reload`

![](devops_prometheus_grafana_install_use_db_site_monitor/662652-20231206233226437-1447586003.png)

-   导入 Grafana 面板 11329

![](devops_prometheus_grafana_install_use_db_site_monitor/662652-20231206233226410-2128743457.png)

### MongoDB 监控配置

-   Prometheus 组件：[mongodb_exporter](https://github.com/percona/mongodb_exporter) v0.20

-   Grafana 面板推荐：

    -   [MongoDB](https://grafana.com/grafana/dashboards/14997-mongodb/) ID：14997 部分图表无效
    -   MongoDB 数据源插件需要企业版才能使用

-   docker 运行 mongodb_exporter 监听单机实例

```
#docker stop mongodb_exporter && docker rm mongodb_exporter
docker run -d -p 9216:9216 \
--name mongodb_exporter  \
--restart always \
percona/mongodb_exporter:0.20 --compatible-mode --mongodb.uri=mongodb://root:devops666@192.168.123.214:27017
```

-   prometheus.yml 配置

```
  - job_name: mongodb
    static_configs:
      - targets: ['192.168.123.214:9216']
        labels:
          instance: mongodb
```

-   导入面板 14997 目前只测试了单实例的监控，一些数据可以根据需要进行修改

![](devops_prometheus_grafana_install_use_db_site_monitor/662652-20231206233226520-890573277.png)

### ClickHouse 监控配置

-   Prometheus 配置：clickhouse 9363 端口、9000 端口

-   9363：ClickHouse 的 Prometheus 默认指标端口

-   9000：Native Protocol 端口， ClickHouse TCP 协议，用于分布式查询的服务器间通信

-   Grafana 面板推荐：

    -   [ClickHouse 仪表盘](https://grafana.com/grafana/dashboards/14192) ID:14192

#### 使用 Prometheus 数据源监控

-   prometheus.yml 配置

```
  - job_name: clickhouse
    static_configs:
      - targets: ['192.168.123.214:9363']
        labels:
          instance: clickhouse
```

-   参考之前安装 clickhouse 教程，增加启用 9000 端口，并在 grafana 中安装 clickhouse 数据源插件

```
version: '3'
services:
  clickhouse-server:
    container_name: db_clickhouse_20_6
    image: yandex/clickhouse-server:20.6.8.5
    restart: always
    ulimits:
      nofile:
        soft: 262144
        hard: 262144
    environment:
      - TZ=Asia/Shanghai
      - ports=8123,9363,9000
    ports:
      - 8123:8123
      - 9363:9363
      - 9000:9000
    volumes:
      - ./data:/var/lib/clickhouse
      - ./logs:/var/log/clickhouse-server
      # 指定配置文件
      - ./config:/etc/clickhouse-server
```

#### 使用数据源插件监控

-   Grafana 启用数据源 clickhouse 插件

![](devops_prometheus_grafana_install_use_db_site_monitor/662652-20231206233226433-411953224.png)

-   配置数据源 需要开启 9000 端口

![](devops_prometheus_grafana_install_use_db_site_monitor/662652-20231206233226393-240303426.png)

-   启用默认仪表盘

![](devops_prometheus_grafana_install_use_db_site_monitor/662652-20231206233226468-1277128856.png)

-   预览效果

![](devops_prometheus_grafana_install_use_db_site_monitor/662652-20231206233226333-1635440016.png)

### Redis 监控配置

-   Prometheus 组件：[redis_exporter ](https://github.com/oliver006/redis_exporter)v1.55.0

-   [配置参考](https://github.com/oliver006/redis_exporter#prometheus-configuration-to-scrape-multiple-redis-hosts)

-   端口：单机 9121:9121，集群 9122:9121

-   Grafana 面板推荐：

    -   [Redis Exporter Quickstart and Dashboard](https://grafana.com/grafana/dashboards/14091): ID 14091
    -   [Redis Dashboard for Prometheus Redis Exporter](https://grafana.com/grafana/dashboards/11835): ID 11835
    -   [Redis 数据源插件面板](https://grafana.com/grafana/dashboards/12776-redis/)：ID 12776

#### redis_exporter 单机监控

-   docker 运行 oliver006/redis_exporter 指定端口 9121
-   通过 --redis.addr --redis.password 来指定地址和密码

```
#docker stop redis_exporter && docker rm redis_exporter &&
docker run -d -p 9121:9121 \
--name redis_exporter \
--restart always \
oliver006/redis_exporter:v1.55.0 \
--redis.addr redis://192.168.123.214:6379 \
--redis.password devops666
```

-   prometheus.yml 配置

```
  - job_name: redis_exporter
    static_configs:
      - targets: ['192.168.123.214:9121']
        labels:
          instance: redis-node
```

-   导入面板 11835 监控单机

![](devops_prometheus_grafana_install_use_db_site_monitor/662652-20231206233231818-121286532.png)

-   导入面板 14091 监控单机

![](devops_prometheus_grafana_install_use_db_site_monitor/662652-20231206233226344-831174305.png)

#### redis_exporter 集群监控

-   docker 运行 oliver006/redis_exporter 指定端口 9122

```
docker run -d -p 9122:9121 \
--name redis_exporter_targets \
--restart always \
oliver006/redis_exporter:v1.55.0 
```

-   prometheus.yml 配置

```
  - job_name: redis_exporter_targets
    static_configs:
      - targets:
        - redis://192.168.123.216:6380
        - redis://192.168.123.219:6380
        - redis://192.168.123.222:6380
        - redis://192.168.123.216:6381
        - redis://192.168.123.219:6381
        - redis://192.168.123.222:6381
    metrics_path: /scrape
    relabel_configs:
      - source_labels: [__address__]
        target_label: __param_target
      - source_labels: [__param_target]
        target_label: instance
      - target_label: __address__
        replacement: 192.168.123.214:9122
```

-   使用面板 11835 监控集群节点

![](devops_prometheus_grafana_install_use_db_site_monitor/662652-20231206233226330-1365622953.png)

-   使用面板 14091 监控集群节点

![](devops_prometheus_grafana_install_use_db_site_monitor/662652-20231206233226618-1530116535.png)

#### 使用数据源插件监控 Redis 单机/集群

-   安装 Redis 数据源插件

![](devops_prometheus_grafana_install_use_db_site_monitor/662652-20231206233226436-1753116062.png)

-   配置 Redis 单机数据源 Redis-Node

![](devops_prometheus_grafana_install_use_db_site_monitor/662652-20231206233226229-1785768870.png)

-   配置 Redis 集群数据源 Redis-Cluster

![](devops_prometheus_grafana_install_use_db_site_monitor/662652-20231206233226206-118653320.png)

-   导入面板 12776 指定数据源

![](devops_prometheus_grafana_install_use_db_site_monitor/662652-20231206233226483-2006820807.png)

-   集群监控预览

![](devops_prometheus_grafana_install_use_db_site_monitor/662652-20231206233226459-728413375.png)

### RabbitMQ 监控配置

-   Grafana 面板推荐：

    -   [rabbitmq-overview](https://grafana.com/grafana/dashboards/10991-rabbitmq-overview/) ID:10991

-   RabbitMQ 内置 Prometheus 支持 [文档](https://www.rabbitmq.com/prometheus.html#overview-prometheus)

-   需要使用时映射 15692:15692 端口

-   并确保插件已启用：`docker exec -it rabbitmq_3_12 /bin/bash -c "rabbitmq-plugins enable rabbitmq_prometheus"`

![](devops_prometheus_grafana_install_use_db_site_monitor/662652-20231206233226490-186790263.png)

-   Prometheus 配置

```
  - job_name: rabbitmq
    static_configs:
      - targets: ['192.168.123.214:15692']
        labels:
          instance: rabbitmq
```

![](devops_prometheus_grafana_install_use_db_site_monitor/662652-20231206233226438-1967425612.png)

-   导入 Grafana 面板 10991

![](devops_prometheus_grafana_install_use_db_site_monitor/662652-20231206233226698-1617675376.png)

### 站点监控配置

-   Prometheus 组件：[blackbox_exporter](https://github.com/prometheus/blackbox_exporter) v0.24.0

-   Grafana 面板推荐：

    -   [Blackbox Exporter](https://grafana.com/grafana/dashboards/13659-blackbox-exporter-http-prober/) ID: 13659
    -   [Decentralized Blackbox](https://grafana.com/grafana/dashboards/9719-decentralized-blackbox-exporter-copy/) ID: 9719
    -   [Blackbox Exporter Dashboard](https://grafana.com/grafana/dashboards/9965-1-blackbox-exporter-dashboard-20220412/) ID: 9965

-   使用 docker compose up -d 运行 blackbox-exporter ，需要映射配置 blackbox.yml

-   挂载了模块配置文件 blackbox.yml 和局域网的证书 myCA.pem

```
version: '3.1'
services:
  blackbox_exporter:
    restart: always
    container_name: blackbox_exporter 
    image: prom/blackbox-exporter:v0.24.0
    command:
      # 配置文件
      - '--config.file=/config/blackbox.yml'
    volumes:
      # blackbox.yml myCA.pem
      - ./config:/config
    ports:
      - 9115:9115
    networks:
      - devopsnetwork
      
networks:
  devopsnetwork:
    external: true
```

-   blackbox.yml 配置，添加了 http_custom_ca_devops 将局域网中的证书映射进去了

```
modules:
  http_2xx:
    prober: http
    http:
      preferred_ip_protocol: "ip4"
  http_post_2xx:
    prober: http
    http:
      method: POST
  tcp_connect:
    prober: tcp
  pop3s_banner:
    prober: tcp
    tcp:
      query_response:
      - expect: "^+OK"
      tls: true
      tls_config:
        insecure_skip_verify: false
        ca_file: 
  grpc:
    prober: grpc
    grpc:
      tls: true
      preferred_ip_protocol: "ip4"
  grpc_plain:
    prober: grpc
    grpc:
      tls: false
      service: "service1"
  ssh_banner:
    prober: tcp
    tcp:
      query_response:
      - expect: "^SSH-2.0-"
      - send: "SSH-2.0-blackbox-ssh-check"
  irc_banner:
    prober: tcp
    tcp:
      query_response:
      - send: "NICK prober"
      - send: "USER prober prober prober :prober"
      - expect: "PING :([^ ]+)"
        send: "PONG ${1}"
      - expect: "^:[^ ]+ 001"
  icmp:
    prober: icmp
  icmp_ttl5:
    prober: icmp
    timeout: 5s
    icmp:
      ttl: 5
  http_custom_ca_devops:
    prober: http
    http:
      method: GET
      tls_config:
        ca_file: /config/myCA.pem
```

-   prometheus.yml 配置

```
  - job_name: blackbox_devops
    metrics_path: /probe
    params:
      module: [ http_custom_ca_devops ]  # Look for a HTTP 200 response.
    dns_sd_configs:
      - names:
          - nginx.devops.test.com
          - apollo.devops.test.com
          - rabbitmq.devops.test.com
          - dns.devops.test.com
          - nexus.devops.test.com
          - jumpserver.devops.test.com
          - grafana.devops.test.com
          - prometheus.devops.test.com
        type: A
        port: 443
    relabel_configs:
      - source_labels: [__address__]
        target_label: __param_target
        replacement: https://192.168.123.214:443/  # Make probe URL be like https://1.2.3.4:443/
      - source_labels: [__meta_dns_name]
        target_label: instance
      - target_label: __address__
        replacement: 192.168.123.214:9115  # The blackbox exporter's real hostname:port.
      - source_labels: [__meta_dns_name]
        target_label: __param_hostname  # Make domain name become 'Host' header for probe requests
      - source_labels: [__meta_dns_name]
        target_label: vhost  # and store it in 'vhost' label
        #匹配apollo，需要访问/health检查状态
      - source_labels: [__param_hostname]
        regex: 'apollo.*'
        target_label: __param_target
        replacement: https://192.168.123.214:443/health
        #匹配prometheus 开启了basic_auth 所以可以使用下面这种方式进行验证，问的gpt，还真行
      - source_labels: [__param_hostname]
        regex: 'prometheus.*'
        target_label: __param_target
        replacement: https://root:devops666@192.168.123.214:443
```

-   重载 prometheus 配置生效

![](devops_prometheus_grafana_install_use_db_site_monitor/662652-20231206233226407-1313587803.png)

-   导入面板 13659 监控效果

![](devops_prometheus_grafana_install_use_db_site_monitor/662652-20231206233226414-869838363.png)

-   导入面板 9719 监控效果

![](devops_prometheus_grafana_install_use_db_site_monitor/662652-20231206233226247-917285796.png)

-   导入面板 9965 监控效果

![](devops_prometheus_grafana_install_use_db_site_monitor/662652-20231206233226489-1734726978.png)

## Grafana 监控告警设置

通过设置 **Alert rules（预警规则）** ，匹配到有指标符合规则时，就会根据 **Notification policies（通知策略）** 进行消息发送，发送的内容和模板在 **Contact points（通知方式）** 设置

下面完成一个实际的使用场景：检测 RabbitMQ 面板状态，服务不可用时进行预警，通过企业微信机器人进行群通知

#### 设置预警规则

-   添加规则名称：RabbitMQ 监控

![](devops_prometheus_grafana_install_use_db_site_monitor/662652-20231206233226319-27611562.png)

-   选择数据源：Prometheus
-   设置指标条件：内存使用字节 erlang_mnesia_memory_usage_bytes 并指定 job 是 rabbitmq

![](devops_prometheus_grafana_install_use_db_site_monitor/662652-20231206233226526-1245923494.png)

-   设置预警条件：内存值小于 1（无效）时进行通知

![](devops_prometheus_grafana_install_use_db_site_monitor/662652-20231206233226270-117718140.png)

-   设置检查规则，30s 检查一次，30s 等待期，立刻通知
-   Pending period 等待期：如果警报条件不再满足，警报规则将会恢复到正常状态，而不会触发警报

![](devops_prometheus_grafana_install_use_db_site_monitor/662652-20231206233226228-1083035483.png)

-   这个和默认的通知策略还有关系，需要结合使用，默认是 30s，5 分钟等待期，4 小时内不重复发送可根据需要修改

![](devops_prometheus_grafana_install_use_db_site_monitor/662652-20231206233226214-390549570.png)

-   设置提醒信息及服务地址

![](devops_prometheus_grafana_install_use_db_site_monitor/662652-20231206233226339-522134688.png)

#### 设置通知策略

可以通过修改重复间隔，重新发送通知

![](devops_prometheus_grafana_install_use_db_site_monitor/662652-20231206233226277-2068193750.png)

![](devops_prometheus_grafana_install_use_db_site_monitor/662652-20231206233226436-1483621793.png)

#### 设置告警模板

Grafana 使用 Go 模板语言来创建通知消息，可根据[文档](https://grafana.com/docs/grafana/latest/alerting/manage-notifications/template-notifications/)自行编写，另外一个[ aws 的中文文档](https://docs.aws.amazon.com/zh_cn/grafana/latest/userguide/v9-alerting-notifications-go-templating.html)可以参考

-   结合文档写的一个通知模板

```
{{ define "DevOpsTemplate" -}}
{{- range .Alerts -}}
{{- range .Annotations.SortedPairs -}}
{{if eq .Name "summary" }}
**{{ "预警消息" }}**：{{ .Value }}
{{- end -}}
{{ end }}
{{- range .Annotations.SortedPairs -}}
{{if eq .Name "runbook_url" }}
**{{ "服务地址" }}**：{{ .Value }}
{{- end -}}
{{ end }}
**{{"预警分组"}}**：{{ .Labels.grafana_folder }}
**{{"开始时间"}}**：{{ (.StartsAt.Add 28800e9).Format "2006-01-02 15:04:05"}}
**{{"预警参数"}}**：
    {{ range .Labels.SortedPairs -}}
      {{ .Name }}：{{ .Value }}
    {{ end }}
    {{- range .Annotations.SortedPairs -}}
    {{- if and (ne .Name "summary") (ne .Name "runbook_url") -}}
      {{ .Name }}：{{ .Value }}
    {{ end }}
{{ end }}
{{- end -}}
{{- end -}}
```

#### 设置通知方式

![](devops_prometheus_grafana_install_use_db_site_monitor/662652-20231206233226433-835350090.png)

支持多种通知，根据需要配置，这里以企业微信机器人为例

![](devops_prometheus_grafana_install_use_db_site_monitor/662652-20231206233226428-1755540104.png)

需要通过告警快速定位问题，实际应用中肯定是需要将告警实例及其信息一并通知，所以还需要结合告警模板和规则进行消息的发送。使用模板语法指定前面设置的模板

![](devops_prometheus_grafana_install_use_db_site_monitor/662652-20231206233226325-1620047022.png)

  


设置完成后，当预警规则设置页面出现异常提示时，就会进行提示了

![](devops_prometheus_grafana_install_use_db_site_monitor/662652-20231206233226467-1565062763.png)

## 踩坑记录

-   安装官方文档运行后，提示无权限，需要赋予挂载目录权限：`chown 65534 ./prometheus_data`

-   权限在之前的使用中使用 777 权限，能够解决，但是很明显不是最佳方案，然后好好找了下，最后发现这个问题很久就有人提出 pr，只是一直没有被合并，大概下个版本就可以了， [关于持久化权限的讨论](https://github.com/prometheus/prometheus/pull/8747)

-   basic_auth 修改后，重载配置是无效的，需要重新启动后才生效

    -   ![](devops_prometheus_grafana_install_use_db_site_monitor/662652-20231206233226423-1019797875.png)
    -   ![](devops_prometheus_grafana_install_use_db_site_monitor/662652-20231206233226410-893414603.png)

-   redis 使用 redis_exporter，监控多个如果有密码，没有密码，密码不一样的实例需要分开运行配置

-   mongodb 的监控始终不是很完美

-   站点监控的证书验证和密码验证反反复复尝试了很久，以下为主要踩坑的地方

    -   prometheus.yml 配置 blackbox job 的 params module 只能有一个，多个只会第一个生效
    -   blackbox 配置的证书可以是 pem，无效转换成 crt 格式，配置：ca_file: /config/myCA.pem
    -   basic_auth 配置不需要再配置 job，可以直接使用特殊的 url 格式：`https://root:devops666@192.168.123.214:443`

-   Grafana 服务重启后，nginx 代理域名访问一直 502，IP 可以访问，重启 nginx 后就可以访问了

-   Grafana 的通知模板语法，可[参考文档](https://docs.aws.amazon.com/zh_cn/grafana/latest/userguide/v9-alerting-notifications-go-templating.html#v9-go-removespace)

```
# 1.定义模板
{{ define "模板名称" -}}
/**/
{{ end }}

# 2.循环预警消息
{{ range .Alerts }}
/**/
{{ end }}

# 3.打印加粗文字
**{{ "预警消息" }}**

# 4.删除空格和换行符
{{ range .Alerts -}}
  {{ range .Labels.SortedPairs -}}
    {{ .Name }} = {{ .Value }}
  {{ end }}
{{ end }}

# 5. 循环附加信息
{{- range .Annotations.SortedPairs -}}
{{ end}}

# 5. if判断
{{if eq .Name "runbook_url" }}

# 6. 时区问题，+8设置
**{{"开始时间"}}**：{{ (.StartsAt.Add 28800e9).Format "2006-01-02 15:04:05"}}
```

## 相关文档

-   [Prometheus Github](https://github.com/prometheus/prometheus)
-   [Prometheus 官方文档](https://prometheus.io/docs/prometheus/latest/installation/)
-   [Prometheus Bcrypt 密码生成](https://www.bejson.com/encrypt/bcrpyt_encode/)
-   [Prometheus 配置文件参考示例](https://github.com/prometheus/prometheus/tree/release-2.47/documentation/examples)
-   [Prometheus 数据持久化权限的讨论](https://github.com/prometheus/prometheus/pull/8747)
-   [Grafana Github](https://github.com/grafana/)
-   [Grafana 面板检索](https://grafana.com/grafana/dashboards/)
-   [Grafana 通知模板中文文档](https://docs.aws.amazon.com/zh_cn/grafana/latest/userguide/v9-alerting-notifications-go-templating.html)
-   [Prometheus+Grafana+Alertmanager 实现告警推送教程](https://www.cnblogs.com/xuwujing/p/14065740.html)
-   [Grafana 新手教程-实现仪表盘创建和告警推送](https://www.cnblogs.com/xuwujing/p/17832216.html)****

## 后语

> 研究了差不多大半个月，从常用中间件的监控到设置预警，花费了很大的功夫，也掉了不少的头发。
>
> 这篇文章写完，个人感觉 Prometheus+Grafana 这套方案算是入门了，满足日常使用肯定是没问题的。
>
> 走过不要错过，欢迎留言交流。
