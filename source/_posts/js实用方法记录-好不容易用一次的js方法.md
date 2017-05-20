---
title: js实用方法记录-好不容易用一次的js方法
categories:
  - 程序猿之路
tags: web开发
---
# js实用方法记录-指不定哪天就会用到的js方法
> 常用或者不常用都有

## 判断是否在微信浏览器中

> 测试代码：`isWeiXin()==false`

``` js
/**
 * 是否在微信中
 */
function isWeixin() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
      return true;
    } else {
      return false;
    }
}
```
<!--more-->
## 全角转半角

> 测试代码：`wholetoHalf('ｈｅｌｌｏ'')=='hello'`

``` js
/**
 * 转换全角字符串
 * @param {string} txt 含全角字符串
 */
function wholetoHalf(txt){
    if (!txt) {
        return txt;
    }
    var tmp = "";
    for (var i = 0; i < txt.length; i++) {
        if (txt.charCodeAt(i) > 65280 && txt.charCodeAt(i) < 65375) {
            tmp += String.fromCharCode(txt.charCodeAt(i) - 65248);
        }
        else if (txt.charCodeAt(i) == 12288) {
            tmp += String.fromCharCode(32);
        }
        else {
            tmp += String.fromCharCode(txt.charCodeAt(i));
        }
    }
    return tmp;
}

```
## 生成Guid

``` js

/**
 * 生成Guid
 */
function genGuid() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0, 3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
}
```
## 获取滚动条距顶部距离

``` js
/**
 * 获取滚动条距顶部距离
 */
function getScrollTop() {
    var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
    if (document.body) {
        bodyScrollTop = document.body.scrollTop;
    }
    if (document.documentElement) {
        documentScrollTop = document.documentElement.scrollTop;
    }
    scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
    return scrollTop;
}
```
## 获取滚动条高度
``` js
/**
 * 获取滚动条高度 默认
 */
function getScrollHeight() {
    var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
    if (document.body) {
        bodyScrollHeight = document.body.scrollHeight;
    }
    if (document.documentElement) {
        documentScrollHeight = document.documentElement.scrollHeight;
    }
    scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
    return scrollHeight;
}
```
## 通过判断滚动条位置操作元素

``` js
if(getScrollHeight() > document.documentElement.clientHeight 
    && getScrollTop()>getScrollHeight()/4){//有滚动条且滚动条距离顶部在四分之外
    //显示回到顶部浮层什么的~~
}
```