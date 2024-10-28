---
title: dotnet使用Selenium执行自动化任务
date: 2017-08-27 18:50:00
category:
  - DotNetCore
tag:
  - C#
  - web开发
---

> 如果要做百度文库，百度贴吧，百度知道签到，你，会怎么做？前不久我还会觉得这好像太麻烦了，now,soeasy。



## 自动化测试工具：Selenium

> Selenium是一个用于Web应用程序测试的工具。Selenium测试直接运行在浏览器中，就像真正的用户在操作一样。支持的浏览器包括 ,Chrome,Firefox,IE,[PhantomJS(一个基于webkit内核的无界面浏览器)](http://phantomjs.org/)等。

* Selenium项目地址：https://github.com/SeleniumHQ/selenium

* Selenium文档地址：http://seleniumhq.github.io/selenium/docs/api/dotnet/

<!--more-->



## 在.net framework下Selenium的使用

0. 新建解决方案，控制台项目

1. 添加NuGet包：`Selenium.WebDriver 3.5.1` `Selenium.Support 3.5.1`

2. 通过NuGet下载Phantomjs或者手动下载驱动，设置环境变量

    *  `Selenium.PhantomJS.WebDriver` //无头浏览器 无界面

    *  `Selenium.Chrome.WebDriver` //需要下载浏览器 ，运行时会打开浏览器

    *  `Selenium.Firefox.WebDriver` //需要下载浏览器

![图片](https://dn-coding-net-production-pp.qbox.me/e9f0d83d-93e1-4d45-bb71-0b994cfe8584.png)



## 简单使用示例



### 使用PhantomJS驱动保存百度首页截图

``` csharp

    var driver = new PhantomJSDriver();//创建浏览器

    driver.Navigate().GoToUrl("http://www.baidu.com");//打开百度

    //截图保存

    Screenshot screenshot = ((ITakesScreenshot)driver).GetScreenshot();

    screenshot.SaveAsFile("baidu.jpg", ScreenshotImageFormat.Jpeg);

    //退出

    driver.Quit();

```

### 点击百度搜索然后截图



``` csharp

    var driver = new PhantomJSDriver();//创建浏览器

    driver.Navigate().GoToUrl("http://www.baidu.com");//打开百度

    driver.FindElement(By.Id("kw")).SendKeys("Selenium");

    driver.FindElement(By.Id("su")).Click();

    Thread.Sleep(3000);//搜索结果显示出来再接图

    //截图保存

    Screenshot screenshot = ((ITakesScreenshot)driver).GetScreenshot();

    screenshot.SaveAsFile("baidu.jpg", ScreenshotImageFormat.Jpeg);

    //退出

    driver.Quit();

```

### 登录博客园发个闪存

源码地址：https://coding.net/u/yimocoding/p/WeDemo/git/tree/SeleniumDemo/SeleniumDemo



### 百度文库，百度贴吧，百度知道签到

> 要是用模拟请求的方式得累死个人。

``` csharp

  static void 百度签到()

  {

      dynamic loginUser = new

      {

          UserName = "yimo",

          UserPwd = "123456"

      };

      var myDriver = new PhantomJSDriver();//创建浏览器

      var defTask = new List<string>() { "文库", "贴吧", "知道" };

      const string _loginUrl = "https://passport.baidu.com/v2/?login";

      //跳转页面

      myDriver.Navigate().GoToUrl(_loginUrl);

      myDriver.FindElement(By.Id("TANGRAM__PSP_3__userName")).SendKeys(loginUser.UserName);

      myDriver.FindElement(By.Id("TANGRAM__PSP_3__password")).SendKeys(loginUser.UserPwd);

      myDriver.FindElement(By.Id("TANGRAM__PSP_3__submit")).Click();



      Console.WriteLine(myDriver.Title);



      if (defTask.Contains("文库"))

      {

          const string _wkSignUrl = "https://wenku.baidu.com/task/browse/daily";

          Console.WriteLine($"开始百度文库签到");

          myDriver.Navigate().GoToUrl(_wkSignUrl);

          myDriver.ExecScript("$('.bg').remove();$('.g-btn-pass').click();");

          Console.WriteLine("百度文库签到完成");

          Thread.Sleep(1000);

          myDriver.SaveImg("文库签到.png");

      }

      if (defTask.Contains("贴吧"))

      {

          const string _tiebaUrl = "https://tieba.baidu.com/index.html";

          Console.WriteLine("开始百度贴吧签到");

          myDriver.Navigate().GoToUrl(_tiebaUrl);

          myDriver.FindElement(By.ClassName("onekey_btn")).Click();

          myDriver.FindElement(By.ClassName("sign_btn_nonmember")).Click();

          Console.WriteLine("百度贴吧签到完成");

          Thread.Sleep(1000);

          myDriver.SaveImg("贴吧签到.png");

      }

      if (defTask.Contains("知道"))

      {

          const string _tiebaUrl = "https://zhidao.baidu.com/";

          Console.WriteLine("开始百度知道签到");

          myDriver.Navigate().GoToUrl(_tiebaUrl);

          myDriver.FindElement(By.ClassName("go-sign-in")).Click();

          myDriver.FindElement(By.ClassName("sign-in-btn")).Click();

          Console.WriteLine("百度知道签到完成");

          Thread.Sleep(1000);

          myDriver.SaveImg("知道签到.png");

      }

      //退出

      myDriver.Quit();

  }

```

#### 淘宝领取淘金币

``` csharp

  static void 淘金币领取()

  {

      dynamic loginUser = new

      {

          UserName = "yimo",

          UserPwd = "123456"

      };

      var myDriver = new PhantomJSDriver();//创建浏览器

      const string _loginUrl = "https://login.taobao.com/member/login.jhtml";

      const string _taoUrl = "https://taojinbi.taobao.com/index.htm";

      //跳转页面

      myDriver.Navigate().GoToUrl(_loginUrl);

      //账号登录

      myDriver.FindElement(By.Id("J_Quick2Static")).Click();



      myDriver.FindElement(By.Id("TPL_username_1")).SendKeys(loginUser.UserName);

      myDriver.FindElement(By.Id("TPL_password_1")).SendKeys(loginUser.UserPwd);

      myDriver.FindElement(By.Id("J_SubmitStatic")).Click();

      myDriver.Navigate().GoToUrl(_taoUrl);



      myDriver.FindElement(By.ClassName("J_GoTodayBtn")).Click();

      //滑动验证码

      Actions action = new Actions(driver);

      var source = driver.FindElement(By.ClassName("btn_slide"));

      if (source == null)

      {

          return;

      }

      action.ClickAndHold(source).MoveByOffset(300,0);

      action.MoveToElement(source).Release();

      IAction actions = action.Build();

      actions.Perform();

  }

```





Ctrl+F5，截图保存成功

![图片](https://dn-coding-net-production-pp.qbox.me/27c03e9a-9e2d-4884-abcc-abe9a87ef6a0.png)



## 常用接口

`var driver=new PhantomJSDriver();//驱动实例`

1. `INavigation`接口： 浏览器导航接口(前进，后退，刷新)，接口实例：`driver.Navigate()`

2. `IOptions`接口： 浏览器信息接口(Cookie,设置窗口等操作)，接口实例：`driver.Manage()`

3. `IWebElement` 通过`driver.FindElement()`筛选获取到元素信息(Text等)，可以对元素赋值(SendKeys())单击(Click())等操作



## 常用操作

* 窗口最大化：`driver.Manage().Window.Maximize();`

* Cookie操作接口获取：`driver.Manage().Cookies`

* 执行js:`((IJavaScriptExecutor)driver).ExecuteScript("document.body.innerHTML='Selenium'");`

* 截图：`((ITakesScreenshot)driver).GetScreenshot().SaveAsFile("保存路径.png", ScreenshotImageFormat.Png);`

* 拖动，[文章介绍参考](http://www.cnblogs.com/sylvia-liu/p/4224409.html)

``` csharp

  var driver = new PhantomJSDriver();

  By by=By.ClassName("btn_slide");

  int x=300,y=0

  Actions action = new Actions(driver);

  var source = driver.FindElement(by);

  if (source == null)

  {

      return;

  }

  action.ClickAndHold(source).MoveByOffset(x, y);

  action.MoveToElement(source).Release();

  IAction actions = action.Build();

  actions.Perform();

```



## 立个flag

下一篇：[SeleniumNetCoreDemo+travis-ci+Github](http://www.cnblogs.com/morang/p/7455992.html)

Demo下载：https://coding.net/u/yimocoding/p/WeDemo/git/tree/SeleniumDemo       

clone命令：`git clone https://git.coding.net/yimocoding/WeDemo.git -b SeleniumDemo`
