---
title: asp.net core权限模块的快速构建
date: 2017-09-28 15:26:00
category:
  - DotNetCore
---

> 大部分系统都会有权限模块，别人家系统的权限怎么生成的我不知道，我只知道这样做是可以并且挺好的。

> 文章中只对`asp.net core`的部分代码进行说明 呃 记录~，mvc版本自行前往仓库查阅

> 代码中的一些特性标记后面列出,或前往仓库查看~



<!--more-->



## 1.根据特性标记生成模块权限

> 先上效果图，感兴趣的前往[Demo仓库地址](https://coding.net/u/yimocoding/p/WeDemo/git/tree/MvcPermission/CoreDemo)，不感兴趣的关闭页面吧~



> ![图片](https://dn-coding-net-production-pp.qbox.me/c9dfaf20-8509-4702-8e05-44acaf616bb6.gif)



### [模型定义](https://coding.net/u/yimocoding/p/WeDemo/git/blob/MvcPermission/CoreDemo/Permissions/ModuleMenu.cs)

> Demo中菜单分为三级，首先使用枚举定义模块,FirstModuleMenu为一级菜单，SecondModuleMenu为二级菜单，三级菜单在action方法上由`PermissionDescription`标识并`IsMenu=true`的方法

> 若是页面功能则为`IsMenu=false`

> 可使用的特性标记还包含以下几种，并且权限验证时依次递增：

- 免登录：`AllowAnonymous`

- 管理员默认权限： `NonePermissionAttribute`

- 指定权限： `PermissionDescriptionAttribute`

- 依赖权限(包含有这些的任一权限都将获得授权)： `ParentPermissionAttribute`

``` csharp

    //一级菜单

    public class FirstModuleMenu

    {

        public const string 系统管理 = "系统|icon-setting";

        public const string 用户管理 = "用户|icon-user";

    }

    //二级菜单

    public enum SecondModuleMenu

    {

        [Description(FirstModuleMenu.系统管理)]

        系统设置,



        [Description(FirstModuleMenu.用户管理)]

        用户管理,

    }

    //三级菜单

    [PermissionDescription(SecondModuleMenu.系统设置, "站点设置", true)]

    public ActionResult SiteSetting()

    {

        return Content("站点设置 System/SiteSetting");

    }

```



### 生成权限模型集合

定义权限模型 [SysModule.cs](https://coding.net/u/yimocoding/p/WeDemo/git/blob/MvcPermission/CoreDemo/Models/AdminSysModule.cs)

调用[初始化权限方法](https://coding.net/u/yimocoding/p/WeDemo/git/blob/MvcPermission/CoreDemo/Services/ServiceFactory.cs)

``` csharp

    private static List<SysModule> _AllAdminModule { get; set; } = new List<SysModule>();

    /// <summary>

    /// 初始化权限

    /// </summary>

    public static void InitPermission()

    {

        var result = new List<SysModule>();

        #region 通过反射读取Action方法写入对应权限至集合

        //读取CoreDemo程序集中集成自AdminController的控制器

        var types = Assembly.Load("CoreDemo").GetTypes().Where(e => e.BaseType.Name == nameof(AdminController));

        var area = "";//默认未使用区域

        var now = DateTime.Now;

        var i = 1;

        foreach (var type in types)

        {

            //获取所有action方法

            var members = type.GetMethods().Where(e => e.ReturnType.Name == nameof(ActionResult) || e.ReturnType.Name == nameof(IActionResult));

            foreach (var member in members)

            {

                //获取功能列表

                var attrs = member.GetCustomAttributes(typeof(PermissionDescriptionAttribute), true);

                if (attrs.Length == 0)

                    continue;

                //功能对应的二级菜单

                var parentMenuEnum = (attrs[0] as PermissionDescriptionAttribute).ParentMenu;

                var parentMenuName = parentMenuEnum.ToString();

                //功能对应的一级菜单 名称|icon类名

                var enumArry = parentMenuEnum.GetEnumDescription().Split('|');

                var mainMenuName = enumArry[0];

                var existMainMenu = result.Where(e => e.ModuleName == mainMenuName).FirstOrDefault();

                if (existMainMenu == null)

                {

                    var mainMenu = new SysModule()

                    {

                        Id = i,

                        ParentId = 0,

                        ModuleName = mainMenuName,

                        Icon = enumArry[1] ?? "",

                        Area = area,

                        Controller=string.Empty,

                        Action=string.Empty,

                        IsMenu = true,

                        IsVisible = true,

                        Remark = string.Empty,

                        DisplayOrder = i,

                        CreateTime = now

                    };

                    i++;

                    existMainMenu = mainMenu;

                    existMainMenu.Children = new List<SysModule>();

                    //添加一级菜单

                    result.Add(existMainMenu);

                }

                var existParentMenu = existMainMenu.Children.Where(e => e.ModuleName == parentMenuName).FirstOrDefault();

                if (existParentMenu == null)

                {

                    var parentMenu = new SysModule()

                    {

                        Id = i,

                        ParentId = existMainMenu.Id,

                        ModuleName = parentMenuName,

                        Icon=string.Empty,

                        Area = area,

                        Controller = string.Empty,

                        Action = string.Empty,

                        IsMenu = enumArry.Length != 3 || bool.Parse(enumArry[2]),

                        IsVisible = true,

                        DisplayOrder = i,

                        CreateTime = now,

                        Children = new List<SysModule>()

                    };

                    i++;

                    existParentMenu = parentMenu;

                    existParentMenu.Children = new List<SysModule>();

                    existMainMenu.Children.Add(existParentMenu);

                    //添加二级菜单

                    result.Add(existParentMenu);

                }

                var menu = new SysModule()

                {

                    Id = i,

                    ParentId = existParentMenu.Id,

                    Area = area,

                    Action = member.Name,

                    DisplayOrder = i,

                    CreateTime = now,

                    Controller = member.DeclaringType.Name.Substring(0, member.DeclaringType.Name.Length - 10),

                    IsMenu = (attrs[0] as PermissionDescriptionAttribute).IsMenu,

                    Children = new List<SysModule>(),

                };

                if (menu.IsMenu)

                    menu.IsVisible = true;

                menu.ModuleName = (attrs[0] as PermissionDescriptionAttribute).FuncName;

                i++;

                existParentMenu.Children.Add(menu);

                result.Add(menu);

            }



        }

        #endregion

        //todo 添加到数据库

        _AllAdminModule = result;

    }

```





## 2.使用过滤器拦截请求进行验证

> 新建特性标记 `AdminAuthorizeAttribute` 继承`Attribute`类以及实现`IAuthorizationFilter`接口的`OnAuthorization`方法

不多说，上图



![图片](https://dn-coding-net-production-pp.qbox.me/b24f1b89-5a6e-4511-9454-8e7997c263ae.png)



不多说，上代码↓_↓

### 权限验证过滤器：AdminAuthorizeAttribute

``` csharp

    //后台权限验证

    public class AdminAuthorizeAttribute : Attribute,IAuthorizationFilter

    {



        public void OnAuthorization(AuthorizationFilterContext filterContext)

        {

            //匿名标识 无需验证

            if (filterContext.Filters.Any(e => (e as AllowAnonymous) != null))

                return;

            var adminInfo = GlobalContext.AdminInfo;//此处应为获取的登录用户

            if (adminInfo == null)

            {

                if(filterContext.HttpContext.Request.Headers["X-Requested-With"] == "XMLHttpRequest")

                {

                    filterContext.Result = new JsonResult("未登录");

                }

                else

                {

                    filterContext.Result =new ContentResult() { Content = "未登录" };

                }

                return;

            }

            //对应action方法或者Controller上若存在NonePermissionAttribute标识，即表示为管理员的默认权限,只要登录就有权限

            var isNone = filterContext.Filters.Any(e => (e as NonePermissionAttribute) != null);

            if (isNone)

                return;



            //获取请求的区域，控制器，action名称

            var area = filterContext.RouteData.DataTokens["area"]?.ToString();

            var controller = filterContext.RouteData.Values["controller"]?.ToString();

            var action = filterContext.RouteData.Values["action"]?.ToString();

            var isPermit = false;

            //校验权限

            isPermit = ServiceFactory.CheckAdminPermit(adminInfo.Id, area, controller, action);

            if (isPermit)

                return;

            //此action方法的父辈权限判断，只要有此action对应的父辈权限，皆有权限访问

            var pAttrs = filterContext.Filters.Where(e => (e as ParentPermissionAttribute) != null).ToList();

            if (pAttrs.Count > 0)

            {

                foreach (ParentPermissionAttribute pattr in pAttrs)

                {

                    if (!string.IsNullOrEmpty(pattr.Area))

                        area = pattr.Area;

                    isPermit = ServiceFactory.CheckAdminPermit(adminInfo.Id, area, pattr.Controller, pattr.Action);

                    if (isPermit)

                        return;

                }

            }

            if (!isPermit)

            {

                filterContext.Result = new ContentResult() { Content = "无权限访问" };

                return;

            }

        }



    }

```



### 自定义特性标记，用于权限校验

~~此处的自定义的特性标记不能继承`Attribute`，因无法在AdminAuthorizeAttribute中的上下文`filterContext.Filters`中获取到特性标记(不知道咋取特性标记，所以用这种方式代替，也更为简单 冏)~~

!!!!!!!!!修改： 之前脑袋没有转过弯来，要使过滤器上下文的Filters中发现自定义过滤器需要继承 `Attribute, IFilterMetadata`

``` csharp

    /// <summary>

    /// 管理员的默认权限

    /// </summary>

    public class NonePermissionAttribute : Attribute, IFilterMetadata{}



    /// <summary>

    /// 匿名验证

    /// </summary>

    public class AllowAnonymous : Attribute, IFilterMetadata{}



    /// <summary>

    /// 长辈权限

    /// </summary>

    [AttributeUsage(AttributeTargets.Method, AllowMultiple = true, Inherited = true)]

    public class ParentPermissionAttribute : Attribute, IFilterMetadata

    {

        /// <summary>

        /// 区域

        /// </summary>

        public string Area { get; set; }

        /// <summary>

        /// 控制器

        /// </summary>

        public string Controller { get; set; }

        /// <summary>

        /// Action名称

        /// </summary>

        public string Action { get; set; }



        public ParentPermissionAttribute(string area, string controller, string action)

        {

            this.Area = area;

            this.Controller = controller;

            this.Action = action;

        }



        public ParentPermissionAttribute(string controller, string action)

        {

            this.Controller = controller;

            this.Action = action;

        }

    }

```



> 若将代码全部贴出，有点略显多余，故，只贴出了部分核心代码.其他一些模型，扩展 请直奔[仓库地址](https://coding.net/u/yimocoding/p/WeDemo/git/tree/MvcPermission/CoreDemo)...

> 或使用git命令克隆`MvcPermission`分支到MvcPermission文件夹：`git clone https://git.coding.net/yimocoding/WeDemo.git -b MvcPermission`



## 补充

- 2017-09-29

    突然灵光一现，将文中的`ResultFilterAttribute`特性标记替换为`Attribute, IFilterMetadata` ，果然可以~

    故得出：实现了`IFilterMetadata`的特性标记能够在过滤器的上下文中获取到。
