---
title: 使用 docker-compose 快速安装Jenkins
date: 2019-01-01 03:13:00
category:
  - Docker
tag:
  - jenkins
  - docker-compose
  - docker
---

> 本文分享在 docker 环境中，使用 docker-compose.yml 快速安装 Jenkins，以及使用主机中的 docker 打包推送镜像到阿里云
> 博客园的第100篇文章达成，2019的第一篇文章，新的开始，新的征程，一起迎接崭新的世界。

系统环境：   
```
Distributor ID: Ubuntu
Description:    Ubuntu 16.04.2 LTS
Release:        16.04
Codename:       xenial
```

当前 docker 版本：`Docker version 18.09.0`   
当前 docker-compose 版本：`docker-compose version 1.23.2` 
  
## 使用docker安装Jenkins
指定了时区及jvm参数，映射了docker，可以再jenkins中使用docker打包
``` sh
docker run -d \
--restart=always \
--user=root \
-p 8080:8080 \
-p 50000:50000 \
-e TZ=Asia/Shanghai \
-e JAVA_OPTS="-Duser.timezone=Asia/Shanghai -Dhudson.security.csrf.GlobalCrumbIssuerConfiguration.DISABLE_CSRF_PROTECTION=true -server -Xms2048m -Xmx2048m -Xss512k" \
-v /etc/docker:/etc/docker \
-v /etc/localtime:/etc/localtime \
-v /root/.docker:/root/.docker \
-v /root/.nuget:/root/.nuget \
-v /usr/bin/docker:/usr/bin/docker \
-v /var/run/docker.sock:/var/run/docker.sock \
-v ./data:/var/jenkins_home \
--name jenkins \
jenkins/jenkins:2.277.1
```

## 使用 docker-compose 安装
```
version: '3'
services:
  docker_jenkins:
    restart: always
    image: jenkins/jenkins:lts
    container_name: docker_jenkins
    ports:
      - '8080:8080'
      - '50000:50000'
    volumes:
      - ./data/:/var/jenkins_home
      - /var/run/docker.sock:/var/run/docker.sock
      - /usr/bin/docker:/usr/bin/docker
      - /usr/lib/x86_64-linux-gnu/libltdl.so.7:/usr/lib/x86_64-linux-gnu/libltdl.so.7
```

## 创建 data 目录并设置权限

- `mkdir ./data`
- `sudo chown -R 1000 ./data` //把当前目录的拥有者赋值给uid 1000  
若已启动则需要重建下服务

## 构建Jenkins服务

`docker-compose up -d`

...访问 http://ip:8080 进行初始化...

### jenkins在docker中安装后查看登录令牌

使用命令 `docker logs 容器名称/容器ID` 查看访问日志，即可查看到登录令牌

### 若未设置账户，如何查看admin的密码   

一不小心，未创建新的账户，可通过查看挂载目录下的 /secrets/initialAdminPassword 中的 Key 作为密码登录  
账户：`admin`  
密码：`cat ./data/secrets/initialAdminPassword`  

### docker build 无权限的解决办法 

在 docker-compose.yml 已将主机 docker 映射到容器内，故使用 docker -v 已经能够查看到版本号   

```
+ docker -v
Docker version 18.09.0, build 4d60db4
+ docker build -t test/test.admin.vue:v3 .
Got permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: Post http://%2Fvar%2Frun%2Fdocker.sock/v1.39/build?buildargs=%7B%7D&cachefrom=%5B%5D&cgroupparent=&cpuperiod=0&cpuquota=0&cpusetcpus=&cpusetmems=&cpushares=0&dockerfile=Dockerfile&labels=%7B%7D&memory=0&memswap=0&networkmode=default&rm=1&session=c0j8whn50ubpyukeblzkng7cq&shmsize=0&t=test%2Ftest.admin.vue%3Av3&target=&ulimits=null&version=1: dial unix /var/run/docker.sock: connect: permission denied
Build step 'Execute shell' marked build as failure
```

但是当使用 `docker build -t .` 命令的时候依旧无法执行，提示无权限(` permission denied`)   
这个问题之前将Jenkins直接装在linux主机的时候也遇到过，在shell脚本输入框顶部加上 `#!/bin/bash -ilex` 即可  
如果依旧不行，可执行(赋予读写执行权限)：`sudo chmod 777 /var/run/docker.sock`  注：服务器重启后可能权限会失效

```
#!/bin/bash -ilex
+ docker -v
Docker version 18.09.0, build 4d60db4
+ export DOCKER_IMAGE_NAME=test/test.admin.vue:v3
+ docker build -t test/test.admin.vue:v3 .
```

## 关于 docker 镜像的构建
注册阿里云账号，并申请阿里云的容器镜像服务，创建命名空间(公/私有，可自动创建仓库)，设置下 Registry 登录密码，随便新建一个仓库，查看仓库详情可查看推送 docker 的相关信息
创建好账号信息后，即可在 Jenkins 中构建推送。
可参考以下脚本，脚本环境变量说明
`DOCKER_IMAGE_NAME`：镜像名称(命名空间/镜像名:版本号)
`DOCKER_CLOUD_URL`： 镜像源
`ALIYUN_USERNAME`：阿里云用户名
`ALIYUN_USERPWD`：阿里云 Docker Registry 密码

```
#!/bin/bash -ilex
docker -v
echo '打包镜像'
export DOCKER_IMAGE_NAME=test/$JOB_NAME:v$BUILD_NUMBER
docker build -t $DOCKER_IMAGE_NAME .

echo '推送镜像'
export DOCKER_CLOUD_URL=registry.cn-hangzhou.aliyuncs.com

docker login --username=$ALIYUN_USERNAME --password=$ALIYUN_USERPWD $DOCKER_CLOUD_URL

docker tag $DOCKER_IMAGE_NAME $DOCKER_CLOUD_URL/$DOCKER_IMAGE_NAME
docker push $DOCKER_CLOUD_URL/$DOCKER_IMAGE_NAME

echo '删除镜像'
docker rmi $DOCKER_IMAGE_NAME
docker rmi $DOCKER_CLOUD_URL/$DOCKER_IMAGE_NAME
```

## 参考

- https://github.com/jenkinsci/docker/blob/master/README.md
- https://www.cnblogs.com/leolztang/p/6934694.html
