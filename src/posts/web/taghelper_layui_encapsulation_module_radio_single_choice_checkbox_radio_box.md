---
title: TagHelper+Layui封装组件之Radio单选框
date: 2017-10-08 23:38:00
category:
  - Web
tag:
  - .net core
---

## TagHelper+Layui封装组件之Radio单选框

- 标签名称：`cl-radio`

- 标签属性：

    - `asp-for`:绑定的字段，必须指定

    - `asp-items`:绑定单选项 类型为：`IEnumerable<SelectListItem>`

太简单了，直接上代码了



## RadioTagHelper代码



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

## 使用示例



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
