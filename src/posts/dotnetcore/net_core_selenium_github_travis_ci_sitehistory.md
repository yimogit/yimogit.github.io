---
title: .NET Core+Selenium+Github+Travis CI => SiteHistory
date: 2017-08-30 23:36:00
category:
  - DotNetCore
tag:
  - .net core
---

## 前言



> 总是三分钟热度的我折腾了一个可以每天自动截取指定网站页面并保存到Github的项目[SiteHistory](https://github.com/yimogit/SiteHistory)，感觉挺好(每次都这样![图片](https://dn-coding-net-production-pp.qbox.me/b51396e7-d34d-461a-bded-6faf7cca9dd7.png))。

> 想知道YouTube今天的首页长啥样么？[点此查看](https://raw.githubusercontent.com/yimogit/SiteHistory/gh-pages/youtube.jpg)

> 想知道YouTube2017年8月31日的首页长啥样么？[改天再点开](https://raw.githubusercontent.com/yimogit/SiteHistory/gh-pages_20170831/youtube.jpg)

> 想为你的网站增加访客么？不要问我，我不知道。



## 那年那站那样



> 伴随着时间，记录着网站的历史			  

> 记录下网站现在的样子，待那年今日			

> 那一年，那个网站，是那个样子		

> 项目地址：[https://github.com/yimogit/SiteHistory](https://github.com/yimogit/SiteHistory)





## 技术栈		



1. [`.NET Core`](https://www.microsoft.com/net/core#windowscmd):.NET Core 是.NET Framework的新一代版本，具有跨平台 (Windows、Mac OSX、Linux) 能力的应用程序开发框架 (Application Framework)。

2. [`Selenium`](https://github.com/SeleniumHQ/selenium):一个用于Web应用程序测试的工具。Selenium测试直接运行在浏览器中，就像真正的用户在操作一样。结合[phantomjs](http://phantomjs.org/)等驱动可以实现页面自动化。

3. [`Github`](https://github.com/):一个面向开源及私有软件项目的托管平台，因为只支持git 作为唯一的版本库格式进行托管，故名GitHub,<span style="color:white;">又名GayHub</span>

4. [`Travis CI`](https://travis-ci.org):采用yaml格式配置，简洁清新的开源持续集成构建项目。

> 我将其用来打包vue的纯工具站点[`metools`](https://github.com/yimogit/metools),以及.net core程序([`SiteHistory`](https://github.com/yimogit/SiteHistory))

> 啥，还不会？戳这里→→[使用travis-ci自动部署github上的项目](http://www.cnblogs.com/morang/p/7228488.html)



## 项目构建思路



0. 运行程序，传入名称 网址 如：`dotnet run baidu https://www.baidu.com`

1. 创建一个phanomjs无头浏览器: `IWebDriver driver = new PhantomJSDriver();`

2. 在浏览器中打开传入网站:`driver.Navigate().GoToUrl(sitePage);`

3. 执行js使其滚动到底部，触发懒加载，等待网页图片加载

  ``` js

    int waitTime=10;

    var myScript = @"var ymtimer=setInterval(function(){

                        if (document.body.scrollHeight - 700 < document.body.scrollTop){

                            window.scroll(0, document.body.scrollHeight)

                            clearInterval(ymtimer);

                            return;

                        }

                        window.scroll(0, document.body.scrollTop + 700)

                    } ," + waitTime * 1000 / 10 + ");";

    //10s中从头部滚动到底部

    ((IJavaScriptExecutor)driver).ExecuteScript(myScript);

    //等待滚动完毕，图片也差不多能加载完闭

    System.Threading.Thread.Sleep(1200 * waitTime);

  ```

4. 开始截图:`((ITakesScreenshot)driver).GetScreenshot().SaveAsFile("baidu.com",ScreenshotImageFormat.Jpeg)`

5. 拼接文本写入Readme.MD,Index.html

6. 关闭无头浏览器,程序结束`driver.Quit()`



### 项目文件预览

> Program.cs加起来就一百多行代码，[完整Program.cs代码请戳这里](https://github.com/yimogit/SiteHistory/blob/master/Program.cs)

> ![图片](https://dn-coding-net-production-pp.qbox.me/95e1ba37-4ac5-433d-be26-9d77446bc656.png)



## 程序运行		



0. 下载[phantomjs](http://phantomjs.org/)，设置环境变量(Travis CI环境提供PhantomJS预装)

1. [安装.net core2.0 SDK](https://www.microsoft.com/net/core#windowscmd)

2. 执行命令：`dotnet run 参数1[名称] 参数2[网页链接] 参数3[图片格式] 参数4[等待时间] 参数5[保存目录] 参数6[可以执行一些js]`

	1. `dotnet run baidu https://www.baidu.com/`

		> 保存[https://www.baidu.com]页面的截图名称为[baidu.jpg]

	2. `dotnet run baidu https://www.baidu.com/ png`

		>指定图片类型为`png`

	3. `dotnet run baidu https://www.baidu.com/ jpg 20`

		> 加载完毕后等待20s后截图(图片加载或网站速度过慢)

	4. `dotnet run baidu https://www.baidu.com/ jpg 10 download-test`

		> 下载的图片保存到download-test文件夹下

	4. `dotnet run baidu https://www.baidu.com/ jpg 10 download-test "document.body.innerHTML='test'`

		> 加载完毕后执行一段js



## 使用*Travis CI* 时的 *.travis.yml*配置



> 若使用Travis CI 集成 ，要新增网站截图项，则在travis.yml中script节点下添加命令即可

> ![图片](https://dn-coding-net-production-pp.qbox.me/5a25f1ca-ef44-4b0f-88de-30acbea55959.png)

> 附`Travis CI`的[环境变量配置图](https://dn-coding-net-production-pp.qbox.me/bf0c7ba6-586f-4963-8073-959b658c0c07.png)，具体戳[此文章](http://www.cnblogs.com/morang/p/7228488.html)

```

# 语言为scharp,系统为ubuntu14.04(代号trusty),.netcore 版本2.0

# Travis CI提供 phantomjs预装

language: csharp

dist: trusty

dotnet: 2.0.0



# mono:latest Travis CI默认会安装mono，测试发现若不安装mono,Travis CI会在程序截图时报错

# 打印组件版本

before_install:

  - dotnet --version

  - phantomjs --version



script:

  - dotnet restore

  - dotnet run ip http://1212.ip138.com/ic.asp png 

  - dotnet run acfun http://www.acfun.cn/ jpg 20

  - dotnet run bilibili https://www.bilibili.com jpg 20

  - dotnet run youtube https://www.youtube.com jpg 20

  - dotnet run google https://www.google.com

  

# 将截图提交到 ${P_BRANCH} 分支中(gh-pages) 

# export abc='date +%Y%m%d' 获取年月日

# 脚本将根据时间创建新分支 `gh-pages_20170901`，并更新gh-pages分支

#

after_script:

  - cd download

  - git init

  - git config user.name "${U_NAME}"

  - git config user.email "${U_EMAIL}"

  - git add .

  - git commit -m "add imgs"

  - git remote add orginimgs "https://${GH_TOKEN}@${GH_REF}"

  - export current_date='date +%Y%m%d'

  - echo "current_date:$($current_date)"

  - git push --force --quiet orginimgs master:gh-pages

  - git push --force --quiet orginimgs master:gh-pages_$($current_date)



branches:

  only:

    - master



```

## 总结

1. 测试发现IP地址每次都会发生变化,引发无限遐想

2. Linux下获取年月日字符串

	设置：`export current_date='date +%Y%m%d'`

	输出：`echo "current_date:$($current_date)"`

3. `.net core`使用`Selenium`需要引入Nuget包为：`CoreCompat.Selenium.WebDriver` 



> 配置中的变量按照[此文章](http://www.cnblogs.com/morang/p/7228488.html)配置即可

> 亲测搭配[travis-ci](https://travis-ci.org/)食用最佳，Fork之后，前往travis-ci配置即可 [参阅文章:使用travis-ci自动部署github上的项目](http://www.cnblogs.com/morang/p/7228488.html)     

> 欢迎分享值得记录的网站。
