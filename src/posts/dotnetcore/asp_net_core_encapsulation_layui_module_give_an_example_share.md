---
title: asp.net core封装layui组件示例分享
date: 2017-10-09 00:14:00
category:
  - DotNetCore
tag:
  - .net core
---

用什么封装？这里只是用了TagHelper，是啥？自己瞅[文档](https://docs.microsoft.com/zh-cn/aspnet/core/mvc/views/tag-helpers/authoring)去



在学习使用TagHelper的时候，最希望的就是能有个Demo能够让自己作为参考

怎么去封装一个组件？

不同的情况怎么去实现？

有没有更好更高效的方法？



找啊找啊找，最后跑去看了看mvc中的[TagHelpers](https://github.com/aspnet/Mvc/blob/dev/src/Microsoft.AspNetCore.Mvc.TagHelpers/)，再好好瞅了瞅[TagHelper的文档](https://docs.microsoft.com/zh-cn/aspnet/core/mvc/views/tag-helpers/authoring)

勉强折腾了几个组件出来，本来想一个组件一个组件写文章的，但是发现国庆已经结束了~



[Demo下载](https://coding.net/u/yimocoding/p/WeDemo/git/archive/LayuiTagHelper) [效果预览](https://dn-coding-net-production-pp.qbox.me/c77da03e-5911-4952-9b2a-06285df05f56.gif)



代码仅供参考,有不同的意见也忘不吝赐教



## Checkbox复选框组件封装

- 标签名称：`cl-checkbox`

- 标签属性：

    - `asp-for`:绑定的字段，必须指定

    - `asp-items`:绑定单选项 类型为：`IEnumerable<SelectListItem>`

    - `asp-skin`:layui的皮肤样式，默认or原始 ![图片](https://dn-coding-net-production-pp.qbox.me/69db93df-b59b-4c4e-bf7c-961b18435c56.png)

    - `asp-title`:若只是一个复选框时显示的文字，且未指定items，默认Checkbox的值为true



### 为什么要封装？

举个栗子  --- 绑定一个复选框组

原始写法：

```

@foreach (var item in Model.Items)

{

    var isChecked = Model.Hobby.Contions(item.Value) ? "checked=\"checked\"" : "";

    <input type="checkbox" name="Hobby" value="@item.Value" title="@item.Text" @isChecked />

}

```

而使用TagHelper封装之后：

```

<cl-checkbox asp-items="Model.Items" asp-for="Hobby" ></cl-checkbox>

```



### 其中在封装的时候看源代码发现两段非常有用的代码

1. 判断是否可以多选：

 ```

    var realModelType = For.ModelExplorer.ModelType;        

    //通过类型判断是否为多选

    var _allowMultiple = typeof(string) != realModelType &&  typeof(IEnumerable).IsAssignableFrom(realModelType);

```

2. 获取模型绑定的列表值(多选的情况)

```

var currentValues = Generator.GetCurrentValues(ViewContext,For.ModelExplorer,expression: For.Name,allowMultiple: true);

```

这3句代码是在[mvc自带的SelectTagHelper](https://github.com/aspnet/Mvc/blob/dev/src/Microsoft.AspNetCore.Mvc.TagHelpers/SelectTagHelper.cs)中发现的.

因为core其实已经提供了非常多的TagHelper,比如常用的select就是很好的参考对象，封装遇到问题的时候去找找看指不定就又意外的收获.



### CheckboxTagHelper代码



```

using System.Collections.Generic;

using Microsoft.AspNetCore.Mvc.Rendering;

using Microsoft.AspNetCore.Mvc.ViewFeatures;

using Microsoft.AspNetCore.Razor.TagHelpers;



namespace LayuiTagHelper.TagHelpers

{

    /// <summary>

    /// 复选框

    /// </summary>

    /// <remarks>

    /// 当Items为空时显示单个，且选择后值为true

    /// </remarks>

    [HtmlTargetElement(CheckboxTagName)]

    public class CheckboxTagHelper : TagHelper

    {

        private const string CheckboxTagName = "cl-checkbox";

        private const string ForAttributeName = "asp-for";

        private const string ItemsAttributeName = "asp-items";

        private const string SkinAttributeName = "asp-skin";

        private const string SignleTitleAttributeName = "asp-title";

        protected IHtmlGenerator Generator { get; }

        public CheckboxTagHelper(IHtmlGenerator generator)

        {

            Generator = generator;

        }



        [ViewContext]

        public ViewContext ViewContext { get; set; }



        [HtmlAttributeName(ForAttributeName)]

        public ModelExpression For { get; set; }



        [HtmlAttributeName(ItemsAttributeName)]

        public IEnumerable<SelectListItem> Items { get; set; }



        [HtmlAttributeName(SkinAttributeName)]

        public CheckboxSkin Skin { get; set; } = CheckboxSkin.默认;



        [HtmlAttributeName(SignleTitleAttributeName)]

        public string SignleTitle { get; set; }



        public override void Process(TagHelperContext context, TagHelperOutput output)

        {

            //获取绑定的生成的Name属性

            string inputName = ViewContext.ViewData.TemplateInfo.GetFullHtmlFieldName(For?.Name);

            string skin = string.Empty;

            #region 风格

            switch (Skin)

            {

                case CheckboxSkin.默认:

                    skin = "";

                    break;

                case CheckboxSkin.原始:

                    skin = "primary";

                    break;

            }

            #endregion

            #region 单个复选框

            if (Items == null)

            {

                output.TagName = "input";

                output.TagMode = TagMode.SelfClosing;

                output.Attributes.Add("type", "checkbox");

                output.Attributes.Add("id", inputName);

                output.Attributes.Add("name", inputName);

                output.Attributes.Add("lay-skin", skin);

                output.Attributes.Add("title", SignleTitle);

                output.Attributes.Add("value", "true");

                if (For?.Model?.ToString().ToLower() == "true")

                {

                    output.Attributes.Add("checked", "checked");

                }

                return;

            }

            #endregion

            #region 复选框组

            var currentValues = Generator.GetCurrentValues(ViewContext,For.ModelExplorer,expression: For.Name,allowMultiple: true);

            foreach (var item in Items)

            {

                var checkbox = new TagBuilder("input");

                checkbox.TagRenderMode = TagRenderMode.SelfClosing;

                checkbox.Attributes["type"] = "checkbox";

                checkbox.Attributes["id"] = inputName;

                checkbox.Attributes["name"] = inputName;

                checkbox.Attributes["lay-skin"] = skin;

                checkbox.Attributes["title"] = item.Text;

                checkbox.Attributes["value"] = item.Value;

                if (item.Disabled)

                {

                    checkbox.Attributes.Add("disabled", "disabled");

                }

                if (item.Selected || (currentValues != null && currentValues.Contains(item.Value)))

                {

                    checkbox.Attributes.Add("checked", "checked");

                }



                output.Content.AppendHtml(checkbox);

            }

            output.TagName = "";

            #endregion

        }

    }

    public enum CheckboxSkin

    {

        默认,

        原始

    }

}



```

### 使用示例



```

@{

string sex="男";

var Items=new List<SelectListItem>()

           {

                new SelectListItem() { Text = "男", Value = "男" },

                new SelectListItem() { Text = "女", Value = "女"},

                new SelectListItem() { Text = "不详", Value = "不详",Disabled=true }

           };

}

<cl-checkbox asp-items="Model.Items" asp-for="Hobby1" asp-skin="默认"></cl-checkbox>

<cl-checkbox asp-for="Hobby3" asp-title="单个复选框"></cl-checkbox>

```

## Radio单选框组件封装

- 标签名称：`cl-radio`

- 标签属性：

    - `asp-for`:绑定的字段，必须指定

    - `asp-items`:绑定单选项 类型为：`IEnumerable<SelectListItem>`

太简单了，直接上代码了



### RadioTagHelper代码



```

using System;

using System.Collections.Generic;

using Microsoft.AspNetCore.Mvc.Rendering;

using Microsoft.AspNetCore.Mvc.ViewFeatures;

using Microsoft.AspNetCore.Razor.TagHelpers;



namespace LayuiTagHelper.TagHelpers

{

    /// <summary>

    /// 单选框

    /// </summary>

    [HtmlTargetElement(RadioTagName)]

    public class RadioTagHelper : TagHelper

    {

        private const string RadioTagName = "cl-radio";

        private const string ForAttributeName = "asp-for";

        private const string ItemsAttributeName = "asp-items";



        [ViewContext]

        public ViewContext ViewContext { get; set; }



        [HtmlAttributeName(ForAttributeName)]

        public ModelExpression For { get; set; }



        [HtmlAttributeName(ItemsAttributeName)]

        public IEnumerable<SelectListItem> Items { get; set; }



        public override void Process(TagHelperContext context, TagHelperOutput output)

        {

            if (For == null)

            {

                throw new ArgumentException("必须绑定模型");

            }

            foreach (var item in Items)

            {

                var radio = new TagBuilder("input");

                radio.TagRenderMode = TagRenderMode.SelfClosing;

                radio.Attributes.Add("id", ViewContext.ViewData.TemplateInfo.GetFullHtmlFieldName(For.Name));

                radio.Attributes.Add("name", ViewContext.ViewData.TemplateInfo.GetFullHtmlFieldName(For.Name));

                radio.Attributes.Add("value", item.Value);

                radio.Attributes.Add("title", item.Text);

                radio.Attributes.Add("type", "radio");

                if (item.Disabled)

                {

                    radio.Attributes.Add("disabled", "disabled");

                }

                if (item.Selected || item.Value == For.Model?.ToString())

                {

                    radio.Attributes.Add("checked", "checked");

                }

                output.Content.AppendHtml(radio);

            }

            output.TagName = "";

        }

    }

}



```

### 使用示例



```

@{

string sex="男";

var Items=new List<SelectListItem>()

           {

                new SelectListItem() { Text = "男", Value = "男" },

                new SelectListItem() { Text = "女", Value = "女"},

                new SelectListItem() { Text = "不详", Value = "不详",Disabled=true }

           };

}

<cl-radio asp-items="@Items" asp-for="sex"></cl-radio>

```



## 最后再来一个开关组件

单个复选框其实可以直接用开关代替，恰巧layui中也有，于是也将开关单独的封装了一下，代码大同小异

就这个 ![图片](https://dn-coding-net-production-pp.qbox.me/641f3e46-7b20-41b5-8b17-56e3cb3d9ad3.png)

使用也简单：`<cl-switch asp-for="Hobby4" asp-switch-text="开启|关闭"></cl-switch>`

```

namespace LayuiTagHelper.TagHelpers

{

    /// <summary>

    /// 开关

    /// </summary>

    [HtmlTargetElement(SwitchTagName)]

    public class SwitchTagHelper : TagHelper

    {

        private const string SwitchTagName = "cl-switch";

        private const string ForAttributeName = "asp-for";

        private const string SwitchTextAttributeName = "asp-switch-text";



        protected IHtmlGenerator Generator { get; }

        public SwitchTagHelper(IHtmlGenerator generator)

        {

            Generator = generator;

        }



        [ViewContext]

        public ViewContext ViewContext { get; set; }



        [HtmlAttributeName(ForAttributeName)]

        public ModelExpression For { get; set; }



        [HtmlAttributeName(SwitchTextAttributeName)]

        public string SwitchText { get; set; } = "ON|OFF";



        public override void Process(TagHelperContext context, TagHelperOutput output)

        {

            string inputName = ViewContext.ViewData.TemplateInfo.GetFullHtmlFieldName(For?.Name);

            output.TagName = "input";

            output.TagMode = TagMode.SelfClosing;

            if (For?.Model?.ToString().ToLower() == "true")

            {

                output.Attributes.Add("checked", "checked");

            }

            output.Attributes.Add("type", "checkbox");

            output.Attributes.Add("id", inputName);

            output.Attributes.Add("name", inputName);

            output.Attributes.Add("value", "true");

            output.Attributes.Add("lay-skin", "switch");

            output.Attributes.Add("lay-text", SwitchText);



        }

    }

}

```

## 总结

封装的还很粗糙，正常的使用是没问题的，若发现问题，还望园友指出。

因为layui是直接在页面加载后渲染的表单标签，故没有多少和layui相关的样式。

除了一些表单组件之外，其实还对选项卡，时间轴，分页，代码显示组件做了一些封装，这些后面再介绍了。

当然，有兴趣的朋友可以先去[一睹为快](https://coding.net/u/yimocoding/p/WeDemo/git/tree/LayuiTagHelper/LayuiTagHelper/TagHelpers)看看都实现了哪些组件

- [仓库地址](https://coding.net/u/yimocoding/p/WeDemo/git/tree/LayuiTagHelper)

- WeDemo分支clone命令:`git clone https://git.coding.net/yimocoding/WeDemo.git -b LayuiTagHelper`

- 选项卡，时间轴，分页，代码显示等[Demo打包下载](https://coding.net/u/yimocoding/p/WeDemo/git/archive/LayuiTagHelper)，[效果预览](https://dn-coding-net-production-pp.qbox.me/c77da03e-5911-4952-9b2a-06285df05f56.gif)
