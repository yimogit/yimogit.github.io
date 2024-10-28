---
title: 分享我在 vue 项目中关于 api 请求的一些实现及项目框架
date: 2018-08-11 21:36:00
category:
  - Web
tag:
  - vue
---

本文主要简单分享以下四点

- [如何使用 axios ](#使用-axios-请求接口)

- [如何隔离配置](#关于开发环境和生成环境的配置读取)

- [如何模拟数据](#关于在项目中使用-mock)

- [分享自己的项目框架](#分享自己的项目框架)





本文主要目的为以下三点

- 希望能够帮到一些人

- 希望能够得到一些建议

- 奉上[一个使用Vue的模板框架](https://github.com/yimogit/me-admin-template)



我只是把我觉得有用的东西分享出来罢了    





## 使用 axios 请求接口

> Axios 是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中。



### 安装 axios



`npm install axios --save`



### 创建 axios 实例 (api/fetch.js)



axios 默认提交格式为：`application/json`  

可使用 qs 模块(需要安装)转换后提交格式为 `application/x-www-form-urlencoded`

通过设置 transformRequest 属性 `data => qs.stringify(data)` 可以正常表单形式提交



```js

import axios from 'axios'



const instance = axios.create({

  baseURL: 'apiBaseUrl', // api的base_url

  timeout: 10000 // 请求超时时间

  // transformRequest: data => qs.stringify(data) //

})

// request拦截器

instance.interceptors.request.use(

  e => {

    e.params = e.params || {}

    e.headers = e.headers || {}

    //set 默认值

    return e

  },

  error => ({ status: 0, msg: error.message })

)

// respone拦截器

instance.interceptors.response.use(

  response => {

    const resp = response.data

    if (response.status === 200) {

      return resp

    }

    return resp

  },

  error => {

    console.log('err' + error) // for debug

    return Promise.reject(error)

  }

)

export default instance

```



### 使用封装的fetch.js



在 api 文件中新建接口模块并使用 axios 实例(api/fetch.js)  

src/api/api_test.js



```js

import request from '@/utils/fetch'



export function test(data) {

  return request({

    url: '/test',

    method: 'post',

    data: data

  })

}

```



使用的时候，可通过引入 api/模块.js 调用方法，也可以通过安装插件的形式将 api 接口扩展到 vue 实例中，使其可以更方便的在项目中使用



### 以 test 模块为例创建一个$api 扩展



src/api/index.js



```js

import * as api_test from './test'



const apiObj = {

  api_test

}



const install = function(Vue) {

  if (install.installed) return

  install.installed = true

  Object.defineProperties(Vue.prototype, {

    $api: {

      get() {

        return apiObj

      }

    }

  })

}

export default {

  install

}

```



在 main.js 安装 $api 扩展:



```js

import api from './api'

Vue.use(api)

```



在项目中调用：`this.$api.api_test.test().then(resp=>{...}).catch(()=>{...})`

在后端项目中我二次封装了下拉框，通过参数接收Function，传递`$api.api_test.test`省了可以少写很多代码。



## 关于开发环境和生成环境的配置读取

看到很多中做法，分享下我在项目中使怎么做的。



目前项目中的做法是在config文件夹中根据环境新建不同的配置，然后通过index.js暴露对应环境的配置。



### 目录结构及index.js

```

   config

        - _development.js

        - _production.js

        - _testing.js

```

config/index.js

```

module.exports = require('./_' + process.env.NODE_ENV).default

```



实际项目中的目录结构如下所示



![](https://user-gold-cdn.xitu.io/2018/8/11/16528e5477f19fd7?w=864&h=422&f=png&s=77682)



## 关于在项目中使用 mock



看到好多项目把mock混在项目中使用，就感觉很难受，所以想办法独立出来了，功能不强大，只是足够用在一些小Demo上，简单模拟一下数据就可以让我们的Demo不用担心api接口失效导致vue项目跑不起来的问题。



下面是我的解决方案



### express-mockjs 的使用

> [express-mockjs](https://github.com/52cik/express-mockjs) 是大佬结合 `express+mock-lite` 构建的一个 api 服务中间件，用它可以快速的帮助我们在本地搭建一个 mock 服务器



相关资料：



* [express-mockjs](https://github.com/52cik/express-mockjs)

* [mock-lite](http://mockjs-lite.js.org/docs/examples.html)





安装 express-mockjs: `npm install express-mockjs --save-dev`



安装 nodemon 到项目 以监听 mock 代码修改



安装 nodemon: `npm install nodemon --save-dev`



### 新建 mock-server/index.js 编写启动服务器代码



```js

var path = require('path')

var express = require('express')

var mockjs = require('express-mockjs')



var app = express()



// 自定义路径 前缀： '/api'

var config = {

  port: 3000

}

//以/api为前缀，寻找api目录下的所有接口

app.use('/api', mockjs(path.join(__dirname, 'api')))



// 获取port参数 可通过 --port自 定义启动端口

var args = process.argv

for (let i = 0; i < args.length; i++) {

  if (args[i] === '--port' && i < args.length - 1 && args[i + 1] > 0) {

    config.port = args[i + 1]

    break

  }

}



console.log('mock-server[mockjs-lite]:http://localhost:' + config.port)

// console.log('mockjs-lite定义：http://mockjs-lite.js.org/docs/examples.html')

app.listen(config.port)

```



### 编写接口文件



在 mock-server 文件夹创建 api 文件夹，并按照 [expess-mockjs 的文档](https://github.com/52cik/express-mockjs)编写 json/js

json



```json

/**

 * Interface function description

 *

 * @url /api-access-path

 */



{

  "code": 0,

  "result|5": [

    {

      "uid|+1": 1,

      "name": "@name",

      "email": "@email"

    }

  ]

}

```



js



```js

/**

 * home page links

 *

 * @url /home-links

 *

 * Here you can write a detailed description

 * of the parameters of the information.

 */



module.exports = {

  code: function() {

    // simulation error code, 1/10 probability of error code 1.

    return Math.random() < 0.1 ? 1 : 0

  },

  'list|5-10': [{ title: '@title', link: '@url' }]

}

```



### 运行 mock 服务器



在项目的 package.json 中添加 mock 命令并运行：`npm run mock`



```json

"scripts": {

    //...

    "mock": "nodemon --watch mock-server node mock-server/index.js --port 6543"

  },

```

目录结构



![](https://user-gold-cdn.xitu.io/2018/8/11/16528f329ece39c9?w=978&h=389&f=png&s=65786)





开发环境根据上面的配置运行起来没问题了，但是如果自己的小Demo发布后要怎么才能使用呢？我的方法是将js文件生成json然后打包到dist目录

如果有兴趣可以参考[mock-server/build.js](https://github.com/yimogit/me-admin-template/blob/master/mock-server/build.js)



## 分享自己的项目框架



奉上一个以上实现都有的模板框架(UI使用Element-UI,为了好看),仓库中docs中有一些独立的一些说明有兴趣可以查看。



项目地址：[https://github.com/yimogit/me-admin-template ](https://github.com/yimogit/me-admin-template )   

预览地址：[https://vue-admin.yimo.link/](https://vue-admin.yimo.link/)

效果图示：[整容前](https://user-gold-cdn.xitu.io/2018/8/11/165291278ea146d1)   [整容后](https://user-gold-cdn.xitu.io/2018/8/11/1652912db78bd206)



## 结语



感觉文章东西太多，什么都没讲清楚，不过，重要的是思路嘛，具体实现可以看框架代码~ 



如果文中有错误，欢迎指出。      

如果有更好的实现方式，也希望有大佬指点一二。
