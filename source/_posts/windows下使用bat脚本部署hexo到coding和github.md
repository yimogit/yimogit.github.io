---
title: windows下使用bat脚本部署hexo到coding和github
categories:
  - 程序猿之路
tags: web开发
---
首先，拉取coding.net的代码和github的代码到本地
确保代码能够正常的运行，commit,push
新建一个push.bat文件
然后copy下面的代码再改改路径，将文章放到arts目录后运行push即可

* artsPath 新增文章的目录  
* codingPath coding的目录    
* githubPath github的目录     

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
call git commit -m AddArticle
call git push

xcopy %artsPath% %githubPath%\source\_posts /Y

cd /d %githubPath%
call git pull
call hexo clean
call hexo d -g
call git add *
call git commit -m AddArticle
call git push

```
如果要自己填写注释可以讲AddArticle换成%1 来获取第一个参数

