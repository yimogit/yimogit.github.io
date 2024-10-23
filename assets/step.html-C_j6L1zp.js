import{_ as i}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as e,e as t,o as n}from"./app-DN5ZAMaR.js";const o="/assets/662652-20230821212237082-1445845357-CSGxGp6j.png",a={};function u(s,l){return n(),e("div",null,l[0]||(l[0]=[t('<h2 id="中台框架后端项目-admin-core-的介绍与配置说明" tabindex="-1"><a class="header-anchor" href="#中台框架后端项目-admin-core-的介绍与配置说明"><span>中台框架后端项目 Admin.Core 的介绍与配置说明</span></a></h2><blockquote><p>中台admin是前后端分离权限管理系统，Admin.Core为后端项目，基于.NET 7.0开发。<br> 支持多租户、数据权限、动态 Api、任务调度、OSS 文件上传、滑块拼图验证、多数据库，分布式缓存、分布式事务等</p></blockquote><ul><li><p>接口文档一览 <img src="'+o+'" alt="" loading="lazy"></p></li><li><p>项目地址</p><ul><li>Github https://github.com/zhontai/Admin.Core</li></ul></li><li><p>技术栈</p><ul><li>dotnet7</li><li>FreeSql</li><li>Autofac</li><li>CAP</li><li>Mapster</li></ul></li><li><p>特点</p><ul><li>快速启动，上手简单</li><li>系统模块化</li><li>Swagger的模块化封装</li><li>读写分离</li><li>分库分表</li><li>分布式事务 TCC/ SAGA</li><li>动态API</li><li>系统权限封装基本满足大部分项目</li><li>多租户实现</li></ul></li><li><p>开发环境</p><ul><li>Vs2022</li><li>dotnet7</li></ul></li><li><p>项目结构</p><ul><li>hosts <ul><li><code>ZhonTai.Host</code>:默认启动项目,添加对 ZhonTai.Admin.Dev，模块的引用，并将程序集配置到 assemblyNames</li></ul></li><li>platform <ul><li><code>ZhonTai.Admin</code> 核心服务</li><li><code>ZhonTai.ApiUI</code> 接口文档封装，分模块加载</li><li><code>zhonTai.Common</code> 通用库封装</li><li><code>ZhonTai.DynamicApi</code> 动态WebApi库</li><li><code>ZhonTai.Admin.Dev</code> 代码生成器添加</li></ul></li><li>tests <ul><li><code>ZhonTai.Tests</code> 测试库</li></ul></li><li>modules <ul><li>XX.XX 我准备放自己的模块</li></ul></li></ul></li></ul><h3 id="默认实现功能" tabindex="-1"><a class="header-anchor" href="#默认实现功能"><span>默认实现功能</span></a></h3><ol><li>用户管理：配置用户，查看部门用户列表，支持禁用/启用、重置密码、设置主管、用户可配置多角色、多部门和上级主管。</li><li>角色管理：配置角色，支持角色分组、设置角色菜单和数据权限、批量添加和移除角色员工。</li><li>部门管理：配置部门，支持树形列表展示。</li><li>权限管理：配置分组、菜单、操作、权限点、权限标识，支持树形列表展示。</li><li>租户套餐：配置租户套餐，支持新增/移除套餐企业。</li><li>租户管理：配置租户，新增租户时初始化部门、角色和管理员数据，支持租户配置套餐、禁用/启用功能。</li><li>字典管理：配置字典，查看字典类型和字典数据列表，支持字典类型和字典数据维护。</li><li>任务调度：查看任务和任务日志列表，支持任务启动、执行、暂停等功能。</li><li>缓存管理：缓存列表查询，支持根据缓存键清除缓存</li><li>接口管理：配置接口，支持接口同步功能，用于新增权限点选择接口，支持树形列表展示。</li><li>视图管理：配置视图，支持视图维护功能，用于新增菜单选择视图，支持树形列表展示。</li><li>文件管理：支持文件列表查询、文件上传/下载、查看大图、复制文件地址、删除文件功能。</li><li>登录日志：登录日志列表查询，记录用户登录成功和失败日志。</li><li>操作日志：操作日志列表查询，记录用户操作正常和异常日志。</li></ol><h3 id="框架的使用" tabindex="-1"><a class="header-anchor" href="#框架的使用"><span>框架的使用</span></a></h3><h4 id="_1-从github-克隆-下载项目" tabindex="-1"><a class="header-anchor" href="#_1-从github-克隆-下载项目"><span>1. 从GitHub 克隆/下载项目</span></a></h4><ul><li>后端：<code>git clone https://github.com/zhontai/Admin.Core.git</code></li><li>前端：<code>git clone https://github.com/zhontai/admin.ui.plus.git</code></li></ul><h4 id="_2-后端项目的启动" tabindex="-1"><a class="header-anchor" href="#_2-后端项目的启动"><span>2. 后端项目的启动</span></a></h4><blockquote><p>使用新下的VS2022打开后，默认启动项目 ZhonTai.Host ，直接Ctrl+F5运行即可<br> 系统将会根据实体生成数据库及表，并根据 Configs/dbconfig.json 配置将 initData/*.json 的数据生成到本地Sqlite中<br> (ps:第一次搞dotnet7的项目，vs2019+自己下SDK折腾半天搞不了一点，需要vs2022 17.4+)</p></blockquote><ul><li>官方文档：https://zhontai.net/backend/new-project.html</li></ul><h4 id="_3-配置文件说明" tabindex="-1"><a class="header-anchor" href="#_3-配置文件说明"><span>3. 配置文件说明</span></a></h4><ul><li><p>launchSettings.json</p><ul><li>默认本地启动配置 <ul><li>配置项 <ul><li>运行环境 <ul><li>ASPNETCORE_ENVIRONMENT:Development</li></ul></li><li>启动端口 <ul><li>默认：8000</li><li>优先级低于appconfig.urls的配置</li></ul></li></ul></li></ul></li></ul></li><li><p>appsettings.{Env}.json</p><ul><li>默认的应用配置文件</li><li>配置项 <ul><li>日志等级 <ul><li>默认：Information</li></ul></li><li>跨域 <ul><li>默认：*</li></ul></li><li>CAP配置 <ul><li>默认：未启用</li></ul></li><li>滑动验证码 <ul><li>默认：300s有效期</li><li>是否开启在appconfig.json配置varifyCode.enable</li></ul></li></ul></li></ul></li><li><p>Configs*.{Env}.json</p><ul><li>自定义的应用配置文件</li><li>dbconfig.json <ul><li>数据库配置</li><li>绑定模型 <ul><li>单例：<code>DbConfig</code></li></ul></li><li>配置项 <ul><li>支持类型：type <ul><li>默认：Sqlite MySql = 0, SqlServer = 1, PostgreSQL = 2,Oracle = 3, Sqlite = 4, OdbcOracle = 5,OdbcSqlServer = 6, OdbcMySql = 7,OdbcPostgreSQL = 8, Odbc = 9, OdbcDameng =10, MsAccess = 11, Dameng = 12,OdbcKingbaseES = 13, ShenTong = 14,KingbaseES = 15, Firebird = 16</li></ul></li><li>连接字符串：connectionString <ul><li>默认：admindb.db</li></ul></li><li>同步结构 <ul><li>syncStructure：true <ul><li>默认启用</li><li>分布式部署需要注意关闭</li></ul></li><li>监听同步结构脚本 syncStructureSql：false</li></ul><blockquote><p>将会输出codeFirst执行的脚本 将 assemblyNames 配置的所有实体执行结构移 <code>db.CodeFirst.SyncStructure </code><br> 1.创建临时表<br> 2.插入历史数据，修改字段名称情况注意<br> 3.删除旧表，重命名临时表为新表<br> 生产上该自己执行脚本的还是自己执行</p></blockquote></li><li>同步数据 <ul><li>syncData：true</li><li>sysUpdateData:false <ul><li>同步更新数据</li><li>确定要修改表数据是最新数据再开启，除localdb测试就不要使用</li></ul></li><li>syncDataIncludeTables：[] <ul><li>同步数据包含表，指定表同步，不填同步所有表</li></ul></li><li>syncDataExcludeTables：[] <ul><li>同步数据排除表，指定表不同步</li></ul></li><li>syncDataUser <ul><li>同步数据操作用户</li></ul></li><li>syncDataPath <ul><li>不配置默认为  项目目录/InitData/Admin</li><li>默认会将文件夹下的所有 表名.json 添加到数库中，默认新增所有数据</li><li>如果是租户数据，格式为 表.tenant.json</li></ul></li><li>syncDataCurd：false <ul><li>监听同步数据Curd操作</li><li></li></ul></li></ul><blockquote><p>设置是否将syncDataPath文件夹下的 表名.json 加/修改到数据库中</p></blockquote></li><li>生成数据 <ul><li>generateData：true 默认开启但无效，需要将禁用创建数据库及禁用步：createDb:false &amp;&amp; syncData:false</li><li>加了视图菜单就可以使用这个功能来创建生成默认数据</li></ul></li></ul></li></ul></li></ul></li><li><p>cacheconfig.json</p><ul><li>缓存配置，未绑定模型，redis缓存，限流参数配置</li><li>配置项 <ul><li>支持类型 <ul><li>默认：Memory</li><li>Memory = 0,Redis = 1</li></ul></li><li>限流缓存类型 <ul><li>默认：Memory</li><li>Memory = 0,Redis = 1</li></ul></li><li>Redis配置 <ul><li>127.0.0.1:6379</li></ul></li></ul></li></ul></li><li><p>appconfig.json</p><ul><li>应用配置</li><li>绑定模型 <ul><li>单例: <code>AppConfig</code></li></ul></li><li>配置项 <ul><li>appType 应用程序类型 <ul><li>默认：Controllers</li><li>Controllers ControllersWithViews MVC</li></ul></li><li>urls 启动地址 <ul><li>http://*:8000</li></ul></li><li>corUrls 跨域 <ul><li>[]</li></ul></li><li>assemblyNames 程序集名称 <ul><li>ZhonTai.Admin</li><li>Mapster自动注册程序集</li></ul></li><li>tenantc租户 <ul><li>true</li></ul></li><li>distributeKey 分布式事务唯一标识 <ul><li>为空则不生成分布式事务表</li></ul></li><li>validate 验证开关 <ul><li>登录,接口权限,数据权限验证</li></ul></li><li>swagger Swagger文档s <ul><li>http://localhost:8000/admin/swagger</li></ul></li><li>apiUI 接口文档地址 <ul><li>http://localhost:8000/admin/index.html</li></ul></li><li>MiniProfiler 性能分析器 <ul><li>false</li></ul></li><li>identityServer 统一认证授权服务器 <ul><li>false</li></ul></li><li>aop 面向切面编程s <ul><li>开启事务</li></ul></li><li>log 数据库日志 <ul><li>操作日志</li></ul></li><li>rateLimit 限流开关 <ul><li>false</li></ul></li><li>varifyCode 登录验证码 <ul><li>true</li></ul></li><li>defaultPassword 默认密码 <ul><li>111111</li></ul></li><li>dynamicApi 动态api <ul><li>结果格式化</li></ul></li><li>passwordHasher 标准标识密码哈希 <ul><li>启用后相同密码加密后各不相同</li></ul></li><li>maxRequestBodySize 最大请求大小 <ul><li>104857600</li></ul></li><li>healthChecks 健康检查 <ul><li>enable:true 启用</li><li>path:/admin/health</li></ul></li></ul></li></ul></li><li><p>jwtconfig.json</p><ul><li>JWT配置</li><li>绑定模型 <ul><li>单例：<code>JwtConfig</code></li></ul></li><li>配置项 <ul><li>issuer 发行者</li><li>audience 订阅者</li><li>securityKey 密钥</li><li>expires 有效期(分钟) 120</li><li>refreshExpires 刷新有效期(分钟) 1440</li></ul></li></ul></li><li><p>ossconfig.json</p><ul><li>本地上传配置</li><li>绑定模型 <ul><li><code>IOptions&lt;OSSConfig&gt;</code></li></ul></li><li>OSS配置 <ul><li>Minio</li><li>阿里云</li><li>腾讯云</li><li>七牛</li><li>华为云</li></ul></li></ul></li><li><p>uploadconfig.json</p><ul><li>上传配置</li><li>绑定模型 <ul><li><code>IOptions&lt;UploadConfig&gt;</code></li></ul></li></ul></li><li><p>ratelimitconfig.json</p><ul><li>限流配置</li><li>绑定模型 <ul><li><code>IOptions</code></li></ul></li><li>支持类型 <ul><li>IP限流 <ul><li>默认未启用</li><li>需要在appconfig.json中配置rateLimit:true生效</li><li>使用Redis实现限流</li><li>需要在cacheconfig.json中配置typeRateLimit</li></ul></li></ul></li></ul></li><li><p>InitData\\模块*.{tenant}.json</p><ul><li>默认初始化数据</li></ul></li></ul><h4 id="_4-代码生成" tabindex="-1"><a class="header-anchor" href="#_4-代码生成"><span>4. 代码生成</span></a></h4><ul><li>官方默认模板生成： <ul><li><code>dotnet new install ZhonTai.Template</code></li><li><code>dotnet new MyApp -n MyCompanyName.MyProjectName</code></li></ul></li><li>第三方代码生成器： <ul><li>后端：https://github.com/share36/Admin.Core.Dev</li><li>前端：https://github.com/share36/admin.ui.plus.dev</li></ul></li></ul><p>前端及代码生成见下篇</p><h3 id="写在最后" tabindex="-1"><a class="header-anchor" href="#写在最后"><span>写在最后</span></a></h3><p>文章的起因是想找个不错的框架用来搞个自己用的系统，找了几个dotnet+vue的框架，zhontai的这个是看到上手最容易，前后台的代码也没有封装得太深，二开也很方便，看着用着都挺舒服的。 唯一的不足就是文档了，一点资料都找不到，就只能一点点看代码，然后边看边记录，以备后用，又想着既然都写了，那就再整理一下了，顺便分享出来咯，希望能够对后面使用框架的有所帮助。</p>',18)]))}const p=i(a,[["render",u],["__file","step.html.vue"]]),d=JSON.parse('{"path":"/posts/zhontai/step.html","title":"中台框架后端项目 Admin.Core 的介绍与配置说明","lang":"zh-CN","frontmatter":{"title":"中台框架后端项目 Admin.Core 的介绍与配置说明","icon":"pen-to-square","date":"2024-10-23T00:00:00.000Z","category":["中台Admin.Core"],"tag":["Admin.Core","ZhonTai",".Net Core"],"star":true,"sticky":true,"description":"中台框架后端项目 Admin.Core 的介绍与配置说明 中台admin是前后端分离权限管理系统，Admin.Core为后端项目，基于.NET 7.0开发。 支持多租户、数据权限、动态 Api、任务调度、OSS 文件上传、滑块拼图验证、多数据库，分布式缓存、分布式事务等 接口文档一览 项目地址 Github https://github.com/zho...","head":[["meta",{"property":"og:url","content":"https://yimogit.github.io/posts/zhontai/step.html"}],["meta",{"property":"og:site_name","content":"易墨的个人博客"}],["meta",{"property":"og:title","content":"中台框架后端项目 Admin.Core 的介绍与配置说明"}],["meta",{"property":"og:description","content":"中台框架后端项目 Admin.Core 的介绍与配置说明 中台admin是前后端分离权限管理系统，Admin.Core为后端项目，基于.NET 7.0开发。 支持多租户、数据权限、动态 Api、任务调度、OSS 文件上传、滑块拼图验证、多数据库，分布式缓存、分布式事务等 接口文档一览 项目地址 Github https://github.com/zho..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-10-23T10:54:41.000Z"}],["meta",{"property":"article:tag","content":"Admin.Core"}],["meta",{"property":"article:tag","content":"ZhonTai"}],["meta",{"property":"article:tag","content":".Net Core"}],["meta",{"property":"article:published_time","content":"2024-10-23T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-10-23T10:54:41.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"中台框架后端项目 Admin.Core 的介绍与配置说明\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-10-23T00:00:00.000Z\\",\\"dateModified\\":\\"2024-10-23T10:54:41.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"易墨\\",\\"url\\":\\"https://yimogit.github.io\\"}]}"]]},"headers":[{"level":2,"title":"中台框架后端项目 Admin.Core 的介绍与配置说明","slug":"中台框架后端项目-admin-core-的介绍与配置说明","link":"#中台框架后端项目-admin-core-的介绍与配置说明","children":[{"level":3,"title":"默认实现功能","slug":"默认实现功能","link":"#默认实现功能","children":[]},{"level":3,"title":"框架的使用","slug":"框架的使用","link":"#框架的使用","children":[]},{"level":3,"title":"写在最后","slug":"写在最后","link":"#写在最后","children":[]}]}],"git":{"createdTime":1729680881000,"updatedTime":1729680881000,"contributors":[{"name":"yimo","email":"yimo@wikiglobal.com","commits":1}]},"readingTime":{"minutes":6.66,"words":1999},"filePathRelative":"posts/zhontai/step.md","localizedDate":"2024年10月23日","excerpt":"<h2>中台框架后端项目 Admin.Core 的介绍与配置说明</h2>\\n<blockquote>\\n<p>中台admin是前后端分离权限管理系统，Admin.Core为后端项目，基于.NET 7.0开发。<br>\\n支持多租户、数据权限、动态 Api、任务调度、OSS 文件上传、滑块拼图验证、多数据库，分布式缓存、分布式事务等</p>\\n</blockquote>\\n<ul>\\n<li>\\n<p>接口文档一览\\n</p>\\n</li>\\n<li>\\n<p>项目地址</p>\\n<ul>\\n<li>Github https://github.com/zhontai/Admin.Core</li>\\n</ul>\\n</li>\\n<li>\\n<p>技术栈</p>\\n<ul>\\n<li>dotnet7</li>\\n<li>FreeSql</li>\\n<li>Autofac</li>\\n<li>CAP</li>\\n<li>Mapster</li>\\n</ul>\\n</li>\\n<li>\\n<p>特点</p>\\n<ul>\\n<li>快速启动，上手简单</li>\\n<li>系统模块化</li>\\n<li>Swagger的模块化封装</li>\\n<li>读写分离</li>\\n<li>分库分表</li>\\n<li>分布式事务 TCC/ SAGA</li>\\n<li>动态API</li>\\n<li>系统权限封装基本满足大部分项目</li>\\n<li>多租户实现</li>\\n</ul>\\n</li>\\n<li>\\n<p>开发环境</p>\\n<ul>\\n<li>Vs2022</li>\\n<li>dotnet7</li>\\n</ul>\\n</li>\\n<li>\\n<p>项目结构</p>\\n<ul>\\n<li>hosts\\n<ul>\\n<li><code>ZhonTai.Host</code>:默认启动项目,添加对 ZhonTai.Admin.Dev，模块的引用，并将程序集配置到 assemblyNames</li>\\n</ul>\\n</li>\\n<li>platform\\n<ul>\\n<li><code>ZhonTai.Admin</code> 核心服务</li>\\n<li><code>ZhonTai.ApiUI</code> 接口文档封装，分模块加载</li>\\n<li><code>zhonTai.Common</code> 通用库封装</li>\\n<li><code>ZhonTai.DynamicApi</code> 动态WebApi库</li>\\n<li><code>ZhonTai.Admin.Dev</code> 代码生成器添加</li>\\n</ul>\\n</li>\\n<li>tests\\n<ul>\\n<li><code>ZhonTai.Tests</code> 测试库</li>\\n</ul>\\n</li>\\n<li>modules\\n<ul>\\n<li>XX.XX 我准备放自己的模块</li>\\n</ul>\\n</li>\\n</ul>\\n</li>\\n</ul>","autoDesc":true}');export{p as comp,d as data};
