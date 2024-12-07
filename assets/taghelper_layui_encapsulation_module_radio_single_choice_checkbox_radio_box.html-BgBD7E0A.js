import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,e,o as i}from"./app-BfNe1MN3.js";const l={};function p(d,s){return i(),a("div",null,s[0]||(s[0]=[e(`<h2 id="taghelper-layui封装组件之radio单选框" tabindex="-1"><a class="header-anchor" href="#taghelper-layui封装组件之radio单选框"><span>TagHelper+Layui封装组件之Radio单选框</span></a></h2><ul><li><p>标签名称：<code>cl-radio</code></p></li><li><p>标签属性：</p><ul><li><p><code>asp-for</code>:绑定的字段，必须指定</p></li><li><p><code>asp-items</code>:绑定单选项 类型为：<code>IEnumerable&lt;SelectListItem&gt;</code></p></li></ul></li></ul><p>太简单了，直接上代码了</p><h2 id="radiotaghelper代码" tabindex="-1"><a class="header-anchor" href="#radiotaghelper代码"><span>RadioTagHelper代码</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span></span></span>
<span class="line"><span>using System;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>using System.Collections.Generic;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>using Microsoft.AspNetCore.Mvc.Rendering;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>using Microsoft.AspNetCore.Mvc.ViewFeatures;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>using Microsoft.AspNetCore.Razor.TagHelpers;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>namespace LayuiTagHelper.TagHelpers</span></span>
<span class="line"><span></span></span>
<span class="line"><span>{</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /// &lt;summary&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /// 单选框</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /// &lt;/summary&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    [HtmlTargetElement(RadioTagName)]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public class RadioTagHelper : TagHelper</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        private const string RadioTagName = &quot;cl-radio&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        private const string ForAttributeName = &quot;asp-for&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        private const string ItemsAttributeName = &quot;asp-items&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>        [ViewContext]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        public ViewContext ViewContext { get; set; }</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>        [HtmlAttributeName(ForAttributeName)]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        public ModelExpression For { get; set; }</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>        [HtmlAttributeName(ItemsAttributeName)]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        public IEnumerable&lt;SelectListItem&gt; Items { get; set; }</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>        public override void Process(TagHelperContext context, TagHelperOutput output)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            if (For == null)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                throw new ArgumentException(&quot;必须绑定模型&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            foreach (var item in Items)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                var radio = new TagBuilder(&quot;input&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                radio.TagRenderMode = TagRenderMode.SelfClosing;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                radio.Attributes.Add(&quot;id&quot;, ViewContext.ViewData.TemplateInfo.GetFullHtmlFieldName(For.Name));</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                radio.Attributes.Add(&quot;name&quot;, ViewContext.ViewData.TemplateInfo.GetFullHtmlFieldName(For.Name));</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                radio.Attributes.Add(&quot;value&quot;, item.Value);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                radio.Attributes.Add(&quot;title&quot;, item.Text);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                radio.Attributes.Add(&quot;type&quot;, &quot;radio&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                if (item.Disabled)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                    radio.Attributes.Add(&quot;disabled&quot;, &quot;disabled&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                if (item.Selected || item.Value == For.Model?.ToString())</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                    radio.Attributes.Add(&quot;checked&quot;, &quot;checked&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                output.Content.AppendHtml(radio);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            output.TagName = &quot;&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="使用示例" tabindex="-1"><a class="header-anchor" href="#使用示例"><span>使用示例</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span></span></span>
<span class="line"><span>@{</span></span>
<span class="line"><span></span></span>
<span class="line"><span>string sex=&quot;男&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>var Items=new List&lt;SelectListItem&gt;()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>           {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                new SelectListItem() { Text = &quot;男&quot;, Value = &quot;男&quot; },</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                new SelectListItem() { Text = &quot;女&quot;, Value = &quot;女&quot;},</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                new SelectListItem() { Text = &quot;不详&quot;, Value = &quot;不详&quot;,Disabled=true }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>           };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;cl-radio asp-items=&quot;@Items&quot; asp-for=&quot;sex&quot;&gt;&lt;/cl-radio&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,7)]))}const r=n(l,[["render",p],["__file","taghelper_layui_encapsulation_module_radio_single_choice_checkbox_radio_box.html.vue"]]),u=JSON.parse('{"path":"/posts/web/taghelper_layui_encapsulation_module_radio_single_choice_checkbox_radio_box.html","title":"TagHelper+Layui封装组件之Radio单选框","lang":"zh-CN","frontmatter":{"title":"TagHelper+Layui封装组件之Radio单选框","date":"2017-10-08T23:38:00.000Z","category":["Web"],"tag":[".net core"],"description":"TagHelper+Layui封装组件之Radio单选框 标签名称：cl-radio 标签属性： asp-for:绑定的字段，必须指定 asp-items:绑定单选项 类型为：IEnumerable<SelectListItem> 太简单了，直接上代码了 RadioTagHelper代码 使用示例","head":[["meta",{"property":"og:url","content":"https://www.yimo.link/posts/web/taghelper_layui_encapsulation_module_radio_single_choice_checkbox_radio_box.html"}],["meta",{"property":"og:site_name","content":"易墨网"}],["meta",{"property":"og:title","content":"TagHelper+Layui封装组件之Radio单选框"}],["meta",{"property":"og:description","content":"TagHelper+Layui封装组件之Radio单选框 标签名称：cl-radio 标签属性： asp-for:绑定的字段，必须指定 asp-items:绑定单选项 类型为：IEnumerable<SelectListItem> 太简单了，直接上代码了 RadioTagHelper代码 使用示例"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-10-28T11:15:42.000Z"}],["meta",{"property":"article:tag","content":".net core"}],["meta",{"property":"article:published_time","content":"2017-10-08T23:38:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-10-28T11:15:42.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"TagHelper+Layui封装组件之Radio单选框\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2017-10-08T23:38:00.000Z\\",\\"dateModified\\":\\"2024-10-28T11:15:42.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"易墨\\",\\"url\\":\\"https://www.yimo.link\\"}]}"]]},"headers":[{"level":2,"title":"TagHelper+Layui封装组件之Radio单选框","slug":"taghelper-layui封装组件之radio单选框","link":"#taghelper-layui封装组件之radio单选框","children":[]},{"level":2,"title":"RadioTagHelper代码","slug":"radiotaghelper代码","link":"#radiotaghelper代码","children":[]},{"level":2,"title":"使用示例","slug":"使用示例","link":"#使用示例","children":[]}],"git":{"createdTime":1730114142000,"updatedTime":1730114142000,"contributors":[{"name":"yimo","email":"yimo@wikiglobal.com","commits":1}]},"readingTime":{"minutes":0.85,"words":256},"filePathRelative":"posts/web/taghelper_layui_encapsulation_module_radio_single_choice_checkbox_radio_box.md","localizedDate":"2017年10月8日","excerpt":"<h2>TagHelper+Layui封装组件之Radio单选框</h2>\\n<ul>\\n<li>\\n<p>标签名称：<code>cl-radio</code></p>\\n</li>\\n<li>\\n<p>标签属性：</p>\\n<ul>\\n<li>\\n<p><code>asp-for</code>:绑定的字段，必须指定</p>\\n</li>\\n<li>\\n<p><code>asp-items</code>:绑定单选项 类型为：<code>IEnumerable&lt;SelectListItem&gt;</code></p>\\n</li>\\n</ul>\\n</li>\\n</ul>\\n<p>太简单了，直接上代码了</p>\\n<h2>RadioTagHelper代码</h2>","autoDesc":true}');export{r as comp,u as data};
