import{_ as t}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as o,e as n,o as i}from"./app-BHZ56IUu.js";const c={};function d(s,e){return i(),o("div",null,e[0]||(e[0]=[n(`<h2 id="安装docker" tabindex="-1"><a class="header-anchor" href="#安装docker"><span>安装docker</span></a></h2><ol><li><p>安装Linux，使用云服务器或者虚拟机 参考：http://www.cnblogs.com/wangjieguang/p/hyper-v-ubuntu.html</p></li><li><p>系统更新 <code>sudo apt-get update</code></p></li><li><p>使用阿里云的镜像安装docker客户端：https://cr.console.aliyun.com/#/accelerator</p><figure><img src="https://dn-coding-net-production-pp.qbox.me/2c28a309-16dc-4d3d-a1be-5fcb51eba8fc.png" alt="图片" tabindex="0" loading="lazy"><figcaption>图片</figcaption></figure></li><li><p>查看版本</p><figure><img src="https://dn-coding-net-production-pp.qbox.me/f4fae61f-166d-4bf9-89e4-acd05b1e38b8.png" alt="图片" tabindex="0" loading="lazy"><figcaption>图片</figcaption></figure></li><li><p>安装core镜像 <code>sudo docker pull microsoft/dotnet</code></p></li><li><p>运行容器<code>sudo docker run -it --rm microsoft/dotnet</code></p></li><li><p>克隆仓库代码到本地，并将主机复制到容器中 <code>sudo docker cp ./代码目录/ 容器ID:/</code></p></li><li><p>进入容器：<code>sudo docker attach 容器ID</code>，进入输出目录执行还原：<code>dotnet restore</code>，运行<code>dotnet run</code></p></li></ol><h2 id="linux-安装-core-sdk进行开发" tabindex="-1"><a class="header-anchor" href="#linux-安装-core-sdk进行开发"><span>Linux 安装 Core SDK进行开发</span></a></h2><ol><li>Ubuntu 16.04 https://www.microsoft.com/net/core#linuxubuntu</li></ol><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span></span></span>
<span class="line"><span>sudo sh -c &#39;echo &quot;deb [arch=amd64] https://apt-mo.trafficmanager.net/repos/dotnet-release/ xenial main&quot; &gt; /etc/apt/sources.list.d/dotnetdev.list&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 417A0893</span></span>
<span class="line"><span></span></span>
<span class="line"><span>sudo apt-get update</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li><p>使用git拉取项目到本地</p></li><li><p>进入项目的输出目录</p></li><li><p><code>dotnet restore</code></p><p>可以设置下Nuget的镜像 http://www.cnblogs.com/cmt/p/nuget-mirror.html</p></li><li><p><code>dotnet build</code></p><p>这里遇到一个报错：/usr/share/dotnet/sdk/1.0.4/Sdks/Microsoft.NET.Sdk/build/Microsoft.NET.Sdk.DefaultItems.targets(188,5)</p><p>解决方法：https://stackoverflow.com/questions/43325916/duplicate-content-items-were-included-the-net-sdk-includes-content-items-f</p><p>在解决方案中对应的节点添加配置</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span></span></span>
<span class="line"><span>    &lt;PropertyGroup&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        &lt;EnableDefaultContentItems&gt;false&lt;/EnableDefaultContentItems&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;/PropertyGroup&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>多个类库项目发布在Linux下不会拷贝views文件夹，我将wwwroot文件夹的Content给删掉了。</p></li></ol><p>http://www.cnblogs.com/keepcodingforever/p/6698862.html</p><ol start="6"><li><p><code>dotnet run</code></p></li><li><p>测试 <code>curl http://localhost:5000</code></p></li><li><p>docker删除所有未运行容器</p></li></ol><p><code>sudo docker rm $(sudo docker ps -a -q)</code></p><ol start="9"><li>docker删除所有未打tag的镜像</li></ol><p><code>sudo docker rmi $(sudo docker images -q | awk &#39;/^&lt;none&gt;/ { print $3 }&#39;)</code></p><ol start="10"><li>docker删除所有镜像</li></ol><p><code>docker rmi $(docker images -q)</code></p><ol start="11"><li>运行容器：<code>sudo docker run -d -p 8002:8080 meqacore</code></li></ol>`,14)]))}const p=t(c,[["render",d],["__file","docker_publish_netcore_website_scattered_records.html.vue"]]),l=JSON.parse('{"path":"/posts/docker/docker_publish_netcore_website_scattered_records.html","title":"docker发布netcore网站-零散记录","lang":"zh-CN","frontmatter":{"title":"docker发布netcore网站-零散记录","date":"2017-08-24T11:29:00.000Z","category":["Docker"],"tag":[".net core"],"description":"安装docker 安装Linux，使用云服务器或者虚拟机 参考：http://www.cnblogs.com/wangjieguang/p/hyper-v-ubuntu.html 系统更新 sudo apt-get update 使用阿里云的镜像安装docker客户端：https://cr.console.aliyun.com/#/accelerato...","head":[["meta",{"property":"og:url","content":"https://www.yimo.link/posts/docker/docker_publish_netcore_website_scattered_records.html"}],["meta",{"property":"og:site_name","content":"易墨网"}],["meta",{"property":"og:title","content":"docker发布netcore网站-零散记录"}],["meta",{"property":"og:description","content":"安装docker 安装Linux，使用云服务器或者虚拟机 参考：http://www.cnblogs.com/wangjieguang/p/hyper-v-ubuntu.html 系统更新 sudo apt-get update 使用阿里云的镜像安装docker客户端：https://cr.console.aliyun.com/#/accelerato..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://dn-coding-net-production-pp.qbox.me/2c28a309-16dc-4d3d-a1be-5fcb51eba8fc.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-10-28T11:15:42.000Z"}],["meta",{"property":"article:tag","content":".net core"}],["meta",{"property":"article:published_time","content":"2017-08-24T11:29:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-10-28T11:15:42.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"docker发布netcore网站-零散记录\\",\\"image\\":[\\"https://dn-coding-net-production-pp.qbox.me/2c28a309-16dc-4d3d-a1be-5fcb51eba8fc.png\\",\\"https://dn-coding-net-production-pp.qbox.me/f4fae61f-166d-4bf9-89e4-acd05b1e38b8.png\\"],\\"datePublished\\":\\"2017-08-24T11:29:00.000Z\\",\\"dateModified\\":\\"2024-10-28T11:15:42.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"易墨\\",\\"url\\":\\"https://www.yimo.link\\"}]}"]]},"headers":[{"level":2,"title":"安装docker","slug":"安装docker","link":"#安装docker","children":[]},{"level":2,"title":"Linux 安装 Core SDK进行开发","slug":"linux-安装-core-sdk进行开发","link":"#linux-安装-core-sdk进行开发","children":[]}],"git":{"createdTime":1730114142000,"updatedTime":1730114142000,"contributors":[{"name":"yimo","email":"yimo@wikiglobal.com","commits":1}]},"readingTime":{"minutes":1.43,"words":428},"filePathRelative":"posts/docker/docker_publish_netcore_website_scattered_records.md","localizedDate":"2017年8月24日","excerpt":"<h2>安装docker</h2>\\n<ol>\\n<li>\\n<p>安装Linux，使用云服务器或者虚拟机 参考：http://www.cnblogs.com/wangjieguang/p/hyper-v-ubuntu.html</p>\\n</li>\\n<li>\\n<p>系统更新 <code>sudo apt-get update</code></p>\\n</li>\\n<li>\\n<p>使用阿里云的镜像安装docker客户端：https://cr.console.aliyun.com/#/accelerator</p>\\n<figure><img src=\\"https://dn-coding-net-production-pp.qbox.me/2c28a309-16dc-4d3d-a1be-5fcb51eba8fc.png\\" alt=\\"图片\\" tabindex=\\"0\\" loading=\\"lazy\\"><figcaption>图片</figcaption></figure>\\n</li>\\n<li>\\n<p>查看版本</p>\\n<figure><img src=\\"https://dn-coding-net-production-pp.qbox.me/f4fae61f-166d-4bf9-89e4-acd05b1e38b8.png\\" alt=\\"图片\\" tabindex=\\"0\\" loading=\\"lazy\\"><figcaption>图片</figcaption></figure>\\n</li>\\n<li>\\n<p>安装core镜像 <code>sudo docker pull microsoft/dotnet</code></p>\\n</li>\\n<li>\\n<p>运行容器<code>sudo docker run -it --rm microsoft/dotnet</code></p>\\n</li>\\n<li>\\n<p>克隆仓库代码到本地，并将主机复制到容器中 <code>sudo docker cp ./代码目录/ 容器ID:/</code></p>\\n</li>\\n<li>\\n<p>进入容器：<code>sudo docker attach 容器ID</code>，进入输出目录执行还原：<code>dotnet restore</code>，运行<code>dotnet run</code></p>\\n</li>\\n</ol>","autoDesc":true}');export{p as comp,l as data};
