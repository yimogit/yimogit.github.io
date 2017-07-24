---
title: 一个简单的时间轴demo
date: '2017-07-18 13:56'
categories:
  - web开发
tags: 
  - css
---
## 一个时间轴的组成 
1. 使用一个块级元素包裹内容，并未块级元素设置边框
2. 定义圆形或者菱形等元素标签，子元素设置偏移或者定位元素将图标定位到边框上
3. 使其中的内容不溢出，自动换行，内容自动撑高
    英文自动换行：`word-wrap:break-word;word-break:break-all`
<!--more-->

## 时间轴样式部分
> 使用时需要注意可能继承的样式会给li:after等伪类元素设置样式而造成效果异常
> css中定义了一个圆形的图标`class="yuan"`，一个菱形的图标`class="diamond"`

``` css
 <style>
    body{font:12px"宋体","Arial Narrow",HELVETICA;background:#fff;-webkit-text-size-adjust:100%}
    .ym-timeline{display:block}
    .ym-timeline ul{margin-left:30px;border-left:2px solid green;padding:0}
    .ym-timeline ul li{width:100%;margin-left:-12px;line-height:20px;font-weight:narmal;list-style:none}
    /*圆形图标*/
    .ym-timeline ul li span.yuan{width:8px;height:8px;background:#fff;border:2px solid green;margin:5px;border-radius:6px;-webkit-border-radius:6px;-moz-border-radius:6px;overflow:hidden;display:inline-block;float:left}
    /*菱形图标*/
    .ym-timeline ul li span.diamond{width:8px;height:8px;background:#fff;border:2px solid green;margin:5px;overflow:hidden;display:inline-block;float:left;transform:rotate(45deg);-ms-transform:rotate(45deg);-moz-transform:rotate(45deg);-webkit-transform:rotate(45deg);-o-transform:rotate(45deg)}
    .ym-timeline ul li span.stime{padding-left:7px;font-size:12px;line-height:20px;color:green}
    .ym-timeline ul li .ym-tl-content{padding:10px 0 10px 20px;font-size:14px;line-height:25px;word-wrap:break-word;word-break:break-all}
    .ym-timeline ul li:first-child span.diamond,.ym-timeline ul li:first-child span.yuan{margin-top:0}
    .ym-timeline ul li:last-child span.diamond,.ym-timeline ul li:last-child span.yuan{margin-top:8px}
     .ym-timeline ul li .ym-tl-content img{max-width:100%;}
</style>
```
## 时间轴html结构

``` html
  <!--效果预览http://runjs.cn/code/6udflsbt-->
  <div class="ym-timeline"> 
   <ul> 
    <li> <span class="diamond"></span> <span class="stime">2017-07-17</span> 
     <div class="ym-tl-content">
       是开始 ttesttesttesttesttesttesttesttesttesttesttest testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest testtesttesttesttesttesttesttesttesttesttestt 亦是结束 
     </div> </li> 
    <li> <span class="diamond"></span> <span class="stime">2017-07-18</span> 
     <div class="ym-tl-content">
       是开始 ttesttesttesttesttesttesttesttesttesttesttest testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest testtesttesttesttesttesttesttesttesttesttestt 亦是结束 
     </div> </li> 
    <li> <span class="diamond"></span> <span class="stime">2017-07-19</span> 
     <div class="ym-tl-content">
       是开始 ttesttesttesttesttesttesttesttesttesttesttest testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest testtesttesttesttesttesttesttesttesttesttestt 亦是结束 
     </div> </li> 
    <li> <span class="diamond"></span> <span class="stime">2017-07-20</span> 
     <div class="ym-tl-content">
       是开始 ttesttesttesttesttesttesttesttesttesttesttest testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest testtesttesttesttesttesttesttesttesttesttestt 亦是结束 
     </div> </li> 
    <li> <span class="yuan"></span> <span class="stime"></span> </li> 
   </ul> 
  </div> 
```
## 效果预览
> [完整代码](http://runjs.cn/code/6udflsbt)
