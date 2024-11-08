import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,e as i,o as l}from"./app-f_uNzTRF.js";const e="/assets/662652-20160630162052593-1671849115-CcsNhNdo.png",p="/assets/662652-20160630162214531-533828430-UmcTRHhm.png",c="/assets/662652-20160630162226484-219264545-BWl0qkBW.png",d="/assets/662652-20160630160003202-182256970-Bc_fIGwx.png",r="/assets/662652-20160630163134343-351836942-CQJIpswR.png",t="/assets/662652-20160630163253234-224999947-BcR_Z6_E.png",u={};function v(m,n){return l(),a("div",null,n[0]||(n[0]=[i('<p>迷茫的原因是因为想得太多，做得太少。因为只是 想 真的很容易，转瞬之间就会产生无数个念头，或许是该做点什么了吧。</p><p>但是整个人都是懒的，是废的，是大脑控制不住自己的行为的。解决方案唯有一步一步的去把行为变成习惯。</p><p>坚持一件事挺不容易的，不论结果的好坏，过程中总有收获的，坚持，不会是一件坏事。</p><p>胡言乱语结束~~~</p><p>下面是记录分享的一点东西~~请笑纳</p><h1 id="_0-结构一览" tabindex="-1"><a class="header-anchor" href="#_0-结构一览"><span>0.结构一览</span></a></h1><figure><img src="'+e+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h1 id="_1-定义插件接口" tabindex="-1"><a class="header-anchor" href="#_1-定义插件接口"><span>1.定义插件接口</span></a></h1><p><img src="http://images.cnblogs.com/OutliningIndicators/ContractedBlock.gif" alt="" loading="lazy"><img src="http://images.cnblogs.com/OutliningIndicators/ExpandedBlockStart.gif" alt="" loading="lazy"></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>using System;</span></span>
<span class="line"><span>using System.Collections.Generic;</span></span>
<span class="line"><span>using System.Linq;</span></span>
<span class="line"><span>using System.Text;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>namespace YimoCore</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    public interface IPlugin</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        /// &lt;summary&gt;</span></span>
<span class="line"><span>        /// Gets or sets the plugin descriptor</span></span>
<span class="line"><span>        /// &lt;/summary&gt;</span></span>
<span class="line"><span>        PluginDescriptor PluginDescriptor { get; set; }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        /// &lt;summary&gt;</span></span>
<span class="line"><span>        /// Install plugin</span></span>
<span class="line"><span>        /// &lt;/summary&gt;</span></span>
<span class="line"><span>        void Install();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        /// &lt;summary&gt;</span></span>
<span class="line"><span>        /// Uninstall plugin</span></span>
<span class="line"><span>        /// &lt;/summary&gt;</span></span>
<span class="line"><span>        void Uninstall();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>定义插件</p><h1 id="_2-添加插件信息类" tabindex="-1"><a class="header-anchor" href="#_2-添加插件信息类"><span>2.添加插件信息类</span></a></h1><p><img src="http://images.cnblogs.com/OutliningIndicators/ContractedBlock.gif" alt="" loading="lazy"><img src="http://images.cnblogs.com/OutliningIndicators/ExpandedBlockStart.gif" alt="" loading="lazy"></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>using System;</span></span>
<span class="line"><span>using System.Collections.Generic;</span></span>
<span class="line"><span>using System.IO;</span></span>
<span class="line"><span>using System.Linq;</span></span>
<span class="line"><span>using System.Reflection;</span></span>
<span class="line"><span>using System.Text;</span></span>
<span class="line"><span>using System.Threading.Tasks;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>namespace YimoCore</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    /// &lt;summary&gt;</span></span>
<span class="line"><span>    /// 插件信息</span></span>
<span class="line"><span>    /// &lt;/summary&gt;</span></span>
<span class="line"><span>    public sealed class PluginDescriptor</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        /// &lt;summary&gt;</span></span>
<span class="line"><span>        /// 插件主目录</span></span>
<span class="line"><span>        /// &lt;/summary&gt;</span></span>
<span class="line"><span>        public string PluginFileName { get; set; }</span></span>
<span class="line"><span>        /// &lt;summary&gt;</span></span>
<span class="line"><span>        /// 插件类型</span></span>
<span class="line"><span>        /// &lt;/summary&gt;</span></span>
<span class="line"><span>        public Type PluginType { get; set; }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        /// &lt;summary&gt;</span></span>
<span class="line"><span>        /// 插件主程序集</span></span>
<span class="line"><span>        /// &lt;/summary&gt;</span></span>
<span class="line"><span>        public Assembly ReferencedAssembly { get; internal set; }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        /// &lt;summary&gt;</span></span>
<span class="line"><span>        /// 原始程序集文件</span></span>
<span class="line"><span>        /// &lt;/summary&gt;</span></span>
<span class="line"><span>        public FileInfo OriginalAssemblyFile { get; internal set; }</span></span>
<span class="line"><span>        /// &lt;summary&gt;</span></span>
<span class="line"><span>        /// 插件包目录</span></span>
<span class="line"><span>        /// &lt;/summary&gt;</span></span>
<span class="line"><span>        public FileInfo PluginConfigFile { get; internal set; }</span></span>
<span class="line"><span>        /// &lt;summary&gt;</span></span>
<span class="line"><span>        /// 类别</span></span>
<span class="line"><span>        /// &lt;/summary&gt;</span></span>
<span class="line"><span>        public string Group { get; set; }</span></span>
<span class="line"><span>        /// &lt;summary&gt;</span></span>
<span class="line"><span>        /// 插件名称</span></span>
<span class="line"><span>        /// &lt;/summary&gt;</span></span>
<span class="line"><span>        public string FriendlyName { get; set; }</span></span>
<span class="line"><span>        /// &lt;summary&gt;</span></span>
<span class="line"><span>        /// 程序集名称</span></span>
<span class="line"><span>        /// &lt;/summary&gt;</span></span>
<span class="line"><span>        public string SystemName { get; set; }</span></span>
<span class="line"><span>        /// &lt;summary&gt;</span></span>
<span class="line"><span>        /// 描述</span></span>
<span class="line"><span>        /// &lt;/summary&gt;</span></span>
<span class="line"><span>        public string Description { get; set; }</span></span>
<span class="line"><span>        /// &lt;summary&gt;</span></span>
<span class="line"><span>        /// 版本号</span></span>
<span class="line"><span>        /// &lt;/summary&gt;</span></span>
<span class="line"><span>        public string Version { get; set; }</span></span>
<span class="line"><span>        /// &lt;summary&gt;</span></span>
<span class="line"><span>        /// 支持版本</span></span>
<span class="line"><span>        /// &lt;/summary&gt;</span></span>
<span class="line"><span>        public IList&lt;string&gt; SupportedVersions { get; set; }</span></span>
<span class="line"><span>        /// &lt;summary&gt;</span></span>
<span class="line"><span>        /// 作者</span></span>
<span class="line"><span>        /// &lt;/summary&gt;</span></span>
<span class="line"><span>        public string Author { get; set; }</span></span>
<span class="line"><span>        /// &lt;summary&gt;</span></span>
<span class="line"><span>        /// 排序</span></span>
<span class="line"><span>        /// &lt;/summary&gt;</span></span>
<span class="line"><span>        public int DisplayOrder { get; set; }</span></span>
<span class="line"><span>        /// &lt;summary&gt;</span></span>
<span class="line"><span>        /// 获取插件实例</span></span>
<span class="line"><span>        /// &lt;/summary&gt;</span></span>
<span class="line"><span>        /// &lt;typeparam name=&quot;T&quot;&gt;&lt;/typeparam&gt;</span></span>
<span class="line"><span>        /// &lt;returns&gt;&lt;/returns&gt;</span></span>
<span class="line"><span>        public T Instance&lt;T&gt;() where T : class, IPlugin</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            var instance = Activator.CreateInstance(PluginType) as T;</span></span>
<span class="line"><span>            if (instance != null)</span></span>
<span class="line"><span>                instance.PluginDescriptor = this;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            return instance;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        public IPlugin Instance()</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            return Instance&lt;IPlugin&gt;();</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        public int CompareTo(PluginDescriptor other)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            if (DisplayOrder != other.DisplayOrder)</span></span>
<span class="line"><span>                return DisplayOrder.CompareTo(other.DisplayOrder);</span></span>
<span class="line"><span>            else</span></span>
<span class="line"><span>                return System.String.Compare(FriendlyName, other.FriendlyName, System.StringComparison.Ordinal);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        public override string ToString()</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            return FriendlyName;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        public override bool Equals(object obj)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            var other = obj as PluginDescriptor;</span></span>
<span class="line"><span>            return other != null &amp;&amp;</span></span>
<span class="line"><span>                SystemName != null &amp;&amp;</span></span>
<span class="line"><span>                SystemName.Equals(other.SystemName);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        public override int GetHashCode()</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            return SystemName.GetHashCode();</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>插件信息类</p><h1 id="_3-插件读取" tabindex="-1"><a class="header-anchor" href="#_3-插件读取"><span>3.插件读取</span></a></h1><p><img src="http://images.cnblogs.com/OutliningIndicators/ContractedBlock.gif" alt="" loading="lazy"><img src="http://images.cnblogs.com/OutliningIndicators/ExpandedBlockStart.gif" alt="" loading="lazy"></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>using System;</span></span>
<span class="line"><span>using System.Collections.Generic;</span></span>
<span class="line"><span>using System.IO;</span></span>
<span class="line"><span>using System.Linq;</span></span>
<span class="line"><span>using System.Reflection;</span></span>
<span class="line"><span>using System.Text;</span></span>
<span class="line"><span>using System.Threading.Tasks;</span></span>
<span class="line"><span>using System.Web;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>namespace YimoCore</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    public class PluginManager</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        private const string PluginsPath = &quot;/modules&quot;; //插件目录</span></span>
<span class="line"><span>        private const string ShadowCopyPath = &quot;/modules/bin&quot;; //插件影子目录</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        public static IEnumerable&lt;PluginDescriptor&gt; ReferencedPlugins { get; set; }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        public static void Init()</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            var appdir = AppDomain.CurrentDomain.BaseDirectory.Substring(0, AppDomain.CurrentDomain.BaseDirectory.LastIndexOf(&quot;\\\\&quot;));</span></span>
<span class="line"><span>            appdir = appdir.Substring(0, appdir.LastIndexOf(&quot;\\\\&quot;));</span></span>
<span class="line"><span>            appdir = appdir.Substring(0, appdir.LastIndexOf(&quot;\\\\&quot;));</span></span>
<span class="line"><span>            //插件目录</span></span>
<span class="line"><span>            var pluginFolder = new DirectoryInfo(appdir + PluginsPath);</span></span>
<span class="line"><span>            //插件bin目录</span></span>
<span class="line"><span>            var shadowFolder = new DirectoryInfo(appdir + ShadowCopyPath);</span></span>
<span class="line"><span>            var referencedPlugins = new List&lt;PluginDescriptor&gt;();</span></span>
<span class="line"><span>            try</span></span>
<span class="line"><span>            {</span></span>
<span class="line"><span>                pluginFolder.Create();</span></span>
<span class="line"><span>                shadowFolder.Create();</span></span>
<span class="line"><span>                //清空bin目录</span></span>
<span class="line"><span>                foreach (var fileInfo in shadowFolder.GetFiles())</span></span>
<span class="line"><span>                {</span></span>
<span class="line"><span>                    fileInfo.Delete();</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>                var pluginConfigFiles = pluginFolder.GetFiles(&quot;about.xml&quot;, SearchOption.AllDirectories);</span></span>
<span class="line"><span>                foreach (var pluginConfigFile in pluginConfigFiles)</span></span>
<span class="line"><span>                {</span></span>
<span class="line"><span>                    //获取插件信息</span></span>
<span class="line"><span>                    var pluginDescriptor = PluginFileParser.ParsePluginDescriptionFile(pluginConfigFile.FullName);</span></span>
<span class="line"><span>                    try</span></span>
<span class="line"><span>                    {</span></span>
<span class="line"><span>                        if (pluginConfigFile.Directory == null)</span></span>
<span class="line"><span>                            continue;</span></span>
<span class="line"><span>                        //获取插件所有的dll</span></span>
<span class="line"><span>                        var pluginFiles = pluginConfigFile.Directory.GetFiles(&quot;*.dll&quot;, SearchOption.AllDirectories);</span></span>
<span class="line"><span>                        var mainPluginFile = pluginFiles.FirstOrDefault(</span></span>
<span class="line"><span>                            item =&gt;</span></span>
<span class="line"><span>                            item.Name.Equals(pluginDescriptor.PluginFileName,</span></span>
<span class="line"><span>                            StringComparison.InvariantCultureIgnoreCase));</span></span>
<span class="line"><span>                        pluginDescriptor.PluginConfigFile = pluginConfigFile;</span></span>
<span class="line"><span>                        pluginDescriptor.OriginalAssemblyFile = mainPluginFile;</span></span>
<span class="line"><span>                        pluginDescriptor.ReferencedAssembly = DeployDllFile(mainPluginFile, shadowFolder);</span></span>
<span class="line"><span>                        foreach (var t in pluginDescriptor.ReferencedAssembly.GetTypes())</span></span>
<span class="line"><span>                        {</span></span>
<span class="line"><span>                            if (typeof(IPlugin).IsAssignableFrom(t))</span></span>
<span class="line"><span>                            {</span></span>
<span class="line"><span>                                if (t.IsInterface == false &amp;&amp; t.IsClass &amp;&amp; !t.IsAbstract)</span></span>
<span class="line"><span>                                {</span></span>
<span class="line"><span>                                    pluginDescriptor.PluginType = t;</span></span>
<span class="line"><span>                                    break;</span></span>
<span class="line"><span>                                }</span></span>
<span class="line"><span>                            }</span></span>
<span class="line"><span>                        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                        referencedPlugins.Add(pluginDescriptor);</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>                    }</span></span>
<span class="line"><span>                    catch (ReflectionTypeLoadException ex)</span></span>
<span class="line"><span>                    {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                        throw;</span></span>
<span class="line"><span>                    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            catch (ReflectionTypeLoadException ex)</span></span>
<span class="line"><span>            {</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            ReferencedPlugins = referencedPlugins;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        /// &lt;summary&gt;</span></span>
<span class="line"><span>        /// 部署程序集</span></span>
<span class="line"><span>        /// &lt;/summary&gt;</span></span>
<span class="line"><span>        /// &lt;param name=&quot;dllFile&quot;&gt;插件程序集文件&lt;/param&gt;</span></span>
<span class="line"><span>        /// &lt;param name=&quot;shadowFolder&quot;&gt;/Plugins/bin目录&lt;/param&gt;</span></span>
<span class="line"><span>        private static Assembly DeployDllFile(FileInfo dllFile, DirectoryInfo shadowFolder)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            DirectoryInfo copyFolder;</span></span>
<span class="line"><span>            //根据当前的信任级别设置复制目录</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            copyFolder = shadowFolder;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            var newDllFile = new FileInfo(copyFolder.FullName + &quot;\\\\&quot; + dllFile.Name);</span></span>
<span class="line"><span>            try</span></span>
<span class="line"><span>            {</span></span>
<span class="line"><span>                File.Copy(dllFile.FullName, newDllFile.FullName, true);</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            catch (Exception ex1)//在某些情况下会出现&quot;正由另一进程使用，因此该进程无法访问该文件&quot;错误，所以先重命名再复制</span></span>
<span class="line"><span>            {</span></span>
<span class="line"><span>                try</span></span>
<span class="line"><span>                {</span></span>
<span class="line"><span>                    File.Move(newDllFile.FullName, newDllFile.FullName + Guid.NewGuid().ToString(&quot;N&quot;) + &quot;.locked&quot;);</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>                catch (Exception ex2)</span></span>
<span class="line"><span>                {</span></span>
<span class="line"><span>                    throw ex2;</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                File.Copy(dllFile.FullName, newDllFile.FullName, true);</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            var assembly = Assembly.LoadFrom(newDllFile.FullName);</span></span>
<span class="line"><span>            //将程序集添加到当前应用程序域</span></span>
<span class="line"><span>            //BuildManager.AddReferencedAssembly(assembly);</span></span>
<span class="line"><span>            return assembly;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>插件读取</p><p><img src="http://images.cnblogs.com/OutliningIndicators/ContractedBlock.gif" alt="" loading="lazy"><img src="http://images.cnblogs.com/OutliningIndicators/ExpandedBlockStart.gif" alt="" loading="lazy"></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>using System;</span></span>
<span class="line"><span>using System.Collections.Generic;</span></span>
<span class="line"><span>using System.IO;</span></span>
<span class="line"><span>using System.Linq;</span></span>
<span class="line"><span>using System.Text;</span></span>
<span class="line"><span>using System.Xml.Linq;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>namespace YimoCore</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /// &lt;summary&gt;</span></span>
<span class="line"><span>    /// Plugin files parser</span></span>
<span class="line"><span>    /// &lt;/summary&gt;</span></span>
<span class="line"><span>    public static class PluginFileParser</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        public static IList&lt;string&gt; ParseInstalledPluginsFile(string filePath)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            if (!File.Exists(filePath))</span></span>
<span class="line"><span>                return new List&lt;string&gt;();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            var text = File.ReadAllText(filePath);</span></span>
<span class="line"><span>            if (String.IsNullOrEmpty(text))</span></span>
<span class="line"><span>                return new List&lt;string&gt;();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            var lines = new List&lt;string&gt;();</span></span>
<span class="line"><span>            using (var reader = new StringReader(text))</span></span>
<span class="line"><span>            {</span></span>
<span class="line"><span>                string str;</span></span>
<span class="line"><span>                while ((str = reader.ReadLine()) != null)</span></span>
<span class="line"><span>                {</span></span>
<span class="line"><span>                    if (String.IsNullOrWhiteSpace(str))</span></span>
<span class="line"><span>                        continue;</span></span>
<span class="line"><span>                    lines.Add(str.Trim());</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            return lines;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        public static void SaveInstalledPluginsFile(IList&lt;String&gt; pluginSystemNames, string filePath)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            if (pluginSystemNames == null || pluginSystemNames.Count == 0)</span></span>
<span class="line"><span>                return;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            string result = &quot;&quot;;</span></span>
<span class="line"><span>            foreach (var sn in pluginSystemNames)</span></span>
<span class="line"><span>                result += string.Format(&quot;{0}{1}&quot;, sn, Environment.NewLine);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            File.WriteAllText(filePath, result);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        public static PluginDescriptor ParsePluginDescriptionFile(string filePath)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            XDocument doc;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            try</span></span>
<span class="line"><span>            {</span></span>
<span class="line"><span>                doc = XDocument.Load(filePath);</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            catch (Exception)</span></span>
<span class="line"><span>            {</span></span>
<span class="line"><span>                return null;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            var pluginEle = doc.Element(&quot;plugin&quot;);</span></span>
<span class="line"><span>            if (pluginEle == null)</span></span>
<span class="line"><span>                return null;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            var descriptor = new PluginDescriptor();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            var ele = pluginEle.Element(&quot;SystemName&quot;);</span></span>
<span class="line"><span>            if (ele != null)</span></span>
<span class="line"><span>                descriptor.SystemName = ele.Value;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            ele = pluginEle.Element(&quot;Group&quot;);</span></span>
<span class="line"><span>            if (ele != null)</span></span>
<span class="line"><span>                descriptor.Group = ele.Value;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            ele = pluginEle.Element(&quot;FriendlyName&quot;);</span></span>
<span class="line"><span>            if (ele != null)</span></span>
<span class="line"><span>                descriptor.FriendlyName = ele.Value;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            ele = pluginEle.Element(&quot;Description&quot;);</span></span>
<span class="line"><span>            if (ele != null)</span></span>
<span class="line"><span>                descriptor.Description = ele.Value;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            ele = pluginEle.Element(&quot;Version&quot;);</span></span>
<span class="line"><span>            if (ele != null)</span></span>
<span class="line"><span>                descriptor.Version = ele.Value;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            ele = pluginEle.Element(&quot;SupportedVersions&quot;);</span></span>
<span class="line"><span>            if (ele != null)</span></span>
<span class="line"><span>            {</span></span>
<span class="line"><span>                //parse supported versions</span></span>
<span class="line"><span>                descriptor.SupportedVersions = ele.Value.Split(new[] { &#39;,&#39; }, StringSplitOptions.RemoveEmptyEntries)</span></span>
<span class="line"><span>                    .Select(x =&gt; x.Trim())</span></span>
<span class="line"><span>                    .ToList();</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            ele = pluginEle.Element(&quot;Author&quot;);</span></span>
<span class="line"><span>            if (ele != null)</span></span>
<span class="line"><span>                descriptor.Author = ele.Value;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            ele = pluginEle.Element(&quot;DisplayOrder&quot;);</span></span>
<span class="line"><span>            if (ele != null)</span></span>
<span class="line"><span>            {</span></span>
<span class="line"><span>                int displayOrder;</span></span>
<span class="line"><span>                int.TryParse(ele.Value, out displayOrder);</span></span>
<span class="line"><span>                descriptor.DisplayOrder = displayOrder;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            ele = pluginEle.Element(&quot;FileName&quot;);</span></span>
<span class="line"><span>            if (ele != null)</span></span>
<span class="line"><span>                descriptor.PluginFileName = ele.Value;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            if (descriptor.SupportedVersions.Count == 0)</span></span>
<span class="line"><span>                descriptor.SupportedVersions.Add(&quot;2.00&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            return descriptor;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        public static void SavePluginDescriptionFile(PluginDescriptor plugin)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            if (plugin == null)</span></span>
<span class="line"><span>                throw new ArgumentException(&quot;plugin&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            if (plugin.PluginConfigFile == null)</span></span>
<span class="line"><span>                throw new Exception(string.Format(&quot;没有加载插件 {0} 的配置文件&quot;, plugin.SystemName));</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            var doc = new XDocument(</span></span>
<span class="line"><span>                 new XDeclaration(&quot;1.0&quot;, &quot;utf-8&quot;, &quot;yes&quot;),</span></span>
<span class="line"><span>                 new XElement(&quot;Group&quot;, plugin.Group),</span></span>
<span class="line"><span>                 new XElement(&quot;FriendlyName&quot;, plugin.FriendlyName),</span></span>
<span class="line"><span>                 new XElement(&quot;SystemName&quot;, plugin.SystemName),</span></span>
<span class="line"><span>                 new XElement(&quot;Description&quot;, plugin.Description),</span></span>
<span class="line"><span>                 new XElement(&quot;Version&quot;, plugin.Version),</span></span>
<span class="line"><span>                 new XElement(&quot;SupportedVersions&quot;, string.Join(&quot;,&quot;, plugin.SupportedVersions)),</span></span>
<span class="line"><span>                 new XElement(&quot;Author&quot;, plugin.Author),</span></span>
<span class="line"><span>                 new XElement(&quot;DisplayOrder&quot;, plugin.DisplayOrder),</span></span>
<span class="line"><span>                 new XElement(&quot;FileName&quot;, plugin.PluginFileName)</span></span>
<span class="line"><span>             );</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            doc.Save(plugin.PluginConfigFile.FullName);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>加载插件-PluginFileParser</p><h1 id="_4-使用" tabindex="-1"><a class="header-anchor" href="#_4-使用"><span>4.使用</span></a></h1><h2 id="_4-0新建插件接口并继承iplugin" tabindex="-1"><a class="header-anchor" href="#_4-0新建插件接口并继承iplugin"><span>4.0新建插件接口并继承IPlugin</span></a></h2><figure><img src="`+p+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="_4-1-为插件类库添加about-xml文件配置插件信息" tabindex="-1"><a class="header-anchor" href="#_4-1-为插件类库添加about-xml文件配置插件信息"><span>4.1：为插件类库添加about.xml文件配置插件信息</span></a></h2><p><img src="http://images.cnblogs.com/OutliningIndicators/ContractedBlock.gif" alt="" loading="lazy"><img src="http://images.cnblogs.com/OutliningIndicators/ExpandedBlockStart.gif" alt="" loading="lazy"></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot; ?&gt;</span></span>
<span class="line"><span>&lt;plugin&gt;</span></span>
<span class="line"><span>  &lt;Group&gt;Sign&lt;/Group&gt;</span></span>
<span class="line"><span>  &lt;FriendlyName&gt;素材网&lt;/FriendlyName&gt;</span></span>
<span class="line"><span>  &lt;SystemName&gt;素材网&lt;/SystemName&gt;</span></span>
<span class="line"><span>  &lt;Description&gt;素材网签到&lt;/Description&gt;</span></span>
<span class="line"><span>  &lt;Version&gt;1.0&lt;/Version&gt;</span></span>
<span class="line"><span>  &lt;SupportedVersions&gt;1.0&lt;/SupportedVersions&gt;</span></span>
<span class="line"><span>  &lt;Author&gt;YiMo&lt;/Author&gt;</span></span>
<span class="line"><span>  &lt;DisplayOrder&gt;1&lt;/DisplayOrder&gt;</span></span>
<span class="line"><span>  &lt;FileName&gt;素材网.dll&lt;/FileName&gt;</span></span>
<span class="line"><span>&lt;/plugin&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>View Code</p><h2 id="_4-2在插件类库中实现isign接口-这里需要将plugindescriptor字段实现" tabindex="-1"><a class="header-anchor" href="#_4-2在插件类库中实现isign接口-这里需要将plugindescriptor字段实现"><span>4.2在插件类库中实现ISign接口 （这里需要将PluginDescriptor字段实现）</span></a></h2><figure><img src="`+c+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="_4-3-修改插件所在类库的生成事件-工具下载" tabindex="-1"><a class="header-anchor" href="#_4-3-修改插件所在类库的生成事件-工具下载"><span>4.3：修改插件所在类库的生成事件 <a href="http://files.cnblogs.com/files/morang/Tools.rar" target="_blank" rel="noopener noreferrer">工具下载</a></span></a></h2><figure><img src="'+d+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>生成......</p><h2 id="_4-4-生成解决方案后-就可以愉快的使用了" tabindex="-1"><a class="header-anchor" href="#_4-4-生成解决方案后-就可以愉快的使用了"><span>4.4：生成解决方案后，就可以愉快的使用了</span></a></h2><figure><img src="'+r+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="'+t+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>Over~~~完整Demo <a href="http://files.cnblogs.com/files/morang/%E6%8F%92%E4%BB%B6%E5%8A%A0%E8%BD%BDDemo.rar" target="_blank" rel="noopener noreferrer">代码</a><a href="http://files.cnblogs.com/files/morang/%E6%8F%92%E4%BB%B6%E5%8A%A0%E8%BD%BDDemo.rar" target="_blank" rel="noopener noreferrer">下载</a>。</p><p>最后附上使用上述方式写的的一个签到程序：<a href="https://github.com/yimogit/YimoCustomizedSign" target="_blank" rel="noopener noreferrer">https://github.com/yimogit/YimoCustomizedSign</a></p><p>现已经实现三个网站的的一键签到。后续会实现更多网站的签到功能等~~</p><p>跪求路过的大牛指点一二，也极度希望有人能和我一起来探讨，优化，扩展这个小软件和 更多更多更多的想法。</p><p>无论如何，每天都要进步一点点，基础再牢一点，效率再高一点，代码再风骚一点，生活再开心一点。每天只要一点点就好。</p>',42)]))}const g=s(u,[["render",v],["__file","plug_in_programming_realize_a_portion_chestnut_roasted_chestnuts.html.vue"]]),h=JSON.parse('{"path":"/posts/developer/plug_in_programming_realize_a_portion_chestnut_roasted_chestnuts.html","title":"插件化编程实现的一份糖炒栗子","lang":"zh-CN","frontmatter":{"title":"插件化编程实现的一份糖炒栗子","date":"2016-07-02T17:44:00.000Z","category":["Developer"],"tag":["C#","winform"],"description":"迷茫的原因是因为想得太多，做得太少。因为只是 想 真的很容易，转瞬之间就会产生无数个念头，或许是该做点什么了吧。 但是整个人都是懒的，是废的，是大脑控制不住自己的行为的。解决方案唯有一步一步的去把行为变成习惯。 坚持一件事挺不容易的，不论结果的好坏，过程中总有收获的，坚持，不会是一件坏事。 胡言乱语结束~~~ 下面是记录分享的一点东西~~请笑纳 0.结...","head":[["meta",{"property":"og:url","content":"https://www.yimo.link/posts/developer/plug_in_programming_realize_a_portion_chestnut_roasted_chestnuts.html"}],["meta",{"property":"og:site_name","content":"易墨网"}],["meta",{"property":"og:title","content":"插件化编程实现的一份糖炒栗子"}],["meta",{"property":"og:description","content":"迷茫的原因是因为想得太多，做得太少。因为只是 想 真的很容易，转瞬之间就会产生无数个念头，或许是该做点什么了吧。 但是整个人都是懒的，是废的，是大脑控制不住自己的行为的。解决方案唯有一步一步的去把行为变成习惯。 坚持一件事挺不容易的，不论结果的好坏，过程中总有收获的，坚持，不会是一件坏事。 胡言乱语结束~~~ 下面是记录分享的一点东西~~请笑纳 0.结..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"http://images.cnblogs.com/OutliningIndicators/ContractedBlock.gif"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-10-29T01:54:01.000Z"}],["meta",{"property":"article:tag","content":"C#"}],["meta",{"property":"article:tag","content":"winform"}],["meta",{"property":"article:published_time","content":"2016-07-02T17:44:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-10-29T01:54:01.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"插件化编程实现的一份糖炒栗子\\",\\"image\\":[\\"http://images.cnblogs.com/OutliningIndicators/ContractedBlock.gif\\",\\"http://images.cnblogs.com/OutliningIndicators/ExpandedBlockStart.gif\\",\\"http://images.cnblogs.com/OutliningIndicators/ContractedBlock.gif\\",\\"http://images.cnblogs.com/OutliningIndicators/ExpandedBlockStart.gif\\",\\"http://images.cnblogs.com/OutliningIndicators/ContractedBlock.gif\\",\\"http://images.cnblogs.com/OutliningIndicators/ExpandedBlockStart.gif\\",\\"http://images.cnblogs.com/OutliningIndicators/ContractedBlock.gif\\",\\"http://images.cnblogs.com/OutliningIndicators/ExpandedBlockStart.gif\\",\\"http://images.cnblogs.com/OutliningIndicators/ContractedBlock.gif\\",\\"http://images.cnblogs.com/OutliningIndicators/ExpandedBlockStart.gif\\"],\\"datePublished\\":\\"2016-07-02T17:44:00.000Z\\",\\"dateModified\\":\\"2024-10-29T01:54:01.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"易墨\\",\\"url\\":\\"https://www.yimo.link\\"}]}"]]},"headers":[{"level":2,"title":"4.0新建插件接口并继承IPlugin","slug":"_4-0新建插件接口并继承iplugin","link":"#_4-0新建插件接口并继承iplugin","children":[]},{"level":2,"title":"4.1：为插件类库添加about.xml文件配置插件信息","slug":"_4-1-为插件类库添加about-xml文件配置插件信息","link":"#_4-1-为插件类库添加about-xml文件配置插件信息","children":[]},{"level":2,"title":"4.2在插件类库中实现ISign接口 （这里需要将PluginDescriptor字段实现）","slug":"_4-2在插件类库中实现isign接口-这里需要将plugindescriptor字段实现","link":"#_4-2在插件类库中实现isign接口-这里需要将plugindescriptor字段实现","children":[]},{"level":2,"title":"4.3：修改插件所在类库的生成事件 工具下载","slug":"_4-3-修改插件所在类库的生成事件-工具下载","link":"#_4-3-修改插件所在类库的生成事件-工具下载","children":[]},{"level":2,"title":"4.4：生成解决方案后，就可以愉快的使用了","slug":"_4-4-生成解决方案后-就可以愉快的使用了","link":"#_4-4-生成解决方案后-就可以愉快的使用了","children":[]}],"git":{"createdTime":1730114142000,"updatedTime":1730166841000,"contributors":[{"name":"yimo","email":"yimo@wikiglobal.com","commits":2}]},"readingTime":{"minutes":5.31,"words":1592},"filePathRelative":"posts/developer/plug_in_programming_realize_a_portion_chestnut_roasted_chestnuts.md","localizedDate":"2016年7月2日","excerpt":"<p>迷茫的原因是因为想得太多，做得太少。因为只是 想 真的很容易，转瞬之间就会产生无数个念头，或许是该做点什么了吧。</p>\\n<p>但是整个人都是懒的，是废的，是大脑控制不住自己的行为的。解决方案唯有一步一步的去把行为变成习惯。</p>\\n<p>坚持一件事挺不容易的，不论结果的好坏，过程中总有收获的，坚持，不会是一件坏事。</p>\\n<p>胡言乱语结束~~~</p>\\n<p>下面是记录分享的一点东西~~请笑纳</p>\\n<h1>0.结构一览</h1>\\n<figure><figcaption></figcaption></figure>\\n<h1>1.定义插件接口</h1>\\n<p><img src=\\"http://images.cnblogs.com/OutliningIndicators/ContractedBlock.gif\\" alt=\\"\\" loading=\\"lazy\\"><img src=\\"http://images.cnblogs.com/OutliningIndicators/ExpandedBlockStart.gif\\" alt=\\"\\" loading=\\"lazy\\"></p>","autoDesc":true}');export{g as comp,h as data};
