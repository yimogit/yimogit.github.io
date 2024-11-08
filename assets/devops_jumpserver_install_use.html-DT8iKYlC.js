import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as e,e as a,o as i}from"./app-CS3knfL2.js";const l="/assets/662652-20231110010155667-1723084594-B_mkuI8E.png",p="/assets/662652-20231110010155615-63564082-CIcBx47z.png",r="/assets/662652-20231110010155435-1641419934-CpOD6SoZ.png",t="/assets/662652-20231110010155587-501747755-BEK0eK_Y.png",d="/assets/662652-20231110010155587-2133611374-CWRJ8Exa.png",c="/assets/662652-20231110010155439-639221362-8_11gqTy.png",o="/assets/662652-20231110010155522-1453753027-QV1iB-Pr.png",v="/assets/662652-20231110010155441-1651130639-DoMrE6Dz.png",m="/assets/662652-20231110010155672-1282341597-iyTPxIPI.png",u="/assets/662652-20231110010155598-1844828931-DB-s_0vc.png",b="/assets/662652-20231110010155516-1704444425-D7eCD6Sz.png",g="/assets/662652-20231110230602727-1804040905-CsHQkmXA.png",h="/assets/662652-20231110230602681-304334435-DzyetOPW.png",_="/assets/662652-20231110010155647-1810418191-CIqT9BSy.png",f="/assets/662652-20231110010155426-735028924-DHpzLI8n.png",k={};function y(x,s){return i(),e("div",null,s[0]||(s[0]=[a('<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言"><span>前言</span></a></h2><blockquote><p>JumpServer 是一个开源的跳板机的解决方案，提供了对远程服务器的安全访问、会话录制和审计、用户身份管理等功能，适用于需要管理机器资源&amp;大量服务器资源的情况。<br> 本文将分享在 docker 中 JumpServer 的安装使用经验，并使用油猴插件扩展其功能</p></blockquote><h3 id="特点" tabindex="-1"><a class="header-anchor" href="#特点"><span>特点</span></a></h3><ul><li>开源免费，安装使用简单</li><li>文档完善，成熟文档</li><li>极致的 Web Terminal 使用体验</li><li>支持管理 Linux / Windows / 数据库 / K8S 集群 / Web 应用 / Remote App</li><li>符合 4A 规范的堡垒机：<code>身份验证 / Authentication</code> <code>授权控制 / Authorization</code> <code>账号管理 / Accounting</code> <code>安全审计 / Auditing</code></li></ul><h3 id="使用情况" tabindex="-1"><a class="header-anchor" href="#使用情况"><span>使用情况</span></a></h3><ul><li>使用 docker compose 安装</li><li>web 终端除了传文件没有 MobaXterm 方便， 但是其显示和命令记录以及快捷命令都挺舒服的</li></ul><figure><img src="'+l+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="'+p+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="实践" tabindex="-1"><a class="header-anchor" href="#实践"><span>实践</span></a></h2><h3 id="使用-docker-compose-安装-jumpserver" tabindex="-1"><a class="header-anchor" href="#使用-docker-compose-安装-jumpserver"><span>使用 docker compose 安装 JumpServer</span></a></h3><ul><li><p>文件由三部分组成</p><ul><li>mariadb 数据库：<code>jms_mysql</code> 镜像：mariadb:10.6</li><li>reids 缓存：<code>jms_redis</code> 镜像： redis:6.2</li><li>jumpserver 服务：<code>jms_server</code>镜像：jumpserver/jms_all:v3.8.1</li></ul></li><li><p>开放端口</p><ul><li>未开放 mysql 和 redis 的端口，只给 jumpserver 提供服务</li><li>Jumpserver 开放<a href="https://docs.jumpserver.org/zh/v3/installation/network_port" target="_blank" rel="noopener noreferrer">端口说明</a>：81:80（未配置域名时验证访问），其他 nginx 使用了 80，通过 nginx 转发到 http://jms_all:80 即可。</li><li>定义可信任的访问 <a href="https://docs.jumpserver.org/zh/v3/installation/setup_linux_standalone/online_install/?h=domains#1" target="_blank" rel="noopener noreferrer">DOMAINS 配置</a>：<code>jumpserver.devops.test.com\`\`,192.168.123.214:81</code></li></ul></li><li><p>指定 mysql 数据库账号密码：root devops666</p></li><li><p>指定 redis 密码：devops666</p></li><li><p>添加了健康检查节点，mysql -p 后面需要紧跟密码，不能有空格</p><ul><li><code>mysql -h127.0.0.1 -uroot -pdevops666 -e &#39;SHOW DATABASES;&#39;</code> 参数后面需要紧跟值，不能有空格</li></ul></li><li><p>对应服务的挂载目录</p><ul><li>./data-mysql</li><li>./data-redis</li><li>./data-server</li></ul></li><li><p>指定网络：devopsnetwork （<code>docker network create devopsnetwork</code>）</p></li><li><p>启动时会自动创建&amp;初始化数据库，无需手动初始化</p></li><li><p>以特权模式运行 jms_server</p></li><li><p>参考自官方的 <a href="https://github.com/jumpserver/Dockerfile/tree/master/allinone" target="_blank" rel="noopener noreferrer">allinone</a> 配置文件</p></li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>version: &#39;3.1&#39;</span></span>
<span class="line"><span>services:</span></span>
<span class="line"><span>  jms_mysql:</span></span>
<span class="line"><span>    image: mariadb:10.6</span></span>
<span class="line"><span>    container_name: jms_mysql</span></span>
<span class="line"><span>    restart: always</span></span>
<span class="line"><span>    environment:</span></span>
<span class="line"><span>      MARIADB_DATABASE: jumpserver</span></span>
<span class="line"><span>      MARIADB_ROOT_PASSWORD: devops666</span></span>
<span class="line"><span>    healthcheck:</span></span>
<span class="line"><span>      test: &quot;mysql -h127.0.0.1 -uroot -pdevops666 -e &#39;SHOW DATABASES;&#39;&quot;</span></span>
<span class="line"><span>      interval: 10s</span></span>
<span class="line"><span>      timeout: 5s</span></span>
<span class="line"><span>      retries: 3</span></span>
<span class="line"><span>      start_period: 30s</span></span>
<span class="line"><span>    volumes:</span></span>
<span class="line"><span>      - ./data-mysql:/var/lib/mysql</span></span>
<span class="line"><span>    networks:</span></span>
<span class="line"><span>      - devopsnetwork</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  jms_redis:</span></span>
<span class="line"><span>    image: redis:6.2</span></span>
<span class="line"><span>    container_name: jms_redis</span></span>
<span class="line"><span>    restart: always</span></span>
<span class="line"><span>    command: redis-server --requirepass devops666</span></span>
<span class="line"><span>    environment:</span></span>
<span class="line"><span>      REDIS_PASSWORD: devops666</span></span>
<span class="line"><span>    healthcheck:</span></span>
<span class="line"><span>      test: &quot;redis-cli -h 127.0.0.1 -a devops666 info Replication&quot;</span></span>
<span class="line"><span>      interval: 10s</span></span>
<span class="line"><span>      timeout: 5s</span></span>
<span class="line"><span>      retries: 3</span></span>
<span class="line"><span>      start_period: 10s</span></span>
<span class="line"><span>    volumes:</span></span>
<span class="line"><span>      - ./data-redis:/data</span></span>
<span class="line"><span>    networks:</span></span>
<span class="line"><span>      - devopsnetwork</span></span>
<span class="line"><span>      </span></span>
<span class="line"><span>  jms_server:</span></span>
<span class="line"><span>    container_name: jms_all</span></span>
<span class="line"><span>    restart: always</span></span>
<span class="line"><span>    image: jumpserver/jms_all:v3.8.1</span></span>
<span class="line"><span>    volumes:</span></span>
<span class="line"><span>      - ./data-server/core/data:/opt/jumpserver/data # Core 持久化目录, 存储录像日志</span></span>
<span class="line"><span>      - ./data-server/koko/data:/opt/koko/data # Koko 持久化目录</span></span>
<span class="line"><span>      - ./data-server/lion/data:/opt/lion/data # Lion 持久化目录</span></span>
<span class="line"><span>      - ./data-server/magnus/data:/opt/magnus/data # Magnus 持久化目录</span></span>
<span class="line"><span>      - ./data-server/kael/data:/opt/kael/data # Kael 持久化目录</span></span>
<span class="line"><span>      - ./data-server/chen/data:/opt/chen/data # Chen 持久化目录</span></span>
<span class="line"><span>      - ./data-server/web/log:/var/log/nginx # Nginx 日志持久化目录</span></span>
<span class="line"><span>    privileged: true</span></span>
<span class="line"><span>    environment:</span></span>
<span class="line"><span>      # 自行生成随机的字符串, 不要包含特殊字符串, 长度推荐大于等于 50</span></span>
<span class="line"><span>      - SECRET_KEY=2FsdGVkX19mzMum9dqqphTCNpm9dqqphTCNpm9dqqphTCNpm9dqqphTCNpm9dqqphTCNpm9dqqphTCNpm9dqqphTCNpCPV</span></span>
<span class="line"><span>      # 自行生成随机的字符串, 不要包含特殊字符串, 长度推荐大于等于 24</span></span>
<span class="line"><span>      - BOOTSTRAP_TOKEN=m9dqqphTCNpm9dqqphTCNpm9dqqphTCNp </span></span>
<span class="line"><span>      # 日志等级, 测试环境推荐设置为 DEBUG</span></span>
<span class="line"><span>      - LOG_LEVEL=ERROR</span></span>
<span class="line"><span>      # redis配置</span></span>
<span class="line"><span>      - REDIS_HOST=jms_redis</span></span>
<span class="line"><span>      - REDIS_PORT=6379</span></span>
<span class="line"><span>      - REDIS_PASSWORD=devops666</span></span>
<span class="line"><span>      # mysql配置</span></span>
<span class="line"><span>      - DB_HOST=jms_mysql</span></span>
<span class="line"><span>      - DB_PORT=3306</span></span>
<span class="line"><span>      - DB_USER=root</span></span>
<span class="line"><span>      - DB_NAME=jumpserver</span></span>
<span class="line"><span>      - DB_PASSWORD=devops666</span></span>
<span class="line"><span>      # 不设置无法登录,可以设置域名或者服务器的IP</span></span>
<span class="line"><span>      - DOMAINS=jumpserver.devops.test.com,192.168.123.214:81</span></span>
<span class="line"><span>    ports:</span></span>
<span class="line"><span>      - &#39;81:80&#39;</span></span>
<span class="line"><span>    networks:</span></span>
<span class="line"><span>      - devopsnetwork</span></span>
<span class="line"><span></span></span>
<span class="line"><span>networks:</span></span>
<span class="line"><span>  devopsnetwork:</span></span>
<span class="line"><span>    external: true</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>运行：<code>docker compose up -d</code> 即可</li><li>一切正常：默认访问 http://192.168.123.214:81 则启动成功</li></ul><figure><img src="`+r+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><ul><li>DOMAINS 配置了域名和 IP 端口访问，所以现在可以直接使用默认账号密码 admin admin 进行登录</li><li>登录成功修改密码</li></ul><h3 id="jumpserver-使用-nginx-配置域名转发" tabindex="-1"><a class="header-anchor" href="#jumpserver-使用-nginx-配置域名转发"><span>JumpServer 使用 nginx 配置域名转发</span></a></h3><p>还不会在局域网申请 ssl 及配置的可以参考之前的文章 <a href="https://juejin.cn/post/7296754422750232576" target="_blank" rel="noopener noreferrer">前后端都用得上的 Nginx 日常使用经验</a></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>server {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    listen 80;</span></span>
<span class="line"><span>    listen       443 ssl;</span></span>
<span class="line"><span>    server_name jumpserver.devops.test.com;  # 自行修改成你的域名</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    client_max_body_size 4096m;  # 上传文件大小限制</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    ssl_certificate      /certs/jumpserver.devops.test.com/server.crt;</span></span>
<span class="line"><span>    ssl_certificate_key  /certs/jumpserver.devops.test.com/server.key;</span></span>
<span class="line"><span>    ssl_session_cache    shared:SSL:1m;</span></span>
<span class="line"><span>    ssl_session_timeout  5m;</span></span>
<span class="line"><span>    ssl_ciphers  HIGH:!aNULL:!MD5;</span></span>
<span class="line"><span>    ssl_prefer_server_ciphers  on;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    location / {</span></span>
<span class="line"><span>            # 这里的 ip 是后端 JumpServer nginx 的 ip</span></span>
<span class="line"><span>            proxy_pass http://jms_server:80;</span></span>
<span class="line"><span>            proxy_http_version 1.1;</span></span>
<span class="line"><span>            proxy_buffering off;</span></span>
<span class="line"><span>            proxy_request_buffering off;</span></span>
<span class="line"><span>            proxy_set_header Upgrade $http_upgrade;</span></span>
<span class="line"><span>            proxy_set_header Connection &quot;upgrade&quot;;</span></span>
<span class="line"><span>            proxy_set_header Host $host;</span></span>
<span class="line"><span>            proxy_set_header X-Forwarded-For $remote_addr;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>配置好 nginx 重载配置生效后访问成功</li></ul><figure><img src="`+t+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="jumpserver-的常规使用" tabindex="-1"><a class="header-anchor" href="#jumpserver-的常规使用"><span>JumpServer 的常规使用</span></a></h3><ul><li>通过 控制台-资产管理，增加需要管理的 机器、应用，将之前文章安装的 linux 服务器，mysql，redis，mongo 都配置好</li></ul><figure><img src="'+d+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><ul><li>通过控制台-权限管理 授权用户能够管理的资产</li></ul><figure><img src="'+c+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><ul><li>通过用户管理和权限管理分配资产权限，可以是用户或者组</li></ul><figure><img src="'+o+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><ul><li>通过右上角的 Web 终端可以远程连接资产</li></ul><figure><img src="'+v+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="'+m+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><ul><li>添加 WebSite 后，如果 JumpServer 安装在 Linux，无法在终端预览！！！但是，想了个办法让他直接新窗口打开</li></ul><figure><img src="'+u+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="在终端通过油猴插件打开-website-资产" tabindex="-1"><a class="header-anchor" href="#在终端通过油猴插件打开-website-资产"><span>在终端通过油猴插件打开 WebSite 资产</span></a></h3><ul><li>首先需要安装油猴插件：<a href="https://www.tampermonkey.net/" target="_blank" rel="noopener noreferrer">tampermonkey</a></li><li>添加油猴脚本</li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>// ==UserScript==</span></span>
<span class="line"><span>// @name         直接打开JumpServer网站</span></span>
<span class="line"><span>// @namespace    http://tampermonkey.net/</span></span>
<span class="line"><span>// @version      0.1</span></span>
<span class="line"><span>// @description  try to take over the world!</span></span>
<span class="line"><span>// @author       yimo</span></span>
<span class="line"><span>// @match        https://jumpserver.devops.test.com/luna/*</span></span>
<span class="line"><span>// @icon         https://www.google.com/s2/favicons?sz=64&amp;domain=test.com</span></span>
<span class="line"><span>// @grant        none</span></span>
<span class="line"><span>// ==/UserScript==</span></span>
<span class="line"><span></span></span>
<span class="line"><span>(function() {</span></span>
<span class="line"><span>    &#39;use strict&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    window.onload=function(){</span></span>
<span class="line"><span>        console.log(&#39;load custom js&#39;)</span></span>
<span class="line"><span>        var ulElement = document.querySelector(&quot;#winContainer &gt; div &gt; div &gt; div &gt; ul&quot;);</span></span>
<span class="line"><span>        if(ulElement){</span></span>
<span class="line"><span>            var newLi = document.createElement(&#39;li&#39;);</span></span>
<span class="line"><span>            newLi.innerHTML = &#39;&lt;span style=&quot;color:#7494f3;margin-right: 6px&quot;&gt;油猴插件 → 网站资产&lt;/span&gt; 直接新窗口打开网站&#39;;</span></span>
<span class="line"><span>            ulElement.appendChild(newLi);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        setInterval(()=&gt;{</span></span>
<span class="line"><span>            document.querySelectorAll(&quot;.node_name&quot;).forEach(s=&gt;{</span></span>
<span class="line"><span>                if(s.isAddHtml)return;</span></span>
<span class="line"><span>                s.isAddHtml=true;</span></span>
<span class="line"><span>                if(s.parentNode.getAttribute(&quot;title&quot;).indexOf(&#39;http&#39;)==0){</span></span>
<span class="line"><span>                    console.log(&#39;检测到站点:&#39;+s.parentNode.getAttribute(&quot;title&quot;))</span></span>
<span class="line"><span>                    s.addEventListener(&#39;click&#39;,function(e){</span></span>
<span class="line"><span>                         console.log(&#39;click&#39;)</span></span>
<span class="line"><span>                         var titleUrl = s.parentNode.getAttribute(&quot;title&quot;);</span></span>
<span class="line"><span>                         window.open(titleUrl);</span></span>
<span class="line"><span>                         e.stopPropagation();</span></span>
<span class="line"><span>                    })</span></span>
<span class="line"><span>                    return;</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            })</span></span>
<span class="line"><span>        },500);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>})();</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>生效后即可直接打开站点了</li></ul><figure><img src="`+b+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><ul><li>希望后面可以加个配置直接打开站点吧</li></ul><h2 id="踩坑记录" tabindex="-1"><a class="header-anchor" href="#踩坑记录"><span>踩坑记录</span></a></h2><ul><li><p>Jumpserver 默认账号密码 admin admin</p></li><li><p>Mysql 默认账号 root ，密码修改的地方都同步修改</p></li><li><p>mysql健康检查失败，需要将参数值紧跟参数后</p></li></ul><figure><img src="'+g+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="'+h+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><ul><li><p>DOMAINS 为可信域名，配置不存在无法登录</p><figure><img src="'+_+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure></li><li><p>mysql 和 mongodb 连接使用可以，但是连接测试有问题，待解决 <a href="https://github.com/jumpserver/jumpserver/issues/12028" target="_blank" rel="noopener noreferrer">issues</a></p><figure><img src="'+f+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure></li></ul><h2 id="相关文档" tabindex="-1"><a class="header-anchor" href="#相关文档"><span>相关文档</span></a></h2><ul><li><a href="https://jumpserver.org/" target="_blank" rel="noopener noreferrer">官网</a></li><li><a href="https://github.com/jumpserver/jumpserver" target="_blank" rel="noopener noreferrer">Github 仓库</a></li><li><a href="https://github.com/jumpserver/Dockerfile/tree/master/allinone" target="_blank" rel="noopener noreferrer">官方 Docker Compose 部署</a></li><li><a href="https://github.com/yimogit/MeDevOps" target="_blank" rel="noopener noreferrer">本文相关配置</a></li><li><a href="https://juejin.cn/post/7296754422750232576" target="_blank" rel="noopener noreferrer">JumpServer nginx https 配置参考</a></li></ul><h2 id="后语" tabindex="-1"><a class="header-anchor" href="#后语"><span>后语</span></a></h2><blockquote><p>通过 JumpServer 可以搭建一套测试环境的相关环境，并且将相关的网站通过其公开，成员可以直接使用，而无需记录地址账号等信息，研究过程中也看了 1Panel，发现对 Docker 没有很好的支持，准备后续接入夜莺监控更好的检测局域网资源的一个状态，敬请期待。</p></blockquote>',47)]))}const j=n(k,[["render",y],["__file","devops_jumpserver_install_use.html.vue"]]),A=JSON.parse('{"path":"/posts/devops/devops_jumpserver_install_use.html","title":"提升运维效率：轻松掌握JumpServer安装和使用技巧","lang":"zh-CN","frontmatter":{"title":"提升运维效率：轻松掌握JumpServer安装和使用技巧","date":"2023-11-10T08:01:00.000Z","category":["DevOps"],"tag":["devops","docker-compose"],"description":"前言 JumpServer 是一个开源的跳板机的解决方案，提供了对远程服务器的安全访问、会话录制和审计、用户身份管理等功能，适用于需要管理机器资源&大量服务器资源的情况。 本文将分享在 docker 中 JumpServer 的安装使用经验，并使用油猴插件扩展其功能 特点 开源免费，安装使用简单 文档完善，成熟文档 极致的 Web Terminal 使...","head":[["meta",{"property":"og:url","content":"https://www.yimo.link/posts/devops/devops_jumpserver_install_use.html"}],["meta",{"property":"og:site_name","content":"易墨网"}],["meta",{"property":"og:title","content":"提升运维效率：轻松掌握JumpServer安装和使用技巧"}],["meta",{"property":"og:description","content":"前言 JumpServer 是一个开源的跳板机的解决方案，提供了对远程服务器的安全访问、会话录制和审计、用户身份管理等功能，适用于需要管理机器资源&大量服务器资源的情况。 本文将分享在 docker 中 JumpServer 的安装使用经验，并使用油猴插件扩展其功能 特点 开源免费，安装使用简单 文档完善，成熟文档 极致的 Web Terminal 使..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-10-28T11:15:42.000Z"}],["meta",{"property":"article:tag","content":"devops"}],["meta",{"property":"article:tag","content":"docker-compose"}],["meta",{"property":"article:published_time","content":"2023-11-10T08:01:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-10-28T11:15:42.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"提升运维效率：轻松掌握JumpServer安装和使用技巧\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-11-10T08:01:00.000Z\\",\\"dateModified\\":\\"2024-10-28T11:15:42.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"易墨\\",\\"url\\":\\"https://www.yimo.link\\"}]}"]]},"headers":[{"level":2,"title":"前言","slug":"前言","link":"#前言","children":[{"level":3,"title":"特点","slug":"特点","link":"#特点","children":[]},{"level":3,"title":"使用情况","slug":"使用情况","link":"#使用情况","children":[]}]},{"level":2,"title":"实践","slug":"实践","link":"#实践","children":[{"level":3,"title":"使用 docker compose 安装 JumpServer","slug":"使用-docker-compose-安装-jumpserver","link":"#使用-docker-compose-安装-jumpserver","children":[]},{"level":3,"title":"JumpServer 使用 nginx 配置域名转发","slug":"jumpserver-使用-nginx-配置域名转发","link":"#jumpserver-使用-nginx-配置域名转发","children":[]},{"level":3,"title":"JumpServer 的常规使用","slug":"jumpserver-的常规使用","link":"#jumpserver-的常规使用","children":[]},{"level":3,"title":"在终端通过油猴插件打开 WebSite 资产","slug":"在终端通过油猴插件打开-website-资产","link":"#在终端通过油猴插件打开-website-资产","children":[]}]},{"level":2,"title":"踩坑记录","slug":"踩坑记录","link":"#踩坑记录","children":[]},{"level":2,"title":"相关文档","slug":"相关文档","link":"#相关文档","children":[]},{"level":2,"title":"后语","slug":"后语","link":"#后语","children":[]}],"git":{"createdTime":1730114142000,"updatedTime":1730114142000,"contributors":[{"name":"yimo","email":"yimo@wikiglobal.com","commits":1}]},"readingTime":{"minutes":5.4,"words":1621},"filePathRelative":"posts/devops/devops_jumpserver_install_use.md","localizedDate":"2023年11月10日","excerpt":"<h2>前言</h2>\\n<blockquote>\\n<p>JumpServer 是一个开源的跳板机的解决方案，提供了对远程服务器的安全访问、会话录制和审计、用户身份管理等功能，适用于需要管理机器资源&amp;大量服务器资源的情况。<br>\\n本文将分享在 docker 中 JumpServer 的安装使用经验，并使用油猴插件扩展其功能</p>\\n</blockquote>\\n<h3>特点</h3>\\n<ul>\\n<li>开源免费，安装使用简单</li>\\n<li>文档完善，成熟文档</li>\\n<li>极致的 Web Terminal 使用体验</li>\\n<li>支持管理 Linux / Windows / 数据库 / K8S 集群 / Web 应用 / Remote App</li>\\n<li>符合 4A 规范的堡垒机：<code>身份验证 / Authentication</code> <code>授权控制 / Authorization</code> <code>账号管理 / Accounting</code> <code>安全审计 / Auditing</code></li>\\n</ul>","autoDesc":true}');export{j as comp,A as data};
