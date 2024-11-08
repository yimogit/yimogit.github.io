import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,e as n,b as l,o as i}from"./app-s030diJy.js";const p={};function t(r,s){return i(),a("div",null,s[0]||(s[0]=[n('<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言"><span>前言</span></a></h2><blockquote><p>在网站找了一大圈都是问题没有答案，记录记录谨防踩坑</p></blockquote><blockquote><p>layui版本：<a href="https://github.com/sentsin/layui" target="_blank" rel="noopener noreferrer">layui-v1.0.9_rls</a></p></blockquote><blockquote><p>jQuery-Autocomplete版本： <a href="https://github.com/devbridge/jQuery-Autocomplete" target="_blank" rel="noopener noreferrer">1.4.1</a></p></blockquote><h2 id="示例" tabindex="-1"><a class="header-anchor" href="#示例"><span>示例</span></a></h2><p>demo地址：<a href="http://runjs.cn/detail/jzararyv" target="_blank" rel="noopener noreferrer">http://runjs.cn/detail/jzararyv</a></p>',6),l("iframe",{style:{width:"100%",height:"250px"},src:"http://sandbox.runjs.cn/show/jzararyv",allowfullscreen:"allowfullscreen",frameborder:"0"},null,-1),n(`<p>Autocomplete插件官方示例：<a href="http://devbridge.github.io/jQuery-Autocomplete/" target="_blank" rel="noopener noreferrer">http://devbridge.github.io/jQuery-Autocomplete/</a></p><h2 id="整合步骤" tabindex="-1"><a class="header-anchor" href="#整合步骤"><span>整合步骤</span></a></h2><h3 id="_1-下载jquery-autocomplete-js到本地-传送门" tabindex="-1"><a class="header-anchor" href="#_1-下载jquery-autocomplete-js到本地-传送门"><span>1. 下载jQuery-Autocomplete.js到本地，<a href="https://github.com/devbridge/jQuery-Autocomplete/blob/master/dist/jquery.autocomplete.js" target="_blank" rel="noopener noreferrer">传送门</a></span></a></h3><h3 id="_2-修改下载的jquery-autocomplete-js的第22行代码-替换jquery为layui中的jquery" tabindex="-1"><a class="header-anchor" href="#_2-修改下载的jquery-autocomplete-js的第22行代码-替换jquery为layui中的jquery"><span>2. 修改下载的jquery.autocomplete.js的第22行代码，替换jquery为layui中的jquery</span></a></h3><blockquote><p>我试图在layui.j后直接对window.jQuery复制，但是好像并没有什么卵用</p></blockquote><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span></span></span>
<span class="line"><span>// Browser globals</span></span>
<span class="line"><span></span></span>
<span class="line"><span>factory(jQquery);</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>//↓</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Browser globals 使用layui中的jquery</span></span>
<span class="line"><span></span></span>
<span class="line"><span>layui.use([&#39;jquery&#39;], function () {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      factory(layui.jquery);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>});</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-在页面中使用" tabindex="-1"><a class="header-anchor" href="#_3-在页面中使用"><span>3. 在页面中使用</span></a></h3><p>完整代码见：http://runjs.cn/detail/jzararyv</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span></span></span>
<span class="line"><span>&lt;html&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;head&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;style&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;!--官网选项列表的样式--&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>       .autocomplete-suggestions { -webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box; border: 1px solid #999; background: #FFF; cursor: default; overflow: auto; -webkit-box-shadow: 1px 4px 3px rgba(50, 50, 50, 0.64); -moz-box-shadow: 1px 4px 3px rgba(50, 50, 50, 0.64); box-shadow: 1px 4px 3px rgba(50, 50, 50, 0.64); z-index: 29891015 !important;}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        .autocomplete-suggestion { padding: 2px 5px; white-space: nowrap; overflow: hidden; }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        .autocomplete-no-suggestion { padding: 2px 5px;}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        .autocomplete-selected { background: #F0F0F0; }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        .autocomplete-suggestions strong { font-weight: bold; color: #000; }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        .autocomplete-group { padding: 2px 5px; font-weight: bold; font-size: 16px; color: #000; display: block; border-bottom: 1px solid #000; }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;/style&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;/head&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;body&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;input id=&quot;qaTags&quot; class=&quot;ym-qatitle &quot; placeholder=&quot;问题标签,多个以,分隔&quot; autocomplete=&quot;off&quot; /&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;!--layui.js,autocompelete.js引用--&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;script&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>var $=layui.jquery;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>$(function(){</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    $(&#39;#qaTags&#39;).autocomplete({</span></span>
<span class="line"><span></span></span>
<span class="line"><span>       lookup: [{data:&quot;data&quot;,value&quot;value&quot;}]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span></span></span>
<span class="line"><span>});</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;/script&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;/body&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;/html&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-若要在layer弹层中显示-autocomplete-js的z-index值就略微有点小了-故需要设置显示块的层级" tabindex="-1"><a class="header-anchor" href="#_4-若要在layer弹层中显示-autocomplete-js的z-index值就略微有点小了-故需要设置显示块的层级"><span>4. 若要在layer弹层中显示，autocomplete.js的z-index值就略微有点小了，故需要设置显示块的层级</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span></span></span>
<span class="line"><span>.autocomplete-suggestions {z-index: 29891015 !important;}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>或者修改autocomplete.js中的默认zIndex值</p>`,12)]))}const d=e(p,[["render",t],["__file","layui_use_autocomplete_js.html.vue"]]),u=JSON.parse('{"path":"/posts/web/layui_use_autocomplete_js.html","title":"layui中使用autocomplete.js","lang":"zh-CN","frontmatter":{"title":"layui中使用autocomplete.js","date":"2017-07-20T18:03:00.000Z","category":["Web"],"tag":["web开发"],"description":"前言 在网站找了一大圈都是问题没有答案，记录记录谨防踩坑 layui版本：layui-v1.0.9_rls jQuery-Autocomplete版本： 1.4.1 示例 demo地址：http://runjs.cn/detail/jzararyv Autocomplete插件官方示例：http://devbridge.github.io/jQuery...","head":[["meta",{"property":"og:url","content":"https://www.yimo.link/posts/web/layui_use_autocomplete_js.html"}],["meta",{"property":"og:site_name","content":"易墨网"}],["meta",{"property":"og:title","content":"layui中使用autocomplete.js"}],["meta",{"property":"og:description","content":"前言 在网站找了一大圈都是问题没有答案，记录记录谨防踩坑 layui版本：layui-v1.0.9_rls jQuery-Autocomplete版本： 1.4.1 示例 demo地址：http://runjs.cn/detail/jzararyv Autocomplete插件官方示例：http://devbridge.github.io/jQuery..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-10-28T11:15:42.000Z"}],["meta",{"property":"article:tag","content":"web开发"}],["meta",{"property":"article:published_time","content":"2017-07-20T18:03:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-10-28T11:15:42.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"layui中使用autocomplete.js\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2017-07-20T18:03:00.000Z\\",\\"dateModified\\":\\"2024-10-28T11:15:42.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"易墨\\",\\"url\\":\\"https://www.yimo.link\\"}]}"]]},"headers":[{"level":2,"title":"前言","slug":"前言","link":"#前言","children":[]},{"level":2,"title":"示例","slug":"示例","link":"#示例","children":[]},{"level":2,"title":"整合步骤","slug":"整合步骤","link":"#整合步骤","children":[{"level":3,"title":"1.  下载jQuery-Autocomplete.js到本地，传送门","slug":"_1-下载jquery-autocomplete-js到本地-传送门","link":"#_1-下载jquery-autocomplete-js到本地-传送门","children":[]},{"level":3,"title":"2. 修改下载的jquery.autocomplete.js的第22行代码，替换jquery为layui中的jquery","slug":"_2-修改下载的jquery-autocomplete-js的第22行代码-替换jquery为layui中的jquery","link":"#_2-修改下载的jquery-autocomplete-js的第22行代码-替换jquery为layui中的jquery","children":[]},{"level":3,"title":"3.  在页面中使用","slug":"_3-在页面中使用","link":"#_3-在页面中使用","children":[]},{"level":3,"title":"4. 若要在layer弹层中显示，autocomplete.js的z-index值就略微有点小了，故需要设置显示块的层级","slug":"_4-若要在layer弹层中显示-autocomplete-js的z-index值就略微有点小了-故需要设置显示块的层级","link":"#_4-若要在layer弹层中显示-autocomplete-js的z-index值就略微有点小了-故需要设置显示块的层级","children":[]}]}],"git":{"createdTime":1730114142000,"updatedTime":1730114142000,"contributors":[{"name":"yimo","email":"yimo@wikiglobal.com","commits":1}]},"readingTime":{"minutes":1.35,"words":404},"filePathRelative":"posts/web/layui_use_autocomplete_js.md","localizedDate":"2017年7月20日","excerpt":"<h2>前言</h2>\\n<blockquote>\\n<p>在网站找了一大圈都是问题没有答案，记录记录谨防踩坑</p>\\n</blockquote>\\n<blockquote>\\n<p>layui版本：<a href=\\"https://github.com/sentsin/layui\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">layui-v1.0.9_rls</a></p>\\n</blockquote>\\n<blockquote>\\n<p>jQuery-Autocomplete版本： <a href=\\"https://github.com/devbridge/jQuery-Autocomplete\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">1.4.1</a></p>\\n</blockquote>","autoDesc":true}');export{d as comp,u as data};
