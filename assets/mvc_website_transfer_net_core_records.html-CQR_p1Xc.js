import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as e,g as a,o as i}from"./app-_tngh30b.js";const l={};function p(r,s){return i(),e("div",null,s[0]||(s[0]=[a(`<h2 id="接口return-json-时序列号小写的问题" tabindex="-1"><a class="header-anchor" href="#接口return-json-时序列号小写的问题"><span>接口<code>return Json()</code>时序列号小写的问题</span></a></h2><p>在Startup.cs-》ConfigureServices方法配置一下解决</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>        public void ConfigureServices(IServiceCollection services)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            // Add framework services.</span></span>
<span class="line"><span>            services.AddMvc()</span></span>
<span class="line"><span>                    .AddJsonOptions(op =&gt; op.SerializerSettings.ContractResolver =</span></span>
<span class="line"><span>                                          new Newtonsoft.Json.Serialization.DefaultContractResolver());</span></span>
<span class="line"><span>        }</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="视图中输出中文会乱码" tabindex="-1"><a class="header-anchor" href="#视图中输出中文会乱码"><span>视图中输出中文会乱码</span></a></h2><p><img src="https://dn-coding-net-production-pp.qbox.me/22b4f108-2e62-4ead-9752-0b47f37933b4.png" alt="图片" loading="lazy"> ConfigureServices方法中配置即可，详情见院长文章 http://www.cnblogs.com/dudu/p/5879913.html</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>            services.Configure&lt;WebEncoderOptions&gt;(options =&gt;</span></span>
<span class="line"><span>            {</span></span>
<span class="line"><span>                options.TextEncoderSettings = new TextEncoderSettings(UnicodeRanges.All);</span></span>
<span class="line"><span>            });</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="net-core中配置伪静态" tabindex="-1"><a class="header-anchor" href="#net-core中配置伪静态"><span>.net core中配置伪静态</span></a></h2><blockquote><p>Configure方法中，还是一样的配方 <img src="https://dn-coding-net-production-pp.qbox.me/8e438c38-7a54-472e-8b4f-448ce900ef99.png" alt="图片" loading="lazy"></p></blockquote><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>         app.UseMvc(routes =&gt;</span></span>
<span class="line"><span>            {</span></span>
<span class="line"><span>                routes.MapRoute(</span></span>
<span class="line"><span>                    name: &quot;index&quot;,</span></span>
<span class="line"><span>                    template: &quot;index.html&quot;,</span></span>
<span class="line"><span>                    defaults: new { controller = &quot;Home&quot;, action = &quot;Index&quot; }</span></span>
<span class="line"><span>                );</span></span>
<span class="line"><span>                routes.MapRoute(</span></span>
<span class="line"><span>                    name: &quot;detail&quot;,</span></span>
<span class="line"><span>                    template: &quot;detail/{id}.html&quot;,</span></span>
<span class="line"><span>                    defaults: new { controller = &quot;Home&quot;, action = &quot;Detail&quot; }</span></span>
<span class="line"><span>                );</span></span>
<span class="line"><span>                routes.MapRoute(</span></span>
<span class="line"><span>                    name: &quot;add&quot;,</span></span>
<span class="line"><span>                    template: &quot;add.html&quot;,</span></span>
<span class="line"><span>                    defaults: new { controller = &quot;Home&quot;, action = &quot;Add&quot; }</span></span>
<span class="line"><span>                );</span></span>
<span class="line"><span>                routes.MapRoute(</span></span>
<span class="line"><span>                    name: &quot;default&quot;,</span></span>
<span class="line"><span>                    template: &quot;{controller=Home}/{action=Index}/{id?}&quot;);</span></span>
<span class="line"><span>            });</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="单个文件上传" tabindex="-1"><a class="header-anchor" href="#单个文件上传"><span>单个文件上传</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>        [HttpPost]</span></span>
<span class="line"><span>        public IActionResult Upload(IFormFile file)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            string previewPath = &quot;&quot;;//加域名什么的</span></span>
<span class="line"><span>            long size = 0;</span></span>
<span class="line"><span>            var upFileName = ContentDispositionHeaderValue</span></span>
<span class="line"><span>                   .Parse(file.ContentDisposition)</span></span>
<span class="line"><span>                   .FileName</span></span>
<span class="line"><span>                   .Trim(&#39;&quot;&#39;);</span></span>
<span class="line"><span>            var fileName = Guid.NewGuid() + Path.GetExtension(upFileName);</span></span>
<span class="line"><span>            size += file.Length;</span></span>
<span class="line"><span>            if (size &gt; UploadMaxLength)</span></span>
<span class="line"><span>            {</span></span>
<span class="line"><span>                return Json(new</span></span>
<span class="line"><span>                {</span></span>
<span class="line"><span>                    code = 0,</span></span>
<span class="line"><span>                    msg = &quot;图片太大，不能超过5M&quot;</span></span>
<span class="line"><span>                });</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            previewPath += &quot;/uploads/&quot; + fileName;</span></span>
<span class="line"><span>            var savePath = _hostingEnv.WebRootPath + @&quot;\\uploads\\&quot; + fileName;</span></span>
<span class="line"><span>            var saveDir = _hostingEnv.WebRootPath + @&quot;\\uploads\\&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            if (!Directory.Exists(saveDir))</span></span>
<span class="line"><span>            {</span></span>
<span class="line"><span>                Directory.CreateDirectory(saveDir);</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            using (FileStream fs = System.IO.File.Create(savePath))</span></span>
<span class="line"><span>            {</span></span>
<span class="line"><span>                file.CopyTo(fs);</span></span>
<span class="line"><span>                fs.Flush();</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            return Json(new</span></span>
<span class="line"><span>            {</span></span>
<span class="line"><span>                code = 0,</span></span>
<span class="line"><span>                msg = &quot;上传成功&quot;,</span></span>
<span class="line"><span>                data = new</span></span>
<span class="line"><span>                {</span></span>
<span class="line"><span>                    src = previewPath,</span></span>
<span class="line"><span>                    title = &quot;&quot;</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            });</span></span>
<span class="line"><span>        }</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="core-tag标签不解析-无智能提示" tabindex="-1"><a class="header-anchor" href="#core-tag标签不解析-无智能提示"><span>core tag标签不解析，无智能提示</span></a></h2><blockquote><p>若_ViewImports.cshtml视图文件中无注入代码则添加注入代码。<code>@addTagHelper *, Microsoft.AspNetCore.Mvc.TagHelpers</code><br> 或者在视图中注入TagHelper：<code>@addTagHelper *, Microsoft.AspNetCore.Mvc.TagHelpers</code><br> 然后，asp-提示出来了，能解析了，也变颜色了~</p></blockquote><h2 id="asp-net-core-禁止视图编译到dll" tabindex="-1"><a class="header-anchor" href="#asp-net-core-禁止视图编译到dll"><span>asp.net core 禁止视图编译到dll</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>// 生成时会忽略视图的错误</span></span>
<span class="line"><span>&lt;MvcRazorCompileOnBuild&gt;false&lt;/MvcRazorCompileOnBuild&gt;</span></span>
<span class="line"><span>// 发布时不编译视图到dll</span></span>
<span class="line"><span>&lt;MvcRazorCompileOnPublish&gt;false&lt;/MvcRazorCompileOnPublish&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="自动注入服务" tabindex="-1"><a class="header-anchor" href="#自动注入服务"><span>自动注入服务</span></a></h2><p>定义接口并继承</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span></span></span>
<span class="line"><span>    public interface IDependency</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    /// &lt;summary&gt;</span></span>
<span class="line"><span>    /// 实现该接口将自动注册到Ioc容器，生命周期为每次请求创建一个实例</span></span>
<span class="line"><span>    /// &lt;/summary&gt;</span></span>
<span class="line"><span>    public interface IScopeDependency : IDependency</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    /// &lt;summary&gt;</span></span>
<span class="line"><span>    /// 实现该接口将自动注册到Ioc容器，生命周期为单例</span></span>
<span class="line"><span>    /// &lt;/summary&gt;</span></span>
<span class="line"><span>    public interface ISingletonDependency : IDependency</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    /// &lt;summary&gt;</span></span>
<span class="line"><span>    /// 实现该接口将自动注册到Ioc容器，生命周期为每次创建一个新实例</span></span>
<span class="line"><span>    /// &lt;/summary&gt;</span></span>
<span class="line"><span>    public interface ITransientDependency : IDependency</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    public class TestService : IScopeDependency</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>    }</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注入</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>        /// &lt;summary&gt;</span></span>
<span class="line"><span>        /// 注入服务</span></span>
<span class="line"><span>        /// &lt;/summary&gt;</span></span>
<span class="line"><span>        /// &lt;param name=&quot;services&quot;&gt;&lt;/param&gt;</span></span>
<span class="line"><span>        /// &lt;returns&gt;&lt;/returns&gt;</span></span>
<span class="line"><span>        public static IServiceCollection AddAppServices(this IServiceCollection services)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            //services.AddScoped&lt;Services.User.IUserService, Services.User.UserService&gt;();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            #region 依赖注入</span></span>
<span class="line"><span>            var baseType = typeof(IDependency);</span></span>
<span class="line"><span>            var path = AppDomain.CurrentDomain.RelativeSearchPath ?? AppDomain.CurrentDomain.BaseDirectory;</span></span>
<span class="line"><span>            var getFiles = System.IO.Directory.GetFiles(path, &quot;*.dll&quot;);</span></span>
<span class="line"><span>            var referencedAssemblies = getFiles.Select(Assembly.LoadFrom).ToList();   </span></span>
<span class="line"><span></span></span>
<span class="line"><span>            var ss = referencedAssemblies.SelectMany(o =&gt; o.GetTypes());</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            var types = referencedAssemblies</span></span>
<span class="line"><span>                .SelectMany(a =&gt; a.DefinedTypes)</span></span>
<span class="line"><span>                .Select(type =&gt; type.AsType())</span></span>
<span class="line"><span>                .Where(x =&gt; x != baseType &amp;&amp; baseType.IsAssignableFrom(x)).ToList();</span></span>
<span class="line"><span>            var implementTypes = types.Where(x =&gt; x.IsClass).ToList();</span></span>
<span class="line"><span>            var interfaceTypes = types.Where(x =&gt; x.IsInterface).ToList();</span></span>
<span class="line"><span>            var dependTypes = new Dictionary&lt;string, Type&gt;() { { nameof(IScopeDependency), typeof(IScopeDependency) }, { nameof(ITransientDependency), typeof(ITransientDependency) }, { nameof(ISingletonDependency), typeof(ISingletonDependency) } };</span></span>
<span class="line"><span>            foreach (var implementType in implementTypes)</span></span>
<span class="line"><span>            {</span></span>
<span class="line"><span>                foreach (var dependType in dependTypes)</span></span>
<span class="line"><span>                {</span></span>
<span class="line"><span>                    if (dependType.Value.IsAssignableFrom(implementType))</span></span>
<span class="line"><span>                    {</span></span>
<span class="line"><span>                        var interfaceType = interfaceTypes.FirstOrDefault(x =&gt; x.IsAssignableFrom(implementType) &amp;&amp; !x.IsAssignableFrom(dependType.Value));</span></span>
<span class="line"><span>                        if (interfaceType == null)</span></span>
<span class="line"><span>                        {</span></span>
<span class="line"><span>                            interfaceType = implementType;</span></span>
<span class="line"><span>                        }</span></span>
<span class="line"><span>                        if (dependType.Key == nameof(IScopeDependency))</span></span>
<span class="line"><span>                        {</span></span>
<span class="line"><span>                            services.AddScoped(interfaceType, implementType);</span></span>
<span class="line"><span>                        }</span></span>
<span class="line"><span>                    }</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            #endregion</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            return services;</span></span>
<span class="line"><span>        }</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="自定义模型验证" tabindex="-1"><a class="header-anchor" href="#自定义模型验证"><span>自定义模型验证</span></a></h2><p>定义特性标记，在action上使用</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>public class ModelValidAttribute : Attribute, IFilterMetadata</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        public bool IgnoreAll { get; set; }</span></span>
<span class="line"><span>        public List&lt;string&gt; IgnoreAttr { get; set; }</span></span>
<span class="line"><span>        public ModelValidAttribute() { }</span></span>
<span class="line"><span>        public ModelValidAttribute(params string[] ignoreAttr)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            IgnoreAttr = ignoreAttr.ToList();</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>验证配置</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>/// &lt;summary&gt;</span></span>
<span class="line"><span>        /// 自定义模型验证</span></span>
<span class="line"><span>        /// &lt;/summary&gt;</span></span>
<span class="line"><span>        /// &lt;param name=&quot;services&quot;&gt;&lt;/param&gt;</span></span>
<span class="line"><span>        /// &lt;returns&gt;&lt;/returns&gt;</span></span>
<span class="line"><span>        public static IServiceCollection ConfigureModelValid(this IServiceCollection services)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            services.Configure&lt;ApiBehaviorOptions&gt;(options =&gt;</span></span>
<span class="line"><span>            {</span></span>
<span class="line"><span>                options.InvalidModelStateResponseFactory = (context) =&gt;</span></span>
<span class="line"><span>                {</span></span>
<span class="line"><span>                    var validItem = context.ActionDescriptor.FilterDescriptors.Where(s =&gt; typeof(ModelValidAttribute).IsInstanceOfType(s.Filter)).Select(s =&gt; s.Filter as ModelValidAttribute).FirstOrDefault();</span></span>
<span class="line"><span>                    if (validItem?.IgnoreAll == true)</span></span>
<span class="line"><span>                    {</span></span>
<span class="line"><span>                        return null;</span></span>
<span class="line"><span>                    }</span></span>
<span class="line"><span>                    var ignoreAttr = validItem?.IgnoreAttr?.Select(s =&gt; s.ToLower()).ToList() ?? new List&lt;string&gt;();</span></span>
<span class="line"><span>                    var errors = (from item in context.ModelState</span></span>
<span class="line"><span>                                  where item.Value.Errors.Any() &amp;&amp; !string.IsNullOrEmpty(item.Value.Errors[0].ErrorMessage) &amp;&amp; (ignoreAttr.Contains(item.Key.ToLower()) ? item.Value.Errors.Count(s =&gt; s.Exception != null) == 0 : true)</span></span>
<span class="line"><span>                                  select new { item.Key, Errors = item.Value.Errors }).ToList();</span></span>
<span class="line"><span>                    if (errors.Count == 0)</span></span>
<span class="line"><span>                    {</span></span>
<span class="line"><span>                        return null;</span></span>
<span class="line"><span>                    }</span></span>
<span class="line"><span>                    string firstMsg = errors.FirstOrDefault()?.Errors?.FirstOrDefault()?.ErrorMessage;</span></span>
<span class="line"><span>                    if (string.IsNullOrEmpty(firstMsg) || firstMsg.Contains(&quot;, position &quot;))</span></span>
<span class="line"><span>                    {</span></span>
<span class="line"><span>                        firstMsg = &quot;参数验证不通过&quot;;</span></span>
<span class="line"><span>                    }</span></span>
<span class="line"><span>                    return new JsonResult(OperateResult.Error(firstMsg, new { errors = errors }));</span></span>
<span class="line"><span>                };</span></span>
<span class="line"><span>            });</span></span>
<span class="line"><span>            return services;</span></span>
<span class="line"><span>        }</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,25)]))}const d=n(l,[["render",p],["__file","mvc_website_transfer_net_core_records.html.vue"]]),v=JSON.parse('{"path":"/posts/dotnetcore/mvc_website_transfer_net_core_records.html","title":"mvc网站迁移.net core记录","lang":"zh-CN","frontmatter":{"title":"mvc网站迁移.net core记录","date":"2017-07-25T11:54:00.000Z","category":["DotNetCore"],"tag":["asp.net mvc",".net core"],"description":"接口return Json()时序列号小写的问题 在Startup.cs-》ConfigureServices方法配置一下解决 视图中输出中文会乱码 图片 ConfigureServices方法中配置即可，详情见院长文章 http://www.cnblogs.com/dudu/p/5879913.html .net core中配置伪静态 Configu...","head":[["meta",{"property":"og:url","content":"https://www.yimo.link/posts/dotnetcore/mvc_website_transfer_net_core_records.html"}],["meta",{"property":"og:site_name","content":"易墨网"}],["meta",{"property":"og:title","content":"mvc网站迁移.net core记录"}],["meta",{"property":"og:description","content":"接口return Json()时序列号小写的问题 在Startup.cs-》ConfigureServices方法配置一下解决 视图中输出中文会乱码 图片 ConfigureServices方法中配置即可，详情见院长文章 http://www.cnblogs.com/dudu/p/5879913.html .net core中配置伪静态 Configu..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://dn-coding-net-production-pp.qbox.me/22b4f108-2e62-4ead-9752-0b47f37933b4.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-10-28T11:15:42.000Z"}],["meta",{"property":"article:tag","content":"asp.net mvc"}],["meta",{"property":"article:tag","content":".net core"}],["meta",{"property":"article:published_time","content":"2017-07-25T11:54:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-10-28T11:15:42.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"mvc网站迁移.net core记录\\",\\"image\\":[\\"https://dn-coding-net-production-pp.qbox.me/22b4f108-2e62-4ead-9752-0b47f37933b4.png\\",\\"https://dn-coding-net-production-pp.qbox.me/8e438c38-7a54-472e-8b4f-448ce900ef99.png\\"],\\"datePublished\\":\\"2017-07-25T11:54:00.000Z\\",\\"dateModified\\":\\"2024-10-28T11:15:42.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"易墨\\",\\"url\\":\\"https://www.yimo.link\\"}]}"]]},"headers":[{"level":2,"title":"接口return Json()时序列号小写的问题","slug":"接口return-json-时序列号小写的问题","link":"#接口return-json-时序列号小写的问题","children":[]},{"level":2,"title":"视图中输出中文会乱码","slug":"视图中输出中文会乱码","link":"#视图中输出中文会乱码","children":[]},{"level":2,"title":".net core中配置伪静态","slug":"net-core中配置伪静态","link":"#net-core中配置伪静态","children":[]},{"level":2,"title":"单个文件上传","slug":"单个文件上传","link":"#单个文件上传","children":[]},{"level":2,"title":"core tag标签不解析，无智能提示","slug":"core-tag标签不解析-无智能提示","link":"#core-tag标签不解析-无智能提示","children":[]},{"level":2,"title":"asp.net core 禁止视图编译到dll","slug":"asp-net-core-禁止视图编译到dll","link":"#asp-net-core-禁止视图编译到dll","children":[]},{"level":2,"title":"自动注入服务","slug":"自动注入服务","link":"#自动注入服务","children":[]},{"level":2,"title":"自定义模型验证","slug":"自定义模型验证","link":"#自定义模型验证","children":[]}],"git":{"createdTime":1730114142000,"updatedTime":1730114142000,"contributors":[{"name":"yimo","email":"yimo@wikiglobal.com","commits":1}]},"readingTime":{"minutes":2.73,"words":820},"filePathRelative":"posts/dotnetcore/mvc_website_transfer_net_core_records.md","localizedDate":"2017年7月25日","excerpt":"<h2>接口<code>return Json()</code>时序列号小写的问题</h2>\\n<p>在Startup.cs-》ConfigureServices方法配置一下解决</p>\\n<div class=\\"language- line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext=\\"\\" data-title=\\"\\" style=\\"--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes one-light one-dark-pro vp-code\\"><code><span class=\\"line\\"><span>        public void ConfigureServices(IServiceCollection services)</span></span>\\n<span class=\\"line\\"><span>        {</span></span>\\n<span class=\\"line\\"><span>            // Add framework services.</span></span>\\n<span class=\\"line\\"><span>            services.AddMvc()</span></span>\\n<span class=\\"line\\"><span>                    .AddJsonOptions(op =&gt; op.SerializerSettings.ContractResolver =</span></span>\\n<span class=\\"line\\"><span>                                          new Newtonsoft.Json.Serialization.DefaultContractResolver());</span></span>\\n<span class=\\"line\\"><span>        }</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{d as comp,v as data};
