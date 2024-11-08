import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,e as i,o as e}from"./app-f_uNzTRF.js";const l={};function p(d,s){return e(),a("div",null,s[0]||(s[0]=[i(`<h3 id="bat基础命令" tabindex="-1"><a class="header-anchor" href="#bat基础命令"><span>bat基础命令</span></a></h3><ul><li><p>注释：<code>rem 注释~~</code></p></li><li><p>输出：<code>echo hello world</code></p></li><li><p>接收用户输入：<code>%1 %2</code>,第n个变量就用<code>%n</code>表示</p></li><li><p>当前脚本路径：<code>%~dp0</code></p></li><li><p>当前目录路径：<code>%cd%</code></p></li><li><p>设置变量：<code>set currentPath=%cd%</code></p></li><li><p>关闭回显：<code>@echo off</code> //隐藏执行路径，@表示包含echo off这条命令也不现实路径</p></li><li><p>请按任意键继续：<code>pause</code></p></li><li><p>调用外部程序：<code>start xxx.exe</code></p></li><li><p>等待子程序执行完毕：<code>call start xxx.exe</code></p></li><li><p>切换当前目录:<code>cd /d 路径</code></p></li><li><p>显示下级子目录名称：<code>dir /b /a:d</code></p></li><li><p>显示下级子文件名称：<code>dir /b /a:-d</code></p></li><li><p>命令连接符:<code>cmd1&amp;cmd2</code>,在cmd1执行成功后执行cmd2</p></li><li><p>字符串分割：\`\`</p></li><li><p>复制：<code>xcopy 要复制的目录 目标目录 /s /e /Q /Y /I</code></p></li></ul><h3 id="_1-保存当前目录到局部变量并输出" tabindex="-1"><a class="header-anchor" href="#_1-保存当前目录到局部变量并输出"><span>1. 保存当前目录到局部变量并输出</span></a></h3><p>保存：<code>set currentPath=%cd%</code></p><p>输出：<code>echo %currentPath</code></p><h3 id="_2-判断第一个脚本参数是否为ab-i-忽略大小写-若是则输出success-否则输出参数" tabindex="-1"><a class="header-anchor" href="#_2-判断第一个脚本参数是否为ab-i-忽略大小写-若是则输出success-否则输出参数"><span>2. 判断第一个脚本参数是否为ab(/i 忽略大小写)，若是则输出success，否则输出参数</span></a></h3><p><code>if /i %1 == ab (echo success) else (echo %1)</code></p><h3 id="_3-判断当前执行目录-驱动器、文件或文件夹-是否存在是否存在logs文件夹-若不存在则创建" tabindex="-1"><a class="header-anchor" href="#_3-判断当前执行目录-驱动器、文件或文件夹-是否存在是否存在logs文件夹-若不存在则创建"><span>3. 判断当前执行目录（驱动器、文件或文件夹）是否存在是否存在logs文件夹，若不存在则创建</span></a></h3><p><code>if not exist %cd%\\logs md %cd%\\logs</code></p><p>如果想要一行写多条语句可以使用()括起来：<code>(if exist .\\\\test echo exist test dic)&amp;&amp; echo 233</code></p><h3 id="_4-一个简单的for循环打印当前目录文件及文件夹-bat脚本中需要-直接执行只需要一个-即可" tabindex="-1"><a class="header-anchor" href="#_4-一个简单的for循环打印当前目录文件及文件夹-bat脚本中需要-直接执行只需要一个-即可"><span>4. 一个简单的for循环打印当前目录文件及文件夹（bat脚本中需要%%,直接执行只需要一个%即可）</span></a></h3><p><code>for /f &quot;delims=&quot; %%i in (&#39;dir /b .\\&#39;) do echo %%i</code></p><h3 id="_5-for循环里面对变量的赋值" tabindex="-1"><a class="header-anchor" href="#_5-for循环里面对变量的赋值"><span>5. for循环里面对变量的赋值</span></a></h3><blockquote><p>这个默认如果对变量进行赋值打印（<code>echo %变量%</code>）出来的结果始终是第一次的赋值结果，</p></blockquote><blockquote><p>若要对局部变量赋值则需要启用延迟环境变量扩展(<code>setlocal enabledelayedexpansion</code>)</p></blockquote><blockquote><p>将其添加到头部后，对变量赋值，然后输出：<code>echo !变量名!</code>。符号由%变更为!</p></blockquote><div class="language-bat line-numbers-mode" data-highlighter="shiki" data-ext="bat" data-title="bat" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-light-font-style:italic;--shiki-dark:#C678DD;--shiki-dark-font-style:italic;">rem</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"> 输出当前目录下的文件文件夹</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">@</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">echo</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> off</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">setlocal</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> enabledelayedexpansion</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">for</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> /f </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;delims=&quot;</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;"> %%i</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> in</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> (&#39;dir /b  .\\&#39;) </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">do</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> (</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    set</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> temp</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;">%%i</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    echo</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> !temp!</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-使用for-goto-将字符串-a-b-c-d-以-或者-分割并输出-做点事" tabindex="-1"><a class="header-anchor" href="#_6-使用for-goto-将字符串-a-b-c-d-以-或者-分割并输出-做点事"><span>6. 使用for goto 将字符串(a+b+c-d)以+或者-分割并输出(做点事)</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span></span></span>
<span class="line"><span>@echo off</span></span>
<span class="line"><span></span></span>
<span class="line"><span>setlocal enabledelayedexpansion</span></span>
<span class="line"><span></span></span>
<span class="line"><span>set str=&quot;a+b+c-d&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>:Step1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>for /f &quot;delims=-+, tokens=1,*&quot; %%a in (%str%) do (</span></span>
<span class="line"><span></span></span>
<span class="line"><span>REM todo case a b c d...</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    echo %%a</span></span>
<span class="line"><span></span></span>
<span class="line"><span>REM 重新赋值并跳转到GOON</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    set str=&quot;%%b&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    goto Step1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>分割后的第一个</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span></span></span>
<span class="line"><span>@echo off</span></span>
<span class="line"><span></span></span>
<span class="line"><span>setlocal enabledelayedexpansion</span></span>
<span class="line"><span></span></span>
<span class="line"><span>set str=&quot;a;b;c&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>for /f &quot;delims=;, tokens=1,*&quot; %%a in (%str%) do (</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    set s= %%a</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    echo &quot;first:!s!&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7-重启iis站点" tabindex="-1"><a class="header-anchor" href="#_7-重启iis站点"><span>7. 重启IIS站点</span></a></h3><p>停止：<code>C:\\Windows\\System32\\inetsrv\\appcmd.exe stop site 网站名称</code></p><p>启动：<code>C:\\Windows\\System32\\inetsrv\\appcmd.exe start site 网站名称</code></p><p>或者通过写入/删除<code>app_offline.htm</code></p><h3 id="_8-asp-net-core-2-0-项目发布到iis脚本" tabindex="-1"><a class="header-anchor" href="#_8-asp-net-core-2-0-项目发布到iis脚本"><span>8. asp.net core(2.0) 项目发布到iis脚本</span></a></h3><p>通过写入<code>app_offline.htm</code>文件，请求重定向到此文件解决进程占用问题，发布完成后删除文件请求进入core网站。</p><p>将脚本放到core项目的文件夹，路径自行修改，默认输出项目在src/UI文件夹中。打包文件在当前目录的release文件夹下</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span></span></span>
<span class="line"><span>@echo off</span></span>
<span class="line"><span></span></span>
<span class="line"><span>:: 变量赋值，使用!name!</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>setlocal enabledelayedexpansion</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>set currentPath=%~dp0</span></span>
<span class="line"><span></span></span>
<span class="line"><span>set tempModulesPath=%currentPath%\\temp</span></span>
<span class="line"><span></span></span>
<span class="line"><span>set modulesPath=%currentPath%\\src\\UI\\</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>set str=&quot;项目名称1+项目名称2&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>:GOON</span></span>
<span class="line"><span></span></span>
<span class="line"><span>for /f &quot;delims=,+, tokens=1,*&quot; %%i in (%str%) do (</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    echo --------------------------------------------------------</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    echo 【%%i】发布开始</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	set path1=%modulesPath%%%i</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	set path2=%currentPath%\\release\\%%i\\</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	set filnePath=!path2!app_offline.htm</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	echo !path1!</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	echo 停止【%%i】站点</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	if not exist !path2! md !path2!</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>	cd /d !path1!</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	echo 执行发布【!path2!】</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	echo 网站维护中&gt;!filnePath!</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	call dotnet publish -o !path2!</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	call xcopy %tempModulesPath% !path2! /s /e /Q /Y /I</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	del !filnePath!</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	echo 开启【%%i】站点</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    echo 【%%i】发布完成</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    set str=&quot;%%j&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    goto GOON</span></span>
<span class="line"><span></span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>pause</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_9-发布-dotnet-包到-nuget" tabindex="-1"><a class="header-anchor" href="#_9-发布-dotnet-包到-nuget"><span>9.发布 dotnet 包到 nuget</span></a></h3><ul><li><p><code>%NugetToken%</code>为 nuget 密钥的环境变量值</p></li><li><p>脚本放置到包目录即可</p></li></ul><div class="language-bat line-numbers-mode" data-highlighter="shiki" data-ext="bat" data-title="bat" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">cd</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> ./bin/Release</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">del</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> *.nupkg /s /q</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">cd</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> ../../</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">dotnet build -c Release</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">cd</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> ./bin/Release</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">dotnet nuget push *.nupkg -k </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">%NugetToken%</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> -s https://api.nuget.org/v3/index.json</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">pause</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_10-删除子级-git目录" tabindex="-1"><a class="header-anchor" href="#_10-删除子级-git目录"><span>10.删除子级.git目录</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span></span></span>
<span class="line"><span>@echo off</span></span>
<span class="line"><span></span></span>
<span class="line"><span>setlocal enabledelayedexpansion</span></span>
<span class="line"><span></span></span>
<span class="line"><span>set CurrentDir=%cd%</span></span>
<span class="line"><span></span></span>
<span class="line"><span>for /f &quot;delims=&quot; %%i in (&#39;dir /b /a:d  .\\&#39;) do (</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    echo 删除 %CurrentDir%/%%i/.git</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    cd %CurrentDir%/%%i/</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    rmdir .git /s /q</span></span>
<span class="line"><span></span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>pause</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,34)]))}const r=n(l,[["render",p],["__file","in_common_use_cmd_code_fragment_net_core_pack_script_share.html.vue"]]),o=JSON.parse('{"path":"/posts/dotnetcore/in_common_use_cmd_code_fragment_net_core_pack_script_share.html","title":"常用cmd代码片段及.net core打包脚本分享","lang":"zh-CN","frontmatter":{"title":"常用cmd代码片段及.net core打包脚本分享","date":"2018-04-08T10:14:00.000Z","category":["DotNetCore"],"tag":["脚本",".net core"],"description":"bat基础命令 注释：rem 注释~~ 输出：echo hello world 接收用户输入：%1 %2,第n个变量就用%n表示 当前脚本路径：%~dp0 当前目录路径：%cd% 设置变量：set currentPath=%cd% 关闭回显：@echo off //隐藏执行路径，@表示包含echo off这条命令也不现实路径 请按任意键继续：pause...","head":[["meta",{"property":"og:url","content":"https://www.yimo.link/posts/dotnetcore/in_common_use_cmd_code_fragment_net_core_pack_script_share.html"}],["meta",{"property":"og:site_name","content":"易墨网"}],["meta",{"property":"og:title","content":"常用cmd代码片段及.net core打包脚本分享"}],["meta",{"property":"og:description","content":"bat基础命令 注释：rem 注释~~ 输出：echo hello world 接收用户输入：%1 %2,第n个变量就用%n表示 当前脚本路径：%~dp0 当前目录路径：%cd% 设置变量：set currentPath=%cd% 关闭回显：@echo off //隐藏执行路径，@表示包含echo off这条命令也不现实路径 请按任意键继续：pause..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-10-28T11:15:42.000Z"}],["meta",{"property":"article:tag","content":"脚本"}],["meta",{"property":"article:tag","content":".net core"}],["meta",{"property":"article:published_time","content":"2018-04-08T10:14:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-10-28T11:15:42.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"常用cmd代码片段及.net core打包脚本分享\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2018-04-08T10:14:00.000Z\\",\\"dateModified\\":\\"2024-10-28T11:15:42.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"易墨\\",\\"url\\":\\"https://www.yimo.link\\"}]}"]]},"headers":[{"level":3,"title":"bat基础命令","slug":"bat基础命令","link":"#bat基础命令","children":[]},{"level":3,"title":"1. 保存当前目录到局部变量并输出","slug":"_1-保存当前目录到局部变量并输出","link":"#_1-保存当前目录到局部变量并输出","children":[]},{"level":3,"title":"2. 判断第一个脚本参数是否为ab(/i 忽略大小写)，若是则输出success，否则输出参数","slug":"_2-判断第一个脚本参数是否为ab-i-忽略大小写-若是则输出success-否则输出参数","link":"#_2-判断第一个脚本参数是否为ab-i-忽略大小写-若是则输出success-否则输出参数","children":[]},{"level":3,"title":"3. 判断当前执行目录（驱动器、文件或文件夹）是否存在是否存在logs文件夹，若不存在则创建","slug":"_3-判断当前执行目录-驱动器、文件或文件夹-是否存在是否存在logs文件夹-若不存在则创建","link":"#_3-判断当前执行目录-驱动器、文件或文件夹-是否存在是否存在logs文件夹-若不存在则创建","children":[]},{"level":3,"title":"4. 一个简单的for循环打印当前目录文件及文件夹（bat脚本中需要%%,直接执行只需要一个%即可）","slug":"_4-一个简单的for循环打印当前目录文件及文件夹-bat脚本中需要-直接执行只需要一个-即可","link":"#_4-一个简单的for循环打印当前目录文件及文件夹-bat脚本中需要-直接执行只需要一个-即可","children":[]},{"level":3,"title":"5. for循环里面对变量的赋值","slug":"_5-for循环里面对变量的赋值","link":"#_5-for循环里面对变量的赋值","children":[]},{"level":3,"title":"6. 使用for goto 将字符串(a+b+c-d)以+或者-分割并输出(做点事)","slug":"_6-使用for-goto-将字符串-a-b-c-d-以-或者-分割并输出-做点事","link":"#_6-使用for-goto-将字符串-a-b-c-d-以-或者-分割并输出-做点事","children":[]},{"level":3,"title":"7. 重启IIS站点","slug":"_7-重启iis站点","link":"#_7-重启iis站点","children":[]},{"level":3,"title":"8. asp.net core(2.0) 项目发布到iis脚本","slug":"_8-asp-net-core-2-0-项目发布到iis脚本","link":"#_8-asp-net-core-2-0-项目发布到iis脚本","children":[]},{"level":3,"title":"9.发布 dotnet 包到 nuget","slug":"_9-发布-dotnet-包到-nuget","link":"#_9-发布-dotnet-包到-nuget","children":[]},{"level":3,"title":"10.删除子级.git目录","slug":"_10-删除子级-git目录","link":"#_10-删除子级-git目录","children":[]}],"git":{"createdTime":1730114142000,"updatedTime":1730114142000,"contributors":[{"name":"yimo","email":"yimo@wikiglobal.com","commits":1}]},"readingTime":{"minutes":3.32,"words":997},"filePathRelative":"posts/dotnetcore/in_common_use_cmd_code_fragment_net_core_pack_script_share.md","localizedDate":"2018年4月8日","excerpt":"<h3>bat基础命令</h3>\\n<ul>\\n<li>\\n<p>注释：<code>rem 注释~~</code></p>\\n</li>\\n<li>\\n<p>输出：<code>echo hello world</code></p>\\n</li>\\n<li>\\n<p>接收用户输入：<code>%1 %2</code>,第n个变量就用<code>%n</code>表示</p>\\n</li>\\n<li>\\n<p>当前脚本路径：<code>%~dp0</code></p>\\n</li>\\n<li>\\n<p>当前目录路径：<code>%cd%</code></p>\\n</li>\\n<li>\\n<p>设置变量：<code>set currentPath=%cd%</code></p>\\n</li>\\n<li>\\n<p>关闭回显：<code>@echo off</code> //隐藏执行路径，@表示包含echo off这条命令也不现实路径</p>\\n</li>\\n<li>\\n<p>请按任意键继续：<code>pause</code></p>\\n</li>\\n<li>\\n<p>调用外部程序：<code>start xxx.exe</code></p>\\n</li>\\n<li>\\n<p>等待子程序执行完毕：<code>call start xxx.exe</code></p>\\n</li>\\n<li>\\n<p>切换当前目录:<code>cd /d 路径</code></p>\\n</li>\\n<li>\\n<p>显示下级子目录名称：<code>dir /b /a:d</code></p>\\n</li>\\n<li>\\n<p>显示下级子文件名称：<code>dir /b /a:-d</code></p>\\n</li>\\n<li>\\n<p>命令连接符:<code>cmd1&amp;cmd2</code>,在cmd1执行成功后执行cmd2</p>\\n</li>\\n<li>\\n<p>字符串分割：``</p>\\n</li>\\n<li>\\n<p>复制：<code>xcopy 要复制的目录 目标目录 /s /e /Q /Y /I</code></p>\\n</li>\\n</ul>","autoDesc":true}');export{r as comp,o as data};
