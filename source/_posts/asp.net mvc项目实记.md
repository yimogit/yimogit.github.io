---
title: asp.net mvc项目实记
date: '2017-07-19 17:26'
categories:
  - dotnet
tags: 
  - dotnet
---

> 百度这些东西，还是会浪费了一些不必要的时间，记录记录以备后续

## 一、开启伪静态
> 如果不在web.config中配置管道开关则伪静态无效

1. 首先在RouteConfig.cs中中注册路由      
``` C#
    routes.MapRoute(
        name: "index",
        url: "index.html",
        defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
    );
```
2. 在web.config中的system.webServer节点添加配置项         
```
    <system.webServer>
        <modules runAllManagedModulesForAllRequests="true" />
    </system.webServer>
```

<!--more-->

## 二、使用Bundle压缩css,js   

1. 添加Nuget包`Microsoft.AspNet.Web.Optimization`      
2. 配置BundleConfig.cs文件      

``` C#
        public class BundleConfig
        {
            public static void RegisterBundles(BundleCollection bundles)
            {
                //若runAllManagedModulesForAllRequests未配置则不不能使用.css，.js等带后缀的静态资源名称，反之即可
                bundles.Add(new StyleBundle("~/Content/maincss").Include(
                    "~/Content/assets/css/main.css",
                    "~/Content/assets/css/md.css"
                    ));
                bundles.Add(new ScriptBundle("~/Content/listjs").Include(
                    "~/Content/assets/js/xss.js",
                    "~/Content/assets/js/meMd.js",
                    "~/Content/assets/js/marked.js",
                    "~/Content/assets/js/dragscroll.js"
                    ));
                //强制开启压缩，或者由system.web节点的compilation【debug】值控制(即debug模式下不压缩合并)
                //BundleTable.EnableOptimizations = true;
            }
        }
```

3. 在Global.asax的Application_Start()中注册配置    
    `BundleConfig.RegisterBundles(BundleTable.Bundles);`
4. 需要注意的地方      
    1. StyleBundle构造函数中的路径为虚拟路径，即不用关心目录是否存在     
    2. 若web.config中配置了`<modules runAllManagedModulesForAllRequests="true" />`，则序StyleBundle传递的虚拟路径可以包含后缀名.css/.js    
    3. Bundle压缩合并功能可由web.config中的system.web节点下`<compilation debug="false" targetFramework="4.5" />`的debug值控制，或者在RegisterBundles方法中强制启用：`BundleTable.EnableOptimizations = true;`      

## 三、layui富文本编辑器中的文件上传接口
``` C#
    public class FileController : Controller
    {
        private static readonly string[] ImageFileExtensions = GetConfigValue("ImgExts").Split(',') ?? new string[] { ".jpg", ".jpeg", ".gif", ".png", ".bmp", ".ico" };
        private static readonly string ImageDomain = GetConfigValue("ImgDomain");//末尾不带/
        private static readonly string UploadDir = GetConfigValue("UploadDir", "/uploads/");//相对路径吧
        private static readonly int UploadMaxLength = int.Parse(GetConfigValue("UploadMaxLength", "5242880"));//默认最大5M

        private static string GetConfigValue(string key, string def = "")
        {
            return System.Configuration.ConfigurationManager.AppSettings[key] ?? def;
        }
        [HttpPost]
        public ActionResult Upload(HttpPostedFileBase file)
        {

            if (file == null)
            {
                return Json(new
                {
                    code = -1,
                    msg = "未上传任何东西！"
                });
            }
            if (file.ContentLength > UploadMaxLength)
            {
                return Json(new
                {
                    code = -1,
                    msg = "文件大小不能超过5M！"
                });
            }
            string ext = Path.GetExtension(file.FileName);
            if (ImageFileExtensions.Any(e => e == ext))
            {
                return Json(new
                {
                    code = -1,
                    msg = "不支持此文件格式"
                });
            }
            string fileName = Guid.NewGuid().ToString() + ext;
            string saveDir = System.Web.HttpContext.Current.Request.MapPath(UploadDir);
            if (!Directory.Exists(saveDir))
            {
                Directory.CreateDirectory(saveDir);
            }
            string savePath = Path.Combine(saveDir, fileName);
            file.SaveAs(savePath);
            return Json(new
            {
                code = 0,
                msg = "上传成功",
                data = new
                {
                    src = ImageDomain + UploadDir + fileName,
                    title = ""
                }
            });
        }

    }
```
## 四、使用js-xss进行xss的防御

1. 保存[xss.js](https://raw.github.com/leizongmin/js-xss/master/dist/xss.js)到本地并在页面中引用
2. 使用filterXss(html,options)调用函数处理，根据规则将规则内的html编码      

``` js
        // 使用函数名 filterXSS，用法一样
        var html = filterXSS('<script>alert("xss");</script>');
        console.log(html);//"&lt;script&gt;alert("xss");&lt;/script&gt;"
```
3. 实际使用         
 > 执行结果对比
 > ![图片](https://dn-coding-net-production-pp.qbox.me/849f6db0-ac27-46ec-bcbf-becd1696e2ff.png)          
 ``` js
        //定义自己的规则
        var myXssOptions = function (isEditer) {
            return {
                onTagAttr: function (tag, name, value, isWhiteAttr) {
                    //保留style标签 默认会将style给干掉
                    if (name == 'style') {
                        return "style='" + value + "'";
                    }
                    //替换src为lay-src做懒加载
                    if (!isEditer && tag == 'img' && name == 'src') {
                        return "lay-src='" + value + "'";
                    }
                }
            }
        };
```



