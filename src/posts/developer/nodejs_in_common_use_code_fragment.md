---
title: nodejs常用代码片段
date: 2018-05-24 13:14:00
category:
  - Developer
tag:
  - node
---

## 自动创建目录(多级)

> 相比起使用递归创建，调用 sheljsl 模块简单得多



``` js

const shell = require('shelljs')

const fs = require('fs')

if (!fs.existsSync(dir)) {

    shell.mkdir('-p', dir)

}

```



### 自动创建目录函数

``` js

/**

 * 创建文件，自动创建目录

 */

function createFile(newPath, txt) {

  var dir = require('path').dirname(newPath)

  if (!require('fs').existsSync(dir)) {

    require('shelljs').mkdir('-p', dir)

  }

  require('fs').writeFileSync(newPath, txt)

}

```



## ejs 自定义函数的使用

版本：2.6.1

安装：`npm install ejs`



在模板中使用自定义函数处理数据的Demo

``` js

const ejs = require('ejs')

ejs.delimiter = '%'

// 自定义函数 返回首字母大写的字符串

const def_func={

  capitalize(str) {

    return str ? (str.substring(0, 1).toUpperCase() + str.substring(1)) : str

  }

}



const config={

    title:'me is test'

}

var result=ejs.render('<%= capitalize(title) %>', Object.assign(def_func,config)) //Test



//const path='./template/test.txt'

//ejs.renderFile(path, Object.assign(def_func, config), {},function(err,str){

//     //str 渲染结果

//})

```



## 获取指定目录下所有指定格式文件

> readAllFile(root,reg) 参数传递正则

- 获取所有js文件：`readAllFile('D:/..',/\.js$/)`

- 获取所有json文件：`readAllFile('D:/..',/\.json$/)`



```

/*

 * 读取指定文件夹下的全部文件，可通过正则进行过滤，返回文件路径数组

 * @param root 指定文件夹路径

 * @param reg 对文件的过滤正则表达式,可选参数，示例： 获取指定目录下所有js文件：/\.js$/

 * 

*/

function readAllFile(root, reg) {

  var resultArr = []

  return (function fn(root, reg) {

    var fs = require('fs')

    if (fs.existsSync(root)) {

      //文件或文件夹存在

      var stat = fs.lstatSync(root) // 对于不存在的文件或文件夹，此函数会报错

      if (stat.isDirectory()) {

        // 文件夹

        var files = fs.readdirSync(root)

        files.forEach(function(file) {

          var t = fn(root + '/' + file, reg)

          resultArr = resultArr.concat(t)

        })

      } else {

        if (reg !== undefined) {

          if (typeof reg.test == 'function' && reg.test(root)) {

            resultArr.push(root)

          }

        } else {

          resultArr.push(root)

        }

      }

    }

    return resultArr

  })()

}

```



## nodejs 获取传入参数的封装

> 传入需要获取的 keys及前缀(可选,默认--)



调用：`node index.js --target test`        

接收：`const config=loadConifg(['target'],'--')`            //config.target----->test



```

/**

 * 根据参数数组加载参数

 * @param {Array} params 键值

 * @param {String} prefix 前缀 默认为 --

 */

function loadConfig(params, prefix) {

  if (typeof params !== 'object' || params.length === 0) return {}

  var config = {}

  prefix = prefix || '--'

  var args = process.argv

  for (let i = 0; i < args.length; i++) {

    var key = args[i].indexOf(prefix) === 0 ? args[i].replace(prefix, '') : ''

    if (key && params.indexOf(key) > -1 && i < args.length - 1) {

      config[key] = args[i + 1]

    }

  }

  return config

}

```



## 递归根据最后一级ID找父节点属性



### 方法定义

```

/**

 * 查找父节点

 * @param {String} key 对象匹配键值

 * @param {String} value 对象匹配值

 * @param {Array} items 带children节点的数组

 * @param {Array} resultArr 父对象结果集

 */

function fn(key, value, items, resultArr) {

  var checkResult = false

  for (let index = 0; index < items.length; index++) {

    const e = items[index]

    checkResult =

      e[key] === value || (e.children && fn(key, value, e.children, resultArr))

    if (checkResult) {

      resultArr.push(e)

      break

    }

  }

  return checkResult

}

```

### 调用  

```

var arr = []

fn(

  'value',

  2,

  [

    {

      text: 't1',

      value: 1,

      children: [

        {

          text: 't2',

          value: 2

        }

      ]

    }

  ],

  arr

)

console.log(arr)

```
