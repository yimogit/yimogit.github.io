---
title: 随便记录下系列 - node->express
categories:
  - 程序猿之路
tags: node
---

# 随便记录下系列 - node->express

>文章用啥写？→_→ VsCode。  
>代码用啥写？→_→ VsCode。  
>编辑器下载：[VsCode](http://pan.baidu.com/s/1qYpmzpE)  

## 一、windows下安装node.js环境： [下载地址](http://nodejs.cn/download/)       
----------------------------
>相比以前搭过的服务端语言的环境,node环境的安装简直是业界良心   
>即使第一次折腾了2天，第二次折腾了2小时，第三次折腾了2分钟

1. 下载其他版本只需要替换下载链接 `https://nodejs.org/dist/v6.2.0/node-v6.2.0-x64.msi` 的2个版本号6.2.0为你需要的版本即可   
2. 尽量别把node安装在C盘(使用D:\Program Files\nodejs) 
3. 基础配置项(根据需要设置环境变量)        
    设置全局安装包路径： `npm config set prefix "D:\Program Files\nodejs\node_global`  
    设置缓存目录： `npm config set cache "D:\Program Files\nodejs\node_cache`       
    设置淘宝镜像源： `npm install -g cnpm --registry=https://registry.npm.taobao.org`    

> PS： vue2.0用node-v4.5吧~，npm升级命令`npm update` 升级npm版本,若是不行则切换为32位版本的试试,再不行换个系统试试T-_-T

<!--more-->
## 二、使用express 
----------------------------
### 安装express [中文网](http://www.expressjs.com.cn/)
> 看文档！！！
1. 有网,有 node ,有 npm/cnpm/...
2. 全局安装express： `npm install express -g`
3. 安装express应用生成器： `npm install express-generator -g`
4. 创建一个express(v4.14.0)应用： `express mydemo`
5. 启动应用： `npm start`  

### 自动更新修改 [supervisor](https://www.npmjs.com/package/supervisor)
----------------------------
>运行起express应用,并做了一丁点修改后，习惯性保存后去刷新了页面，卧槽，【假装这是一张表情图】，左思右想百思不得其解~~~    
>于是百度 "`express 自动刷新`",你以为出来了么？并没有~  
那就换个词试试："`express 修改更新`",遂知[supervisor](https://www.npmjs.com/package/supervisor)~      

1. 安装：`npm install supervisor -g`
2. 启动express：`supervisor ./bin/www`
3. 名字太长了~，改package.json->scripts->start配置啊：`{"start": "supervisor ./bin/www"}`      
4. 在正确的目录使用正确的姿势执行`npm start`

### 修改模板引擎为[jshtml](https://github.com/elmerbulthuis/jshtml)
----------------------------
>若要问我为什么，我只能说看着爽,即使jshtml最后一次更新在n年前~

1. 安装[`jshtml-express`](https://github.com/elmerbulthuis/jshtml-express)到项目：`npm install jshtml-express --save`
2. 在app.js设置模板引擎为jsthml     
    `app.engine('jshtml', require('jshtml-express'));`           
    `app.set('view engine', 'jshtml');`
3. 视图文件修改后缀名为.jshtml(.jshtml没高亮？把后缀改成cshtml写代码,然后修改vscode文件关联项：`files.associations`为`{"*.jshtml":"cshtml"}`)
4. 然后就去瞅文档吧。哈哈

* 路由中输出模型的时候需要用`res.locals = model;`输出模型，视图中使用`@locals`表示为模型
* 博客已使用express+jshtml：https://coding.net/u/yimocoding/p/yimocoding/git/tree/server/
----------------------------
博客园主页：[cnblogs.com](http://www.cnblogs.com/morang/)     
Coding主页：[coding.net](https://coding.net/u/yimocoding)      