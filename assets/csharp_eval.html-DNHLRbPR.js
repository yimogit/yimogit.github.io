import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,g as e,o as i}from"./app-_tngh30b.js";const l="/assets/662652-20231030225005518-81688698-CcHLjsOo.png",p="/assets/662652-20231030225005622-15860081-PjcrMRPx.png",r={};function c(t,s){return i(),a("div",null,s[0]||(s[0]=[e(`<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言"><span>前言</span></a></h2><blockquote><p>为满足业务需要，需要为项目中自定义模板添加一个计算字段的组件，通过设置字符串表达式，使用时在改变表达式其中一个字段的数据时，自动计算另外一个字段的值。</p><p>本篇为上篇，介绍原理，简单实现一个工具，输入<strong>字符串表达式</strong>，解析其中的参数，输入参数<strong>计算结果。</strong></p><p>下篇将基于此封装实现对Mongo查询语法的封装，通过addFields的方式转换表达式，后续等封装成NuGet包再分享</p></blockquote><p>实现如下所示</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>输入 1+1  输出 2</span></span>
<span class="line"><span>输入 a+1 参数a:1 输出 2</span></span>
<span class="line"><span>输入 (a+1)*b 输入a:1,b:1 输出 2</span></span>
<span class="line"><span>输入 (a+1-(2+a)*3/3)/a+3 输入a:1 输出 2</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="`+l+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="实现思路" tabindex="-1"><a class="header-anchor" href="#实现思路"><span>实现思路</span></a></h2><p>想要实现上面这个功能，需要先了解诸如 <code>(a+1-(2+a)*3/3)/a+3</code> 这个是什么？</p><blockquote><p>维基百科：<strong><a href="https://zh.wikipedia.org/wiki/%E4%B8%AD%E7%BC%80%E8%A1%A8%E7%A4%BA%E6%B3%95" target="_blank" rel="noopener noreferrer">中缀表示法</a></strong>（或<strong>中缀记法</strong>）是一个通用的算术或逻辑公式表示方法， 操作符是以中缀形式处于操作数的中间（例：3 + 4）。与前缀表达式（例：+ 3 4 ）或后缀表达式（例：3 4 + ）相比，中缀表达式不容易被电脑解析逻辑优先顺序，但仍被许多程序语言使用，因为它符合大多数自然语言的写法。</p><p>前缀表示法 （+ 3 4 ）也叫 波兰表示法</p><p>后缀表示法 （3 4 + ）也叫 逆波兰表示法</p></blockquote><p>在维基百科的说明中，也给出了和其相关的另外两种表示法，以及用于把中缀表达式转换到后缀表达式或树的算法：<a href="https://zh.wikipedia.org/wiki/%E8%B0%83%E5%BA%A6%E5%9C%BA%E7%AE%97%E6%B3%95" target="_blank" rel="noopener noreferrer">调度场算法</a> ，如下图所示</p><figure><img src="'+p+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="实现代码" tabindex="-1"><a class="header-anchor" href="#实现代码"><span>实现代码</span></a></h2><p>找了很多的开源项目，最终基于 <a href="https://github.com/qinfengzhu/Evaluator" target="_blank" rel="noopener noreferrer">qinfengzhu/Evaluator</a> ，实现了上述功能。</p><h3 id="调用代码" tabindex="-1"><a class="header-anchor" href="#调用代码"><span>调用代码</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>using Evaluator;</span></span>
<span class="line"><span>using System.Text.RegularExpressions;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Console.WriteLine(&quot;字符串表达式计算工具&quot;);</span></span>
<span class="line"><span>EvalTest();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>void EvalTest()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    Console.WriteLine(&quot;----------------------------------------------------&quot;);</span></span>
<span class="line"><span>    var parse = new EvalParser();</span></span>
<span class="line"><span>    Console.Write(&quot;请输入表达式：&quot;);//a+b*3/5+a</span></span>
<span class="line"><span>    var evalStr = Console.ReadLine();</span></span>
<span class="line"><span>    if (string.IsNullOrEmpty(evalStr))</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        Console.WriteLine(&quot;Game Over&quot;);</span></span>
<span class="line"><span>        return;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    //解析其中的变量并让用户输入</span></span>
<span class="line"><span>    var matchs = Regex.Matches(evalStr, @&quot;\\b[\\w$]+\\b&quot;);</span></span>
<span class="line"><span>    var paramsDic = new Dictionary&lt;string, object&gt;();</span></span>
<span class="line"><span>    //预定义参数</span></span>
<span class="line"><span>    paramsDic.Add(&quot;now_year&quot;, DateTime.Now.Year);</span></span>
<span class="line"><span>    paramsDic.Add(&quot;now_month&quot;, DateTime.Now.Month);</span></span>
<span class="line"><span>    paramsDic.Add(&quot;now_day&quot;, DateTime.Now.Day);</span></span>
<span class="line"><span>    foreach (Match match in matchs)</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        if (decimal.TryParse(match.Value, out decimal kp))</span></span>
<span class="line"><span>            continue;</span></span>
<span class="line"><span>        if (!paramsDic.ContainsKey(match.Value))</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            Console.Write($&quot;请输入数字变量【{match.Value}】：&quot;);</span></span>
<span class="line"><span>            var paramValue = Console.ReadLine();</span></span>
<span class="line"><span>            decimal dvalue;</span></span>
<span class="line"><span>            while (!decimal.TryParse(paramValue, out dvalue))</span></span>
<span class="line"><span>            {</span></span>
<span class="line"><span>                Console.WriteLine($&quot;输入有误，请输入数字变量【{match.Value}】：&quot;);</span></span>
<span class="line"><span>                paramValue = Console.ReadLine();</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            paramsDic.Add(match.Value, dvalue);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    var result = parse.EvalNumber(evalStr, paramsDic);</span></span>
<span class="line"><span>    Console.WriteLine($&quot;结果：{result}&quot;);</span></span>
<span class="line"><span>    EvalTest();</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="evalparser-类的实现" tabindex="-1"><a class="header-anchor" href="#evalparser-类的实现"><span>EvalParser 类的实现</span></a></h3><p>通过上面调用代码可以看到，核心的计算类是 EvalParser ，调用其 EvalNumber 进行计算</p><h3 id="evalnumber-实现" tabindex="-1"><a class="header-anchor" href="#evalnumber-实现"><span>EvalNumber 实现</span></a></h3><ul><li><p>EvalNumber 方法,主要分为3步</p><ul><li>第一步将表达式解析转换到队列中，即将 中缀表达式，转换成后缀表达式</li><li>第二步将队列中的表达式加入表达式栈中</li><li>第三步使用表达式树进行计算</li></ul></li><li><p>返回值处理</p><ul><li>已知的错误有除以0和溢出的异常，所以直接捕获返回null，也可以在计算除数的时候判断值为0就直接返回null，</li><li>精度处理</li></ul></li><li><p>EvalNumber 计算核心代码</p><ul><li><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>/// &lt;summary&gt;</span></span>
<span class="line"><span>/// 计算表达式的计算结果</span></span>
<span class="line"><span>/// &lt;/summary&gt;</span></span>
<span class="line"><span>/// &lt;param name=&quot;expression&quot;&gt;表达式&lt;/param&gt;</span></span>
<span class="line"><span>/// &lt;param name=&quot;dynamicObject&quot;&gt;动态对象&lt;/param&gt;</span></span>
<span class="line"><span>/// &lt;param name=&quot;precision&quot;&gt;精度 默认2&lt;/param&gt;</span></span>
<span class="line"><span>/// &lt;returns&gt;计算的结果&lt;/returns&gt;</span></span>
<span class="line"><span>public decimal? EvalNumber(string expression, Dictionary&lt;string, object&gt; dynamicObject, int precision = 2)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    var values = dynamicObject ?? new Dictionary&lt;string, object&gt;();</span></span>
<span class="line"><span>    //中缀表达式，转换成后缀表达式并入列</span></span>
<span class="line"><span>    var queue = ParserInfixExpression(expression, values);</span></span>
<span class="line"><span>    var cacheStack = new Stack&lt;Expression&gt;();</span></span>
<span class="line"><span>    while (queue.Count &gt; 0)</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        var item = queue.Dequeue();</span></span>
<span class="line"><span>        if (item.ItemType == EItemType.Value &amp;&amp; item.IsConstant)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            var itemExpression = Expression.Constant(item.Value);</span></span>
<span class="line"><span>            cacheStack.Push(itemExpression);</span></span>
<span class="line"><span>            continue;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        if (item.ItemType == EItemType.Value &amp;&amp; !item.IsConstant)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            var propertyName = item.Content.Trim();</span></span>
<span class="line"><span>            //将参数替换回来</span></span>
<span class="line"><span>            propertyName = PreReplaceTextToOprator(propertyName, values);</span></span>
<span class="line"><span>            //参数为空的情况</span></span>
<span class="line"><span>            if (!values.ContainsKey(propertyName) || values[propertyName] == null || !decimal.TryParse(values[propertyName].ToString(), out decimal propertyValue))</span></span>
<span class="line"><span>                return null;</span></span>
<span class="line"><span>            //var propertyValue = decimal.Parse(values[propertyName].ToString());</span></span>
<span class="line"><span>            var itemExpression = Expression.Constant(propertyValue);</span></span>
<span class="line"><span>            cacheStack.Push(itemExpression);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        if (item.ItemType == EItemType.Operator)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            if (cacheStack.Count &lt;= 1)</span></span>
<span class="line"><span>                continue;</span></span>
<span class="line"><span>            Expression firstParamterExpression = Expression.Empty();</span></span>
<span class="line"><span>            Expression secondParamterExpression = Expression.Empty();</span></span>
<span class="line"><span>            switch (item.Content[0])</span></span>
<span class="line"><span>            {</span></span>
<span class="line"><span>                case EvalParser.AddOprator:</span></span>
<span class="line"><span>                    firstParamterExpression = cacheStack.Pop();</span></span>
<span class="line"><span>                    secondParamterExpression = cacheStack.Pop();</span></span>
<span class="line"><span>                    var addExpression = Expression.Add(secondParamterExpression, firstParamterExpression);</span></span>
<span class="line"><span>                    cacheStack.Push(addExpression);</span></span>
<span class="line"><span>                    break;</span></span>
<span class="line"><span>                case EvalParser.DivOperator:</span></span>
<span class="line"><span>                    firstParamterExpression = cacheStack.Pop();</span></span>
<span class="line"><span>                    secondParamterExpression = cacheStack.Pop();</span></span>
<span class="line"><span>                    var divExpression = Expression.Divide(secondParamterExpression, firstParamterExpression);</span></span>
<span class="line"><span>                    cacheStack.Push(divExpression);</span></span>
<span class="line"><span>                    break;</span></span>
<span class="line"><span>                case EvalParser.MulOperator:</span></span>
<span class="line"><span>                    firstParamterExpression = cacheStack.Pop();</span></span>
<span class="line"><span>                    secondParamterExpression = cacheStack.Pop();</span></span>
<span class="line"><span>                    var mulExpression = Expression.Multiply(secondParamterExpression, firstParamterExpression);</span></span>
<span class="line"><span>                    cacheStack.Push(mulExpression);</span></span>
<span class="line"><span>                    break;</span></span>
<span class="line"><span>                case EvalParser.SubOperator:</span></span>
<span class="line"><span>                    firstParamterExpression = cacheStack.Pop();</span></span>
<span class="line"><span>                    secondParamterExpression = cacheStack.Pop();</span></span>
<span class="line"><span>                    var subExpression = Expression.Subtract(secondParamterExpression, firstParamterExpression);</span></span>
<span class="line"><span>                    cacheStack.Push(subExpression);</span></span>
<span class="line"><span>                    break;</span></span>
<span class="line"><span>                case EvalParser.LBraceOperator:</span></span>
<span class="line"><span>                case EvalParser.RBraceOperator:</span></span>
<span class="line"><span>                    continue;</span></span>
<span class="line"><span>                default:</span></span>
<span class="line"><span>                    throw new Exception(&quot;计算公式错误&quot;);</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    if (cacheStack.Count == 0)</span></span>
<span class="line"><span>        return null;</span></span>
<span class="line"><span>    var lambdaExpression = Expression.Lambda&lt;Func&lt;decimal&gt;&gt;(cacheStack.Pop());</span></span>
<span class="line"><span>    try</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        // 除0 溢出</span></span>
<span class="line"><span>        var value = lambdaExpression.Compile()();</span></span>
<span class="line"><span>        return Math.Round(value, precision);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    catch (Exception ex)</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        //System.OverflowException</span></span>
<span class="line"><span>        //System.DivideByZeroException</span></span>
<span class="line"><span>        if (ex is DivideByZeroException</span></span>
<span class="line"><span>            || ex is OverflowException)</span></span>
<span class="line"><span>            return null;</span></span>
<span class="line"><span>        throw ex;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul></li></ul><h3 id="parserinfixexpression-实现" tabindex="-1"><a class="header-anchor" href="#parserinfixexpression-实现"><span>ParserInfixExpression 实现</span></a></h3><ul><li><p>在EvalNumber 方法的第一步调用了 ParserInfixExpression 方法来进行表达式的预处理</p><ul><li><p>PreReplaceOpratorToText 如果变量中带有一些计算符号(+-*/())，通过这个方法转换临时变量，在获取值的时候再转换回来</p><ul><li><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span></span></span>
<span class="line"><span>/// &lt;summary&gt;</span></span>
<span class="line"><span>/// 符号转换字典</span></span>
<span class="line"><span>/// &lt;/summary&gt;</span></span>
<span class="line"><span>private static Dictionary&lt;char, string&gt; OperatorToTextDic = new Dictionary&lt;char, string&gt;()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    { &#39;+&#39;, &quot;_JIA_&quot; },</span></span>
<span class="line"><span>    { &#39;-&#39;, &quot;_JIAN_&quot; },</span></span>
<span class="line"><span>    { &#39;/&#39;, &quot;_CHENG_&quot; },</span></span>
<span class="line"><span>    { &#39;*&#39;, &quot;_CHU_&quot; },</span></span>
<span class="line"><span>    { &#39;(&#39;, &quot;_ZKH_&quot; },</span></span>
<span class="line"><span>    { &#39;)&#39;, &quot;_YKH_&quot; }</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>/// &lt;summary&gt;</span></span>
<span class="line"><span>/// 预处理参数符号转文本</span></span>
<span class="line"><span>/// &lt;/summary&gt;</span></span>
<span class="line"><span>/// &lt;param name=&quot;expression&quot;&gt;&lt;/param&gt;</span></span>
<span class="line"><span>/// &lt;param name=&quot;dynamicObject&quot;&gt;&lt;/param&gt;</span></span>
<span class="line"><span>/// &lt;returns&gt;&lt;/returns&gt;</span></span>
<span class="line"><span>public string PreReplaceOpratorToText(string expression, Dictionary&lt;string, object&gt; dynamicObject)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    //如果是参数里面包含了括号,将其中的参数替换成特殊字符</span></span>
<span class="line"><span>    var existOperatorKeys = dynamicObject.Keys.Where(s =&gt; OperatorToTextDic.Keys.Any(s2 =&gt; s.Contains(s2))).ToList();</span></span>
<span class="line"><span>    //存在特殊字符变量的</span></span>
<span class="line"><span>    if (existOperatorKeys.Any())</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        //将符号替换成字母</span></span>
<span class="line"><span>        foreach (var s in existOperatorKeys)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            var newKey = s;</span></span>
<span class="line"><span>            foreach (var s2 in OperatorToTextDic)</span></span>
<span class="line"><span>            {</span></span>
<span class="line"><span>                newKey = newKey.Replace(s2.Key.ToString(), s2.Value);</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            expression = expression.Replace(s, newKey);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return expression;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul></li><li><p>PreParserInfixExpression 计算嵌套(),以及先行计算纯数字，主要是在后面转换为mongo语法的时候用到，让纯数字计算在内存中运行而不是数据库中计算</p><ul><li><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>/// &lt;summary&gt;</span></span>
<span class="line"><span>/// 预处理计算表达式</span></span>
<span class="line"><span>/// &lt;/summary&gt;</span></span>
<span class="line"><span>/// &lt;param name=&quot;expression&quot;&gt;表达式&lt;/param&gt;</span></span>
<span class="line"><span>/// &lt;param name=&quot;dynamicObject&quot;&gt;参数&lt;/param&gt;</span></span>
<span class="line"><span>/// &lt;param name=&quot;isCompile&quot;&gt;是否是编译&lt;/param&gt;</span></span>
<span class="line"><span>/// &lt;returns&gt;&lt;/returns&gt;</span></span>
<span class="line"><span>public string PreParserInfixExpression(string expression, Dictionary&lt;string, object&gt; dynamicObject, bool isCompile = false)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    expression = expression.Trim();</span></span>
<span class="line"><span>    string pattern = @&quot;((.*?))&quot;;</span></span>
<span class="line"><span>    Match match = Regex.Match(expression, pattern);</span></span>
<span class="line"><span>    if (match.Success &amp;&amp; match.Groups.Count &gt; 1)</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        var constText = match.Groups[0].Value;</span></span>
<span class="line"><span>        var constValue = match.Groups[1].Value;</span></span>
<span class="line"><span>        string numPattern = @&quot;(([\\s|0-9|+-*/|.]+))&quot;;</span></span>
<span class="line"><span>        //纯数字计算 或者 不是编译预约</span></span>
<span class="line"><span>        if (Regex.IsMatch(constText, numPattern) || !isCompile)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            var evalValue = EvalNumber(constValue, dynamicObject);</span></span>
<span class="line"><span>            if (evalValue == null)</span></span>
<span class="line"><span>                return string.Empty;</span></span>
<span class="line"><span>            var replaceText = evalValue.ToString();</span></span>
<span class="line"><span>            expression = expression.Replace(constText, replaceText);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        else if (isCompile)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            //编译计算</span></span>
<span class="line"><span>            var completeText = Compile(constValue, dynamicObject).ToString();</span></span>
<span class="line"><span>            //临时参数Key</span></span>
<span class="line"><span>            var tempPramKey = &quot;temp_&quot; + Guid.NewGuid().ToString(&quot;n&quot;);</span></span>
<span class="line"><span>            dynamicObject.Add(tempPramKey, completeText);</span></span>
<span class="line"><span>            expression = expression.Replace(constText, tempPramKey);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        else</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            return expression;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        return PreParserInfixExpression(expression, dynamicObject, isCompile);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return expression;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul></li></ul></li><li><p>ParserInfixExpression 表达式转换核心代码</p><ul><li><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>/// &lt;summary&gt;</span></span>
<span class="line"><span>/// 转换表达式</span></span>
<span class="line"><span>/// &lt;/summary&gt;</span></span>
<span class="line"><span>/// &lt;param name=&quot;expression&quot;&gt;&lt;/param&gt;</span></span>
<span class="line"><span>/// &lt;param name=&quot;dynamicObject&quot;&gt;&lt;/param&gt;</span></span>
<span class="line"><span>/// &lt;param name=&quot;isComplete&quot;&gt;&lt;/param&gt;</span></span>
<span class="line"><span>/// &lt;returns&gt;&lt;/returns&gt;</span></span>
<span class="line"><span>public Queue&lt;EvalItem&gt; ParserInfixExpression(string expression, Dictionary&lt;string, object&gt; dynamicObject, bool isComplete = false)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    var queue = new Queue&lt;EvalItem&gt;();</span></span>
<span class="line"><span>    if (string.IsNullOrEmpty(expression))</span></span>
<span class="line"><span>        return queue;</span></span>
<span class="line"><span>    expression = PreReplaceOpratorToText(expression, dynamicObject);</span></span>
<span class="line"><span>    expression = PreParserInfixExpression(expression, dynamicObject, isComplete);</span></span>
<span class="line"><span>    if (string.IsNullOrEmpty(expression))</span></span>
<span class="line"><span>        return queue;</span></span>
<span class="line"><span>    var operatorStack = new Stack&lt;OperatorChar&gt;();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    int index = 0;</span></span>
<span class="line"><span>    int itemLength = 0;</span></span>
<span class="line"><span>    //当第一个字符为+或者-的时候</span></span>
<span class="line"><span>    char firstChar = expression[0];</span></span>
<span class="line"><span>    if (firstChar == AddOprator || firstChar == SubOperator)</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        expression = string.Concat(&quot;0&quot;, expression);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    int expressionLength = expression.Length;</span></span>
<span class="line"><span>    using (var scanner = new StringReader(expression))</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        string operatorPreItem = string.Empty;</span></span>
<span class="line"><span>        while (scanner.Peek() &gt; -1)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            char currentChar = (char)scanner.Read();</span></span>
<span class="line"><span>            switch (currentChar)</span></span>
<span class="line"><span>            {</span></span>
<span class="line"><span>                case AddOprator:</span></span>
<span class="line"><span>                case SubOperator:</span></span>
<span class="line"><span>                case DivOperator:</span></span>
<span class="line"><span>                case MulOperator:</span></span>
<span class="line"><span>                case LBraceOperator:</span></span>
<span class="line"><span>                case RBraceOperator:</span></span>
<span class="line"><span>                    //直接把数字压入到队列中</span></span>
<span class="line"><span>                    operatorPreItem = expression.Substring(index, itemLength);</span></span>
<span class="line"><span>                    if (operatorPreItem != &quot;&quot;)</span></span>
<span class="line"><span>                    {</span></span>
<span class="line"><span>                        var numberItem = new EvalItem(EItemType.Value, operatorPreItem);</span></span>
<span class="line"><span>                        queue.Enqueue(numberItem);</span></span>
<span class="line"><span>                    }</span></span>
<span class="line"><span>                    index = index + itemLength + 1;</span></span>
<span class="line"><span>                    itemLength = -1;</span></span>
<span class="line"><span>                    //当前操作符</span></span>
<span class="line"><span>                    var currentOperChar = new OperatorChar() { Operator = currentChar };</span></span>
<span class="line"><span>                    if (operatorStack.Count == 0)</span></span>
<span class="line"><span>                    {</span></span>
<span class="line"><span>                        operatorStack.Push(currentOperChar);</span></span>
<span class="line"><span>                        break;</span></span>
<span class="line"><span>                    }</span></span>
<span class="line"><span>                    //处理当前操作符与操作字符栈进出</span></span>
<span class="line"><span>                    var topOperator = operatorStack.Peek();</span></span>
<span class="line"><span>                    //若当前操作符为(或者栈顶元素为(则直接入栈</span></span>
<span class="line"><span>                    if (currentOperChar == LBraceOperatorChar || topOperator == LBraceOperatorChar)</span></span>
<span class="line"><span>                    {</span></span>
<span class="line"><span>                        operatorStack.Push(currentOperChar);</span></span>
<span class="line"><span>                        break;</span></span>
<span class="line"><span>                    }</span></span>
<span class="line"><span>                    //若当前操作符为),则栈顶元素顺序输出到队列,至到栈顶元素(输出为止,单(不进入队列,它自己也不进入队列</span></span>
<span class="line"><span>                    if (currentOperChar == RBraceOperatorChar)</span></span>
<span class="line"><span>                    {</span></span>
<span class="line"><span>                        while (operatorStack.Count &gt; 0)</span></span>
<span class="line"><span>                        {</span></span>
<span class="line"><span>                            if (operatorStack.Peek() != LBraceOperatorChar)</span></span>
<span class="line"><span>                            {</span></span>
<span class="line"><span>                                var operatorItem = new EvalItem(EItemType.Operator, operatorStack.Pop().GetContent());</span></span>
<span class="line"><span>                                queue.Enqueue(operatorItem);</span></span>
<span class="line"><span>                            }</span></span>
<span class="line"><span>                            else</span></span>
<span class="line"><span>                            {</span></span>
<span class="line"><span>                                break;</span></span>
<span class="line"><span>                            }</span></span>
<span class="line"><span>                        }</span></span>
<span class="line"><span>                        if (operatorStack.Count &gt; 0 &amp;&amp; operatorStack.Peek() == RBraceOperatorChar)</span></span>
<span class="line"><span>                        {</span></span>
<span class="line"><span>                            operatorStack.Pop();</span></span>
<span class="line"><span>                        }</span></span>
<span class="line"><span>                        break;</span></span>
<span class="line"><span>                    }</span></span>
<span class="line"><span>                    //若栈顶元素优先级高于当前元素，则栈顶元素输出到队列,当前元素入栈</span></span>
<span class="line"><span>                    if (topOperator.Level &gt; currentOperChar.Level || topOperator.Level == currentOperChar.Level)</span></span>
<span class="line"><span>                    {</span></span>
<span class="line"><span>                        var topActualOperator = operatorStack.Pop();</span></span>
<span class="line"><span>                        var operatorItem = new EvalItem(EItemType.Operator, topActualOperator.GetContent());</span></span>
<span class="line"><span>                        queue.Enqueue(operatorItem);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                        while (operatorStack.Count &gt; 0)</span></span>
<span class="line"><span>                        {</span></span>
<span class="line"><span>                            var tempTop = operatorStack.Peek();</span></span>
<span class="line"><span>                            if (tempTop.Level &gt; currentOperChar.Level || tempTop.Level == currentOperChar.Level)</span></span>
<span class="line"><span>                            {</span></span>
<span class="line"><span>                                var topTemp = operatorStack.Pop();</span></span>
<span class="line"><span>                                var operatorTempItem = new EvalItem(EItemType.Operator, topTemp.GetContent());</span></span>
<span class="line"><span>                                queue.Enqueue(operatorTempItem);</span></span>
<span class="line"><span>                            }</span></span>
<span class="line"><span>                            else</span></span>
<span class="line"><span>                            {</span></span>
<span class="line"><span>                                break;</span></span>
<span class="line"><span>                            }</span></span>
<span class="line"><span>                        }</span></span>
<span class="line"><span>                        operatorStack.Push(currentOperChar);</span></span>
<span class="line"><span>                    }</span></span>
<span class="line"><span>                    //当当前元素小于栈顶元素的时候，当前元素直接入栈</span></span>
<span class="line"><span>                    else</span></span>
<span class="line"><span>                    {</span></span>
<span class="line"><span>                        operatorStack.Push(currentOperChar);</span></span>
<span class="line"><span>                    }</span></span>
<span class="line"><span>                    break;</span></span>
<span class="line"><span>                default:</span></span>
<span class="line"><span>                    break;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            itemLength++;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    //剩余无符号的字符串</span></span>
<span class="line"><span>    if (index &lt; expressionLength)</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        string lastNumber = expression.Substring(index, expressionLength - index);</span></span>
<span class="line"><span>        var lastNumberItem = new EvalItem(EItemType.Value, lastNumber);</span></span>
<span class="line"><span>        queue.Enqueue(lastNumberItem);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    //弹出栈中所有操作符号</span></span>
<span class="line"><span>    if (operatorStack.Count &gt; 0)</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        while (operatorStack.Count != 0)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            var topOperator = operatorStack.Pop();</span></span>
<span class="line"><span>            var operatorItem = new EvalItem(EItemType.Operator, topOperator.GetContent());</span></span>
<span class="line"><span>            queue.Enqueue(operatorItem);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return queue;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul></li></ul><h3 id="evaldate-实现指定日期类型输出" tabindex="-1"><a class="header-anchor" href="#evaldate-实现指定日期类型输出"><span>EvalDate 实现指定日期类型输出</span></a></h3><p>因项目需要，需要将当前日期，当前时间加入默认变量，并支持加入计算公式中，计算的结果也可以选择是日期或者数值。</p><p>需要实现这个功能，需要先定义好，时间如何计算，我们将日期时间转换成时间戳来进行转换后参与计算，计算完成后再转换成日期即可。</p><p>所以只需要在上面的数值计算包裹一层就可以得到日期的计算结果</p><ul><li><p>EvalDate 核心代码</p><ul><li><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>/// &lt;summary&gt;</span></span>
<span class="line"><span>/// 计算表达式的日期结果</span></span>
<span class="line"><span>/// &lt;/summary&gt;</span></span>
<span class="line"><span>/// &lt;param name=&quot;expression&quot;&gt;表达式&lt;/param&gt;</span></span>
<span class="line"><span>/// &lt;param name=&quot;dynamicObject&quot;&gt;动态对象&lt;/param&gt;</span></span>
<span class="line"><span>/// &lt;returns&gt;计算的结果&lt;/returns&gt;</span></span>
<span class="line"><span>public DateTime? EvalDate(string expression, Dictionary&lt;string, object&gt; dynamicObject)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    var dateNumValue = EvalNumber(expression, dynamicObject);</span></span>
<span class="line"><span>    if (dateNumValue == null)</span></span>
<span class="line"><span>        return null;</span></span>
<span class="line"><span>    if (long.TryParse(dateNumValue.ToString(), out long dateNum))</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        return JsTimeToDateTime(dateNum);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return null;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/// &lt;summary&gt;</span></span>
<span class="line"><span>/// 毫秒级时间戳转成 DateTime</span></span>
<span class="line"><span>/// &lt;/summary&gt;</span></span>
<span class="line"><span>/// &lt;param name=&quot;unixTimestamp&quot;&gt;&lt;/param&gt;</span></span>
<span class="line"><span>/// &lt;returns&gt;&lt;/returns&gt;</span></span>
<span class="line"><span>private DateTime JsTimeToDateTime(long unixTimestamp)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    return DateTimeOffset.FromUnixTimeMilliseconds(unixTimestamp).LocalDateTime;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul></li></ul><h3 id="代码中的数据定义" tabindex="-1"><a class="header-anchor" href="#代码中的数据定义"><span>代码中的数据定义</span></a></h3><p>其他数据定义 OperatorChar EvalItem EItemType CharExtension 可以查看<a href="https://github.com/yimogit/MeDevOps/blob/main/demos/DevopsDemo/EvalDemo" target="_blank" rel="noopener noreferrer">完整demo</a></p><h2 id="相关说明" tabindex="-1"><a class="header-anchor" href="#相关说明"><span>相关说明</span></a></h2><ul><li>相关算法：中缀表达式，后缀表达式，逆波兰算法，调度场算法</li><li>相关语言：C#</li><li>参考项目：<a href="https://github.com/qinfengzhu/Evaluator" target="_blank" rel="noopener noreferrer">qinfengzhu/Evaluator</a></li><li>本文Demo: <a href="https://github.com/yimogit/MeDevOps/tree/main/demos/DevopsDemo/EvalDemo" target="_blank" rel="noopener noreferrer">DevopsDemo/EvalDemo</a></li></ul><h2 id="后语" tabindex="-1"><a class="header-anchor" href="#后语"><span>后语</span></a></h2><blockquote><p>期间找了很多开源项目参考，需求的独特性，最终是实现了功能</p><p>整个计算字段的实现花了3周时间，终于是顺利上线。</p><p>沉迷学习，无法自拔。</p></blockquote>`,31)]))}const u=n(r,[["render",c],["__file","csharp_eval.html.vue"]]),m=JSON.parse('{"path":"/posts/developer/csharp_eval.html","title":"字符串表达式计算(a+b/(a-b))的思路与实践","lang":"zh-CN","frontmatter":{"title":"字符串表达式计算(a+b/(a-b))的思路与实践","date":"2023-10-31T09:09:00.000Z","category":["Developer"],"tag":["C#","算法"],"description":"前言 为满足业务需要，需要为项目中自定义模板添加一个计算字段的组件，通过设置字符串表达式，使用时在改变表达式其中一个字段的数据时，自动计算另外一个字段的值。 本篇为上篇，介绍原理，简单实现一个工具，输入字符串表达式，解析其中的参数，输入参数计算结果。 下篇将基于此封装实现对Mongo查询语法的封装，通过addFields的方式转换表达式，后续等封装成N...","head":[["meta",{"property":"og:url","content":"https://www.yimo.link/posts/developer/csharp_eval.html"}],["meta",{"property":"og:site_name","content":"易墨网"}],["meta",{"property":"og:title","content":"字符串表达式计算(a+b/(a-b))的思路与实践"}],["meta",{"property":"og:description","content":"前言 为满足业务需要，需要为项目中自定义模板添加一个计算字段的组件，通过设置字符串表达式，使用时在改变表达式其中一个字段的数据时，自动计算另外一个字段的值。 本篇为上篇，介绍原理，简单实现一个工具，输入字符串表达式，解析其中的参数，输入参数计算结果。 下篇将基于此封装实现对Mongo查询语法的封装，通过addFields的方式转换表达式，后续等封装成N..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-10-28T11:15:42.000Z"}],["meta",{"property":"article:tag","content":"C#"}],["meta",{"property":"article:tag","content":"算法"}],["meta",{"property":"article:published_time","content":"2023-10-31T09:09:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-10-28T11:15:42.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"字符串表达式计算(a+b/(a-b))的思路与实践\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-10-31T09:09:00.000Z\\",\\"dateModified\\":\\"2024-10-28T11:15:42.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"易墨\\",\\"url\\":\\"https://www.yimo.link\\"}]}"]]},"headers":[{"level":2,"title":"前言","slug":"前言","link":"#前言","children":[]},{"level":2,"title":"实现思路","slug":"实现思路","link":"#实现思路","children":[]},{"level":2,"title":"实现代码","slug":"实现代码","link":"#实现代码","children":[{"level":3,"title":"调用代码","slug":"调用代码","link":"#调用代码","children":[]},{"level":3,"title":"EvalParser 类的实现","slug":"evalparser-类的实现","link":"#evalparser-类的实现","children":[]},{"level":3,"title":"EvalNumber 实现","slug":"evalnumber-实现","link":"#evalnumber-实现","children":[]},{"level":3,"title":"ParserInfixExpression 实现","slug":"parserinfixexpression-实现","link":"#parserinfixexpression-实现","children":[]},{"level":3,"title":"EvalDate 实现指定日期类型输出","slug":"evaldate-实现指定日期类型输出","link":"#evaldate-实现指定日期类型输出","children":[]},{"level":3,"title":"代码中的数据定义","slug":"代码中的数据定义","link":"#代码中的数据定义","children":[]}]},{"level":2,"title":"相关说明","slug":"相关说明","link":"#相关说明","children":[]},{"level":2,"title":"后语","slug":"后语","link":"#后语","children":[]}],"git":{"createdTime":1730114142000,"updatedTime":1730114142000,"contributors":[{"name":"yimo","email":"yimo@wikiglobal.com","commits":1}]},"readingTime":{"minutes":8.13,"words":2440},"filePathRelative":"posts/developer/csharp_eval.md","localizedDate":"2023年10月31日","excerpt":"<h2>前言</h2>\\n<blockquote>\\n<p>为满足业务需要，需要为项目中自定义模板添加一个计算字段的组件，通过设置字符串表达式，使用时在改变表达式其中一个字段的数据时，自动计算另外一个字段的值。</p>\\n<p>本篇为上篇，介绍原理，简单实现一个工具，输入<strong>字符串表达式</strong>，解析其中的参数，输入参数<strong>计算结果。</strong></p>\\n<p>下篇将基于此封装实现对Mongo查询语法的封装，通过addFields的方式转换表达式，后续等封装成NuGet包再分享</p>\\n</blockquote>\\n<p>实现如下所示</p>\\n<div class=\\"language- line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext=\\"\\" data-title=\\"\\" style=\\"--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes one-light one-dark-pro vp-code\\"><code><span class=\\"line\\"><span>输入 1+1  输出 2</span></span>\\n<span class=\\"line\\"><span>输入 a+1 参数a:1 输出 2</span></span>\\n<span class=\\"line\\"><span>输入 (a+1)*b 输入a:1,b:1 输出 2</span></span>\\n<span class=\\"line\\"><span>输入 (a+1-(2+a)*3/3)/a+3 输入a:1 输出 2</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{u as comp,m as data};
