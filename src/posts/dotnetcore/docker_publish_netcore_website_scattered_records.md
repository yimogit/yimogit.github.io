---
title: docker发布netcore网站-零散记录
date: 2017-08-24 11:29:00
category:
  - DotNetCore
tag:
  - .net core
---

## 安装docker

1. 安装Linux，使用云服务器或者虚拟机 参考：http://www.cnblogs.com/wangjieguang/p/hyper-v-ubuntu.html

2. 系统更新 `sudo apt-get update`

3. 使用阿里云的镜像安装docker客户端：https://cr.console.aliyun.com/#/accelerator

    ![图片](https://dn-coding-net-production-pp.qbox.me/2c28a309-16dc-4d3d-a1be-5fcb51eba8fc.png)

4. 查看版本

    ![图片](https://dn-coding-net-production-pp.qbox.me/f4fae61f-166d-4bf9-89e4-acd05b1e38b8.png)

5. 安装core镜像 `sudo docker pull microsoft/dotnet`

6. 运行容器`sudo docker run -it --rm microsoft/dotnet`

7. 克隆仓库代码到本地，并将主机复制到容器中 `sudo docker cp ./代码目录/ 容器ID:/`

8. 进入容器：`sudo docker attach 容器ID`，进入输出目录执行还原：`dotnet restore`，运行`dotnet run`





## Linux 安装 Core SDK进行开发

1. Ubuntu 16.04 https://www.microsoft.com/net/core#linuxubuntu



``` 

sudo sh -c 'echo "deb [arch=amd64] https://apt-mo.trafficmanager.net/repos/dotnet-release/ xenial main" > /etc/apt/sources.list.d/dotnetdev.list'

sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 417A0893

sudo apt-get update

```



2. 使用git拉取项目到本地



3. 进入项目的输出目录

4. `dotnet restore`

    可以设置下Nuget的镜像 http://www.cnblogs.com/cmt/p/nuget-mirror.html

5. `dotnet build` 

    这里遇到一个报错：/usr/share/dotnet/sdk/1.0.4/Sdks/Microsoft.NET.Sdk/build/Microsoft.NET.Sdk.DefaultItems.targets(188,5)

    解决方法：https://stackoverflow.com/questions/43325916/duplicate-content-items-were-included-the-net-sdk-includes-content-items-f

    在解决方案中对应的节点添加配置

    ```

        <PropertyGroup>

            <EnableDefaultContentItems>false</EnableDefaultContentItems>

        </PropertyGroup>

    ```

    多个类库项目发布在Linux下不会拷贝views文件夹，我将wwwroot文件夹的Content给删掉了。

http://www.cnblogs.com/keepcodingforever/p/6698862.html

6. `dotnet run`

7. 测试 `curl http://localhost:5000`



8. docker删除所有未运行容器

`sudo docker rm $(sudo docker ps -a -q)`

9. docker删除所有未打tag的镜像

`sudo docker rmi $(sudo docker images -q | awk '/^<none>/ { print $3 }')`

10. docker删除所有镜像

`docker rmi $(docker images -q)`

11. 运行容器：`sudo docker run -d -p 8002:8080 meqacore`
