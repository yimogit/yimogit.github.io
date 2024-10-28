---
title: 常用cmd代码片段及.net core打包脚本分享
date: 2018-04-08 10:14:00
category:
  - DotNetCore
tag:
  - 脚本
  - .net core
---

### bat基础命令

- 注释：`rem 注释~~`

- 输出：`echo hello world`

- 接收用户输入：`%1 %2`,第n个变量就用`%n`表示

- 当前脚本路径：`%~dp0`

- 当前目录路径：`%cd%`

- 设置变量：`set currentPath=%cd%`

- 关闭回显：`@echo off` //隐藏执行路径，@表示包含echo off这条命令也不现实路径

- 请按任意键继续：`pause`

- 调用外部程序：`start xxx.exe`

- 等待子程序执行完毕：`call start xxx.exe`

- 切换当前目录:`cd /d 路径`

- 显示下级子目录名称：`dir /b /a:d`

- 显示下级子文件名称：`dir /b /a:-d`

- 命令连接符:`cmd1&cmd2`,在cmd1执行成功后执行cmd2

- 字符串分割：``

- 复制：`xcopy 要复制的目录 目标目录 /s /e /Q /Y /I`



### 1. 保存当前目录到局部变量并输出    

保存：`set currentPath=%cd%`

输出：`echo %currentPath`



### 2. 判断第一个脚本参数是否为ab(/i 忽略大小写)，若是则输出success，否则输出参数    

`if /i %1 == ab (echo success) else (echo %1)`



### 3. 判断当前执行目录（驱动器、文件或文件夹）是否存在是否存在logs文件夹，若不存在则创建    

`if not exist %cd%\logs md %cd%\logs`



如果想要一行写多条语句可以使用()括起来：`(if exist .\\test  echo exist test dic)&& echo 233`



### 4. 一个简单的for循环打印当前目录文件及文件夹（bat脚本中需要%%,直接执行只需要一个%即可）    

`for /f "delims=" %%i in ('dir /b .\') do echo %%i`



### 5. for循环里面对变量的赋值    

> 这个默认如果对变量进行赋值打印（`echo %变量%`）出来的结果始终是第一次的赋值结果，

> 若要对局部变量赋值则需要启用延迟环境变量扩展(`setlocal enabledelayedexpansion`)

> 将其添加到头部后，对变量赋值，然后输出：`echo !变量名!`。符号由%变更为!



``` bat

rem 输出当前目录下的文件文件夹

@echo off

setlocal enabledelayedexpansion

for /f "delims=" %%i in ('dir /b  .\') do (

    set temp=%%i

    echo !temp!

)

```



### 6. 使用for goto 将字符串(a+b+c-d)以+或者-分割并输出(做点事)    



```

@echo off

setlocal enabledelayedexpansion

set str="a+b+c-d"

:Step1

for /f "delims=-+, tokens=1,*" %%a in (%str%) do (

REM todo case a b c d...

    echo %%a

REM 重新赋值并跳转到GOON

    set str="%%b"

    goto Step1

)

```

分割后的第一个

```

@echo off

setlocal enabledelayedexpansion

set str="a;b;c"

for /f "delims=;, tokens=1,*" %%a in (%str%) do (

    set s= %%a

    echo "first:!s!"

)

```

### 7. 重启IIS站点    

停止：`C:\Windows\System32\inetsrv\appcmd.exe stop site 网站名称`      

启动：`C:\Windows\System32\inetsrv\appcmd.exe start site 网站名称`    

或者通过写入/删除`app_offline.htm`  



### 8. asp.net core(2.0) 项目发布到iis脚本

通过写入`app_offline.htm`文件，请求重定向到此文件解决进程占用问题，发布完成后删除文件请求进入core网站。



将脚本放到core项目的文件夹，路径自行修改，默认输出项目在src/UI文件夹中。打包文件在当前目录的release文件夹下

```

@echo off

:: 变量赋值，使用!name!



setlocal enabledelayedexpansion



set currentPath=%~dp0

set tempModulesPath=%currentPath%\temp

set modulesPath=%currentPath%\src\UI\



set str="项目名称1+项目名称2"



:GOON

for /f "delims=,+, tokens=1,*" %%i in (%str%) do (

    echo --------------------------------------------------------

    echo 【%%i】发布开始

	set path1=%modulesPath%%%i

	set path2=%currentPath%\release\%%i\

	set filnePath=!path2!app_offline.htm

	echo !path1!

	echo 停止【%%i】站点

	if not exist !path2! md !path2!



	cd /d !path1!

	echo 执行发布【!path2!】

	echo 网站维护中>!filnePath!

	call dotnet publish -o !path2!

	call xcopy %tempModulesPath% !path2! /s /e /Q /Y /I

	del !filnePath!

	echo 开启【%%i】站点

	

    echo 【%%i】发布完成

    set str="%%j"

    goto GOON

)



pause

```



### 9.发布 dotnet 包到 nuget



- `%NugetToken%`为 nuget 密钥的环境变量值

- 脚本放置到包目录即可



```bat

cd ./bin/Release

del *.nupkg /s /q

cd ../../

dotnet build -c Release

cd ./bin/Release

dotnet nuget push *.nupkg -k %NugetToken% -s https://api.nuget.org/v3/index.json

pause

```

### 10.删除子级.git目录

```

@echo off

setlocal enabledelayedexpansion

set CurrentDir=%cd%

for /f "delims=" %%i in ('dir /b /a:d  .\') do (

    echo 删除 %CurrentDir%/%%i/.git

    cd %CurrentDir%/%%i/

    rmdir .git /s /q

)

pause

```
