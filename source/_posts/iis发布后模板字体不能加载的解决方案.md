---
title: iis发布后模板字体不能加载的解决方案
date: '2017-05-06 21:30'
categories:
  - web开发
---

## 在使用ace模板的过程中就曾遇到过图标不显示的情况，

1、在iis和vs运行都不能显示图标，添加缺失的字体库后可以访问

2、把项目签入到阿里云时再一次失效，解决方法是添加Mime类型

*   .woff  application/x-font-woff

*   .woff2 application/x-font-woff

*   .svg   image/svg+xml

3、在使用H+模板的时候又出现了问题，然后前两种都没能解决问题，因为mvc的原因，

需要在webconfig中的system.webServer节点添加配置

代码如下

```
    <system.webServer>
       <staticContent>
          <remove fileExtension=".woff"/>
          <mimeMap fileExtension=".woff" mimeType="application/x-font-woff" />
          <remove fileExtension=".woff2"/>
          <mimeMap fileExtension=".woff2" mimeType="application/x-font-woff2" />
          <remove fileExtension=".ttf" />
          <mimeMap fileExtension=".ttf" mimeType="application/x-font-truetype" />
          <remove fileExtension=".svg" />
          <mimeMap fileExtension=".svg" mimeType="image/svg+xml" />
          <remove fileExtension=".otf" />
          <mimeMap fileExtension=".otf" mimeType="application/x-font-opentype" />
          <remove fileExtension=".eot" />
          <mimeMap fileExtension=".eot" mimeType="application/vnd.ms-fontobject" />
        </staticContent>
    </system.webServer>
```
--仅以记录开发中所遇问题。