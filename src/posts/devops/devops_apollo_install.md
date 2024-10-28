---
title: Apollo 配置中心的部署与使用经验
date: 2023-10-31 19:14:00
category:
  - DevOps
tag:
  - devops
  - apollo
  - 配置中心
---

## 前言

> Apollo（阿波罗）是携程开源的分布式配置管理中心。
>
> 本文主要介绍其基于 Docker-Compose 的部署安装和一些使用的经验

### 特点

-   成熟，稳定
-   支持管理多环境/多集群/多命名空间的配置
-   配置修改发布实时（1s）通知到应用程序
-   支持权限控制、配置继承，版本管理，灰度发布，使用监控等
-   官方提供了 。NET/Java/Go 的 SDK 以及 Http 接口
-   国产中文，文档友好，大厂背书，使用方案成熟
-   使用简单，支持 Docker ， K8S，官方也提供多种高可用方案参考

### 使用情况

-   目前在微服务项目中做为配置中心，表现稳定，体验良好
-   内存情况：新安装启动在 100M 左右，工作中实际 20 项目，80 客户端使用时，三个服务占 1.5G 左右
-   测试环境和生产环境分开，安全及避免错误操作
-   为什么选择 Apollo：稳定&简单，虽然比不上 Nacos 的性能，也没有服务发现功能，但是稳定啊！！！
-   在我自己部署前，会觉得这个东西好难，好重，好麻烦。写这篇文章的时候的感受只有两个字：牛*

## 实践

### 准备

-   当前版本：v2.1

-   apollo-db：mysql 5.6.6+ 数据库

    -   默认端口：3306
    -   依赖两个数据库：ApolloPortalDB，ApolloConfigDB
    -   默认账号/密码：apollo/admin

-   apollo-configservice：Config Service 提供配置的读取、推送等功能。

    -   默认端口：8080
    -   应用程序端连接到此服务使用

-   apollo-adminservice: Admin Service 提供配置的修改、发布等功能

    -   默认端口：8090
    -   管理界面使用此服务

-   apollo-portal：Portal 提供 Web 界面用来管理配置

    -   默认端口：8070
    -   Web 管理界面
    -   默认账号/密码：apollo/admin

-   Deureka：提供服务注册和发现

    -   Config Service 和 Admin Service 会向 Eureka 注册服务，并保持心跳
    -   在 Admin Service 需要指定 `eureka.service.url`

-   服务配置方式的优先级从高到低分别为：系统参数>环境变量>外部配置文件

### 使用 Docker Compose 安装

> 本篇文章基于 Docker V24 及 Docker Compose V2，安装可以参考之前的[文章](https://juejin.cn/post/7283873796977197108)

#### 配置说明

-   挂载了日志文件到。/logs 目录
-   固定了镜像版本 mysql v5.7 ， apollo v2.1.0
-   指定 MySql 账号密码： root devops666 ，修改了端口映射 13306:3306
-   挂载 MySql 数据，初始化脚本文件夹 。/initsql（[v2.1 脚本](https://github.com/yimogit/MeDevOps/tree/main/configservice/01.apollo/initsql)）
-   Apollo 服务中使用服务名 apollo-db 连接 MySql：`SPRING_DATASOURCE_URL:'...apollo-db:3306/...'`
-   设置先启动数据库：`depends_on:apollo-db`
-   apollo-configservice 服务中指定向 Deureka（Apollo 服务发现组件）注册的地址：`http://192.168.123.214:8080`
-   apollo-adminservice 服务中指定向 Deureka 注册的服务地址：`http://192.168.123.214:809`
-   apollo-adminservice 服务[需指定 Deureka 服务地址](https://www.apolloconfig.com/#/zh/deployment/distributed-deployment-guide?id=_321-eurekaserviceurl-eureka%e6%9c%8d%e5%8a%a1url)：`-Deureka.service.url=``http://192.168.123.214:8080/eureka/`
-   指定网络：devopsnetwork (`docker network create devopsnetwork`)
-   web 管理端默认账号密码：apollo admin，登录后修改！！！

#### 配置文件 compose.yml

-   准备好 compose.yml 及 。/initsql/初始化脚本，修改其中的 IP

-   拷贝到服务器

-   然后运行`docker compose up -d`即可

       ```
        version: '3.1'
        services:
          # Apollo数据库
          apollo-db:
            image: mysql:5.7
            container_name: apollo_db_5_7
            restart: always
            environment:
              TZ: Asia/Shanghai
              MYSQL_ROOT_PASSWORD: 'devops666'
            ports:
              - "13306:3306"
            volumes:
              - ./initsql:/docker-entrypoint-initdb.d
              - ./data:/var/lib/mysql
            networks:
              - devopsnetwork

          # Apollo 服务发现注册中心
          apollo-configservice:
            container_name: apollo_configservice_2_1
            image: apolloconfig/apollo-configservice:2.1.0
            restart: always
            depends_on:
              - apollo-db
            environment:
              SPRING_DATASOURCE_URL: 'jdbc:mysql://apollo-db:3306/ApolloConfigDB?characterEncoding=utf8'
              SPRING_DATASOURCE_USERNAME: 'root'
              SPRING_DATASOURCE_PASSWORD: 'devops666'
              JAVA_OPTS: "-Deureka.instance.homePageUrl=http://192.168.123.214:8080"
              # EUREKA_INSTANCE_HOME_PAGE_URL: http://192.168.123.214:8080
              # EUREKA_INSTANCE_PREFER_IP_ADDRESS: false
            volumes:
              - ./logs:/opt/logs
            ports:
              - "8080:8080"
            networks:
              - devopsnetwork

          #核心接口服务
          apollo-adminservice:
            container_name: apollo_adminservice_2_1
            image: apolloconfig/apollo-adminservice:2.1.0
            restart: always
            environment:
              SPRING_DATASOURCE_URL: 'jdbc:mysql://apollo-db:3306/ApolloConfigDB?characterEncoding=utf8'
              SPRING_DATASOURCE_USERNAME: 'root' 
              SPRING_DATASOURCE_PASSWORD: 'devops666'
              JAVA_OPTS: "-Deureka.instance.homePageUrl=http://192.168.123.214:8090 -Deureka.service.url=http://192.168.123.214:8080/eureka/ "
            depends_on:
              - apollo-db
            ports:
              - "8090:8090"
            volumes:
              - ./logs/:/opt/logs      
            networks:
              - devopsnetwork
              
         
          apollo-portal:
            image: apolloconfig/apollo-portal:2.1.0
            container_name: apollo_portal_2_1
            restart: always
            environment:
              SPRING_DATASOURCE_URL: 'jdbc:mysql://apollo-db:3306/ApolloPortalDB?characterEncoding=utf8'
              SPRING_DATASOURCE_USERNAME: 'root'
              SPRING_DATASOURCE_PASSWORD: 'devops666'
              APOLLO_PORTAL_ENVS: 'dev'      
              DEV_META: 'http://192.168.123.214:8080'
              # 默认账号 apollo admin
            depends_on:
              - apollo-db
            ports:
              - "8070:8070"
            volumes:
              - ./logs/:/opt/logs         
            networks:
              - devopsnetwork

        networks:
          devopsnetwork:
            external: true
        ```

#### 部署成功

部署机器IP：192.168.123.214

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0e9e622afa7645e197e9626db96e6b64~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1822&h=107&s=27837&e=png&b=1c1c1c)

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/41444b13b8cc448ab2f2ca2267411e20~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1920&h=712&s=94937&e=png&b=fefefe)

### 使用 K8S 安装

跟着官方文档一步步来即可，helm 的文件可以从 [apolloconfig/apollo-helm-chart](https://github.com/apolloconfig/apollo-helm-chart) 获取，这里只分享下步骤和些注意的地方

1.  初始化数据库

    1.  可以使用已有或者部署 mysql 服务，并创建 apollo 专门的账号密码
    1.  执行 Apollo 对应版本的 [v2.1 默认初始化脚本](https://github.com/apolloconfig/apollo/tree/v2.1.0/scripts/sql) 创建 ApolloConfigDB，ApolloPortalDB
    1.  生产环境 记得修改 ServerConfig 表的 环境和组织`apollo.portal.envs:pro` `organizations:[{"orgId":"xxx","orgName":"xxx公司"}]`

1.  使用 helm 添加 apollo repo

1.  安装 apollo-service

1.  安装 apollo-portal

1.  k8s 使用

    -  可以将 Apollo 相关配置存储到 k8s 的 **ConfigMap** 中方便 k8s 服务中使用

### 使用

#### .NET SDK

官方：[Com.Ctrip.Framework.Apollo.Configuration](https://github.com/apolloconfig/apollo.net)

1.  添加包：`Com.Ctrip.Framework.Apollo.Configuration`

1.  appsetting.json 中添加 apollo 配置

    1.  MetaServer：Apollo 服务地址，系统信息中也可以查看到
    1.  AppId:应用 Id
    1.  Namespaces:命名空间默认是 application

1.  获取参数注册：可以是配置，也可以是从环境变量中

       `builder.Configuration.AddApollo(builder.Configuration.GetSection("apollo"));`

1.  注入 `IConfiguration` 使用即可

#### 连接配置

```
  "apollo": {
    "MetaServer": "http://192.168.123.214:8080",
    "AppId": "devops.test",
    "Namespaces": [ "application" ]
  }
```

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/23e848a4d5e4438eb27edf9647b06408~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1023&h=276&s=37762&e=png&b=fefdfd)

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e26639a638ab464785ab479ffa314694~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1311&h=436&s=46459&e=png&b=fdfdfd)

#### Demo 示例

dotnet v7.0

```
var builder = WebApplication.CreateBuilder(args);
builder.Configuration.AddApollo(builder.Configuration.GetSection("apollo"));
app.MapGet("/config", context =>
{
    context.Response.Headers["Content-Type"] = "text/html; charset=utf-8";
    //配置服务
    var configService = context.RequestServices.GetRequiredService<IConfiguration>();
    string? key = context.Request.Query["key"];
    if (string.IsNullOrWhiteSpace(key))
    {
        return context.Response.WriteAsync("获取配置：/config?key=test");
    }
    var value = configService[key];
    return context.Response.WriteAsync(value ?? "undefined");
});
```

完整 Demo 示例 :[Github 地址](https://github.com/yimogit/MeDevOps/tree/main/demos/DevopsDemo/ApolloDemo)

### 踩过的坑

-   数据库配置连接，使用服务名，而不是容器名
-   -Deureka.instance.homePageUrl 和 -Deureka.service.url 参数一开始没有理解到是做什么的，只知道配置健康检查失败，看了文档才理解到是 Deureka.instance.homePageUrl 是注册的服务地址，-Deureka.service.url 是注册中心的接口地址

### 相关文档

-   [Github 地址](https://github.com/apolloconfig/apollo)
-   [官方文档](https://www.apolloconfig.com/#/zh/design/apollo-introduction)
-   [模块介绍](https://www.apolloconfig.com/#/zh/design/apollo-design?id=_132-admin-service)
-   [Docker 方式部署 Quick Start](https://www.apolloconfig.com/#/zh/deployment/quick-start-docker)
-   [分布式部署](https://www.apolloconfig.com/#/zh/deployment/distributed-deployment-guide)
-   [部署架构](https://www.apolloconfig.com/#/zh/deployment/deployment-architecture)
-   [性能测试](https://www.apolloconfig.com/#/zh/misc/apollo-benchmark)
-   [.NET SDK: apollo.net](https://github.com/apolloconfig/apollo.net)
-   [默认初始化脚本](https://github.com/apolloconfig/apollo/tree/v2.1.0/scripts/sql)
-   [跳过服务发现](https://www.apolloconfig.com/#/zh/usage/java-sdk-user-guide?id=_1222-%e8%b7%b3%e8%bf%87apollo-meta-server%e6%9c%8d%e5%8a%a1%e5%8f%91%e7%8e%b0)
-   [配置说明](https://www.apolloconfig.com/#/zh/deployment/distributed-deployment-guide?id=%e4%b8%89%e3%80%81%e6%9c%8d%e5%8a%a1%e7%ab%af%e9%85%8d%e7%bd%ae%e8%af%b4%e6%98%8e)

## 后语

时间充裕的情况最好是过一遍文档，知道是怎么设计的，遇到问题真会一头雾水。

每天进步一点，哪怕只是一点！
