---
title: Jenkins在shell脚本运行docker权限报错解决
date: 2018-08-26 11:08:00
category:
  - Docker
tag:
  - docker
---

## 报错环境



系统信息 

```

Distributor ID: Ubuntu

Description:    Ubuntu 16.04.1 LTS

Release:        16.04

Codename:       xenial

```

docker 信息



Docker version 18.06.0-ce, build 0ffa825



## 错误信息



能够在shell中使用docker version打印版本号，但是无法执行docker，报错信息如下  

```

+ docker run -i --rm --name my-node-8 -u 0 -v /var/lib/jenkins/workspace/hexo-blogs:/usr/src/myapp -w /usr/src/myapp daocloud.io/node:8.0.0-alpine node -v

docker: Got permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: Post http://%2Fvar%2Frun%2Fdocker.sock/v1.38/containers/create?name=my-node-8: dial unix /var/run/docker.sock: connect: permission denied.

```





## 解决方法



将jenkins用户加入docker组

重启Jenkins服务



```

sudo gpasswd -a jenkins docker

sudo service jenkins restart

```
