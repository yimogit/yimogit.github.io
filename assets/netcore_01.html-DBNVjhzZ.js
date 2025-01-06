import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as e,g as a,o as i}from"./app-_tngh30b.js";const l={};function p(t,n){return i(),e("div",null,n[0]||(n[0]=[a(`<blockquote><p>系统：win10</p></blockquote><blockquote><p>VS版本：2017</p></blockquote><blockquote><p>.NET Core 版本： 1.1</p></blockquote><h2 id="零-读取配置文件" tabindex="-1"><a class="header-anchor" href="#零-读取配置文件"><span>零.读取配置文件</span></a></h2><blockquote><p>参考：http://www.tuicool.com/articles/QfYVBvi</p></blockquote><ol start="0"><li><p>此版本无需添加其他组件</p></li><li><p>在<code>appsettings.json</code>配置中添加节点AppSettings</p><figure><img src="https://dn-coding-net-production-pp.qbox.me/6e12aae7-7ebd-486f-8775-e80c989eae97.png" alt="图片" tabindex="0" loading="lazy"><figcaption>图片</figcaption></figure></li><li><p>添加配置文件的映射模型</p><figure><img src="https://dn-coding-net-production-pp.qbox.me/ea4ac89a-7e83-4a90-a514-ab3f4c453af1.png" alt="图片" tabindex="0" loading="lazy"><figcaption>图片</figcaption></figure></li><li><p>在Startup.cs ConfigureServices方法中注册</p></li></ol><figure><img src="https://dn-coding-net-production-pp.qbox.me/7cac2c8c-c374-4558-b49f-9c963fe69906.png" alt="图片" tabindex="0" loading="lazy"><figcaption>图片</figcaption></figure><pre><code>        services.AddOptions();

        services.Configure&lt;AppSettings&gt;(Configuration.GetSection(&quot;AppSettings&quot;));
</code></pre><ol start="4"><li><p>Controller中使用</p><figure><img src="https://dn-coding-net-production-pp.qbox.me/976314e3-77a4-4a42-844e-e42bfcd748b3.png" alt="图片" tabindex="0" loading="lazy"><figcaption>图片</figcaption></figure></li><li><p>控制台使用</p></li></ol><p>添加nuget包</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span></span></span>
<span class="line"><span>    &lt;PackageReference Include=&quot;Microsoft.Extensions.Configuration&quot; Version=&quot;2.0.0&quot; /&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;PackageReference Include=&quot;Microsoft.Extensions.Configuration.Json&quot; Version=&quot;2.0.0&quot; /&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>main函数配置</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span></span></span>
<span class="line"><span>           using Microsoft.Extensions.Configuration;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            var Configuration = new ConfigurationBuilder()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            .SetBasePath(System.IO.Directory.GetCurrentDirectory())</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            .AddJsonFile(path: $&quot;appsettings.json&quot;) </span></span>
<span class="line"><span></span></span>
<span class="line"><span>            .AddJsonFile(path: $&quot;appsettings.Test.json&quot;,optional:true) //可选，若有存在的key，则test优先级更高</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            .Build();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            System.Console.WriteLine(Configuration.GetSection(&quot;test&quot;).Value);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="一、登录记录session" tabindex="-1"><a class="header-anchor" href="#一、登录记录session"><span>一、登录记录session</span></a></h2><blockquote><p>参考：http://www.cnblogs.com/fonour/p/5943401.html</p></blockquote><h2 id="二、发布-net-core1-1-2网站到windos服务器" tabindex="-1"><a class="header-anchor" href="#二、发布-net-core1-1-2网站到windos服务器"><span>二、发布.net core1.1.2网站到windos服务器</span></a></h2><blockquote><p>参考：https://docs.microsoft.com/en-us/aspnet/core/publishing/iis</p></blockquote><blockquote><ol start="0"><li>我的服务器是windows server 2012 ,.net core网站版本为1.1.2</li></ol></blockquote><blockquote><ol><li>经安装好iis</li></ol></blockquote><blockquote><ol start="2"><li>下载安装：</li></ol></blockquote><pre><code>  [.NET Core Windows Server Hosting](https://go.microsoft.com/fwlink/?linkid=848766) 

  [Microsoft Visual C++ 2015 Redistributable Update 3](https://www.microsoft.com/en-us/download/details.aspx?id=53840)
</code></pre><figure><img src="https://dn-coding-net-production-pp.qbox.me/a0318ad1-a06e-413e-9412-52b30149a516.png" alt="图片" tabindex="0" loading="lazy"><figcaption>图片</figcaption></figure><blockquote><ol start="3"><li>发布.net core网站到IIS，并将应用池的.NET CLR版本修改为[无托管代码]</li></ol></blockquote><figure><img src="https://dn-coding-net-production-pp.qbox.me/d0ccf5ba-0535-4832-a239-dcb1a5686ae3.png" alt="图片" tabindex="0" loading="lazy"><figcaption>图片</figcaption></figure><h2 id="三、des加密解密算法" tabindex="-1"><a class="header-anchor" href="#三、des加密解密算法"><span>三、DES加密解密算法</span></a></h2><blockquote><p>亲测可用</p></blockquote><pre><code>  public class SecurityHelper

  {

      #region 加密解密法一

      //默认密钥向量 

      private static byte[] Keys = { 0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0A, 0x0B, 0x0C, 0x0D, 0x0E, 0x0F };

      /// &lt;summary&gt; 

      /// DES加密字符串 

      /// &lt;/summary&gt; 

      /// &lt;param name=&quot;encryptString&quot;&gt;待加密的字符串&lt;/param&gt; 

      /// &lt;param name=&quot;encryptKey&quot;&gt;加密密钥,要求为16位&lt;/param&gt; 

      /// &lt;returns&gt;加密成功返回加密后的字符串，失败返回源串&lt;/returns&gt; 

      public static string EncryptDES(string encryptString, string encryptKey = &quot;Key123Ace#321Key&quot;)

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

      /// &lt;summary&gt; 

      /// DES解密字符串 

      /// &lt;/summary&gt; 

      /// &lt;param name=&quot;decryptString&quot;&gt;待解密的字符串&lt;/param&gt; 

      /// &lt;param name=&quot;decryptKey&quot;&gt;解密密钥,要求为16位,和加密密钥相同&lt;/param&gt; 

      /// &lt;returns&gt;解密成功返回解密后的字符串，失败返源串&lt;/returns&gt; 

      public static string DecryptDES(string decryptString, string decryptKey = &quot;Key123Ace#321Key&quot;)

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
</code></pre><h2 id="四、过滤器定义" tabindex="-1"><a class="header-anchor" href="#四、过滤器定义"><span>四、过滤器定义</span></a></h2><blockquote><p>继承Attribute,实现IActionFilter即可</p></blockquote><blockquote><p>简单校验登录,获取cookie值并解密后得到用户名,未登录则跳转登录(ApplicationKey为自定义的类存放)</p></blockquote><pre><code>public class UserCheckFilterAttribute : Attribute, IActionFilter

{

    public void OnActionExecuted(ActionExecutedContext context)

    {

    }

    public void OnActionExecuting(ActionExecutingContext filterContext)

    {

        string encryptValue = &quot;&quot;;

        filterContext.HttpContext.Request.Cookies.TryGetValue(ApplicationKey.User_Cookie_Key, out encryptValue);

        if (encryptValue == null)

        {

            filterContext.Result = new RedirectResult(&quot;/Account/Login&quot;);

            return;

        }

        var userName = SecurityHelper.DecryptDES(encryptValue, ApplicationKey.User_Cookie_Encryption_Key);

        if (string.IsNullOrEmpty(userName))

        {

            filterContext.Result = new RedirectResult(&quot;/Account/Login&quot;);

            return;

        }

    }

}
</code></pre><h2 id="五、注入服务" tabindex="-1"><a class="header-anchor" href="#五、注入服务"><span>五、注入服务</span></a></h2><blockquote><p><code>Startup.cs</code>中的<code>ConfigureServices</code>方法调用<code>services.AddTransient&lt;IUserService,UserService&gt;();</code>注册服务</p></blockquote><figure><img src="https://dn-coding-net-production-pp.qbox.me/7f9d0747-a9bf-4be3-89d8-5d87123c5b4d.png" alt="图片" tabindex="0" loading="lazy"><figcaption>图片</figcaption></figure><h2 id="根据路径调用脚本" tabindex="-1"><a class="header-anchor" href="#根据路径调用脚本"><span>根据路径调用脚本</span></a></h2><blockquote><p>调用：<code>var errMsg=&quot;&quot;;var result=ExcuteBatFile(path,ref errMsg);</code></p></blockquote><pre><code>    public static string ExcuteBatFile(string batPath, ref string errMsg)

    {

        if (errMsg == null) throw new ArgumentNullException(&quot;errMsg&quot;);

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
</code></pre><h2 id="命令生成发布文件" tabindex="-1"><a class="header-anchor" href="#命令生成发布文件"><span>命令生成发布文件</span></a></h2><blockquote><p>系统需要安装CORE SDK</p></blockquote><blockquote><p>若上传到git仓库，拉取后需要再项目目录中执行还原命令 <code>dotnet restore</code></p></blockquote><blockquote><p><code>dotnet publish --framework netcoreapp1.1 --output &quot;C:\\Publish&quot; --configuration Release</code></p></blockquote><blockquote><p>命令相关文档：https://docs.microsoft.com/zh-cn/dotnet/core/tools/</p></blockquote><h2 id="linux-部署" tabindex="-1"><a class="header-anchor" href="#linux-部署"><span>linux 部署</span></a></h2><blockquote><p>安装Ubuntu(ubuntu-16.04.2-server-amd64.iso) 教程：http://www.cnblogs.com/wangjieguang/p/hyper-v-ubuntu.html</p></blockquote><blockquote><p>部署文章参考：http://www.cnblogs.com/wangjieguang/p/aspnetcore-ubuntuserver.html</p></blockquote><blockquote><p>Linux下安装SDK https://www.microsoft.com/net/core#linuxubuntu</p></blockquote><h2 id="文章收集" tabindex="-1"><a class="header-anchor" href="#文章收集"><span>文章收集</span></a></h2><blockquote><p>超详细的Hyper-V安装Ubuntu： http://www.cnblogs.com/wangjieguang/p/hyper-v-ubuntu.html</p></blockquote><blockquote><p>Ubuntu部署.NET Core：http://www.cnblogs.com/wangjieguang/p/aspnetcore-ubuntuserver.html</p></blockquote><p>--------------------2017-07-24记录--------------------</p><h2 id="接口return-json-时序列化格式的设置" tabindex="-1"><a class="header-anchor" href="#接口return-json-时序列化格式的设置"><span>接口<code>return Json()</code>时序列化格式的设置</span></a></h2><p>在Startup.cs-》ConfigureServices方法配置一下解决</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span></span></span>
<span class="line"><span>        public void ConfigureServices(IServiceCollection services)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            // Add framework services.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            services.AddMvc()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                    .AddJsonOptions(op =&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                    {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                        //默认使用帕斯卡命名法(oneTwo) CamelCasePropertyNamesContractResolver</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                       //若使用骆驼命名法可使用DefaultContractResolver</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                        op.SerializerSettings.ContractResolver =</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                       new Newtonsoft.Json.Serialization.DefaultContractResolver();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                        //返回数据中有DateTime类型，自定义格式</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                        op.SerializerSettings.DateFormatString = &quot;yyyy-MM-dd HH:mm&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                    });</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        }</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="视图中输出中文会编码" tabindex="-1"><a class="header-anchor" href="#视图中输出中文会编码"><span>视图中输出中文会编码</span></a></h2><figure><img src="https://dn-coding-net-production-pp.qbox.me/22b4f108-2e62-4ead-9752-0b47f37933b4.png" alt="图片" tabindex="0" loading="lazy"><figcaption>图片</figcaption></figure><p>ConfigureServices方法中配置即可，详情见园长文章 http://www.cnblogs.com/dudu/p/5879913.html</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span></span></span>
<span class="line"><span>            services.Configure&lt;WebEncoderOptions&gt;(options =&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                options.TextEncoderSettings = new TextEncoderSettings(UnicodeRanges.All);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            });</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="中文乱码解决" tabindex="-1"><a class="header-anchor" href="#中文乱码解决"><span>中文乱码解决</span></a></h2><h3 id="控制台乱码" tabindex="-1"><a class="header-anchor" href="#控制台乱码"><span>控制台乱码</span></a></h3><p>添加：<code>Console.OutputEncoding = Encoding.Unicode;</code></p><h3 id="网页输出乱码" tabindex="-1"><a class="header-anchor" href="#网页输出乱码"><span>网页输出乱码</span></a></h3><p>添加:<code>context.Response.ContentType = &quot;text/pain;charset=utf-8&quot;;</code></p><blockquote><p>参考评论：http://www.cnblogs.com/wolf-sun/p/6136482.html</p></blockquote><h2 id="net-core中配置伪静态" tabindex="-1"><a class="header-anchor" href="#net-core中配置伪静态"><span>.net core中配置伪静态</span></a></h2><blockquote><p>Configure方法中，还是一样的配方</p></blockquote><figure><img src="https://dn-coding-net-production-pp.qbox.me/8e438c38-7a54-472e-8b4f-448ce900ef99.png" alt="图片" tabindex="0" loading="lazy"><figcaption>图片</figcaption></figure><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span></span></span>
<span class="line"><span>         app.UseMvc(routes =&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                routes.MapRoute(</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                    name: &quot;index&quot;,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                    template: &quot;index.html&quot;,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                    defaults: new { controller = &quot;Home&quot;, action = &quot;Index&quot; }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                );</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                routes.MapRoute(</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                    name: &quot;detail&quot;,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                    template: &quot;detail/{id}.html&quot;,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                    defaults: new { controller = &quot;Home&quot;, action = &quot;Detail&quot; }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                );</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                routes.MapRoute(</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                    name: &quot;add&quot;,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                    template: &quot;add.html&quot;,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                    defaults: new { controller = &quot;Home&quot;, action = &quot;Add&quot; }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                );</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                routes.MapRoute(</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                    name: &quot;default&quot;,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                    template: &quot;{controller=Home}/{action=Index}/{id?}&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            });</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="单个文件上传" tabindex="-1"><a class="header-anchor" href="#单个文件上传"><span>单个文件上传</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span></span></span>
<span class="line"><span>        [HttpPost]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        public IActionResult Upload(IFormFile file)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            string previewPath = &quot;&quot;;//加域名什么的</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            long size = 0;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            var upFileName = ContentDispositionHeaderValue</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                   .Parse(file.ContentDisposition)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                   .FileName</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                   .Trim(&#39;&quot;&#39;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            var fileName = Guid.NewGuid() + Path.GetExtension(upFileName);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            size += file.Length;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            if (size &gt; UploadMaxLength)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                return Json(new</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                    code = 0,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                    msg = &quot;图片太大，不能超过5M&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                });</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            previewPath += &quot;/uploads/&quot; + fileName;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            var savePath = _hostingEnv.WebRootPath + @&quot;\\uploads\\&quot; + fileName;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            var saveDir = _hostingEnv.WebRootPath + @&quot;\\uploads\\&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>            if (!Directory.Exists(saveDir))</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                Directory.CreateDirectory(saveDir);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            using (FileStream fs = System.IO.File.Create(savePath))</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                file.CopyTo(fs);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                fs.Flush();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            return Json(new</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                code = 0,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                msg = &quot;上传成功&quot;,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                data = new</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                    src = previewPath,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                    title = &quot;&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            });</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        }</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="返回json自定义datetime类型格式" tabindex="-1"><a class="header-anchor" href="#返回json自定义datetime类型格式"><span>返回JSON自定义DateTime类型格式</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span></span></span>
<span class="line"><span>services.AddMvc().AddJsonOptions(op =&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>{</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    op.SerializerSettings.DateFormatString = &quot;yyyy-MM-dd HH:mm&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>});</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="frombody-接口模型验证类型转换的问题" tabindex="-1"><a class="header-anchor" href="#frombody-接口模型验证类型转换的问题"><span>[FromBody]接口模型验证类型转换的问题</span></a></h2><p>如果模型中存在非空值类型的字段A:<code>public int 字段A{get;set;}</code></p><p>然后向接口提交一个 <code>{字段A:&quot;&quot;} </code>或者<code>{字段A:null}</code></p><p>提交后会被 ModelState 拦截验证不通过</p><p>目前的解决方法有</p><ul><li><p>修改类型为可空类型</p></li><li><p>全局设置下序列化忽略null和空字符串，目前 [FromForm] 格式的数据不知道如何处理</p></li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span></span></span>
<span class="line"><span> services.AddMvc().AddJsonOptions(op =&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>{</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    op.SerializerSettings.NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    op.SerializerSettings.MissingMemberHandling = Newtonsoft.Json.MissingMemberHandling.Ignore;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>});</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="net-core-获取ip地址" tabindex="-1"><a class="header-anchor" href="#net-core-获取ip地址"><span>.net core 获取IP地址</span></a></h2><p><code>request.HttpContext.Connection.RemoteIpAddress</code></p><h2 id="net-core-获取请求url" tabindex="-1"><a class="header-anchor" href="#net-core-获取请求url"><span>.net core 获取请求URL</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span></span></span>
<span class="line"><span>// GetAbsoluteUri(request)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      public string GetAbsoluteUri(HttpRequest request)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            return new StringBuilder()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                .Append(request.Scheme)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                .Append(&quot;://&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                .Append(request.Host)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                .Append(request.PathBase)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                .Append(request.Path)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                .Append(request.QueryString)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                .ToString();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        }</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="net-core-过滤器中获取提交的post数据" tabindex="-1"><a class="header-anchor" href="#net-core-过滤器中获取提交的post数据"><span>.net core 过滤器中获取提交的post数据</span></a></h2><ol><li><p>文档地址：https://docs.microsoft.com/zh-cn/aspnet/core/mvc/controllers/filters?view=aspnetcore-2.0#action-filters</p></li><li><p>相关issues：https://github.com/aspnet/Mvc/issues/7251</p></li></ol><h3 id="net-core-实现一个日志过滤器" tabindex="-1"><a class="header-anchor" href="#net-core-实现一个日志过滤器"><span>.net core 实现一个日志过滤器</span></a></h3><div class="language-cs line-numbers-mode" data-highlighter="shiki" data-ext="cs" data-title="cs" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> AdminLogAttribute</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> : </span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">Attribute</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">IActionFilter</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    {</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">        public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> void</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> OnActionExecuting</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">ActionExecutingContext</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;"> filterContext</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        {</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">        public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> void</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> OnActionExecuted</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">ActionExecutedContext</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;"> context</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        {</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">            //获取提交的参数 context.ActionArguments </span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        }</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">   }</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,86)]))}const d=s(l,[["render",p],["__file","netcore_01.html.vue"]]),o=JSON.parse('{"path":"/posts/dotnetcore/netcore_01.html","title":".net core建站踩坑记录","lang":"zh-CN","frontmatter":{"title":".net core建站踩坑记录","date":"2017-07-10T00:17:00.000Z","category":["DotNetCore"],"tag":[".net core"],"description":"系统：win10 VS版本：2017 .NET Core 版本： 1.1 零.读取配置文件 参考：http://www.tuicool.com/articles/QfYVBvi 此版本无需添加其他组件 在appsettings.json配置中添加节点AppSettings 图片图片 添加配置文件的映射模型 图片图片 在Startup.cs Config...","head":[["meta",{"property":"og:url","content":"https://www.yimo.link/posts/dotnetcore/netcore_01.html"}],["meta",{"property":"og:site_name","content":"易墨网"}],["meta",{"property":"og:title","content":".net core建站踩坑记录"}],["meta",{"property":"og:description","content":"系统：win10 VS版本：2017 .NET Core 版本： 1.1 零.读取配置文件 参考：http://www.tuicool.com/articles/QfYVBvi 此版本无需添加其他组件 在appsettings.json配置中添加节点AppSettings 图片图片 添加配置文件的映射模型 图片图片 在Startup.cs Config..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://dn-coding-net-production-pp.qbox.me/6e12aae7-7ebd-486f-8775-e80c989eae97.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-10-28T11:15:42.000Z"}],["meta",{"property":"article:tag","content":".net core"}],["meta",{"property":"article:published_time","content":"2017-07-10T00:17:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-10-28T11:15:42.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\".net core建站踩坑记录\\",\\"image\\":[\\"https://dn-coding-net-production-pp.qbox.me/6e12aae7-7ebd-486f-8775-e80c989eae97.png\\",\\"https://dn-coding-net-production-pp.qbox.me/ea4ac89a-7e83-4a90-a514-ab3f4c453af1.png\\",\\"https://dn-coding-net-production-pp.qbox.me/7cac2c8c-c374-4558-b49f-9c963fe69906.png\\",\\"https://dn-coding-net-production-pp.qbox.me/976314e3-77a4-4a42-844e-e42bfcd748b3.png\\",\\"https://dn-coding-net-production-pp.qbox.me/a0318ad1-a06e-413e-9412-52b30149a516.png\\",\\"https://dn-coding-net-production-pp.qbox.me/d0ccf5ba-0535-4832-a239-dcb1a5686ae3.png\\",\\"https://dn-coding-net-production-pp.qbox.me/7f9d0747-a9bf-4be3-89d8-5d87123c5b4d.png\\",\\"https://dn-coding-net-production-pp.qbox.me/22b4f108-2e62-4ead-9752-0b47f37933b4.png\\",\\"https://dn-coding-net-production-pp.qbox.me/8e438c38-7a54-472e-8b4f-448ce900ef99.png\\"],\\"datePublished\\":\\"2017-07-10T00:17:00.000Z\\",\\"dateModified\\":\\"2024-10-28T11:15:42.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"易墨\\",\\"url\\":\\"https://www.yimo.link\\"}]}"]]},"headers":[{"level":2,"title":"零.读取配置文件","slug":"零-读取配置文件","link":"#零-读取配置文件","children":[]},{"level":2,"title":"一、登录记录session","slug":"一、登录记录session","link":"#一、登录记录session","children":[]},{"level":2,"title":"二、发布.net core1.1.2网站到windos服务器","slug":"二、发布-net-core1-1-2网站到windos服务器","link":"#二、发布-net-core1-1-2网站到windos服务器","children":[]},{"level":2,"title":"三、DES加密解密算法","slug":"三、des加密解密算法","link":"#三、des加密解密算法","children":[]},{"level":2,"title":"四、过滤器定义","slug":"四、过滤器定义","link":"#四、过滤器定义","children":[]},{"level":2,"title":"五、注入服务","slug":"五、注入服务","link":"#五、注入服务","children":[]},{"level":2,"title":"根据路径调用脚本","slug":"根据路径调用脚本","link":"#根据路径调用脚本","children":[]},{"level":2,"title":"命令生成发布文件","slug":"命令生成发布文件","link":"#命令生成发布文件","children":[]},{"level":2,"title":"linux 部署","slug":"linux-部署","link":"#linux-部署","children":[]},{"level":2,"title":"文章收集","slug":"文章收集","link":"#文章收集","children":[]},{"level":2,"title":"接口return Json()时序列化格式的设置","slug":"接口return-json-时序列化格式的设置","link":"#接口return-json-时序列化格式的设置","children":[]},{"level":2,"title":"视图中输出中文会编码","slug":"视图中输出中文会编码","link":"#视图中输出中文会编码","children":[]},{"level":2,"title":"中文乱码解决","slug":"中文乱码解决","link":"#中文乱码解决","children":[{"level":3,"title":"控制台乱码","slug":"控制台乱码","link":"#控制台乱码","children":[]},{"level":3,"title":"网页输出乱码","slug":"网页输出乱码","link":"#网页输出乱码","children":[]}]},{"level":2,"title":".net core中配置伪静态","slug":"net-core中配置伪静态","link":"#net-core中配置伪静态","children":[]},{"level":2,"title":"单个文件上传","slug":"单个文件上传","link":"#单个文件上传","children":[]},{"level":2,"title":"返回JSON自定义DateTime类型格式","slug":"返回json自定义datetime类型格式","link":"#返回json自定义datetime类型格式","children":[]},{"level":2,"title":"[FromBody]接口模型验证类型转换的问题","slug":"frombody-接口模型验证类型转换的问题","link":"#frombody-接口模型验证类型转换的问题","children":[]},{"level":2,"title":".net core 获取IP地址","slug":"net-core-获取ip地址","link":"#net-core-获取ip地址","children":[]},{"level":2,"title":".net core 获取请求URL","slug":"net-core-获取请求url","link":"#net-core-获取请求url","children":[]},{"level":2,"title":".net core 过滤器中获取提交的post数据","slug":"net-core-过滤器中获取提交的post数据","link":"#net-core-过滤器中获取提交的post数据","children":[{"level":3,"title":".net core 实现一个日志过滤器","slug":"net-core-实现一个日志过滤器","link":"#net-core-实现一个日志过滤器","children":[]}]}],"git":{"createdTime":1730114142000,"updatedTime":1730114142000,"contributors":[{"name":"yimo","email":"yimo@wikiglobal.com","commits":1}]},"readingTime":{"minutes":5.12,"words":1537},"filePathRelative":"posts/dotnetcore/netcore_01.md","localizedDate":"2017年7月10日","excerpt":"<blockquote>\\n<p>系统：win10</p>\\n</blockquote>\\n<blockquote>\\n<p>VS版本：2017</p>\\n</blockquote>\\n<blockquote>\\n<p>.NET Core 版本： 1.1</p>\\n</blockquote>\\n<h2>零.读取配置文件</h2>\\n<blockquote>\\n<p>参考：http://www.tuicool.com/articles/QfYVBvi</p>\\n</blockquote>\\n<ol start=\\"0\\">\\n<li>\\n<p>此版本无需添加其他组件</p>\\n</li>\\n<li>\\n<p>在<code>appsettings.json</code>配置中添加节点AppSettings</p>\\n<figure><img src=\\"https://dn-coding-net-production-pp.qbox.me/6e12aae7-7ebd-486f-8775-e80c989eae97.png\\" alt=\\"图片\\" tabindex=\\"0\\" loading=\\"lazy\\"><figcaption>图片</figcaption></figure>\\n</li>\\n<li>\\n<p>添加配置文件的映射模型</p>\\n<figure><img src=\\"https://dn-coding-net-production-pp.qbox.me/ea4ac89a-7e83-4a90-a514-ab3f4c453af1.png\\" alt=\\"图片\\" tabindex=\\"0\\" loading=\\"lazy\\"><figcaption>图片</figcaption></figure>\\n</li>\\n<li>\\n<p>在Startup.cs  ConfigureServices方法中注册</p>\\n</li>\\n</ol>","autoDesc":true}');export{d as comp,o as data};
