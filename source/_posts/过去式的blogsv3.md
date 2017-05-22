---
title: 过去式的blogsv3
date: '2017-01-01 09:52'
tags: 闲言碎语
categories:
  - 程序猿之路
---

> BlogV3--此为过去式~截图留恋
    ![](http://images2015.cnblogs.com/blog/662652/201705/662652-20170522175645679-1665146531.png)
> BlogV4已上线：hexo强力驱动 https://coding.net/u/yimocoding/p/yimocoding/git
    ![](http://images2015.cnblogs.com/blog/662652/201705/662652-20170522182314007-1205193864.png)

# 博客满血复活了，啦啦啦

>不知不觉天就亮了，2017年的第一步也随着朝霞的升起而迈出。http://www.yimo.link/ 我的博客又活过来了;     
>第一版是在2015,第二版是在2016，第三版即这一版在今天2017年1月1日;       
>每一个版本都收获了许多，成长了许多，让自己知道幸苦是没有白费的;       
>从第一版的后台使用angularjs+webapi的快速开发，到第二版的asp.net mvc的正确使用姿势，再到第三版的node-express-jshtml。      
>踩了无数的坑，熬了无数的夜，做出东西了，那无与伦比的成就感。哈哈哈哈哈哈
>
>
>只有不断的尝试，才会有所获，有所得。
<!--more-->
## 回首2016，我还做了这些玩意

一、 尝试着搭建了一个asp.net mvc的框架：[YimoFramework源码](https://coding.net/u/yimocoding/p/YimoFramework/git)       
二、 C#写的一个自动签到的服务：[AutomaticSignService源码](https://coding.net/u/yimocoding/p/AutomaticSignService/git)
三、 node写的一个抓数据的程序：[YFKDataGrab源码](https://coding.net/u/yimocoding/p/YFKDataGrab/git)
四、 用vue2.0+mui3.3写了一个导航的App：[vue-mui-app源码](https://coding.net/u/yimocoding/p/vue-mui-app/git) [http://app.yimo.link/](http://app.yimo.link/)
五、 用vue2.0+layui封装了一些组件，后面做博客的后台管理：[vue-layui源码](https://coding.net/u/yimocoding/p/vue-layui/git) [http://vue-layui.yimo.link/#/admin](http://vue-layui.yimo.link/#/admin)
六、node-express+jshtml写的博客站点：[yimocoding源码](https://coding.net/u/yimocoding/p/yimocoding/git) [http://www.yimo.link](http://www.yimo.link)

如图图所示，2016结束了，2017，迎接新的改变吧。
 ![图片](https://dn-coding-net-production-pp.qbox.me/49a0bec8-54d6-48eb-a256-81369b7b4835.png) 

 ![图片](https://dn-coding-net-production-pp.qbox.me/662ab51a-ecf8-4d2d-a7aa-1bac64c4067b.png) 

-------------------------------------
等等，还没完呢。踩的坑还没有记录呢   

1. 问：jshtml文件没有语法高亮，看着好难受怎么办   

答： vscode是可以配置文件管理的,文件-》首选项-》用户设置-》设置files.associations即可   
 ![图片](https://dn-coding-net-production-pp.qbox.me/0d6ae02c-9ee0-4faa-9424-4bbed0c646d0.png) 

2. 问：写node的使用，node_modules如何不让他提交到git，不包含到工作区？

答: 1问配置.gitignore文件，添加一行`node_modules/`即可;vscode可以设置files.exclude排除文件/夹   
    
 3. 问：nginx到底要怎么配置反向代理,又如何再windows服务器上使用nginx后不影响存在的iis站点（公用80）

答：访问www.yimo.link会经由nginx转发到代理地址上，如果服务器使用iis就将iis中的站点重新配置其他端口，然后一个站点配置一个server即可

            server {
                listen       80;
                server_name  www.yimo.link;//解析的域名
            location / {
                proxy_pass http://127.0.0.1:2333; //代理的地址/域名+端口的形式也可以
            }       


over，发布，睡觉。

