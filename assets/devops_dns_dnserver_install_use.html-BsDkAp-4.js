import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,e as i,o as a}from"./app-BHZ56IUu.js";const l="/assets/662652-20231101192732990-1003837339-k1SxfqUL.png",r="/assets/662652-20231101192732972-888354699-79zIpkGJ.png",t="/assets/662652-20231101192732588-169239232-DGA_kHgZ.png",o="/assets/662652-20231101192733078-798036054-CpG1Y6a8.png",p="/assets/662652-20231101192733053-894930137-DIzvb_zR.png",c="/assets/662652-20231101192733065-1476315200-BKuVr6-x.png",d="/assets/662652-20231101192732832-1907737283-BeH6HE9a.png",h="/assets/662652-20231101192358218-578011080-CxbT79LW.png",m="/assets/662652-20231101192732632-577566523-DAqRPNx6.png",u="/assets/662652-20231101192358016-395398185-B0aEbVKp.png",v="/assets/662652-20231101192732854-88071869-UZQaf0T5.png",g="/assets/662652-20231101192732675-1301736380-DkgsNzoV.png",b="/assets/662652-20231101192733019-955526118-DSBidiIa.png",_="/assets/662652-20231101192733696-1522329044-wsom_6jb.png",k={};function f(S,e){return a(),n("div",null,e[0]||(e[0]=[i(`<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言"><span>前言</span></a></h2><blockquote><p>接上篇 docker-bind 的使用搭建了一个 dns 服务，本篇将介绍另外一款 DnsServer 的部署和使用，更专注，更轻量。</p></blockquote><h3 id="特点" tabindex="-1"><a class="header-anchor" href="#特点"><span>特点</span></a></h3><ul><li>基于 .NET 7 实现 ，支持 Windows、Linux、macOS 和 Raspberry Pi</li><li>开箱即用，使用简单，高性能</li><li>提供 Web 控制台，可视化管理，查看使用情况</li><li>提供了对网络的额外控制，允许阻止域名</li><li>支持 DNS-over-TLS， DNS-over-HTTPS， and DNS-over-QUIC</li><li>DNS-over-HTTPS 实现支持 HTTP/1.1、HTTP/2 和 HTTP/3 传输协议</li><li>HTTP API 由 Web 控制台使用，第三方应用或脚本可以使用 Api 接口配置来 DNS 服务器</li></ul><h3 id="使用情况" tabindex="-1"><a class="header-anchor" href="#使用情况"><span>使用情况</span></a></h3><ul><li>能够快速上手使用，部署好设置域名解析很流畅</li><li>用得深入一点就需要看官方的博客了</li><li>高级的功能没深入研究，暂时只使用了简单的域名解析功能</li></ul><h2 id="dnsserver-的安装使用" tabindex="-1"><a class="header-anchor" href="#dnsserver-的安装使用"><span>DnsServer 的安装使用</span></a></h2><h3 id="准备" tabindex="-1"><a class="header-anchor" href="#准备"><span>准备</span></a></h3><ul><li>版本：v11.4.1</li><li>docker 镜像：technitium/dns-server:11.4.1</li><li>默认端口映射：53:53/tcp 53:53/udp 5380:5380/tcp（53 端口为 DNS 服务使用，5380为面板使用）</li><li>面板访问：http://ip:5380</li></ul><h3 id="使用-docker-compose-安装" tabindex="-1"><a class="header-anchor" href="#使用-docker-compose-安装"><span>使用 Docker Compose 安装</span></a></h3><blockquote><p>本篇文章基于 Docker V24 及 Docker Compose V2，安装可以参考之前的<a href="https://juejin.cn/post/7283873796977197108" target="_blank" rel="noopener noreferrer">文章</a></p></blockquote><h4 id="配置说明" tabindex="-1"><a class="header-anchor" href="#配置说明"><span>配置说明</span></a></h4><ul><li>指定版本：<code>technitium/dns-server:11.4.1</code></li><li>指定时区：Asia/Shanghai 并启用日志使用UTC时区</li><li>指定账号 admin 密码：<code>devops666</code></li><li>指定端口映射：53:53/tcp 53:53/udp 5380 :5380 /tcp（53 端口为 DNS 服务使用，5380 为 Web面板端口）</li><li>挂载数据目录：<code>./data:/data</code></li><li>指定网络：devopsnetwork （<code>docker network create devopsnetwork</code>）</li><li>指定了本地访问端口范围：<code>net.ipv4.ip_local_port_range=1024 65000</code></li></ul><h4 id="配置文件-compose-yml" tabindex="-1"><a class="header-anchor" href="#配置文件-compose-yml"><span>配置文件 compose.yml</span></a></h4><ul><li>准备好 compose.yml 拷贝到服务器</li><li>然后运行<code>docker compose up -d</code>即可</li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>version: &#39;3.1&#39;</span></span>
<span class="line"><span>services:</span></span>
<span class="line"><span>  dns-server:</span></span>
<span class="line"><span>    container_name: dns_server_11_4</span></span>
<span class="line"><span>    hostname: dns-server</span></span>
<span class="line"><span>    restart: always</span></span>
<span class="line"><span>    image: technitium/dns-server:11.4.1</span></span>
<span class="line"><span>    ports:</span></span>
<span class="line"><span>      - &quot;5380:5380/tcp&quot; #DNS web console (HTTP)</span></span>
<span class="line"><span>      # - &quot;53443:53443/tcp&quot; #DNS web console (HTTPS)</span></span>
<span class="line"><span>      - &quot;53:53/udp&quot; #DNS service</span></span>
<span class="line"><span>      - &quot;53:53/tcp&quot; #DNS service</span></span>
<span class="line"><span>    environment:</span></span>
<span class="line"><span>      - TZ=Asia/Shanghai</span></span>
<span class="line"><span>      - DNS_SERVER_LOG_USING_LOCAL_TIME=true</span></span>
<span class="line"><span>      - DNS_SERVER_DOMAIN=dns-server #The primary domain name used by this DNS Server to identify itself.</span></span>
<span class="line"><span>      - DNS_SERVER_ADMIN_PASSWORD=devops666 #DNS web console admin user password.</span></span>
<span class="line"><span>    sysctls:</span></span>
<span class="line"><span>      - net.ipv4.ip_local_port_range=1024 65000</span></span>
<span class="line"><span>    volumes:</span></span>
<span class="line"><span>      - ./data:/etc/dns</span></span>
<span class="line"><span>    networks:</span></span>
<span class="line"><span>      - devopsnetwork</span></span>
<span class="line"><span></span></span>
<span class="line"><span>networks:</span></span>
<span class="line"><span>  devopsnetwork:</span></span>
<span class="line"><span>    external: true</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="部署成功" tabindex="-1"><a class="header-anchor" href="#部署成功"><span>部署成功</span></a></h4><p>部署机器 IP：192.168.123.214</p><figure><img src="`+l+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>容器中资源占用情况</p><figure><img src="'+r+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="dnsserver-的使用" tabindex="-1"><a class="header-anchor" href="#dnsserver-的使用"><span>DnsServer 的使用</span></a></h3><ul><li><p>部署成功后访问：http://192.168.123.214:5380 ,使用 admin devops666 登录 控制台中可以查看到一些监控统计</p><p><img src="'+t+'" alt="" loading="lazy"><img src="'+o+'" alt="" loading="lazy"></p></li></ul><h4 id="局域网域名泛解析到指定ip" tabindex="-1"><a class="header-anchor" href="#局域网域名泛解析到指定ip"><span>局域网域名泛解析到指定IP</span></a></h4><p>和上文一样，需求是需要配置 dns 以将 test.com 解析到 192.168.123.214 中</p><ol><li><p>控制台-&gt;Zones-&gt;Add Zone 创建主区域 test.com</p><figure><img src="'+p+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure></li><li><p>添加泛解析</p><p><img src="'+c+'" alt="" loading="lazy"><img src="'+d+'" alt="" loading="lazy"></p></li><li><p>本机设置 dns <code>192.168.123.214</code> 以及 <code>114.114.114.114</code>(不然无法访问其他网站)</p><figure><img src="'+h+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure></li><li><p>验证dns，正常ping test.com 的IP是存在的，现在就被解析到我们自己的dns了</p><p><img src="'+m+'" alt="" loading="lazy">   可能存在dns缓存，使用 <code>ipconfig /flushdns</code>刷新即可 <img src="'+u+'" alt="" loading="lazy"></p></li></ol><h4 id="查看系统日志" tabindex="-1"><a class="header-anchor" href="#查看系统日志"><span>查看系统日志</span></a></h4><p>需要同时设置环境变量<code>TZ=Asia/Shanghai</code>及<code>DNS_SERVER_LOG_USING_LOCAL_TIME=true</code>才生效，设置后会将设置中的日志配置 Use Local Time默认勾选</p><figure><img src="'+v+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="'+g+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h4 id="禁用域名访问-blocked" tabindex="-1"><a class="header-anchor" href="#禁用域名访问-blocked"><span>禁用域名访问（Blocked）</span></a></h4><p>可能需要使用 <code>ipconfig /flushdns</code>清理dns缓存</p><figure><img src="'+b+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="'+_+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="踩过的坑" tabindex="-1"><a class="header-anchor" href="#踩过的坑"><span>踩过的坑</span></a></h3><ul><li>日志显示，需要同时设置环境变量<code>TZ=Asia/Shanghai</code>及<code>DNS_SERVER_LOG_USING_LOCAL_TIME=true</code>才生效</li><li>dns缓存清理：<code>ipconfig /flushdns</code></li><li>代理/VPN的设置不对可能导致 DNS 时好时坏，这个时候记得检查下代理，正常dns的生效都挺快的</li></ul><h3 id="相关文档" tabindex="-1"><a class="header-anchor" href="#相关文档"><span>相关文档</span></a></h3><ul><li>项目地址：<a href="https://github.com/TechnitiumSoftware/DnsServer" target="_blank" rel="noopener noreferrer">Github</a></li><li>镜像仓库：<a href="https://hub.docker.com/r/technitium/dns-server" target="_blank" rel="noopener noreferrer">DockerHub</a></li><li>官方博客：<a href="https://blog.technitium.com/" target="_blank" rel="noopener noreferrer">technitium.com</a></li><li>官方docker-compose:<a href="https://github.com/TechnitiumSoftware/DnsServer/blob/master/docker-compose.yml" target="_blank" rel="noopener noreferrer">docker-compose.yml</a></li></ul><h2 id="后语" tabindex="-1"><a class="header-anchor" href="#后语"><span>后语</span></a></h2><blockquote><p>基于DNS服务，还可以做很多，比如自动 https，但是没有研究成功，后面可能会结合真实的自有域名来实现。 预告下篇呕心沥血之作，Nexus3 管理私有 nuget，docker，走过路过不要错过~</p></blockquote>',40)]))}const y=s(k,[["render",f],["__file","devops_dns_dnserver_install_use.html.vue"]]),N=JSON.parse('{"path":"/posts/devops/devops_dns_dnserver_install_use.html","title":"一个基于.NET7的开源DNS服务 DnsServer 的部署使用经验分享","lang":"zh-CN","frontmatter":{"title":"一个基于.NET7的开源DNS服务 DnsServer 的部署使用经验分享","date":"2023-11-06T08:20:00.000Z","category":["DevOps"],"tag":["devops","dns","docker","docker-compose"],"description":"前言 接上篇 docker-bind 的使用搭建了一个 dns 服务，本篇将介绍另外一款 DnsServer 的部署和使用，更专注，更轻量。 特点 基于 .NET 7 实现 ，支持 Windows、Linux、macOS 和 Raspberry Pi 开箱即用，使用简单，高性能 提供 Web 控制台，可视化管理，查看使用情况 提供了对网络的额外控制，允...","head":[["meta",{"property":"og:url","content":"https://www.yimo.link/posts/devops/devops_dns_dnserver_install_use.html"}],["meta",{"property":"og:site_name","content":"易墨网"}],["meta",{"property":"og:title","content":"一个基于.NET7的开源DNS服务 DnsServer 的部署使用经验分享"}],["meta",{"property":"og:description","content":"前言 接上篇 docker-bind 的使用搭建了一个 dns 服务，本篇将介绍另外一款 DnsServer 的部署和使用，更专注，更轻量。 特点 基于 .NET 7 实现 ，支持 Windows、Linux、macOS 和 Raspberry Pi 开箱即用，使用简单，高性能 提供 Web 控制台，可视化管理，查看使用情况 提供了对网络的额外控制，允..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-10-28T11:15:42.000Z"}],["meta",{"property":"article:tag","content":"devops"}],["meta",{"property":"article:tag","content":"dns"}],["meta",{"property":"article:tag","content":"docker"}],["meta",{"property":"article:tag","content":"docker-compose"}],["meta",{"property":"article:published_time","content":"2023-11-06T08:20:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-10-28T11:15:42.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"一个基于.NET7的开源DNS服务 DnsServer 的部署使用经验分享\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-11-06T08:20:00.000Z\\",\\"dateModified\\":\\"2024-10-28T11:15:42.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"易墨\\",\\"url\\":\\"https://www.yimo.link\\"}]}"]]},"headers":[{"level":2,"title":"前言","slug":"前言","link":"#前言","children":[{"level":3,"title":"特点","slug":"特点","link":"#特点","children":[]},{"level":3,"title":"使用情况","slug":"使用情况","link":"#使用情况","children":[]}]},{"level":2,"title":"DnsServer 的安装使用","slug":"dnsserver-的安装使用","link":"#dnsserver-的安装使用","children":[{"level":3,"title":"准备","slug":"准备","link":"#准备","children":[]},{"level":3,"title":"使用 Docker Compose 安装","slug":"使用-docker-compose-安装","link":"#使用-docker-compose-安装","children":[{"level":4,"title":"配置说明","slug":"配置说明","link":"#配置说明","children":[]},{"level":4,"title":"配置文件 compose.yml","slug":"配置文件-compose-yml","link":"#配置文件-compose-yml","children":[]},{"level":4,"title":"部署成功","slug":"部署成功","link":"#部署成功","children":[]}]},{"level":3,"title":"DnsServer 的使用","slug":"dnsserver-的使用","link":"#dnsserver-的使用","children":[{"level":4,"title":"局域网域名泛解析到指定IP","slug":"局域网域名泛解析到指定ip","link":"#局域网域名泛解析到指定ip","children":[]},{"level":4,"title":"查看系统日志","slug":"查看系统日志","link":"#查看系统日志","children":[]},{"level":4,"title":"禁用域名访问（Blocked）","slug":"禁用域名访问-blocked","link":"#禁用域名访问-blocked","children":[]}]},{"level":3,"title":"踩过的坑","slug":"踩过的坑","link":"#踩过的坑","children":[]},{"level":3,"title":"相关文档","slug":"相关文档","link":"#相关文档","children":[]}]},{"level":2,"title":"后语","slug":"后语","link":"#后语","children":[]}],"git":{"createdTime":1730114142000,"updatedTime":1730114142000,"contributors":[{"name":"yimo","email":"yimo@wikiglobal.com","commits":1}]},"readingTime":{"minutes":3.3,"words":989},"filePathRelative":"posts/devops/devops_dns_dnserver_install_use.md","localizedDate":"2023年11月6日","excerpt":"<h2>前言</h2>\\n<blockquote>\\n<p>接上篇 docker-bind 的使用搭建了一个 dns 服务，本篇将介绍另外一款 DnsServer 的部署和使用，更专注，更轻量。</p>\\n</blockquote>\\n<h3>特点</h3>\\n<ul>\\n<li>基于 .NET 7 实现 ，支持 Windows、Linux、macOS 和 Raspberry Pi</li>\\n<li>开箱即用，使用简单，高性能</li>\\n<li>提供 Web 控制台，可视化管理，查看使用情况</li>\\n<li>提供了对网络的额外控制，允许阻止域名</li>\\n<li>支持 DNS-over-TLS， DNS-over-HTTPS， and DNS-over-QUIC</li>\\n<li>DNS-over-HTTPS 实现支持 HTTP/1.1、HTTP/2 和 HTTP/3 传输协议</li>\\n<li>HTTP API 由 Web 控制台使用，第三方应用或脚本可以使用 Api 接口配置来 DNS 服务器</li>\\n</ul>","autoDesc":true}');export{y as comp,N as data};
