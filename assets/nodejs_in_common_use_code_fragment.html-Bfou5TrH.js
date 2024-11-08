import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as i,e as a,o as l}from"./app-DNdAs5Lt.js";const e={};function p(d,s){return l(),i("div",null,s[0]||(s[0]=[a(`<h2 id="自动创建目录-多级" tabindex="-1"><a class="header-anchor" href="#自动创建目录-多级"><span>自动创建目录(多级)</span></a></h2><blockquote><p>相比起使用递归创建，调用 sheljsl 模块简单得多</p></blockquote><div class="language-js line-numbers-mode" data-highlighter="shiki" data-ext="js" data-title="js" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">const</span><span style="--shiki-light:#986801;--shiki-dark:#E5C07B;"> shell</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> require</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;shelljs&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">const</span><span style="--shiki-light:#986801;--shiki-dark:#E5C07B;"> fs</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> require</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;fs&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">if</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> (</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">!</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;">fs</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">existsSync</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">dir</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)) {</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;">    shell</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">mkdir</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;-p&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">dir</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="自动创建目录函数" tabindex="-1"><a class="header-anchor" href="#自动创建目录函数"><span>自动创建目录函数</span></a></h3><div class="language-js line-numbers-mode" data-highlighter="shiki" data-ext="js" data-title="js" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">/**</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"> * 创建文件，自动创建目录</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"> */</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">function</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> createFile</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;">newPath</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;">txt</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">) {</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">  var</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> dir</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> require</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;path&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">).</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">dirname</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">newPath</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">  if</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> (</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">!</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">require</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;fs&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">).</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">existsSync</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">dir</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)) {</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">    require</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;shelljs&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">).</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">mkdir</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;-p&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">dir</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">  require</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;fs&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">).</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">writeFileSync</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">newPath</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">txt</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="ejs-自定义函数的使用" tabindex="-1"><a class="header-anchor" href="#ejs-自定义函数的使用"><span>ejs 自定义函数的使用</span></a></h2><p>版本：2.6.1</p><p>安装：<code>npm install ejs</code></p><p>在模板中使用自定义函数处理数据的Demo</p><div class="language-js line-numbers-mode" data-highlighter="shiki" data-ext="js" data-title="js" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">const</span><span style="--shiki-light:#986801;--shiki-dark:#E5C07B;"> ejs</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> require</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;ejs&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;">ejs</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">delimiter</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;%&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">// 自定义函数 返回首字母大写的字符串</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">const</span><span style="--shiki-light:#986801;--shiki-dark:#E5C07B;"> def_func</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">{</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">  capitalize</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;">str</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">) {</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    return</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> str</span><span style="--shiki-light:#0184BC;--shiki-dark:#C678DD;"> ?</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> (</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;">str</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">substring</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">).</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">toUpperCase</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">() </span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">+</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;"> str</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">substring</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)) </span><span style="--shiki-light:#0184BC;--shiki-dark:#C678DD;">:</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> str</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">const</span><span style="--shiki-light:#986801;--shiki-dark:#E5C07B;"> config</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">{</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    title</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;me is test&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">var</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> result</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;">ejs</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">render</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;&lt;%= capitalize(title) %&gt;&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;">Object</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">assign</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">def_func</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">config</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)) </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">//Test</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">//const path=&#39;./template/test.txt&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">//ejs.renderFile(path, Object.assign(def_func, config), {},function(err,str){</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">//     //str 渲染结果</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">//})</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="获取指定目录下所有指定格式文件" tabindex="-1"><a class="header-anchor" href="#获取指定目录下所有指定格式文件"><span>获取指定目录下所有指定格式文件</span></a></h2><blockquote><p>readAllFile(root,reg) 参数传递正则</p></blockquote><ul><li><p>获取所有js文件：<code>readAllFile(&#39;D:/..&#39;,/\\.js$/)</code></p></li><li><p>获取所有json文件：<code>readAllFile(&#39;D:/..&#39;,/\\.json$/)</code></p></li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span></span></span>
<span class="line"><span>/*</span></span>
<span class="line"><span></span></span>
<span class="line"><span> * 读取指定文件夹下的全部文件，可通过正则进行过滤，返回文件路径数组</span></span>
<span class="line"><span></span></span>
<span class="line"><span> * @param root 指定文件夹路径</span></span>
<span class="line"><span></span></span>
<span class="line"><span> * @param reg 对文件的过滤正则表达式,可选参数，示例： 获取指定目录下所有js文件：/\\.js$/</span></span>
<span class="line"><span></span></span>
<span class="line"><span> * </span></span>
<span class="line"><span></span></span>
<span class="line"><span>*/</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function readAllFile(root, reg) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  var resultArr = []</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return (function fn(root, reg) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    var fs = require(&#39;fs&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    if (fs.existsSync(root)) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      //文件或文件夹存在</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      var stat = fs.lstatSync(root) // 对于不存在的文件或文件夹，此函数会报错</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      if (stat.isDirectory()) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 文件夹</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        var files = fs.readdirSync(root)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        files.forEach(function(file) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>          var t = fn(root + &#39;/&#39; + file, reg)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>          resultArr = resultArr.concat(t)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        })</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      } else {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        if (reg !== undefined) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>          if (typeof reg.test == &#39;function&#39; &amp;&amp; reg.test(root)) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            resultArr.push(root)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>          }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        } else {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>          resultArr.push(root)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    return resultArr</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  })()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="nodejs-获取传入参数的封装" tabindex="-1"><a class="header-anchor" href="#nodejs-获取传入参数的封装"><span>nodejs 获取传入参数的封装</span></a></h2><blockquote><p>传入需要获取的 keys及前缀(可选,默认--)</p></blockquote><p>调用：<code>node index.js --target test</code></p><p>接收：<code>const config=loadConifg([&#39;target&#39;],&#39;--&#39;)</code> //config.target-----&gt;test</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span></span></span>
<span class="line"><span>/**</span></span>
<span class="line"><span></span></span>
<span class="line"><span> * 根据参数数组加载参数</span></span>
<span class="line"><span></span></span>
<span class="line"><span> * @param {Array} params 键值</span></span>
<span class="line"><span></span></span>
<span class="line"><span> * @param {String} prefix 前缀 默认为 --</span></span>
<span class="line"><span></span></span>
<span class="line"><span> */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function loadConfig(params, prefix) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  if (typeof params !== &#39;object&#39; || params.length === 0) return {}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  var config = {}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  prefix = prefix || &#39;--&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  var args = process.argv</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  for (let i = 0; i &lt; args.length; i++) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    var key = args[i].indexOf(prefix) === 0 ? args[i].replace(prefix, &#39;&#39;) : &#39;&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    if (key &amp;&amp; params.indexOf(key) &gt; -1 &amp;&amp; i &lt; args.length - 1) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      config[key] = args[i + 1]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return config</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="递归根据最后一级id找父节点属性" tabindex="-1"><a class="header-anchor" href="#递归根据最后一级id找父节点属性"><span>递归根据最后一级ID找父节点属性</span></a></h2><h3 id="方法定义" tabindex="-1"><a class="header-anchor" href="#方法定义"><span>方法定义</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span></span></span>
<span class="line"><span>/**</span></span>
<span class="line"><span></span></span>
<span class="line"><span> * 查找父节点</span></span>
<span class="line"><span></span></span>
<span class="line"><span> * @param {String} key 对象匹配键值</span></span>
<span class="line"><span></span></span>
<span class="line"><span> * @param {String} value 对象匹配值</span></span>
<span class="line"><span></span></span>
<span class="line"><span> * @param {Array} items 带children节点的数组</span></span>
<span class="line"><span></span></span>
<span class="line"><span> * @param {Array} resultArr 父对象结果集</span></span>
<span class="line"><span></span></span>
<span class="line"><span> */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function fn(key, value, items, resultArr) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  var checkResult = false</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  for (let index = 0; index &lt; items.length; index++) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    const e = items[index]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    checkResult =</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      e[key] === value || (e.children &amp;&amp; fn(key, value, e.children, resultArr))</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    if (checkResult) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      resultArr.push(e)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      break</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return checkResult</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="调用" tabindex="-1"><a class="header-anchor" href="#调用"><span>调用</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span></span></span>
<span class="line"><span>var arr = []</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn(</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  &#39;value&#39;,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  2,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  [</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      text: &#39;t1&#39;,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      value: 1,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      children: [</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>          text: &#39;t2&#39;,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>          value: 2</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      ]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  ],</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  arr</span></span>
<span class="line"><span></span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>console.log(arr)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,24)]))}const h=n(e,[["render",p],["__file","nodejs_in_common_use_code_fragment.html.vue"]]),c=JSON.parse(`{"path":"/posts/developer/nodejs_in_common_use_code_fragment.html","title":"nodejs常用代码片段","lang":"zh-CN","frontmatter":{"title":"nodejs常用代码片段","date":"2018-05-24T13:14:00.000Z","category":["Developer"],"tag":["node"],"description":"自动创建目录(多级) 相比起使用递归创建，调用 sheljsl 模块简单得多 自动创建目录函数 ejs 自定义函数的使用 版本：2.6.1 安装：npm install ejs 在模板中使用自定义函数处理数据的Demo 获取指定目录下所有指定格式文件 readAllFile(root,reg) 参数传递正则 获取所有js文件：readAllFile('...","head":[["meta",{"property":"og:url","content":"https://www.yimo.link/posts/developer/nodejs_in_common_use_code_fragment.html"}],["meta",{"property":"og:site_name","content":"易墨网"}],["meta",{"property":"og:title","content":"nodejs常用代码片段"}],["meta",{"property":"og:description","content":"自动创建目录(多级) 相比起使用递归创建，调用 sheljsl 模块简单得多 自动创建目录函数 ejs 自定义函数的使用 版本：2.6.1 安装：npm install ejs 在模板中使用自定义函数处理数据的Demo 获取指定目录下所有指定格式文件 readAllFile(root,reg) 参数传递正则 获取所有js文件：readAllFile('..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-10-28T11:15:42.000Z"}],["meta",{"property":"article:tag","content":"node"}],["meta",{"property":"article:published_time","content":"2018-05-24T13:14:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-10-28T11:15:42.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"nodejs常用代码片段\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2018-05-24T13:14:00.000Z\\",\\"dateModified\\":\\"2024-10-28T11:15:42.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"易墨\\",\\"url\\":\\"https://www.yimo.link\\"}]}"]]},"headers":[{"level":2,"title":"自动创建目录(多级)","slug":"自动创建目录-多级","link":"#自动创建目录-多级","children":[{"level":3,"title":"自动创建目录函数","slug":"自动创建目录函数","link":"#自动创建目录函数","children":[]}]},{"level":2,"title":"ejs 自定义函数的使用","slug":"ejs-自定义函数的使用","link":"#ejs-自定义函数的使用","children":[]},{"level":2,"title":"获取指定目录下所有指定格式文件","slug":"获取指定目录下所有指定格式文件","link":"#获取指定目录下所有指定格式文件","children":[]},{"level":2,"title":"nodejs 获取传入参数的封装","slug":"nodejs-获取传入参数的封装","link":"#nodejs-获取传入参数的封装","children":[]},{"level":2,"title":"递归根据最后一级ID找父节点属性","slug":"递归根据最后一级id找父节点属性","link":"#递归根据最后一级id找父节点属性","children":[{"level":3,"title":"方法定义","slug":"方法定义","link":"#方法定义","children":[]},{"level":3,"title":"调用","slug":"调用","link":"#调用","children":[]}]}],"git":{"createdTime":1730114142000,"updatedTime":1730114142000,"contributors":[{"name":"yimo","email":"yimo@wikiglobal.com","commits":1}]},"readingTime":{"minutes":2.19,"words":657},"filePathRelative":"posts/developer/nodejs_in_common_use_code_fragment.md","localizedDate":"2018年5月24日","excerpt":"<h2>自动创建目录(多级)</h2>\\n<blockquote>\\n<p>相比起使用递归创建，调用 sheljsl 模块简单得多</p>\\n</blockquote>\\n<div class=\\"language-js line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext=\\"js\\" data-title=\\"js\\" style=\\"--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes one-light one-dark-pro vp-code\\"><code><span class=\\"line\\"></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#A626A4;--shiki-dark:#C678DD\\">const</span><span style=\\"--shiki-light:#986801;--shiki-dark:#E5C07B\\"> shell</span><span style=\\"--shiki-light:#0184BC;--shiki-dark:#56B6C2\\"> =</span><span style=\\"--shiki-light:#4078F2;--shiki-dark:#61AFEF\\"> require</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">(</span><span style=\\"--shiki-light:#50A14F;--shiki-dark:#98C379\\">'shelljs'</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">)</span></span>\\n<span class=\\"line\\"></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#A626A4;--shiki-dark:#C678DD\\">const</span><span style=\\"--shiki-light:#986801;--shiki-dark:#E5C07B\\"> fs</span><span style=\\"--shiki-light:#0184BC;--shiki-dark:#56B6C2\\"> =</span><span style=\\"--shiki-light:#4078F2;--shiki-dark:#61AFEF\\"> require</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">(</span><span style=\\"--shiki-light:#50A14F;--shiki-dark:#98C379\\">'fs'</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">)</span></span>\\n<span class=\\"line\\"></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#A626A4;--shiki-dark:#C678DD\\">if</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\"> (</span><span style=\\"--shiki-light:#0184BC;--shiki-dark:#56B6C2\\">!</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#E5C07B\\">fs</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">.</span><span style=\\"--shiki-light:#4078F2;--shiki-dark:#61AFEF\\">existsSync</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">(</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#E06C75\\">dir</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">)) {</span></span>\\n<span class=\\"line\\"></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#E5C07B\\">    shell</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">.</span><span style=\\"--shiki-light:#4078F2;--shiki-dark:#61AFEF\\">mkdir</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">(</span><span style=\\"--shiki-light:#50A14F;--shiki-dark:#98C379\\">'-p'</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">, </span><span style=\\"--shiki-light:#383A42;--shiki-dark:#E06C75\\">dir</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">)</span></span>\\n<span class=\\"line\\"></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">}</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}`);export{h as comp,c as data};
