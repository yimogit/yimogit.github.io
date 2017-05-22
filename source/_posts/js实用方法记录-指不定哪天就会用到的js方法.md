---
title: js实用方法记录-指不定哪天就会用到的js方法
date: '2017-05-19 14:18'
categories:
  - web开发
tags: 
  - js
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

## 编码HTML

> UBB：HTML代码的安全代码

``` js

/**
 * 转换HTML字符串为UBB字符串
 */
function toUbb(str){
		str = str.replace(/</ig,'&lt;');
		str = str.replace(/>/ig,'&gt;');
		str = str.replace(/\n/ig,'<br />');
		str = str.replace(/\[code\](.+?)\[\/code\]/ig, function($1, $2) {return phpcode($2);});

		str = str.replace(/\[hr\]/ig,'<hr />');
		str = str.replace(/\[\/(size|color|font|backcolor)\]/ig,'</font>');
		str = str.replace(/\[(sub|sup|u|i|strike|b|blockquote|li)\]/ig,'<$1>');
		str = str.replace(/\[\/(sub|sup|u|i|strike|b|blockquote|li)\]/ig,'</$1>');
		str = str.replace(/\[\/align\]/ig,'</p>');
		str = str.replace(/\[(\/)?h([1-6])\]/ig,'<$1h$2>');

		str = str.replace(/\[align=(left|center|right|justify)\]/ig,'<p align="$1">');
		str = str.replace(/\[size=(\d+?)\]/ig,'<font size="$1">');
		str = str.replace(/\[color=([^\[\<]+?)\]/ig, '<font color="$1">');
		str = str.replace(/\[backcolor=([^\[\<]+?)\]/ig, '<font style="background-color:$1">');
		str = str.replace(/\[font=([^\[\<]+?)\]/ig, '<font face="$1">');
		str = str.replace(/\[list=(a|A|1)\](.+?)\[\/list\]/ig,'<ol type="$1">$2</ol>');
		str = str.replace(/\[(\/)?list\]/ig,'<$1ul>');

		str = str.replace(/\[s:(\d+)\]/ig,function($1,$2){ return smilepath($2);});
		str = str.replace(/\[img\]([^\[]*)\[\/img\]/ig,'<img src="$1" border="0" />');
		str = str.replace(/\[url=([^\]]+)\]([^\[]+)\[\/url\]/ig, '<a href="$1">'+'$2'+'</a>');
		str = str.replace(/\[url\]([^\[]+)\[\/url\]/ig, '<a href="$1">'+'$1'+'</a>');
		return str;
	}
    
```

## 解码ubb字符串

``` js
/**
 * 转换UBB字符串为HTML字符串
 */
function toHtml(str){
        //详情见：http://tool.oschina.net/ubb
        //str = str.replace(/(\r\n|\n|\r)/ig, '');
        str = str.replace(/<br[^>]*>/ig,'\n');
        str = str.replace(/<p[^>\/]*\/>/ig,'\n');
        //str = str.replace(/\[code\](.+?)\[\/code\]/ig, function($1, $2) {return phpcode($2);});	
        str = str.replace(/\son[\w]{3,16}\s?=\s*([\'\"]).+?\1/ig,'');

        str = str.replace(/<hr[^>]*>/ig,'[hr]');
        str = str.replace(/<(sub|sup|u|strike|b|i|pre)>/ig,'[$1]');
        str = str.replace(/<\/(sub|sup|u|strike|b|i|pre)>/ig,'[/$1]');
        str = str.replace(/<(\/)?strong>/ig,'[$1b]');
        str = str.replace(/<(\/)?em>/ig,'[$1i]');
        str = str.replace(/<(\/)?blockquote([^>]*)>/ig,'[$1blockquote]');

        str = str.replace(/<img[^>]*smile=\"(\d+)\"[^>]*>/ig,'[s:$1]');
        str = str.replace(/<img[^>]*src=[\'\"\s]*([^\s\'\"]+)[^>]*>/ig,'[img]'+'$1'+'[/img]');
        str = str.replace(/<a[^>]*href=[\'\"\s]*([^\s\'\"]*)[^>]*>(.+?)<\/a>/ig,'[url=$1]'+'$2'+'[/url]');
        //str = str.replace(/<h([1-6]+)([^>]*)>(.*?)<\/h\1>/ig,function($1,$2,$3,$4){return h($3,$4,$2);});

        str = str.replace(/<[^>]*?>/ig, '');
        str = str.replace(/&amp;/ig, '&');
        str = str.replace(/&lt;/ig, '<');
        str = str.replace(/&gt;/ig, '>');
	    return str;
}

```