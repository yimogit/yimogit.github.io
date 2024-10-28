---
title: docker 及 docker-compose 的快速安装和简单使用
date: 2018-08-20 09:33:00
category:
  - Docker
tag:
  - docker
  - docker-compose
---

> 本篇将使用 DaoCloud 源在 Ubuntu 上简单快速安装 docker 及 docker-compose

> 并添加了通过 Dockerfile 及 docker-compose.yml 使用 nginx 的示例

> 本篇文章所用系统信息如下 

```

Distributor ID: Ubuntu

Description:    Ubuntu 16.04.1 LTS

Release:        16.04

Codename:       xenial

```





## docker 的安装及使用



### 简单介绍



> docker 是一个开源的软件部署解决方案  

> docker 也是轻量级的应用容器框架  

> docker 可以打包、发布、运行任何的应用



### 安装



- 阿里云

```

curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun

```



- daocloud



```sh

 curl -sSL https://get.daocloud.io/docker | sh

```

安装后将会自动重启



### 卸载



```

sudo apt-get remove docker docker-engine

rm -fr /var/lib/docker/

```



### 配置加速器



下面是我的配置，实际使用需要根据自己的账号去查看自己的地址



- [DaoCloud](https://www.daocloud.io/mirror#accelerator-doc)



```

curl -sSL https://get.daocloud.io/daotools/set_mirror.sh | sh -s http://ced808ab.m.daocloud.io

sudo systemctl restart docker.service

```



- [阿里云](https://cr.console.aliyun.com/cn-hangzhou/mirrors)



```

sudo mkdir -p /etc/docker

sudo tee /etc/docker/daemon.json <<-'EOF'

{

  "registry-mirrors": ["https://dist7hw1.mirror.aliyuncs.com"]

}

EOF

sudo systemctl daemon-reload

sudo systemctl restart docker

```



### 基础命令



- 查看版本:`docker -v` //文章使用版本：Docker version 18.06.0-ce, build 0ffa825

- 查看镜像：`docker images`

- 查看容器：`docker ps`

- 启动 docker 服务：`sudo service docker start`

- 停止 docker 服务：`sudo service docker stop`

- 重启 docker 服务：`sudo service docker restart`

- 进入一个运行中的容器：` docker exec -it 容器Id /bin/bash`

### 通过 Dockerfile 使用 nginx



通过下面的一个脚本可以简单快速的创建一个镜像并运行起来

大概看下应该就可以大概明白镜像的基本使用了



```sh

echo '0.创建测试目录及代码'

mkdir dockerfiletest

cd dockerfiletest

mkdir dist

echo 'hello world'>./dist/index.html



echo '1.创建Dockerfile'

echo '

From daocloud.io/library/nginx:1.13.0-alpine

COPY dist/ /usr/share/nginx/html/

'>./Dockerfile



echo '2.构建镜像'

docker build -t dockerfiletest .



echo '3.运行镜像'

docker run -p 3344:80 dockerfiletest

```



下面分步拆解下



#### 1.在项目目录中添加 Dockerfile 文件



详细请参考：https://hub.daocloud.io/repos/2b7310fb-1a50-48f2-9586-44622a2d1771



html 的简单部署



```sh

From daocloud.io/library/nginx:1.13.0-alpine

# 将发布目录的文件拷贝到镜像中

COPY dist/ /usr/share/nginx/html/

```



若要使用自己的配置脚本，比如 vue 的配置,可以将自己的配置文件复制到容器中



```sh

From daocloud.io/library/nginx:1.13.0-alpine

# 删除镜像中 nginx 的默认配置

RUN rm /etc/nginx/conf.d/default.conf

# 复制 default.conf 到镜像中

ADD default.conf /etc/nginx/conf.d/

# 将发布目录的文件拷贝到镜像中

COPY dist/ /usr/share/nginx/html/

```



nginx 中 vue history 模式的配置 如下，可参考



```

server {

    listen       80;

    location / {

        root /usr/share/nginx/html/;

        index index.html;

        try_files $uri $uri/ /index.html;

    }

}

```



~~若是将`/usr/share/nginx/html/`和`/etc/nginx/conf.d/`挂载到本地，这样应该能够灵活使用 docker 安装的 nginx 了(未实践过)~~



#### 2.构建镜像



构建参数说明参考：http://www.runoob.com/docker/docker-build-command.html



```

docker build -t docker-nginx-test .

```



#### 3.运行镜像



--name 服务名

-d 后台运行

-p 暴露端口:nginx 端口

docker-nginx-test 镜像名/IMAGE ID



```

docker run --name dockertest -d -p 4455:80 docker-nginx-test

```



#### 4.测试访问



```

root@ubuntu:~# curl http://localhost:4455

hello world

```



> 现在，可以通过 IP+端口的形式在外网访问站点了，但在实际使用肯定还需要绑定域名等一些操作  

> 最简单的是我认为是使用 nginx 去做代理  

> 目前我们公司使用的 [traefik](https://traefik.io/) ，最爽的莫过于 https 的支持，可以了解一下



## docker-compose 的安装及使用



### 简单介绍



> Docker Compose 是一个用来定义和运行复杂应用的 Docker 工具。

> 使用 Docker Compose 不再需要使用 shell 脚本来启动容器。(通过 docker-compose.yml 配置)



### 安装



可以通过修改 URL 中的版本，自定义您需要的版本。

- Github源

```

sudo curl -L https://github.com/docker/compose/releases/download/1.22.0/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose

sudo chmod +x /usr/local/bin/docker-compose

```



- Daocloud镜像

```sh

curl -L https://get.daocloud.io/docker/compose/releases/download/1.22.0/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose

chmod +x /usr/local/bin/docker-compose

```



### 卸载



```

sudo rm /usr/local/bin/docker-compose

```



### 基础命令



需要在 docker-compose.yml 所在文件夹中执行命令



使用 docker-compose 部署项目的简单步骤



- 停止现有 docker-compose 中的容器：`docker-compose down`

- 重新拉取镜像：`docker-compose pull`

- 后台启动 docker-compose 中的容器：`docker-compose up -d`



### 通过 docker-compose.yml 部署应用



我将上面所创建的镜像推送到了阿里云，在此使用它



#### 1.新建 docker-compose.yml 文件



通过以下配置，在运行后可以创建两个站点(只为演示)



```

version: "3"

services:

  web1:

    image: registry.cn-hangzhou.aliyuncs.com/yimo_public/docker-nginx-test:latest

    ports:

      - "4466:80"

  web2:

    image: registry.cn-hangzhou.aliyuncs.com/yimo_public/docker-nginx-test:latest

    ports:

      - "4477:80"

```



此处只是简单演示写法，说明 docker-compose 的方便



#### 2.构建完成，后台运行镜像



```

docker-compose up -d

```



运行后就可以使用 ip+port 访问这两个站点了



#### 3.镜像更新重新部署



```

docker-compose down

docker-compose pull

docker-compose up -d

```



## 相关文章



- docker 文档：https://docs.docker.com/get-started/

- docker-compose 文档:https://docs.docker.com/compose/install/#uninstallation

- docker-compose 仓库：https://github.com/docker/compose

- daocloud 源地址 :https://get.daocloud.io/#install-docker

- Docker 通过 Nginx 镜像部署 Vue 项目：https://blog.csdn.net/jason_jeson/article/details/78200623

- DaoClould https://hub.daocloud.io/repos/2b7310fb-1a50-48f2-9586-44622a2d1771
