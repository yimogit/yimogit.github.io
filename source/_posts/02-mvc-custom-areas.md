---
title: asp.net mvc项目自定义区域
categories:
  - 程序猿之路
tags: mvc
---
# 前言
>直接上干货就是，就不废话了。     
>使用场景：分离模块，多站点等~~   
## 一、分离模块
>自定义视图引擎，设置视图路径格式   
>项目结构图
![](http://images2015.cnblogs.com/blog/662652/201608/662652-20160810235943465-541781227.png)
<!--more-->
# 1.Code: 在Global.asax Application_Start方法中添加自定义的视图引擎

            using System.Collections.Generic;
            using System.Web.Mvc;
            namespace MvcProjectMain.AreasViewEngine
            {

                /// <summary>       
                /// 自定义视图引擎
                /// </summary>
                /// <remarks>
                ///  ViewEngines.Engines.Add(new MvcProjectMain.AreasViewEngine.ThemableRazorViewEngine());
                /// </remarks>
                public class ThemableRazorViewEngine : VirtualPathProviderViewEngine
                {
                    //所有区域分离到Modules文件夹,{2}为区域名
                    public ThemableRazorViewEngine()
                    {
                        ViewEngines.Engines.Clear();
                        AreaViewLocationFormats = new[]
                        {
                        "~/Modules/{2}/Views/{1}/{0}.cshtml", 
                        "~/Modules/{2}/Views/Shared/{0}.cshtml",
                        };

                        AreaMasterLocationFormats = new[]
                        {
                        "~/Modules/{2}/Views/{1}/{0}.cshtml", 
                        "~/Modules/{2}/Views/Shared/{0}.cshtml",
                        };

                        AreaPartialViewLocationFormats = new[]
                        {
                        "~/Modules/{2}/Views/{1}/{0}.cshtml", 
                        "~/Modules/{2}/Views/Shared/{0}.cshtml", 
                        };

                        ViewLocationFormats = new[]
                        {
                        "~/Views/{1}/{0}.cshtml", 
                        "~/Views/Shared/{0}.cshtml",
                        };

                        MasterLocationFormats = new[]
                        {
                        "~/Views/{1}/{0}.cshtml", 
                        "~/Views/Shared/{0}.cshtml", 
                        };
                        PartialViewLocationFormats = new[]
                        {
                        "~/Views/{1}/{0}.cshtml", 
                        "~/Views/Shared/{0}.cshtml", 
                        };

                        FileExtensions = new[] { "cshtml" };
                    }

                    protected override IView CreatePartialView(ControllerContext controllerContext, string partialPath)
                    {
                        string layoutPath = null;
                        var runViewStartPages = false;
                        IEnumerable<string> fileExtensions = base.FileExtensions;
                        return new RazorView(controllerContext, partialPath, layoutPath, runViewStartPages, fileExtensions);
                    }

                    protected override IView CreateView(ControllerContext controllerContext, string viewPath, string masterPath)
                    {
                        string layoutPath = masterPath;
                        var runViewStartPages = true;
                        IEnumerable<string> fileExtensions = base.FileExtensions;
                        return new RazorView(controllerContext, viewPath, layoutPath, runViewStartPages, fileExtensions);
                    }
                }
            }

2.Code:在Global.asax中添加注册区域-->AreaRegistration.RegisterAllAreas();

            public class ThemesAreaRegistration : AreaRegistration
                {
                    public override string AreaName
                    {
                        get
                        {
                            return "MvcProjectThemes";
                        }
                    }

                    public override void RegisterArea(AreaRegistrationContext context)
                    {
                        context.MapRoute(
                            "MvcProjectThemes",
                            "MvcProjectThemes/{controller}/{action}/{id}",
                            new { controller = "Home", action = "Index", id = UrlParameter.Optional, },
                            namespaces: new string[] { "MvcProjectThemes.Controllers" }
                        );
                    }
                }
3.Code:注册主项目MvcProjectMain的路由 RouteConfig.RegisterRoutes(RouteTable.Routes);

    namespace MvcProjectMain
    {
        public class RouteConfig
        {
            public static void RegisterRoutes(RouteCollection routes)
            {
                routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

                routes.MapRoute(
                    name: "Default",
                    url: "{controller}/{action}/{id}",
                    defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional },
                    namespaces: new string[] { "MvcProjectMain.Controllers" }
                );
            }
        }
    }

# 最后

主要代码就是步骤1中的ThemableRazorViewEngine.cs类。自定义查找路径，其他的都是MVC的基础知识了,不懂自行查阅资料