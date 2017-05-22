---
title: js实用方法记录-动态加载css、js
date: '2017-05-19 11:26'
categories:
  - web开发
tags: 
  - js
---
# js实用方法记录-动态加载css、js

> 附送一个加载iframe,h5打开app代码

## 1. 动态加载js文件到head标签并执行回调

> 方法调用：`dynamicLoadJs('http://www.yimo.link/static/js/main.min.js',function(){alert('加载成功')});`

``` js
    /**
     * 动态加载JS
     * @param {string} url 脚本地址
     * @param {function} callback  回调函数
     */
    function dynamicLoadJs(url, callback) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        if(typeof(callback)=='function'){
            script.onload = script.onreadystatechange = function () {
                if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete"){
                    callback();
                    script.onload = script.onreadystatechange = null;
                }
            };
        }
        head.appendChild(script);
    }
```
<!--more-->
## 2. 动态加载css文件到head 

> 方法调用： `dynamicLoadCss('http://www.yimo.link/static/css/style.css')`

``` js
    /**
     * 动态加载CSS
     * @param {string} url 样式地址
     */
    function dynamicLoadCss(url) {
        var head = document.getElementsByTagName('head')[0];
        var link = document.createElement('link');
        link.type='text/css';
        link.rel = 'stylesheet';
        link.href = url;
        head.appendChild(link);
    }


```

## 3. 动态加载脚本文件
> 参考：http://www.cnblogs.com/yuanke/p/5039699.html

``` js
    
    /**
     * 动态加载css脚本
     * @param {string} cssText css样式
     */
    function loadStyleString(cssText) {
        var style = document.createElement("style");
        style.type = "text/css";
        try{
            // firefox、safari、chrome和Opera
            style.appendChild(document.createTextNode(cssText));
        }catch(ex) {
            // IE早期的浏览器 ,需要使用style元素的stylesheet属性的cssText属性
            style.styleSheet.cssText = cssText;
        }
        document.getElementsByTagName("head")[0].appendChild(style);
    }
    // 测试
    var css = "body{color:blue;}";
    loadStyleString(css);
```

``` js
    /**
     * 动态加载js脚本
     * @param {string} code js脚本
     */
    function loadScriptString(code) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        try{
            // firefox、safari、chrome和Opera
            script.appendChild(document.createTextNode(code));
        }catch(ex) {
            // IE早期的浏览器 ,需要使用script的text属性来指定javascript代码。
            script.text = code;
        }
        document.getElementsByTagName("head")[0].appendChild(script);
    }
    // 测试
    var text = "function test(){alert('test');}";
    loadScriptString(text);
    test();
```

## 4. 动态加载iframe到body标签并执行回调   

> 方法调用：`dynamicLoadIframe('http://www.yimo.link',function(){alert('加载成功')},'');`      

``` js
  /**
   * 动态加载Iframe
   * @param {string} url 脚本地址
   * @param {function} callback  回调函数
   * @param {string} style  加载样式
   */
  function dynamicLoadIframe(url,callback,style) {
    var body = document.getElementsByTagName('body')[0];
    var iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.style=style||'display:none;width:0px;height:0px;';
    if(typeof(callback)=='function'){
        iframe.onload = iframe.onreadystatechange = function () {
            if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
                callback();
                iframe.onload = iframe.onreadystatechange = null;
            }
        };
    }
    body.appendChild(iframe);
  }

```
## 5. M站中下载/打开app

方法测试：`openApp('ios页面','**.apk','metools://home');` 

``` js
function openApp(iosDownUrl,andDownUrl,appUrl) {
    var ua = navigator.userAgent.toLowerCase();    
    if (/iphone|ipad|ipod/.test(ua)) {//ios跳转到store
      window.location.href = iosDownUrl;
      return;
    } 
    if(ua.indexOf("micromessenger") > -1){//微信中不能打开其他app
      window.location.href = andDownUrl;
      return;
    }
    if (/android/.test(ua)) {//安卓手机尝试调用app
      if(!appUrl){
        console.log('未指定需要打开的App,可参考http://www.oschina.net/code/snippet_256033_35330/');
        return;
      }
      var su = appUrl;//"metools://index";//自定义协议
      var n = setTimeout(function () {
        window.location.href = andDownUrl
      }, 500);
      var r = document.createElement("iframe");
      r.src = su;
      r.onload = function () {
        console.log('iframe load')
        clearTimeout(n);
        r.parentNode.removeChild(r);
        window.location.href = su;
      };
      r.setAttribute("style", "display:none;");
      document.body.appendChild(r);
      return;
    }
    window.location.href = andDownUrl;
  }

```
