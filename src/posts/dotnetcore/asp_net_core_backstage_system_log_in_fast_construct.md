---
title: asp.net core后台系统登录的快速构建
date: 2017-09-30 14:09:00
category:
  - DotNetCore
tag:
  - .net core
---

## 登录流程图

![图片](https://dn-coding-net-production-pp.qbox.me/d0414e05-1e0e-435d-9e11-5ffa663d9e4b.png)

<!--more-->

## 示例预览

![图片](https://dn-coding-net-production-pp.qbox.me/d5adba44-f4d8-44a5-a881-e2760f955a49.gif)



## 构建步骤

当然，你也可以直接之前前往[coding仓库](https://coding.net/u/yimocoding/p/WeDemo/git/tree/LoginDemo)查看源码，要是发现bug记得提醒我啊~ [LoginDemo地址](https://coding.net/u/yimocoding/p/WeDemo/git/tree/LoginDemo)



### 1. 首先你得有一个项目

![图片](https://dn-coding-net-production-pp.qbox.me/37d2d07e-a8fd-4eec-a990-3d881728aa5d.png)



### 2. 然后你需要一个登录页面

[完整Login.cshtml视图代码戳这里-](https://coding.net/u/yimocoding/p/WeDemo/git/blob/LoginDemo/CoreLoginDemo/Views/Account/Login.cshtml)共计55行

[效果预览图](https://dn-coding-net-production-pp.qbox.me/f77ca5bd-2146-4c82-ba31-3276271db26e.png)

``` html

<!DOCTYPE html>

<html>

<head>

    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

    <title>登录界面</title>

    <meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no">

    <link rel="stylesheet" href="https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css">

    <style type="text/css">

        body { color: #fff; font-family: "微软雅黑"; font-size: 14px; background: url('https://dn-coding-net-production-pp.qbox.me/96ec8cc7-0e5f-4217-b853-4a88c15579f3.png') no-repeat; }

        .wrap1 { position: absolute; top: 0; right: 0; bottom: 0; left: 0; margin: auto; height: 450px; }

        /*把整个屏幕真正撑开--而且能自己实现居中*/

        .main_content { background: url(https://dn-coding-net-production-pp.qbox.me/2ed70a05-04ad-4ccf-81d4-bc1fad2b6e41.png) repeat; margin-left: auto; margin-right: auto; text-align: left; float: none; border-radius: 8px; }

        .form-group { position: relative; }

        .login_btn { display: block; background: #3872f6; color: #fff; font-size: 15px; width: 100%; line-height: 50px; border-radius: 3px; border: none; }

        .login_input { width: 100%; border: 1px solid #3872f6; border-radius: 3px; line-height: 40px; padding: 2px 5px 2px 30px; background: none; }

        .icon_font { position: absolute; top: 12px; left: 10px; font-size: 18px; color: #3872f6; }

        .font16 { font-size: 16px; }

        .mg-t20 { margin-top: 20px; }

        @media (min-width:200px) {.pd-xs-20 { padding: 20px; }}

        @media (min-width:768px) {.pd-sm-50 { padding: 50px; }}

        #grad { background: -webkit-linear-gradient(#4990c1, #52a3d2, #6186a3); /* Safari 5.1 - 6.0 */ background: -o-linear-gradient(#4990c1, #52a3d2, #6186a3); /* Opera 11.1 - 12.0 */ background: -moz-linear-gradient(#4990c1, #52a3d2, #6186a3); /* Firefox 3.6 - 15 */ background: linear-gradient(#4990c1, #52a3d2, #6186a3); /* 标准的语法 */ }

        /*==jquery.validate css==*/

        .field-validation-error { color: #e14430 !important; padding-top: 5px; }

        .input-validation-error { border-color: #d38e99; }

    </style>

</head>

<body>

    <div class="container wrap1">

        <h2 class="mg-b20 text-center">后台管理系统</h2>

        <div class="col-sm-8 col-md-5 center-auto pd-sm-50 pd-xs-20 main_content">

            <p class="text-center font16">用户登录</p>

            <form asp-action="Login" method="post" >

                <div class="form-group mg-t20">

                    <i class="icon_font glyphicon glyphicon-user"></i>

                    <input type="text" class="login_input" asp-for="UserName" placeholder="请输入用户名" autofocus />

                    <span asp-validation-for="UserName"></span>

                </div>

                <div class="form-group mg-t20">

                    <i class="icon_font glyphicon glyphicon-lock"></i>

                    <input type="password" class="login_input" asp-for="UserPwd" placeholder="请输入密码" />

                    <span asp-validation-for="UserPwd"></span>

                </div>

                <div class="checkbox mg-b25 hide">

                    <label>

                        <input type="checkbox">记住我的登录信息

                    </label>

                </div>

                <button type="submit" class="login_btn">登 录</button>

            </form>

        </div>

    </div>

</body>

</html>

```



### 3. 然后你需要一个登录的控制器[`AccountController`](https://coding.net/u/yimocoding/p/WeDemo/git/blob/LoginDemo/CoreLoginDemo/Controllers/AccountController.cs)

控制器里面至少拥有一个呈现登录页的action，一个接收登录请求的action，一个退出的action

·登录· 判断是否存在用户，将用户名或者用户ID加密后记录到cookie中，跳转到管理页

·退出· 将cookie移出掉，跳转到登录页

加密的方法可自行切换为其他的加密方法

``` csharp

    public class AccountController : Controller

    {

        private readonly IUserService _userService;

        public AccountController(IUserService userService)

        {

            _userService = userService;

        }



        public IActionResult Login()

        {

            return View();

        }

        [HttpPost]

        [ValidateAntiForgeryToken]

        public IActionResult Login(AccountModel model)

        {

            //验证模型是否正确

            if (!ModelState.IsValid)

            {

                return View(model);

            }

            //调用服务验证用户名密码

            if (!_userService.Login(model.UserName, model.UserPwd))

            {

                ModelState.AddModelError(nameof(model.UserPwd), "用户名或密码错误");

                return View();

            }

            //加密用户名写入cookie中，AdminAuthorizeAttribute特性标记取出cookie并解码除用户名

            var encryptValue = _userService.LoginEncrypt(model.UserName, ApplicationKeys.User_Cookie_Encryption_Key);

            HttpContext.Response.Cookies.Append(ApplicationKeys.User_Cookie_Key, encryptValue);

            return Redirect("/");

        }

        public IActionResult Logout()

        {

            HttpContext.Response.Cookies.Delete(ApplicationKeys.User_Cookie_Key);

            return Redirect(WebContext.LoginUrl);

        }

    }

```



### 4. 然后还需要一个身份验证的特性标记[AdminAuthorizeAttribute](https://coding.net/u/yimocoding/p/WeDemo/git/blob/LoginDemo/CoreLoginDemo/Framework/AdminAuthorizeAttribute.cs)

>本文只是简单的验证是否登录，关于更复杂的权限验证可参考文章：[http://www.cnblogs.com/morang/p/7606843.html](http://www.cnblogs.com/morang/p/7606843.html)，以及[示例项目](https://coding.net/u/yimocoding/p/WeDemo/git/tree/MvcPermission/CoreDemo)

将此特性标记加到需要的地方即可在访问时验证用户是否登录，未登录则跳转到登录页。

``` csharp

    public class AdminAuthorizeAttribute : Attribute, IAuthorizationFilter

    {

        public void OnAuthorization(AuthorizationFilterContext filterContext)

        {

            if (string.IsNullOrEmpty(WebContext.AdminName))

            {

                if (filterContext.HttpContext.Request.Headers["X-Requested-With"] == "XMLHttpRequest")

                {

                    filterContext.Result = new JsonResult("未登录");

                }

                else

                {

                    filterContext.Result = new RedirectResult("Account/Login");

                }

                return;

            }

        }

    }

```

上面特性标记代码中的`WebContext.AdminName`是如何取到的呢？还需要结合如下代码

``` csharp

    //服务定位器

    public static class ServiceLocator

    {

        public static IServiceProvider Instance { get; set; }

        public static T GetService<T>() where T : class

        {

            return Instance.GetService<T>();

        }



    }

    //一些通用的信息

    public static class WebContext

    {

        public static string AdminName

        {

            get

            {

                //获取cookie

                var hasCookie = ServiceLocator.GetService<IHttpContextAccessor>()

                    .HttpContext

                    .Request.Cookies

                    .TryGetValue(ApplicationKeys.User_Cookie_Key, out string encryptValue);

                if (!hasCookie || string.IsNullOrEmpty(encryptValue))

                    return null;

                var adminName = ServiceLocator.GetService<IUserService>().LoginDecrypt(encryptValue, ApplicationKeys.User_Cookie_Encryption_Key);

                return adminName;

            }

        }

        public const string LoginUrl = "/account/login";

    }

    //全局的一些Key值

    public class ApplicationKeys

    {

        public const string User_Cookie_Encryption_Key = "User_Cookie_Encryption_Key";



        public const string User_Cookie_Key = "User_Cookie_Key";

    }

    

    //Startup

    public void ConfigureServices(IServiceCollection services)

    {

        services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();//用于获取请求上下文

        services.AddTransient<IUserService, UserService>();

        services.AddMvc();

    }

    public void Configure(IApplicationBuilder app, IHostingEnvironment env)

    {

        //app.UseMvc()..

        //最末的时候赋值

        ServiceLocator.Instance = app.ApplicationServices;

    }

```

### 代码说明

1. 首先定义了一个存放服务的静态对象：`ServiceLocator`

2. 在程序启动后将`IApplicationBuilder.ApplicationServices`赋值给`ServiceLocator.Instance`,这样就能够在任何地方使用`ServiceLocator.Instance`获取到注入的服务

    （为了更好的获取实例添加了一个`T GetService<T>()`方法）

3. 在WebContext中取获取Cookie值：`ServiceLocator.GetService<IHttpContextAccessor>().HttpContext.Request.Cookies`

4. 解密获取的cookie得到用户名：`ServiceLocator.GetService<IUserService>().LoginDecrypt(encryptValue, ApplicationKeys.User_Cookie_Encryption_Key);`

5. 所以在后台就能使用`WebContext.AdminName`获取到当前登录用户名，或者根据用户名获取登录信息



## 总结

- 自定义特性标记和过滤器之间差开一个`IFilterMetadata`，换言之：特性标记实现了`IFilterMetadata`就等于是个过滤器(个人理解)

- asp.net core中模型绑定使用`asp-for`

- asp.net core注入服务: 在 `Startup.ConfigureServices`方法中注入 `services.AddTransient<IUserService, UserService>()`

- asp.net core获取`HttpContext`对象 参考：[ASP.NET Core开发之HttpContext](http://www.cnblogs.com/linezero/p/6801602.html)

>ASP.NET Core中提供了一个`IHttpContextAccessor`接口，`HttpContextAccessor` 默认实现了它简化了访问`HttpContext`。

>它必须在程序启动时在`IServicesCollection`中注册，这样在程序中就能获取到`HttpContextAccessor`，并用来访问`HttpContext`。

>`services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();`



- asp.net core中表单直接使用`form`标签，`asp-action`,`asp-controller`等指定路由参数即可，并且能够自动生成防伪字段标识，配合`ValidateAntiForgeryToken`特性标记预防[`CSRF`](https://baike.baidu.com/item/CSRF/2735433?fr=aladdin) [代码生成比较图](https://dn-coding-net-production-pp.qbox.me/285c2741-5f63-48dc-b8c9-8c9c4b60858c.png)

相关文档地址：https://docs.microsoft.com/zh-cn/aspnet/core/security/anti-request-forgery

- `autofocus`属性 可使文本框自动获取焦点



## Demo下载地址

- [点击下载Demo](https://coding.net/u/yimocoding/p/WeDemo/git/archive/LoginDemo)

- [Coding仓库地址](https://coding.net/u/yimocoding/p/WeDemo/git/tree/LoginDemo)克隆代码：`git clone https://git.coding.net/yimocoding/WeDemo.git -b LoginDemo LoginDemo`



探索学习中，若有错误或者不足指出还望园友指出。
