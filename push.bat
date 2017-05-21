
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
cd  ..
