---
title: 使用bat脚本部署hexo到coding和github
categories:
  - 程序猿之路
tags: web开发
---

> 因项目的不同适当的改造吧，本文以hexo为例。

## 拉取coding.net的代码和github的代码到本地

1. 确保代码能够正常的运行，commit,push
2. 在项目的目录外新建一个push.bat文件 

快速预览      
![](http://images2015.cnblogs.com/blog/662652/201705/662652-20170521012938088-2141091264.png)


## 如何一步到位提交到仓库

> 脚本中的变量说明
* artsPath 新增文章的目录  
* codingPath coding的目录    
* githubPath github的目录    

### 复制文章然后自动执行命令进行部署

> 修改脚本中对应的路径后执行`push`

``` bat
xcopy F:\CodingRepos\ymhexo\arts F:\CodingRepos\ymhexo\yimocoding\source\_posts /Y
cd F:\CodingRepos\ymhexo\yimocoding
call git pull
call hexo clean
call hexo d -g
call git add *
call git commit -m AddArticle
call git push
```
<!--more-->
### 优化v1-加入变量并读取第一个参数为注释

> 查阅了果然cmd是有变量的，所以提前了路径到变量中，注释也可以传入了
> 使用`push 修改文章`,提交之后注释为update_修改文章，可省略参数

``` bat
set artsPath=F:\CodingRepos\ymhexo\arts
set codingPath=F:\CodingRepos\ymhexo\yimocoding
set githubPath=F:\CodingRepos\ymhexo\yimogit.github.io

xcopy %artsPath% %codingPath%\source\_posts /Y
cd /d %codingPath%
call git pull
call hexo clean
call hexo d -g
call git add *
call git commit -m update_%1
call git push
```
### 优化v2-多个仓库的部署

> 复制粘贴是最简单的了，but~ 我感觉还能再优化下
> 定义变量，然后保存到字符串str中，通过赋值str后调整到for取下一个值实现一个路径的先入先出的T_T【笑哭】可以算作循环数组的方法了

``` bat

@echo off
set artsPath=F:\CodingRepos\ymhexo\arts
REM coding的目录
set codingPath=F:\CodingRepos\ymhexo\yimocoding
REM github的目录
set githubPath=F:\CodingRepos\ymhexo\yimogit.github.io
REM 默认注释add_article，第一个参数为注释
set notes=%1 
if "%1"=="" set notes=add_article
REM 拼接coding和github的目录地址，路径中不能含有空格
set str="%codingPath% %githubPath%"

:STR_START
for /f "tokens=1,*" %%a in (%str%) do (
    REM 复制文章到此仓库
    xcopy %artsPath% %%a\source\_posts\ /Y
    REM 重定向到此仓库
    cd /d %%a
    REM 更新推送等操作
    call git pull
    call hexo clean
    call hexo d -g
    call git add *
    call git commit -m %notes%
    call git push
    REM 重新将新字符串赋值个str，并重新开时循环新的字符串
    set str="%%b"
    goto STR_START
)

```

> 不愿干重复的事情~    
> 程序猿就是如此的懒~      
> 能一个脚本干完所有事简直完美~
> 不知道有没有比这种方法更好的实现