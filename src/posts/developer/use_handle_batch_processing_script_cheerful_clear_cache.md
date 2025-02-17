---
title: 使用批处理脚本愉快的清理缓存
date: 2017-06-04 02:08:00
category:
  - Developer
tag:
  - 脚本
---

## 站点缓存着实头痛，那么~重启吧

> 网站做了站点缓存，测试的时候修改数据后需要重启站点来清楚缓存

> 如何无需登陆服务器又不用改代码就可以清理换网站上的缓存呢？

> 用重启iis怎么样~

> 能重启IIS，自然也能干其他的



<!--more-->



## 实现步骤

0. 连接到远程主机

1. 在远程主机一个创建一个包含iisreset命令(+移除计划任务)的脚本

2. 给远程主机添加一项过期的计划任务

3. 立即执行计划任务



## 完整批处理脚本- 重启iis.bat

``` bat

@echo off

REM 远程地址

set ycip=192.168.1.123

REM 服务器登陆名

set ycname=Administrator

REM 服务器登陆密码

set ycpwd=123456

REM 计划任务名称

set planName=自动重启IIS

REM ipc名称

set ipcName=admin

REM 执行脚本地址 \\%ycip%\%ipcName%$\ 对应C:\Windows

set execbat=\\%ycip%\%ipcName%$\Temp\execiisresest.bat

REM 执行路径

set taskPath=C:\Windows\Temp\execiisresest.bat

echo 建立远程连接

net use \\%ycip%\%ipcName%$ "%ycpwd%" /user:%ycname%

echo 写入脚本到远程脚本

REM ....写日志 未写入可能是权限问题

echo echo %time%执行任务^>^>C:^\Windows^\Temp^\iisreset_log.txt>%execbat%

REM ....重启IIS

echo iisreset>>%execbat%

REM ....删除计划任务 echo yes| 始终确认

echo echo yes^| SCHTASKS /Delete /TN "%planName%" /F>>%execbat%

REM 任务时间 设置一个过期时间，但是立即执行

set tasktime="00:00"



echo 在远程主机创建计划任务

SCHTASKS /Create /S %ycip% /U %ycip%\%ycname% /P "%ycpwd%" /SC ONCE /ST %tasktime% /TN %planName% /TR %taskPath% /RU %ycname% /F



echo 立即执行定义的计划任务

SCHTASKS /Run /S %ycip% /U %ycip%\%ycname% /P "%ycpwd%" /I /TN "%planName%"

REM 删除IPC连接

net use \\%ycip%\%ipcName%$ /del

pause

```

---------------手动分割线---------------

使用上面的方法若无权限问题可无碍运行，然在某些做了安全设置的情况下貌似有点走不通，故有了下面的版本

## 第二次修改

```

@echo off

REM 远程地址

set ycip=192.169.1.123

REM 服务器登陆名

set ycname=Administrator

REM 服务器登陆密码

set ycpwd=123456

REM 计划任务名称

set planName=IIS_Reset

REM 远程计算机名

set ycpcname=mypc

REM 执行脚本地址

set execbat=\\%ycip%\D$\\execiisresest.bat

set taskPath=D:\execiisresest.bat

echo 建立远程连接

net use \\%ycip% "%ycpwd%" /user:%ycpcname%\%ycname%



echo 写入脚本到远程脚本

REM ....写日志 未写入可能是权限问题

echo echo %time%执行任务^>^>%taskPath%.txt>%execbat%

REM ....重启IIS

echo iisreset>>%execbat%

REM ....删除计划任务 echo yes| 始终确认

echo echo yes^| SCHTASKS /Delete /TN "%planName%" /F>>%execbat%

REM 任务时间延迟

set tasktime="00:00"



echo 在远程主机创建计划任务



SCHTASKS /Create /S %ycip% /U %ycpcname%\%ycname% /P "%ycpwd%" /SC ONCE /ST %tasktime% /TN %planName% /TR %taskPath% /RU %ycname% /F



echo 立即执行定义的计划任务

SCHTASKS /Run /S %ycip% /U %ycpcname%\%ycname% /P "%ycpwd%" /I /TN "%planName%"

REM 删除IPC连接

net use \\%ycip% /del

pause



```





## 关于脚本中的几个关键点

1. 批处理脚本中如何定义变量？

    定义：`set 变量名=值`         

    使用：`%变量名%`

    计算：`set /a v1=1+1` -->v1==2 `set v2=1+1`-->v2=="1+1"

2. 如何写入文件？

    写入：`echo 我是文本>文件名.后缀名`      

    追加写入：`echo 我是文本>>文件名.后缀名`

    追加一个换行符：`echo. >>文件名.后缀名`

    自动确认yes：`echo yes|`

3. 如何写入文件到建立远程连接

   首先建立远程连接： `net use \\192.168.1.123\admin$ "密码" /user:登陆名` 路径对应C:\Windows

   写入文件：`echo  文本>\\192.168.1.123\admin$\文件路径`

4. 在远程主机创建计划任务并执行

    创建计划任务：`SCHTASKS /Create /S %主机地址% /U %主机地址%\%主机登陆名% /P "%密码%" /SC ONCE /ST %计划任务名% /TN %计划任务名% /TR %脚本或程序地址% /RU %主机登录名亦可%`

    立即执行：`SCHTASKS /Run /S %主机地址% /U %主机地址%\%主机登陆名% /P "%密码%" /I /TN "%计划任务名%"`

    删除任务：`SCHTASKS /Run /S %主机地址% /U %主机地址%\%主机登陆名% /P "%密码%" /I /TN "%计划任务名%"`

5. 如何将 |,> 等特殊字符写入文本

    示例：`echo ^|>xxx.txt` ^为转义字符，这样就能特殊字符输出或写入文件了

    

6. 5种if语句的基本语法：     

> 1. 判断两个字符串是否相等，`if "字符串1"=="字符串2"(command语句) else ()`

> 2. 判断两个数值是否相等，`if 数值1 equ 数值2 command语句`

> 3. 判断判断驱动器，文件或文件夹是否存在`if exist filename command语句`

> 4. 判断变量是否已经定义，`if defined 变量 command语句`

> 5. 判断上个命令的返回值，`if errorlevel 数值 command语句`



7. 计划任务是会在C:\Windows\system32目录下执行的，所以若脚本中未重定向路径，则日志会保存到system32目录



## 参考文章

利用schtasks远程执行命令 https://sanwen.net/a/rsjveqo.html

DOS批处理中的特殊符号 http://www.2cto.com/os/201309/241025.html

DOS批处理添加任务计划 http://www.echojb.com/computer/2017/04/26/363341.html
