---
title: vue项目中关于axios的简单使用
date: 2018-02-06 20:21:00
category:
  - Web
tag:
  - vue
  - web开发
---

## axios介绍

> Axios 是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中       

> 官方仓库：https://github.com/axios/axios           

> 中文文档：https://www.kancloud.cn/yunye/axios/234845       



## axios在项目中(vue)的使用

没有vue项目的[使用vue-cli脚手架生成一个webpack模板](https://vuejs-templates.github.io/webpack/)的项目即可愉快的看下去了~

如果开发遇到跨域问题可以参考：http://www.cnblogs.com/morang/p/8423763.html



### 安装axios到项目中      

`npm install axios --save`



### 配置wepack别名，不同环境访问不同的配置接口

配置：     

![图片](https://dn-coding-net-production-pp.qbox.me/9dec9af5-337f-48cc-b815-1697b06430cc.png)     

使用：`import config from 'config'`        



### 封装一个axios实例

新建`fetch.js`,在此创建axios实例与过滤器    



若配置了代理。则config.apiBaseUrl则配置代理的前缀即可

``` js

import config from 'config'

import axios from 'axios'

// import qs from 'qs';



const instance = axios.create({

    baseURL: config.apiBaseUrl, // api的base_url

    timeout: 10000,               // 请求超时时间

    // transformRequest: data => qs.stringify(data) 

});

```



axios默认提交格式为：`application/json`，转换后提交格式为`application/x-www-form-urlencoded`           

在asp.net core中，需要在action方法上添加`[FromBody]`接收json格式的数据，正常的都是`application/x-www-form-urlencoded`故有此修改。         

按照使用需要安装`qs`到项目中,可转换数据格式类型          

`npm install qs --save` 

### 使用qs转换请求对比图 

![图片](https://dn-coding-net-production-pp.qbox.me/befb566a-7b7d-4e34-b521-3f9cb17b9bd4.png)



### 给实例添加拦截器

``` js

// 添加请求拦截器

instance.interceptors.request.use(function (config) {

    // 在发送请求之前做些什么

    return config;

  }, function (error) {

    // 对请求错误做些什么

    return Promise.reject(error);

  });



// 添加响应拦截器

instance.interceptors.response.use(function (response) {

    // 对响应数据做点什么

    return response;

}, function (error) {

    // 对响应错误做点什么

    return Promise.reject(error);

});

 // 最后暴露实例

export default instance

```

### 实例的调用



若配置了express代理，请求路径为：浏览器->express开发服务器-----发送请求---->接口服务器

``` js

import fetch from 'fetch.js'

//get

fetch({

    url:'/home/data',//完整的请求路径为fetch.js配置的baseURL+/home/data?pageIndex=1

    method:'GET',

    params:{pageIndex:1}

})

//post

fetch({

    baseURL:'/api/v1',//完整的请求路径为/api/v1/home/save

    url:'/home/save',

    method:'POST',

    data:{id:1}

})



```
