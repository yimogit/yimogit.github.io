---
title: 通过脚本下载GO被墙或常用的相关包
date: 2018-04-19 00:18:00
category:
  - Developer
tag:
  - 脚本
---

## 脚本描述



> 脚本依赖环境：Windows，GO，GIT

> 脚本将创建 temp 目录，并拷贝相关包到第一个 GOPATH 中        

> 可将脚本保存到本地自行添加被墙或者常用的包        



## 完整脚本代码

```

@echo off



setlocal enabledelayedexpansion

set currentPath=%~dp0

set tempDir=%currentPath%temp

set str="%gopath%"

for /f "delims=;, tokens=1,*" %%a in (%str%) do (

    set godir= %%a

)

REM gopath第一个目录

set workPath=!godir!\src

echo GOPATH:%workPath%



if not exist %tempDir% md %tempDir%



if not exist %tempDir%\grpc\  (

    call git clone https://github.com/grpc/grpc-go %tempDir%\grpc

    call xcopy %tempDir%\grpc %workPath%\google.golang.org\grpc /s /e /Q /Y /I

)



if not exist %tempDir%\genproto\  (

    call git clone https://github.com/google/go-genproto.git %tempDir%\genproto

    call xcopy %tempDir%\genproto %workPath%\google.golang.org\genproto /s /e /Q /Y /I

)



if not exist %tempDir%\net  (

    call git clone https://github.com/golang/net %tempDir%\net

    call xcopy %tempDir%\net %workPath%\golang.org\x\net /s /e /Q /Y /I

)

if not exist %tempDir%\sys  (

    call git clone https://github.com/golang/sys %tempDir%\sys

    call xcopy %tempDir%\sys %workPath%\golang.org\x\sys /s /e /Q /Y /I

)



if not exist %tempDir%\text  (

    call git clone https://github.com/golang/text.git %tempDir%\text

    call xcopy %tempDir%\text %workPath%\golang.org\x\text /s /e /Q /Y /I

)

```
