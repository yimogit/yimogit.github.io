---
title: layui中使用autocomplete.js
date: 2017-07-20 18:03:00
category:
  - Web
tag:
  - web开发
---

## 前言

> 在网站找了一大圈都是问题没有答案，记录记录谨防踩坑

> layui版本：[layui-v1.0.9_rls](https://github.com/sentsin/layui)

>  jQuery-Autocomplete版本： [1.4.1](https://github.com/devbridge/jQuery-Autocomplete)



## 示例

demo地址：[http://runjs.cn/detail/jzararyv](http://runjs.cn/detail/jzararyv)        



<iframe style="width: 100%; height: 250px" src="http://sandbox.runjs.cn/show/jzararyv" allowfullscreen="allowfullscreen" frameborder="0"></iframe>



Autocomplete插件官方示例：[http://devbridge.github.io/jQuery-Autocomplete/](http://devbridge.github.io/jQuery-Autocomplete/)



## 整合步骤



### 1.  下载jQuery-Autocomplete.js到本地，[传送门](https://github.com/devbridge/jQuery-Autocomplete/blob/master/dist/jquery.autocomplete.js)

### 2. 修改下载的jquery.autocomplete.js的第22行代码，替换jquery为layui中的jquery

> 我试图在layui.j后直接对window.jQuery复制，但是好像并没有什么卵用



```

// Browser globals

factory(jQquery);



//↓



// Browser globals 使用layui中的jquery

layui.use(['jquery'], function () {

      factory(layui.jquery);

});



```



### 3.  在页面中使用    

完整代码见：http://runjs.cn/detail/jzararyv    



```

<html>

<head>

<style>

<!--官网选项列表的样式-->

       .autocomplete-suggestions { -webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box; border: 1px solid #999; background: #FFF; cursor: default; overflow: auto; -webkit-box-shadow: 1px 4px 3px rgba(50, 50, 50, 0.64); -moz-box-shadow: 1px 4px 3px rgba(50, 50, 50, 0.64); box-shadow: 1px 4px 3px rgba(50, 50, 50, 0.64); z-index: 29891015 !important;}

        .autocomplete-suggestion { padding: 2px 5px; white-space: nowrap; overflow: hidden; }

        .autocomplete-no-suggestion { padding: 2px 5px;}

        .autocomplete-selected { background: #F0F0F0; }

        .autocomplete-suggestions strong { font-weight: bold; color: #000; }

        .autocomplete-group { padding: 2px 5px; font-weight: bold; font-size: 16px; color: #000; display: block; border-bottom: 1px solid #000; }

</style>

</head>

<body>

<input id="qaTags" class="ym-qatitle " placeholder="问题标签,多个以,分隔" autocomplete="off" />

<!--layui.js,autocompelete.js引用-->

<script>

var $=layui.jquery;

$(function(){

    $('#qaTags').autocomplete({

       lookup: [{data:"data",value"value"}]

    });

});

</script>

</body>

</html>

```



### 4. 若要在layer弹层中显示，autocomplete.js的z-index值就略微有点小了，故需要设置显示块的层级

```

.autocomplete-suggestions {z-index: 29891015 !important;}



```

或者修改autocomplete.js中的默认zIndex值
