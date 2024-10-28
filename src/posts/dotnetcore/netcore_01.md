---
title: .net core建站踩坑记录
date: 2017-07-10 00:17:00
category:
  - DotNetCore
tag:
  - .net core
---

> 系统：win10  

> VS版本：2017

> .NET Core 版本： 1.1



## 零.读取配置文件

> 参考：http://www.tuicool.com/articles/QfYVBvi

0. 此版本无需添加其他组件

1. 在`appsettings.json`配置中添加节点AppSettings

     ![图片](https://dn-coding-net-production-pp.qbox.me/6e12aae7-7ebd-486f-8775-e80c989eae97.png)

2. 添加配置文件的映射模型

     ![图片](https://dn-coding-net-production-pp.qbox.me/ea4ac89a-7e83-4a90-a514-ab3f4c453af1.png) 

3. 在Startup.cs  ConfigureServices方法中注册

 ![图片](https://dn-coding-net-production-pp.qbox.me/7cac2c8c-c374-4558-b49f-9c963fe69906.png) 



            services.AddOptions();

            services.Configure<AppSettings>(Configuration.GetSection("AppSettings"));



4. Controller中使用

    ![图片](https://dn-coding-net-production-pp.qbox.me/976314e3-77a4-4a42-844e-e42bfcd748b3.png)     

5. 控制台使用    

添加nuget包    

```

    <PackageReference Include="Microsoft.Extensions.Configuration" Version="2.0.0" />

    <PackageReference Include="Microsoft.Extensions.Configuration.Json" Version="2.0.0" />

```    

main函数配置    

```

           using Microsoft.Extensions.Configuration;

            var Configuration = new ConfigurationBuilder()

            .SetBasePath(System.IO.Directory.GetCurrentDirectory())

            .AddJsonFile(path: $"appsettings.json") 

            .AddJsonFile(path: $"appsettings.Test.json",optional:true) //可选，若有存在的key，则test优先级更高

            .Build();

            System.Console.WriteLine(Configuration.GetSection("test").Value);

```



## 一、登录记录session

> 参考：http://www.cnblogs.com/fonour/p/5943401.html



## 二、发布.net core1.1.2网站到windos服务器

> 参考：https://docs.microsoft.com/en-us/aspnet/core/publishing/iis

> 0. 我的服务器是windows server 2012 ,.net core网站版本为1.1.2

> 1. 经安装好iis

> 2. 下载安装： 

      [.NET Core Windows Server Hosting](https://go.microsoft.com/fwlink/?linkid=848766) 

      [Microsoft Visual C++ 2015 Redistributable Update 3](https://www.microsoft.com/en-us/download/details.aspx?id=53840)

 ![图片](https://dn-coding-net-production-pp.qbox.me/a0318ad1-a06e-413e-9412-52b30149a516.png) 

> 3. 发布.net core网站到IIS，并将应用池的.NET CLR版本修改为[无托管代码]

 ![图片](https://dn-coding-net-production-pp.qbox.me/d0ccf5ba-0535-4832-a239-dcb1a5686ae3.png) 



## 三、DES加密解密算法

> 亲测可用



      public class SecurityHelper

      {

          #region 加密解密法一

          //默认密钥向量 

          private static byte[] Keys = { 0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0A, 0x0B, 0x0C, 0x0D, 0x0E, 0x0F };

          /// <summary> 

          /// DES加密字符串 

          /// </summary> 

          /// <param name="encryptString">待加密的字符串</param> 

          /// <param name="encryptKey">加密密钥,要求为16位</param> 

          /// <returns>加密成功返回加密后的字符串，失败返回源串</returns> 

          public static string EncryptDES(string encryptString, string encryptKey = "Key123Ace#321Key")

          {

              try

              {

                  byte[] rgbKey = Encoding.UTF8.GetBytes(encryptKey.Substring(0, 16));

                  byte[] rgbIV = Keys;

                  byte[] inputByteArray = Encoding.UTF8.GetBytes(encryptString);

                  var DCSP = Aes.Create();

                  MemoryStream mStream = new MemoryStream();

                  CryptoStream cStream = new CryptoStream(mStream, DCSP.CreateEncryptor(rgbKey, rgbIV), CryptoStreamMode.Write);

                  cStream.Write(inputByteArray, 0, inputByteArray.Length);

                  cStream.FlushFinalBlock();

                  return Convert.ToBase64String(mStream.ToArray());

              }

              catch (Exception ex)

              {

                  return ex.Message + encryptString;

              }

          }

          /// <summary> 

          /// DES解密字符串 

          /// </summary> 

          /// <param name="decryptString">待解密的字符串</param> 

          /// <param name="decryptKey">解密密钥,要求为16位,和加密密钥相同</param> 

          /// <returns>解密成功返回解密后的字符串，失败返源串</returns> 

          public static string DecryptDES(string decryptString, string decryptKey = "Key123Ace#321Key")

          {

              try

              {

                  byte[] rgbKey = Encoding.UTF8.GetBytes(decryptKey.Substring(0, 16));

                  byte[] rgbIV = Keys;

                  byte[] inputByteArray = Convert.FromBase64String(decryptString);

                  var DCSP = Aes.Create();

                  MemoryStream mStream = new MemoryStream();

                  CryptoStream cStream = new CryptoStream(mStream, DCSP.CreateDecryptor(rgbKey, rgbIV), CryptoStreamMode.Write);

                  Byte[] inputByteArrays = new byte[inputByteArray.Length];

                  cStream.Write(inputByteArray, 0, inputByteArray.Length);

                  cStream.FlushFinalBlock();

                  return Encoding.UTF8.GetString(mStream.ToArray());

              }

              catch (Exception ex)

              {

                  return ex.Message + decryptString;

              }

          }

          #endregion 

      }



## 四、过滤器定义

> 继承Attribute,实现IActionFilter即可

> 简单校验登录,获取cookie值并解密后得到用户名,未登录则跳转登录(ApplicationKey为自定义的类存放)



    public class UserCheckFilterAttribute : Attribute, IActionFilter

    {

        public void OnActionExecuted(ActionExecutedContext context)

        {

        }

        public void OnActionExecuting(ActionExecutingContext filterContext)

        {

            string encryptValue = "";

            filterContext.HttpContext.Request.Cookies.TryGetValue(ApplicationKey.User_Cookie_Key, out encryptValue);

            if (encryptValue == null)

            {

                filterContext.Result = new RedirectResult("/Account/Login");

                return;

            }

            var userName = SecurityHelper.DecryptDES(encryptValue, ApplicationKey.User_Cookie_Encryption_Key);

            if (string.IsNullOrEmpty(userName))

            {

                filterContext.Result = new RedirectResult("/Account/Login");

                return;

            }

        }

    }



## 五、注入服务

> `Startup.cs`中的`ConfigureServices`方法调用`services.AddTransient<IUserService,UserService>();`注册服务

 ![图片](https://dn-coding-net-production-pp.qbox.me/7f9d0747-a9bf-4be3-89d8-5d87123c5b4d.png) 



## 根据路径调用脚本

> 调用：`var errMsg="";var result=ExcuteBatFile(path,ref errMsg);`



        public static string ExcuteBatFile(string batPath, ref string errMsg)

        {

            if (errMsg == null) throw new ArgumentNullException("errMsg");

            string output;

            using (Process process = new Process())

            {

                FileInfo file = new FileInfo(batPath);

                if (file.Directory != null)

                {

                    process.StartInfo.WorkingDirectory = file.Directory.FullName;

                }

                process.StartInfo.FileName = batPath;

                process.StartInfo.RedirectStandardOutput = true;

                process.StartInfo.RedirectStandardError = true;

                process.StartInfo.UseShellExecute = false;

                process.StartInfo.CreateNoWindow = true;

                process.Start();

                //process.WaitForExit();

                output = process.StandardOutput.ReadToEnd();

                errMsg = process.StandardError.ReadToEnd();

            }

            return output;

        }



## 命令生成发布文件

> 系统需要安装CORE SDK  

> 若上传到git仓库，拉取后需要再项目目录中执行还原命令 `dotnet restore`

> `dotnet publish --framework netcoreapp1.1 --output "C:\Publish" --configuration Release`

> 命令相关文档：https://docs.microsoft.com/zh-cn/dotnet/core/tools/



## linux 部署    

> 安装Ubuntu(ubuntu-16.04.2-server-amd64.iso) 教程：http://www.cnblogs.com/wangjieguang/p/hyper-v-ubuntu.html    

> 部署文章参考：http://www.cnblogs.com/wangjieguang/p/aspnetcore-ubuntuserver.html

> Linux下安装SDK https://www.microsoft.com/net/core#linuxubuntu



## 文章收集

> 超详细的Hyper-V安装Ubuntu：  http://www.cnblogs.com/wangjieguang/p/hyper-v-ubuntu.html

> Ubuntu部署.NET Core：http://www.cnblogs.com/wangjieguang/p/aspnetcore-ubuntuserver.html



--------------------2017-07-24记录--------------------



## 接口`return Json()`时序列化格式的设置

在Startup.cs-》ConfigureServices方法配置一下解决

```

        public void ConfigureServices(IServiceCollection services)

        {

            // Add framework services.

            services.AddMvc()

                    .AddJsonOptions(op =>

                    {

                        //默认使用帕斯卡命名法(oneTwo) CamelCasePropertyNamesContractResolver

                       //若使用骆驼命名法可使用DefaultContractResolver

                        op.SerializerSettings.ContractResolver =

                       new Newtonsoft.Json.Serialization.DefaultContractResolver();

                        //返回数据中有DateTime类型，自定义格式

                        op.SerializerSettings.DateFormatString = "yyyy-MM-dd HH:mm";

                    });

        }

```

## 视图中输出中文会编码

![图片](https://dn-coding-net-production-pp.qbox.me/22b4f108-2e62-4ead-9752-0b47f37933b4.png)

ConfigureServices方法中配置即可，详情见园长文章 http://www.cnblogs.com/dudu/p/5879913.html

```

            services.Configure<WebEncoderOptions>(options =>

            {

                options.TextEncoderSettings = new TextEncoderSettings(UnicodeRanges.All);

            });

```

## 中文乱码解决



### 控制台乱码

添加：`Console.OutputEncoding = Encoding.Unicode;`

### 网页输出乱码

添加:`context.Response.ContentType = "text/pain;charset=utf-8";`



> 参考评论：http://www.cnblogs.com/wolf-sun/p/6136482.html



## .net core中配置伪静态

> Configure方法中，还是一样的配方

![图片](https://dn-coding-net-production-pp.qbox.me/8e438c38-7a54-472e-8b4f-448ce900ef99.png)



```

         app.UseMvc(routes =>

            {

                routes.MapRoute(

                    name: "index",

                    template: "index.html",

                    defaults: new { controller = "Home", action = "Index" }

                );

                routes.MapRoute(

                    name: "detail",

                    template: "detail/{id}.html",

                    defaults: new { controller = "Home", action = "Detail" }

                );

                routes.MapRoute(

                    name: "add",

                    template: "add.html",

                    defaults: new { controller = "Home", action = "Add" }

                );

                routes.MapRoute(

                    name: "default",

                    template: "{controller=Home}/{action=Index}/{id?}");

            });

```

## 单个文件上传

```

        [HttpPost]

        public IActionResult Upload(IFormFile file)

        {

            string previewPath = "";//加域名什么的

            long size = 0;

            var upFileName = ContentDispositionHeaderValue

                   .Parse(file.ContentDisposition)

                   .FileName

                   .Trim('"');

            var fileName = Guid.NewGuid() + Path.GetExtension(upFileName);

            size += file.Length;

            if (size > UploadMaxLength)

            {

                return Json(new

                {

                    code = 0,

                    msg = "图片太大，不能超过5M"

                });

            }

            previewPath += "/uploads/" + fileName;

            var savePath = _hostingEnv.WebRootPath + @"\uploads\" + fileName;

            var saveDir = _hostingEnv.WebRootPath + @"\uploads\";



            if (!Directory.Exists(saveDir))

            {

                Directory.CreateDirectory(saveDir);

            }

            using (FileStream fs = System.IO.File.Create(savePath))

            {

                file.CopyTo(fs);

                fs.Flush();

            }

            return Json(new

            {

                code = 0,

                msg = "上传成功",

                data = new

                {

                    src = previewPath,

                    title = ""

                }

            });

        }

```

## 返回JSON自定义DateTime类型格式

```

services.AddMvc().AddJsonOptions(op =>

{

    op.SerializerSettings.DateFormatString = "yyyy-MM-dd HH:mm";

});

```



## [FromBody]接口模型验证类型转换的问题



如果模型中存在非空值类型的字段A:`public int 字段A{get;set;}`            

然后向接口提交一个 `{字段A:""} `或者` {字段A:null} `    

提交后会被 ModelState 拦截验证不通过    

目前的解决方法有     

- 修改类型为可空类型  

- 全局设置下序列化忽略null和空字符串，目前 [FromForm] 格式的数据不知道如何处理     

```

 services.AddMvc().AddJsonOptions(op =>

{

    op.SerializerSettings.NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore;

    op.SerializerSettings.MissingMemberHandling = Newtonsoft.Json.MissingMemberHandling.Ignore;

});

```



## .net core 获取IP地址



`request.HttpContext.Connection.RemoteIpAddress`



## .net core 获取请求URL



```

// GetAbsoluteUri(request)

      public string GetAbsoluteUri(HttpRequest request)

        {

            return new StringBuilder()

                .Append(request.Scheme)

                .Append("://")

                .Append(request.Host)

                .Append(request.PathBase)

                .Append(request.Path)

                .Append(request.QueryString)

                .ToString();

        }

```





## .net core 过滤器中获取提交的post数据

1. 文档地址：https://docs.microsoft.com/zh-cn/aspnet/core/mvc/controllers/filters?view=aspnetcore-2.0#action-filters

2. 相关issues：https://github.com/aspnet/Mvc/issues/7251



### .net core 实现一个日志过滤器



```cs



    public class AdminLogAttribute : Attribute, IActionFilter

    {



        public void OnActionExecuting(ActionExecutingContext filterContext)

        {



        }

        public void OnActionExecuted(ActionExecutedContext context)

        {

            //获取提交的参数 context.ActionArguments 



        }



   }

```
