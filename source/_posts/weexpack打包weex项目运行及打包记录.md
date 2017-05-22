---
title: weexpack打包weex项目运行及打包记录
date: '2017-03-01 08:23'
categories:
  - 全栈
tags: 
  - weex
---
# 构建weex项目

1. 安装weex-toolkit  `cnpm install -g weex-toolkit`       
2. 初始化一个项目只需新建文件夹并在目录下执行 `weex init` 即可     
3. 安装依赖：`cnpm install`  
4. 编译项目：`npm run dev`   
5. 启动服务器：`npm run serve` //可以修改package.json的端口号来改变监听端口                   
6. 可以执行的命令一览        
    ![图片](https://dn-coding-net-production-pp.qbox.me/bbe02f9d-111a-4200-960a-d6f7931f56b7.png) 

<!--more-->
# 使用weexpack打包weex项目    
>各种百度 ‘weex打包’ ‘如何打包weex apk’ ‘weex 发布 apk’  未果
>最后在[这里](https://github.com/weexteam/article/issues/4#issuecomment-268810351)看到了这玩意T_T

## weexpack 介绍 [更多详情见Github](https://github.com/weexteam/weex-pack/blob/master/README.md)
weexpack 是 weex 新一代的工程开发套件，是基于weex快速搭建应用原型的利器。它能够帮助开发者通过命令行创建weex工程，添加相应平台的weex app模版，并基于模版从本地、GitHub 或者  weex 应用市场安装插件，快速打包 weex 应用并安装到手机运行，对于具有分享精神的开发者而言还能够创建weex插件模版并发布插件到weex应用市场。

## 开始我的安装

0. 安装Android需要的环境：android环境折腾可参考[windows下react-native环境搭建](http://www.cnblogs.com/morang/p/react-native-java-build.html)    

1. 安装weexpack：[项目地址](https://github.com/weexteam/weex-pack)     
    `cnpm install -g weexpack`            
2. 初始化一个weexpack程序：     
    `weexpack init dsb-weexpack`
3. 还原依赖：        
    `cnpm install`
4. 如果没有安装android SDK的好需要去安装sdk，安装好了就添加平台到项目：`weexpack platform add android`
     ![图片](https://dn-coding-net-production-pp.qbox.me/07d500bd-b616-49b2-9d30-68ef068ff51b.png) 
5. 修改gradle-wrapper.properties文件gradle下载地址distributionUrl值为：`distributionUrl=file:///F:/gradle-2.14.1-all.zip`

6. 打包编译：    
    `weexpack build android`        
7. 苦等ing......
8. 两天过去了，于3月1日清晨成功下载完毕，且没有挂vpn~
生成文件如图所示
![](http://images2015.cnblogs.com/blog/662652/201703/662652-20170301074624704-1290399162.png)
9. 在夜神模拟器运行：首先使用adb连接到夜神模拟器`adb connect 127.0.0.1:62001`,再执行`weexpack run android`即可在模拟器中运行
![](http://images2015.cnblogs.com/blog/662652/201703/662652-20170301075210157-753921257.png)


## 参考
>https://github.com/weexteam/weex-pack    
>https://github.com/vczero/weex-learning        
>https://github.com/apache/incubator-weex