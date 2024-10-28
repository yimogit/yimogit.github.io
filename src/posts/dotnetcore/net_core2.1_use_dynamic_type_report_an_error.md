---
title: .net core2.1 使用 dynamic 类型报错
date: 2018-06-20 15:28:00
category:
  - DotNetCore
tag:
  - .net core
---

在net core2.0项目中使用 dynamic 无法编译通过



> 异常信息：缺少编译器要求的成员“Microsoft.CSharp.RuntimeBinder.CSharpArgumentInfo.Create”	



## 解决方案



.net core 添加 Nuget 包 `Microsoft.CSharp`

.net Framework 添加 `Microsoft.CSharp.dll` 引用即可



```

<PackageReference Include="Microsoft.CSharp" Version="4.3.0" />

```



搜索来源：https://stackoverflow.com/questions/32475021/unable-to-build-c-sharp-project/49151832#49151832
