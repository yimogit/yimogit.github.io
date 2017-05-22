---
title: js实用方法记录-简单cookie操作
date: '2017-05-19 13:51'
categories:
  - web开发
tags: 
  - js
---
# js实用方法记录-简单cookie操作

>设置cookie：setCookie(名称,值,保存时间,保存域);
>获取cookie：setCookie(名称);
>移除cookie：setCookie(名称,值,-1,保存域);

## 设置cookie 

>测试代码：`setCookie('test','hello')` //保存session级的cookie到根域
>测试代码：`setCookie('test','hello',30,false)` //保存30天且保存到当前全域名

``` js
/**
 * 设置cookie
 * @param {string} name cookie名称
 * @param {string} value cookie值
 * @param {number}[expiredays=null] 过期时间 默认session级别 <=0移除cookie
 * @param {bool}[saveRoot=true] 保存的域 默认根域
 */
function setCookie(name, value, expiredays=null,saveRoot=false) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays)
    var cookie = name + "=" + value + ';path=/' + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
    if(saveRoot){
    //适用于一级，二级，本地域名
      var domain =((location.host.match(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/g) || location.hostname=='localhost')? location.hostname:('.' + (location.host.split('.')[2]!=undefined?(location.host.split('.')[1]+'.'+location.host.split('.')[2]):location.host)));
      cookie+=(';domain='+domain);
    }
    document.cookie = cookie;
}
```
<!--more-->
## 获取cookie

> 测试代码: `getCookie('test')=='hello'`

``` js
/**
 * 获取cookie
 * @param {string} name cookie名称
 */
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
      return unescape(arr[2]);
    else
      return null;
}

```

