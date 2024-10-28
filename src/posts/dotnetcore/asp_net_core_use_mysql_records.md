---
title: 在 ASP.NET Core 中使用 MySql 踩坑记录
date: 2018-10-23 23:44:00
category:
  - DotNetCore
tag:
  - .net core
---

## 使用 Pomelo.EntityFrameworkCore.MySql 生成 MySQL 数据库



> 关于如何使用请查看项目文档即可

> 组件地址：https://github.com/PomeloFoundation/Pomelo.EntityFrameworkCore.MySql





### 问题描述

遇到的是在使用 CodeFirst 生成数据库的字符集编码问题  

执行迁移命令：`Add-Migration 版本` , `Update-Database` 生成数据库(若无自动创建)的字符集为 `latin1 -- cp1252 West European`  

此字符集将会在生成查询语句包含中文的时候报如下错误



### 异常信息



```

Illegal mix of collations (latin1_swedish_ci,IMPLICIT) and (utf8mb4_bin,COERCIBLE) for operation '='MySql.Data.MySqlClient.MySqlException (0x80004005): Illegal mix of collations (latin1_swedish_ci,IMPLICIT) and (utf8mb4_bin,COERCIBLE) for operation '=' ---> MySql.Data.MySqlClient.MySqlException (0x80004005): Illegal mix of collations (latin1_swedish_ci,IMPLICIT) and (utf8mb4_bin,COERCIBLE) for operation '='

```



### 解决方案



其实组件最开始就建议了设置字符集为：`utf8mb4`(MySQL5.5.3及以上)，所以遇到上诉错误只需要执行修改数据库字符集命令即可  

- 手动创建字符集为`utf8mb4`的数据库再执行迁移    

- 命令修改字符集：`alter database 数据库名称 character set utf8mb4;`，但是注意这并不能修改已创建的表的字符集编码；故还是建议手动创建数据库。   





### 相关命令 



- 查看MySQL数据库字符集：`show variables like 'character_set_database';`  

- 修改MySQL数据库字符集:`alter database 数据库名称 character set utf8mb4;`
