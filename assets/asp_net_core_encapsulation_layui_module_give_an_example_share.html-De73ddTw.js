import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,e,o as i}from"./app-s030diJy.js";const l={};function p(c,s){return i(),a("div",null,s[0]||(s[0]=[e(`<p>用什么封装？这里只是用了TagHelper，是啥？自己瞅<a href="https://docs.microsoft.com/zh-cn/aspnet/core/mvc/views/tag-helpers/authoring" target="_blank" rel="noopener noreferrer">文档</a>去</p><p>在学习使用TagHelper的时候，最希望的就是能有个Demo能够让自己作为参考</p><p>怎么去封装一个组件？</p><p>不同的情况怎么去实现？</p><p>有没有更好更高效的方法？</p><p>找啊找啊找，最后跑去看了看mvc中的<a href="https://github.com/aspnet/Mvc/blob/dev/src/Microsoft.AspNetCore.Mvc.TagHelpers/" target="_blank" rel="noopener noreferrer">TagHelpers</a>，再好好瞅了瞅<a href="https://docs.microsoft.com/zh-cn/aspnet/core/mvc/views/tag-helpers/authoring" target="_blank" rel="noopener noreferrer">TagHelper的文档</a></p><p>勉强折腾了几个组件出来，本来想一个组件一个组件写文章的，但是发现国庆已经结束了~</p><p><a href="https://coding.net/u/yimocoding/p/WeDemo/git/archive/LayuiTagHelper" target="_blank" rel="noopener noreferrer">Demo下载</a> <a href="https://dn-coding-net-production-pp.qbox.me/c77da03e-5911-4952-9b2a-06285df05f56.gif" target="_blank" rel="noopener noreferrer">效果预览</a></p><p>代码仅供参考,有不同的意见也忘不吝赐教</p><h2 id="checkbox复选框组件封装" tabindex="-1"><a class="header-anchor" href="#checkbox复选框组件封装"><span>Checkbox复选框组件封装</span></a></h2><ul><li><p>标签名称：<code>cl-checkbox</code></p></li><li><p>标签属性：</p><ul><li><p><code>asp-for</code>:绑定的字段，必须指定</p></li><li><p><code>asp-items</code>:绑定单选项 类型为：<code>IEnumerable&lt;SelectListItem&gt;</code></p></li><li><p><code>asp-skin</code>:layui的皮肤样式，默认or原始 <img src="https://dn-coding-net-production-pp.qbox.me/69db93df-b59b-4c4e-bf7c-961b18435c56.png" alt="图片" loading="lazy"></p></li><li><p><code>asp-title</code>:若只是一个复选框时显示的文字，且未指定items，默认Checkbox的值为true</p></li></ul></li></ul><h3 id="为什么要封装" tabindex="-1"><a class="header-anchor" href="#为什么要封装"><span>为什么要封装？</span></a></h3><p>举个栗子 --- 绑定一个复选框组</p><p>原始写法：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span></span></span>
<span class="line"><span>@foreach (var item in Model.Items)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>{</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    var isChecked = Model.Hobby.Contions(item.Value) ? &quot;checked=\\&quot;checked\\&quot;&quot; : &quot;&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;input type=&quot;checkbox&quot; name=&quot;Hobby&quot; value=&quot;@item.Value&quot; title=&quot;@item.Text&quot; @isChecked /&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>而使用TagHelper封装之后：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span></span></span>
<span class="line"><span>&lt;cl-checkbox asp-items=&quot;Model.Items&quot; asp-for=&quot;Hobby&quot; &gt;&lt;/cl-checkbox&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="其中在封装的时候看源代码发现两段非常有用的代码" tabindex="-1"><a class="header-anchor" href="#其中在封装的时候看源代码发现两段非常有用的代码"><span>其中在封装的时候看源代码发现两段非常有用的代码</span></a></h3><ol><li>判断是否可以多选：</li></ol><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span></span></span>
<span class="line"><span>   var realModelType = For.ModelExplorer.ModelType;        </span></span>
<span class="line"><span></span></span>
<span class="line"><span>   //通过类型判断是否为多选</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   var _allowMultiple = typeof(string) != realModelType &amp;&amp;  typeof(IEnumerable).IsAssignableFrom(realModelType);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>获取模型绑定的列表值(多选的情况)</li></ol><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span></span></span>
<span class="line"><span>var currentValues = Generator.GetCurrentValues(ViewContext,For.ModelExplorer,expression: For.Name,allowMultiple: true);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>这3句代码是在<a href="https://github.com/aspnet/Mvc/blob/dev/src/Microsoft.AspNetCore.Mvc.TagHelpers/SelectTagHelper.cs" target="_blank" rel="noopener noreferrer">mvc自带的SelectTagHelper</a>中发现的.</p><p>因为core其实已经提供了非常多的TagHelper,比如常用的select就是很好的参考对象，封装遇到问题的时候去找找看指不定就又意外的收获.</p><h3 id="checkboxtaghelper代码" tabindex="-1"><a class="header-anchor" href="#checkboxtaghelper代码"><span>CheckboxTagHelper代码</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span></span></span>
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
<span class="line"><span>    /// 复选框</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /// &lt;/summary&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /// &lt;remarks&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /// 当Items为空时显示单个，且选择后值为true</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /// &lt;/remarks&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    [HtmlTargetElement(CheckboxTagName)]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public class CheckboxTagHelper : TagHelper</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        private const string CheckboxTagName = &quot;cl-checkbox&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        private const string ForAttributeName = &quot;asp-for&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        private const string ItemsAttributeName = &quot;asp-items&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        private const string SkinAttributeName = &quot;asp-skin&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        private const string SignleTitleAttributeName = &quot;asp-title&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        protected IHtmlGenerator Generator { get; }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        public CheckboxTagHelper(IHtmlGenerator generator)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            Generator = generator;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        }</span></span>
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
<span class="line"><span>        [HtmlAttributeName(SkinAttributeName)]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        public CheckboxSkin Skin { get; set; } = CheckboxSkin.默认;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>        [HtmlAttributeName(SignleTitleAttributeName)]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        public string SignleTitle { get; set; }</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>        public override void Process(TagHelperContext context, TagHelperOutput output)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            //获取绑定的生成的Name属性</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            string inputName = ViewContext.ViewData.TemplateInfo.GetFullHtmlFieldName(For?.Name);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            string skin = string.Empty;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            #region 风格</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            switch (Skin)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                case CheckboxSkin.默认:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                    skin = &quot;&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                    break;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                case CheckboxSkin.原始:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                    skin = &quot;primary&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                    break;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            #endregion</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            #region 单个复选框</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            if (Items == null)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                output.TagName = &quot;input&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                output.TagMode = TagMode.SelfClosing;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                output.Attributes.Add(&quot;type&quot;, &quot;checkbox&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                output.Attributes.Add(&quot;id&quot;, inputName);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                output.Attributes.Add(&quot;name&quot;, inputName);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                output.Attributes.Add(&quot;lay-skin&quot;, skin);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                output.Attributes.Add(&quot;title&quot;, SignleTitle);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                output.Attributes.Add(&quot;value&quot;, &quot;true&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                if (For?.Model?.ToString().ToLower() == &quot;true&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                    output.Attributes.Add(&quot;checked&quot;, &quot;checked&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                return;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            #endregion</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            #region 复选框组</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            var currentValues = Generator.GetCurrentValues(ViewContext,For.ModelExplorer,expression: For.Name,allowMultiple: true);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            foreach (var item in Items)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                var checkbox = new TagBuilder(&quot;input&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                checkbox.TagRenderMode = TagRenderMode.SelfClosing;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                checkbox.Attributes[&quot;type&quot;] = &quot;checkbox&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                checkbox.Attributes[&quot;id&quot;] = inputName;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                checkbox.Attributes[&quot;name&quot;] = inputName;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                checkbox.Attributes[&quot;lay-skin&quot;] = skin;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                checkbox.Attributes[&quot;title&quot;] = item.Text;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                checkbox.Attributes[&quot;value&quot;] = item.Value;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                if (item.Disabled)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                    checkbox.Attributes.Add(&quot;disabled&quot;, &quot;disabled&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                if (item.Selected || (currentValues != null &amp;&amp; currentValues.Contains(item.Value)))</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                    checkbox.Attributes.Add(&quot;checked&quot;, &quot;checked&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>                output.Content.AppendHtml(checkbox);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            output.TagName = &quot;&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            #endregion</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public enum CheckboxSkin</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        默认,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        原始</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="使用示例" tabindex="-1"><a class="header-anchor" href="#使用示例"><span>使用示例</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span></span></span>
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
<span class="line"><span>&lt;cl-checkbox asp-items=&quot;Model.Items&quot; asp-for=&quot;Hobby1&quot; asp-skin=&quot;默认&quot;&gt;&lt;/cl-checkbox&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;cl-checkbox asp-for=&quot;Hobby3&quot; asp-title=&quot;单个复选框&quot;&gt;&lt;/cl-checkbox&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="radio单选框组件封装" tabindex="-1"><a class="header-anchor" href="#radio单选框组件封装"><span>Radio单选框组件封装</span></a></h2><ul><li><p>标签名称：<code>cl-radio</code></p></li><li><p>标签属性：</p><ul><li><p><code>asp-for</code>:绑定的字段，必须指定</p></li><li><p><code>asp-items</code>:绑定单选项 类型为：<code>IEnumerable&lt;SelectListItem&gt;</code></p></li></ul></li></ul><p>太简单了，直接上代码了</p><h3 id="radiotaghelper代码" tabindex="-1"><a class="header-anchor" href="#radiotaghelper代码"><span>RadioTagHelper代码</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span></span></span>
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
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="使用示例-1" tabindex="-1"><a class="header-anchor" href="#使用示例-1"><span>使用示例</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span></span></span>
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
<span class="line"><span>&lt;cl-radio asp-items=&quot;@Items&quot; asp-for=&quot;sex&quot;&gt;&lt;/cl-radio&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="最后再来一个开关组件" tabindex="-1"><a class="header-anchor" href="#最后再来一个开关组件"><span>最后再来一个开关组件</span></a></h2><p>单个复选框其实可以直接用开关代替，恰巧layui中也有，于是也将开关单独的封装了一下，代码大同小异</p><p>就这个 <img src="https://dn-coding-net-production-pp.qbox.me/641f3e46-7b20-41b5-8b17-56e3cb3d9ad3.png" alt="图片" loading="lazy"></p><p>使用也简单：<code>&lt;cl-switch asp-for=&quot;Hobby4&quot; asp-switch-text=&quot;开启|关闭&quot;&gt;&lt;/cl-switch&gt;</code></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span></span></span>
<span class="line"><span>namespace LayuiTagHelper.TagHelpers</span></span>
<span class="line"><span></span></span>
<span class="line"><span>{</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /// &lt;summary&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /// 开关</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /// &lt;/summary&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    [HtmlTargetElement(SwitchTagName)]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public class SwitchTagHelper : TagHelper</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        private const string SwitchTagName = &quot;cl-switch&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        private const string ForAttributeName = &quot;asp-for&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        private const string SwitchTextAttributeName = &quot;asp-switch-text&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>        protected IHtmlGenerator Generator { get; }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        public SwitchTagHelper(IHtmlGenerator generator)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            Generator = generator;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        }</span></span>
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
<span class="line"><span>        [HtmlAttributeName(SwitchTextAttributeName)]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        public string SwitchText { get; set; } = &quot;ON|OFF&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>        public override void Process(TagHelperContext context, TagHelperOutput output)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            string inputName = ViewContext.ViewData.TemplateInfo.GetFullHtmlFieldName(For?.Name);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            output.TagName = &quot;input&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            output.TagMode = TagMode.SelfClosing;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            if (For?.Model?.ToString().ToLower() == &quot;true&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                output.Attributes.Add(&quot;checked&quot;, &quot;checked&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            output.Attributes.Add(&quot;type&quot;, &quot;checkbox&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            output.Attributes.Add(&quot;id&quot;, inputName);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            output.Attributes.Add(&quot;name&quot;, inputName);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            output.Attributes.Add(&quot;value&quot;, &quot;true&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            output.Attributes.Add(&quot;lay-skin&quot;, &quot;switch&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            output.Attributes.Add(&quot;lay-text&quot;, SwitchText);</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h2><p>封装的还很粗糙，正常的使用是没问题的，若发现问题，还望园友指出。</p><p>因为layui是直接在页面加载后渲染的表单标签，故没有多少和layui相关的样式。</p><p>除了一些表单组件之外，其实还对选项卡，时间轴，分页，代码显示组件做了一些封装，这些后面再介绍了。</p><p>当然，有兴趣的朋友可以先去<a href="https://coding.net/u/yimocoding/p/WeDemo/git/tree/LayuiTagHelper/LayuiTagHelper/TagHelpers" target="_blank" rel="noopener noreferrer">一睹为快</a>看看都实现了哪些组件</p><ul><li><p><a href="https://coding.net/u/yimocoding/p/WeDemo/git/tree/LayuiTagHelper" target="_blank" rel="noopener noreferrer">仓库地址</a></p></li><li><p>WeDemo分支clone命令:<code>git clone https://git.coding.net/yimocoding/WeDemo.git -b LayuiTagHelper</code></p></li><li><p>选项卡，时间轴，分页，代码显示等<a href="https://coding.net/u/yimocoding/p/WeDemo/git/archive/LayuiTagHelper" target="_blank" rel="noopener noreferrer">Demo打包下载</a>，<a href="https://dn-coding-net-production-pp.qbox.me/c77da03e-5911-4952-9b2a-06285df05f56.gif" target="_blank" rel="noopener noreferrer">效果预览</a></p></li></ul>`,46)]))}const r=n(l,[["render",p],["__file","asp_net_core_encapsulation_layui_module_give_an_example_share.html.vue"]]),v=JSON.parse('{"path":"/posts/dotnetcore/asp_net_core_encapsulation_layui_module_give_an_example_share.html","title":"asp.net core封装layui组件示例分享","lang":"zh-CN","frontmatter":{"title":"asp.net core封装layui组件示例分享","date":"2017-10-09T00:14:00.000Z","category":["DotNetCore"],"tag":[".net core"],"description":"用什么封装？这里只是用了TagHelper，是啥？自己瞅文档去 在学习使用TagHelper的时候，最希望的就是能有个Demo能够让自己作为参考 怎么去封装一个组件？ 不同的情况怎么去实现？ 有没有更好更高效的方法？ 找啊找啊找，最后跑去看了看mvc中的TagHelpers，再好好瞅了瞅TagHelper的文档 勉强折腾了几个组件出来，本来想一个组件一...","head":[["meta",{"property":"og:url","content":"https://www.yimo.link/posts/dotnetcore/asp_net_core_encapsulation_layui_module_give_an_example_share.html"}],["meta",{"property":"og:site_name","content":"易墨网"}],["meta",{"property":"og:title","content":"asp.net core封装layui组件示例分享"}],["meta",{"property":"og:description","content":"用什么封装？这里只是用了TagHelper，是啥？自己瞅文档去 在学习使用TagHelper的时候，最希望的就是能有个Demo能够让自己作为参考 怎么去封装一个组件？ 不同的情况怎么去实现？ 有没有更好更高效的方法？ 找啊找啊找，最后跑去看了看mvc中的TagHelpers，再好好瞅了瞅TagHelper的文档 勉强折腾了几个组件出来，本来想一个组件一..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://dn-coding-net-production-pp.qbox.me/69db93df-b59b-4c4e-bf7c-961b18435c56.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-10-28T11:15:42.000Z"}],["meta",{"property":"article:tag","content":".net core"}],["meta",{"property":"article:published_time","content":"2017-10-09T00:14:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-10-28T11:15:42.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"asp.net core封装layui组件示例分享\\",\\"image\\":[\\"https://dn-coding-net-production-pp.qbox.me/69db93df-b59b-4c4e-bf7c-961b18435c56.png\\",\\"https://dn-coding-net-production-pp.qbox.me/641f3e46-7b20-41b5-8b17-56e3cb3d9ad3.png\\"],\\"datePublished\\":\\"2017-10-09T00:14:00.000Z\\",\\"dateModified\\":\\"2024-10-28T11:15:42.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"易墨\\",\\"url\\":\\"https://www.yimo.link\\"}]}"]]},"headers":[{"level":2,"title":"Checkbox复选框组件封装","slug":"checkbox复选框组件封装","link":"#checkbox复选框组件封装","children":[{"level":3,"title":"为什么要封装？","slug":"为什么要封装","link":"#为什么要封装","children":[]},{"level":3,"title":"其中在封装的时候看源代码发现两段非常有用的代码","slug":"其中在封装的时候看源代码发现两段非常有用的代码","link":"#其中在封装的时候看源代码发现两段非常有用的代码","children":[]},{"level":3,"title":"CheckboxTagHelper代码","slug":"checkboxtaghelper代码","link":"#checkboxtaghelper代码","children":[]},{"level":3,"title":"使用示例","slug":"使用示例","link":"#使用示例","children":[]}]},{"level":2,"title":"Radio单选框组件封装","slug":"radio单选框组件封装","link":"#radio单选框组件封装","children":[{"level":3,"title":"RadioTagHelper代码","slug":"radiotaghelper代码","link":"#radiotaghelper代码","children":[]},{"level":3,"title":"使用示例","slug":"使用示例-1","link":"#使用示例-1","children":[]}]},{"level":2,"title":"最后再来一个开关组件","slug":"最后再来一个开关组件","link":"#最后再来一个开关组件","children":[]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1730114142000,"updatedTime":1730114142000,"contributors":[{"name":"yimo","email":"yimo@wikiglobal.com","commits":1}]},"readingTime":{"minutes":4.94,"words":1481},"filePathRelative":"posts/dotnetcore/asp_net_core_encapsulation_layui_module_give_an_example_share.md","localizedDate":"2017年10月9日","excerpt":"<p>用什么封装？这里只是用了TagHelper，是啥？自己瞅<a href=\\"https://docs.microsoft.com/zh-cn/aspnet/core/mvc/views/tag-helpers/authoring\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">文档</a>去</p>\\n<p>在学习使用TagHelper的时候，最希望的就是能有个Demo能够让自己作为参考</p>\\n<p>怎么去封装一个组件？</p>\\n<p>不同的情况怎么去实现？</p>\\n<p>有没有更好更高效的方法？</p>\\n<p>找啊找啊找，最后跑去看了看mvc中的<a href=\\"https://github.com/aspnet/Mvc/blob/dev/src/Microsoft.AspNetCore.Mvc.TagHelpers/\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">TagHelpers</a>，再好好瞅了瞅<a href=\\"https://docs.microsoft.com/zh-cn/aspnet/core/mvc/views/tag-helpers/authoring\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">TagHelper的文档</a></p>","autoDesc":true}');export{r as comp,v as data};
