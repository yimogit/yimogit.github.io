---
title: metools，个人工具站点分享
date: 2017-04-15 17:03:00
category:
  - Web
tag:
  - vue
---

> 需要【加密/解密】【编码/解码】【生成二维码】的时候不用再进百度点广告~          

> 也不需要去收藏夹找网址~          

> 我的目的大概就是如此。   



> 项目地址：https://github.com/yimogit/metools





## 论个人工具站点的必要性



>1. 问：想要【加密/解密/编码/解码】怎么办？     

    答：搜索 加密... 收藏夹找网址       



>2. 问：想要临时生成一个二维码怎么办？      

    答：搜索 在线生成二维码... 收藏夹找网址



> what? 收藏了一堆东西找不到~       

> what? 一不小心就点到了广告~       

> what? 网站竟然挂了~       



我想要一个自己的工具站~一个不会说挂就挂的网站~        

然后~~        

卧槽。一不小心就折腾了出来，此处应有链接 [http://tools.yimo.link/](http://tools.yimo.link/)     



## 如何不花一分钱就能拥有自己的工具站点？   



当然是用开源平台的pages服务了~



### 一、在github部署      

0. 首先你得有一个github.com账号      

1. 其次你得去[github.com项目地址](https://github.com/yimogit/metools) fork下项目

![](metools_remark/662652-20170415105351173-421111866.png)    

2. 再然后访问你的工具站吧 `https://你的用户名.github.io/metools/`              

3. github自定义域名等相关操作自行参考[此篇文章](http://blog.csdn.net/yanzhenjie1003/article/details/51703370) 



### 二、在coding部署         

0. 首先你得有一个coding.net账号            

1. 其次你得去[coding.net项目地址](https://coding.net/u/yimocoding/p/metools) fork下项目

2. 再然后访问你的工具站吧 `https://你的用户名.coding.me/metools/`       



### 补充说明



可以通过修改`/static/data/initData.js`来个性化定制自己的工具站~               

可以配置网站的Logo，名称，底部链接，以及菜单~   

添加了百度统计代码和畅言的留言，不需要的自行移除~

pages部署后可能会有缓存的情况            

github部署gh-pages分支        

coding部署coding-pages分支        



## 项目说明

> vue-cli生成的vue2.0项目，页面套的layui的模板，简单封装了一下layui的组件       

> 加密编码使用的是`crypto-js`库实现

> MarkDown转HTML使用`marked`

> 二维码生成使用`jr-qrcode`    



## 已实现功能   

0. 导航块生成(有点花哨~)

1. 加密/解密 ['AES','DES','RC4','Rabbit','TripleDES','Base64','MD5','SHA1','SHA224','SHA256','SHA384','SHA512','HmacSHA1','HmacSHA224','HmacSHA256','HmacSHA384','HmacSHA512','HmacMD5']  

2. 编码/解码 ['utf-8', 'ascii', 'unicode', 'url', 'base64']     

3. 图片转base64

4. 字符串替换

5. MarkDown转HTML

6. 生成二维码

      

## 未来的计划        

有需求就干，没有需求就折腾其他的

比如一个不花一分钱就讷讷个拥有自己的网站收藏夹~
