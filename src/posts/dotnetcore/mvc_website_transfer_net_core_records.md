---
title: mvc网站迁移.net core记录
date: 2017-07-25 11:54:00
category:
  - DotNetCore
tag:
  - asp.net mvc
  - .net core
---

## 接口`return Json()`时序列号小写的问题
在Startup.cs-》ConfigureServices方法配置一下解决
```
        public void ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
            services.AddMvc()
                    .AddJsonOptions(op => op.SerializerSettings.ContractResolver =
                                          new Newtonsoft.Json.Serialization.DefaultContractResolver());
        }
```
## 视图中输出中文会乱码
![图片](https://dn-coding-net-production-pp.qbox.me/22b4f108-2e62-4ead-9752-0b47f37933b4.png)
ConfigureServices方法中配置即可，详情见院长文章 http://www.cnblogs.com/dudu/p/5879913.html
```
            services.Configure<WebEncoderOptions>(options =>
            {
                options.TextEncoderSettings = new TextEncoderSettings(UnicodeRanges.All);
            });
```
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
##  core tag标签不解析，无智能提示
> 若_ViewImports.cshtml视图文件中无注入代码则添加注入代码。`@addTagHelper *, Microsoft.AspNetCore.Mvc.TagHelpers`    
> 或者在视图中注入TagHelper：`@addTagHelper *, Microsoft.AspNetCore.Mvc.TagHelpers`    
> 然后，asp-提示出来了，能解析了，也变颜色了~

## asp.net core 禁止视图编译到dll
```
// 生成时会忽略视图的错误
<MvcRazorCompileOnBuild>false</MvcRazorCompileOnBuild>
// 发布时不编译视图到dll
<MvcRazorCompileOnPublish>false</MvcRazorCompileOnPublish>
```

## 自动注入服务
定义接口并继承
```

    public interface IDependency
    {
    }
    /// <summary>
    /// 实现该接口将自动注册到Ioc容器，生命周期为每次请求创建一个实例
    /// </summary>
    public interface IScopeDependency : IDependency
    {
    }
    /// <summary>
    /// 实现该接口将自动注册到Ioc容器，生命周期为单例
    /// </summary>
    public interface ISingletonDependency : IDependency
    {
    }
    /// <summary>
    /// 实现该接口将自动注册到Ioc容器，生命周期为每次创建一个新实例
    /// </summary>
    public interface ITransientDependency : IDependency
    {
    }
    
    public class TestService : IScopeDependency
    {
    }
```
注入
```
        /// <summary>
        /// 注入服务
        /// </summary>
        /// <param name="services"></param>
        /// <returns></returns>
        public static IServiceCollection AddAppServices(this IServiceCollection services)
        {
            //services.AddScoped<Services.User.IUserService, Services.User.UserService>();

            #region 依赖注入
            var baseType = typeof(IDependency);
            var path = AppDomain.CurrentDomain.RelativeSearchPath ?? AppDomain.CurrentDomain.BaseDirectory;
            var getFiles = System.IO.Directory.GetFiles(path, "*.dll");
            var referencedAssemblies = getFiles.Select(Assembly.LoadFrom).ToList();   

            var ss = referencedAssemblies.SelectMany(o => o.GetTypes());

            var types = referencedAssemblies
                .SelectMany(a => a.DefinedTypes)
                .Select(type => type.AsType())
                .Where(x => x != baseType && baseType.IsAssignableFrom(x)).ToList();
            var implementTypes = types.Where(x => x.IsClass).ToList();
            var interfaceTypes = types.Where(x => x.IsInterface).ToList();
            var dependTypes = new Dictionary<string, Type>() { { nameof(IScopeDependency), typeof(IScopeDependency) }, { nameof(ITransientDependency), typeof(ITransientDependency) }, { nameof(ISingletonDependency), typeof(ISingletonDependency) } };
            foreach (var implementType in implementTypes)
            {
                foreach (var dependType in dependTypes)
                {
                    if (dependType.Value.IsAssignableFrom(implementType))
                    {
                        var interfaceType = interfaceTypes.FirstOrDefault(x => x.IsAssignableFrom(implementType) && !x.IsAssignableFrom(dependType.Value));
                        if (interfaceType == null)
                        {
                            interfaceType = implementType;
                        }
                        if (dependType.Key == nameof(IScopeDependency))
                        {
                            services.AddScoped(interfaceType, implementType);
                        }
                    }
                }
            }
            #endregion

            return services;
        }
```
## 自定义模型验证
定义特性标记，在action上使用
```
public class ModelValidAttribute : Attribute, IFilterMetadata
    {
        public bool IgnoreAll { get; set; }
        public List<string> IgnoreAttr { get; set; }
        public ModelValidAttribute() { }
        public ModelValidAttribute(params string[] ignoreAttr)
        {
            IgnoreAttr = ignoreAttr.ToList();
        }
    }
```
验证配置
```
/// <summary>
        /// 自定义模型验证
        /// </summary>
        /// <param name="services"></param>
        /// <returns></returns>
        public static IServiceCollection ConfigureModelValid(this IServiceCollection services)
        {
            services.Configure<ApiBehaviorOptions>(options =>
            {
                options.InvalidModelStateResponseFactory = (context) =>
                {
                    var validItem = context.ActionDescriptor.FilterDescriptors.Where(s => typeof(ModelValidAttribute).IsInstanceOfType(s.Filter)).Select(s => s.Filter as ModelValidAttribute).FirstOrDefault();
                    if (validItem?.IgnoreAll == true)
                    {
                        return null;
                    }
                    var ignoreAttr = validItem?.IgnoreAttr?.Select(s => s.ToLower()).ToList() ?? new List<string>();
                    var errors = (from item in context.ModelState
                                  where item.Value.Errors.Any() && !string.IsNullOrEmpty(item.Value.Errors[0].ErrorMessage) && (ignoreAttr.Contains(item.Key.ToLower()) ? item.Value.Errors.Count(s => s.Exception != null) == 0 : true)
                                  select new { item.Key, Errors = item.Value.Errors }).ToList();
                    if (errors.Count == 0)
                    {
                        return null;
                    }
                    string firstMsg = errors.FirstOrDefault()?.Errors?.FirstOrDefault()?.ErrorMessage;
                    if (string.IsNullOrEmpty(firstMsg) || firstMsg.Contains(", position "))
                    {
                        firstMsg = "参数验证不通过";
                    }
                    return new JsonResult(OperateResult.Error(firstMsg, new { errors = errors }));
                };
            });
            return services;
        }
```

