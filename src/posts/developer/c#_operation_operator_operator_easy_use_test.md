---
title: C#运算符的简单使用测试
date: 2018-10-05 23:34:00
category:
  - Developer
tag:
  - C#
---

在代码中看到的代码中`|=`，有点不太理解故重新学习了下位运算符。        



## 位运算符在 c# 中的测试用例



```cs

[TestMethod]

public void TestMethod1()

{

    var a = false;

    a |= true;

    Assert.IsTrue(a);



    var b = true;

    b |= false;

    Assert.IsTrue(b);



    var c = false;

    var c2 = false;

    c = c || c2 == false;

    //等于下面

    c2 |= c;

    Assert.IsTrue(c);

    Assert.IsTrue(c2);

    // & 使用测试

    var ab = a &= b;

    Assert.IsTrue(ab);

    var abc = ab &= !c;

    Assert.IsFalse(abc);

}

```



## `|`和`||`的区别

表达式A(true) | 表达式B :表达式都会执行(| ----- 位运算符)    

表达式A(true) || 表达式B :表达式B不会执行(||--短路运算符)    



下面为测试通过的单元测试



```

var testStr = "";

Func<string, bool> funcTest = (str) =>

    {

        testStr = str;

        return false;

    };

//会执行 funcTest

var test = true | funcTest("test1");

//不会会执行 funcTest

test = true || funcTest("test2");

Assert.AreEqual(testStr, "test1");

```



## 变量A (位运算符=) 变量B 



+=,-+,|=,&=,

将计算A和B的运算结果赋值给变量A



### 使用场景



在一些复制的判断中可以简化判断语句  

如果要将bool值比较之后赋值的时候能够用到
