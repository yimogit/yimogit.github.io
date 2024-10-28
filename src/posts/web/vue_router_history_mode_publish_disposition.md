---
title: vue-router的history模式发布配置
date: 2018-02-06 12:44:00
category:
  - Web
tag:
  - vue
---

如果你正在尝试将基于vue-router的项目部署到windows中，希望本文能够有所帮助。



## iis配置

> 无需安装其他组件，将错误页指向index.html即可



``` 

<?xml version="1.0" encoding="UTF-8"?>

<configuration>

    <system.web>

        <customErrors mode="On" defaultRedirect="index.html">

            <error statusCode="404" redirect="index.html" />

        </customErrors>

    </system.web>

    <system.webServer>

        <httpErrors errorMode="Custom">

            <remove statusCode="404" />    

            <remove statusCode="500" />          

            <error statusCode="500" path="/index.html" responseMode="ExecuteURL" />

            <error statusCode="404" path="/index.html" responseMode="ExecuteURL" />

        </httpErrors>

      

    </system.webServer>

</configuration>





```

## nginx配置

> 启动如遇问题尝试使用命令创建/logs/nginx.pid文件:`nginx -c conf/nginx.conf`    

> 不要设置环境变量，重启命令：`start nginx -s -reload`

```

server {

    listen       3355;

    location / {

        root F:/dist;

        index index.html;

        try_files $uri $uri/ /index.html;

    }      

}

```
