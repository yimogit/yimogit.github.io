---
title: windows下使用bat脚本部署hexo到coding和github
categories:
  - 程序猿之路
tags: web开发
---
## 拉取coding.net的代码和github的代码到本地

确保代码能够正常的运行，commit,push
新建一个push.bat文件
然后copy下面的代码再改改路径，将文章放到arts目录后运行push即可

* artsPath 新增文章的目录  
* codingPath coding的目录    
* githubPath github的目录     

## 如何一步到位提交到仓库

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
### 优化-加入变量并读取第一个参数为注释

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
### 多个仓库的部署

>复制粘贴是最简单的了，but~我猜肯定有for循环可以用


``` bat
@echo off
set artsPath=F:\CodingRepos\ymhexo\arts
set gitPaths="F:\CodingRepos\ymhexo\yimocoding F:\CodingRepos\ymhexo\yimogit.github.io"
:GIT_VISTOR
for /f "tokens=1,*" %%a in (%str%) do (
    xcopy %artsPath% %%a\source\_posts /Y
    cd /d %%a
    call git pull
    call hexo clean
    call hexo d -g
    call git add *
    call git commit -m update_%1
    call git push
    REM 将剩余字符串赋值给str变量
    set str="%%b"
 
    goto GIT_VISTOR
)

```


如果要自己填写注释可以将 AddArticle 换成%1 来获取第一个参数
