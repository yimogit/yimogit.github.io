import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as e,e as i,o as a}from"./app-BHZ56IUu.js";const l="/assets/662652-20231007203723452-986973881-B70R9Kmi.png",p="/assets/662652-20231007203723379-706783120-DL59I9Nj.png",r="/assets/662652-20231007203723454-277470960-DEPOeM8p.png",d="/assets/662652-20231007203723450-494909071-CXH9ENq2.png",c="/assets/662652-20231007203723453-232366872-KiVmtbgn.png",t="/assets/662652-20231007203723400-1847741208-DlFlBAzL.png",o="/assets/662652-20231007203723401-914532568-Dvh85hZ4.png",v="/assets/662652-20231007203723367-207442446-KE7fbSEW.png",m="/assets/662652-20231007203723343-2122291390-BjqWSeMa.png",u="/assets/662652-20231007203723422-1611359966-DBx07NkM.png",h="/assets/662652-20231007203723370-1156601369-D0fC120r.png",b="/assets/662652-20231007203723453-1516256721-B_FzvaiI.png",g={};function k(f,s){return a(),e("div",null,s[0]||(s[0]=[i(`<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言"><span>前言</span></a></h2><blockquote><p><em>Redis 是一个开源的使用 ANSI C 语言编写、遵守 BSD 协议、支持网络、可基于</em> <em>内存</em> <em>、</em> <em>分布式</em> <em>、可选持久性的键值对(</em> <em>Key-Value</em> <em>)存储数据库</em></p></blockquote><ul><li>redis版本：<a href="https://hub.docker.com/_/redis/tags" target="_blank" rel="noopener noreferrer">redis:6.2.13</a></li><li>作者：<a href="https://github.com/yimogit" target="_blank" rel="noopener noreferrer">易墨</a></li></ul><h2 id="安装单机版" tabindex="-1"><a class="header-anchor" href="#安装单机版"><span>安装单机版</span></a></h2><ul><li><p>安装源：<a href="https://hub.docker.com/_/redis" target="_blank" rel="noopener noreferrer">DockerHub</a></p></li><li><p>默认配置文件：<a href="https://redis.io/docs/management/config/" target="_blank" rel="noopener noreferrer">配置文件示例</a> <a href="https://raw.githubusercontent.com/redis/redis/6.2/redis.conf" target="_blank" rel="noopener noreferrer">6.2</a></p></li><li><p>运行时指定配置文件</p><ul><li><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>docker run -v /myredis/conf:/usr/local/etc/redis --name myredis redis redis-server /usr/local/etc/redis/redis.conf</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div></li></ul></li><li><p>局域网访问配置</p><ul><li><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>#不限制IP访问，局域网能够访问</span></span>
<span class="line"><span>bind 0.0.0.0</span></span>
<span class="line"><span>#禁用保护模式</span></span>
<span class="line"><span>protected-mode no</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul></li><li><p>设置密码:<code>requirepass devops666</code></p></li><li><p>v6.0 后的版本增加了通过 <a href="https://redis.io/docs/management/security/acl/" target="_blank" rel="noopener noreferrer">ACL 的方式设置用户名密码</a></p></li><li><p>持久化：<code>appendonly yes</code></p></li><li><p>启用后默认使用的 AOF（Append-Only File）持久化方式</p></li><li><p><a href="https://redis.io/docs/management/persistence/" target="_blank" rel="noopener noreferrer">AOF/RDB 等持久化方式文档说明</a></p></li><li><p>compose.yml</p><ul><li><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>version: &#39;3.1&#39;</span></span>
<span class="line"><span>services:</span></span>
<span class="line"><span>  redis:</span></span>
<span class="line"><span>    container_name: db_redis_6_2</span></span>
<span class="line"><span>    image: redis:6.2.13</span></span>
<span class="line"><span>    restart: always</span></span>
<span class="line"><span>    command: redis-server /usr/local/etc/redis/redis.conf</span></span>
<span class="line"><span>    volumes:</span></span>
<span class="line"><span>      - ./data:/data</span></span>
<span class="line"><span>      - ./config/redis.conf:/usr/local/etc/redis/redis.conf</span></span>
<span class="line"><span>    ports:</span></span>
<span class="line"><span>      - &quot;6379:6379&quot;</span></span>
<span class="line"><span>    networks:</span></span>
<span class="line"><span>      - devopsnetwork</span></span>
<span class="line"><span></span></span>
<span class="line"><span>networks:</span></span>
<span class="line"><span>  devopsnetwork:</span></span>
<span class="line"><span>    external: true</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul></li><li><p>redis.conf</p><ul><li><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>#不限制IP访问，局域网能够访问</span></span>
<span class="line"><span>bind 0.0.0.0 </span></span>
<span class="line"><span>#禁用保护模式</span></span>
<span class="line"><span>protected-mode no </span></span>
<span class="line"><span></span></span>
<span class="line"><span>#端口</span></span>
<span class="line"><span>port 6379</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#密码 </span></span>
<span class="line"><span>requirepass devops666</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#开启AOF日志 指定持久化方式</span></span>
<span class="line"><span>appendonly yes</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul></li><li><p>安装成功，可以使用 dbeaver 连接查看</p><ul><li><img src="`+l+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></li><li><img src="'+p+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></li></ul></li></ul><h2 id="搭建-redis-集群" tabindex="-1"><a class="header-anchor" href="#搭建-redis-集群"><span>搭建 Redis 集群</span></a></h2><p>Redis 集群是一种高可用、可水平扩展的 Redis 部署方式。它将 Redis 数据库分布在多个节点上，是为了提供高性能、高可用性和可伸缩性而设计的分布式 Redis 解决方案</p><h3 id="需要注意的点" tabindex="-1"><a class="header-anchor" href="#需要注意的点"><span><strong>需要注意的点</strong></span></a></h3><ul><li>配置、管理和维护成本相对高</li><li>不支持多数据库,只能使用 0 数据库</li><li>不支持跨节点的事务操作</li><li>批量操作时支持有限，如数据不在一个节点，则会报错</li><li>在部署 Redis 集群模式时，至少需要六个节点组成集群才能保证集群的可用性。</li></ul><h3 id="集群规划" tabindex="-1"><a class="header-anchor" href="#集群规划"><span><strong>集群规划</strong></span></a></h3><ul><li><p>节点分配</p><ul><li>devops02:192.168.123.216</li><li>devops03:192.168.123.219</li><li>devops04:192.168.123.222</li></ul></li><li><p>端口分配</p><ul><li>6389: redis 访问端口</li><li>16389: 集群端口, 普通端口号加 10000，集群节点之间的通讯</li></ul></li><li><p>不要设置密码，未找到节点间通信带密码的解决方案，-a password 只是主节点访问使用</p></li><li><p>集群的 redis 配置模板</p><ul><li><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>#端口</span></span>
<span class="line"><span>  port 6380</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  #是否开启 Redis 集群模式</span></span>
<span class="line"><span>  cluster-enabled yes</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  #设置 Redis 集群配置信息及状态的存储位置</span></span>
<span class="line"><span>  cluster-config-file nodes.conf</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  #设置 Redis 群集节点的通信的超时时间</span></span>
<span class="line"><span>  cluster-node-timeout 5000</span></span>
<span class="line"><span>  appendonly yes</span></span>
<span class="line"><span>  daemonize no</span></span>
<span class="line"><span>  protected-mode no</span></span>
<span class="line"><span>  pidfile  /data/redis.pid</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  #主节点需要的最小从节点数，只有达到这个数，主节点失败时，它从节点才会进行迁移。</span></span>
<span class="line"><span>  # cluster-migration-barrier 1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  #设置集群可用性</span></span>
<span class="line"><span>  # cluster-require-full-coverage yes</span></span>
<span class="line"><span>  # 集群节点 IP，如果要外部访问需要修改为宿主机IP，如：192.168.123.216 </span></span>
<span class="line"><span>  # cluster-announce-ip 默认172.x.x.x</span></span>
<span class="line"><span>  #客户端连接端口</span></span>
<span class="line"><span>  #cluster-announce-port 6380</span></span>
<span class="line"><span>  #节点间通信端口</span></span>
<span class="line"><span>  #cluster-announce-bus-port 16380</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul></li><li><p>docker compose.yml 配置模板</p><ul><li><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>version: &#39;3.1&#39;</span></span>
<span class="line"><span>  services:</span></span>
<span class="line"><span>    redis:</span></span>
<span class="line"><span>      container_name: cluster_redis_6380</span></span>
<span class="line"><span>      image: redis:6.2.13</span></span>
<span class="line"><span>      restart: always</span></span>
<span class="line"><span>      command: redis-server /usr/local/etc/redis/redis.conf</span></span>
<span class="line"><span>      volumes:</span></span>
<span class="line"><span>        - ./data:/data</span></span>
<span class="line"><span>        - ./config/redis.conf:/usr/local/etc/redis/redis.conf</span></span>
<span class="line"><span>      ports:</span></span>
<span class="line"><span>        - &#39;6380:6380&#39;</span></span>
<span class="line"><span>        - &#39;16380:16380&#39;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul></li></ul><h3 id="集群部署" tabindex="-1"><a class="header-anchor" href="#集群部署"><span><strong>集群部署</strong></span></a></h3><p>将上面的配置模板文件按下面的目录结构创建</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>- node-cluster</span></span>
<span class="line"><span>  - redis-6380</span></span>
<span class="line"><span>    - config</span></span>
<span class="line"><span>      - redis.conf :需要配置模板中修改 port:6380</span></span>
<span class="line"><span>    - compose.yml:需要配置模板中修改 container_name: cluster_redis_6380</span></span>
<span class="line"><span>  - redis-6381</span></span>
<span class="line"><span>    - config</span></span>
<span class="line"><span>      - redis.conf :需要配置模板中修改 port:6381</span></span>
<span class="line"><span>    - compose.yml:需要配置模板中修改 container_name: cluster_redis_6381</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol><li><p>修改 redis.conf 中的 port</p></li><li><p>修改 compose.yml 中的 container_name: cluster_redis_6381</p></li><li><p>将 node-cluster 目录上传到准备的集群节点服务器：192.168.123.216，192.168.123.219，192.168.123.222</p></li><li><p>在服务器的对应目录中执行 <code>docker compose up -d</code>,确保容器正常运行</p><figure><img src="`+r+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure></li><li><p>依托于创建的 redis 容器，使用下面的命令创建集群并添加节点</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>  devops02=192.168.123.216</span></span>
<span class="line"><span>  devops03=192.168.123.219</span></span>
<span class="line"><span>  devops04=192.168.123.222</span></span>
<span class="line"><span>  docker exec -it cluster_redis_6380 redis-cli -p 6380 --cluster create \\</span></span>
<span class="line"><span>  \${devops02}:6380 \\</span></span>
<span class="line"><span>  \${devops02}:6381 \\</span></span>
<span class="line"><span>  \${devops03}:6380 \\</span></span>
<span class="line"><span>  \${devops03}:6381 \\</span></span>
<span class="line"><span>  \${devops04}:6380 \\</span></span>
<span class="line"><span>  \${devops04}:6381 \\</span></span>
<span class="line"><span>  --cluster-replicas 1 \\</span></span>
<span class="line"><span>  --cluster-yes</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="`+d+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure></li><li><p>连接集群测试（redis-cli）</p><ol><li><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>docker exec -it cluster_redis_6380 redis-cli -p 6380 -c</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div></li><li>查看集群信息：<code>cluster info</code></li><li>查看集群节点信息:<code>cluster nodes</code></li><li><img src="'+c+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></li><li>本地连接测试：<code>redis-cli -h 192.168.123.216 -p 6380 -c</code></li><li><img src="'+t+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></li><li><img src="'+o+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></li><li><img src="'+v+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></li></ol></li></ol><p>至此，终于是一步步的创建好了 Redis 集群</p><h3 id="集群外部访问问题" tabindex="-1"><a class="header-anchor" href="#集群外部访问问题"><span>集群外部访问问题</span></a></h3><p>当 redis.conf 没有设置 cluster-announce-ip 时，使用redis-cli访问没有问题，但是会发现连接时访问节点会变成容器内部IP</p><figure><img src="'+m+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>导致的结果就是 使用一些Redis客户端连接会超时，无法使用。要解决这个问题，需要将每个节点的 redis.conf 中的 cluster-announce-ip 配置修改为其宿主机IP即可，可以这样做</p><ul><li><p>新建对应文件夹及配置</p><ul><li><img src="'+u+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></li></ul></li><li><p>复制对应IP文件夹到服务器再创建集群即可</p><ul><li><img src="'+h+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></li></ul></li><li><p>工具连接测试</p><ul><li><img src="'+b+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></li></ul></li></ul><h2 id="后语" tabindex="-1"><a class="header-anchor" href="#后语"><span><strong>后语</strong></span></a></h2><p>假期结束，先是折腾了一会创建集群密码的问题，然后又是尝试各种连接工具，终于搞定了集群的安装，完美的假期。</p><ul><li><a href="https://github.com/yimogit/MeDevOps/tree/main/db/04.redis/02.cluster" target="_blank" rel="noopener noreferrer">本文配置文件及脚本汇总</a></li><li>参考：http://www.mydlq.club/article/93/</li><li>DevOps 汇总：https://github.com/yimogit/MeDevOps</li></ul>',24)]))}const A=n(g,[["render",k],["__file","devops_docker_redis_cluster_install.html.vue"]]),x=JSON.parse('{"path":"/posts/devops/devops_docker_redis_cluster_install.html","title":"Docker 安装 Redis 单机&集群总结","lang":"zh-CN","frontmatter":{"title":"Docker 安装 Redis 单机&集群总结","date":"2023-10-09T09:07:00.000Z","category":["DevOps"],"tag":["devops","docker"],"description":"前言 Redis 是一个开源的使用 ANSI C 语言编写、遵守 BSD 协议、支持网络、可基于 内存 、 分布式 、可选持久性的键值对( Key-Value )存储数据库 redis版本：redis:6.2.13 作者：易墨 安装单机版 安装源：DockerHub 默认配置文件：配置文件示例 6.2 运行时指定配置文件 局域网访问配置 设置密码:re...","head":[["meta",{"property":"og:url","content":"https://www.yimo.link/posts/devops/devops_docker_redis_cluster_install.html"}],["meta",{"property":"og:site_name","content":"易墨网"}],["meta",{"property":"og:title","content":"Docker 安装 Redis 单机&集群总结"}],["meta",{"property":"og:description","content":"前言 Redis 是一个开源的使用 ANSI C 语言编写、遵守 BSD 协议、支持网络、可基于 内存 、 分布式 、可选持久性的键值对( Key-Value )存储数据库 redis版本：redis:6.2.13 作者：易墨 安装单机版 安装源：DockerHub 默认配置文件：配置文件示例 6.2 运行时指定配置文件 局域网访问配置 设置密码:re..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-10-28T11:15:42.000Z"}],["meta",{"property":"article:tag","content":"devops"}],["meta",{"property":"article:tag","content":"docker"}],["meta",{"property":"article:published_time","content":"2023-10-09T09:07:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-10-28T11:15:42.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Docker 安装 Redis 单机&集群总结\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-10-09T09:07:00.000Z\\",\\"dateModified\\":\\"2024-10-28T11:15:42.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"易墨\\",\\"url\\":\\"https://www.yimo.link\\"}]}"]]},"headers":[{"level":2,"title":"前言","slug":"前言","link":"#前言","children":[]},{"level":2,"title":"安装单机版","slug":"安装单机版","link":"#安装单机版","children":[]},{"level":2,"title":"搭建 Redis 集群","slug":"搭建-redis-集群","link":"#搭建-redis-集群","children":[{"level":3,"title":"需要注意的点","slug":"需要注意的点","link":"#需要注意的点","children":[]},{"level":3,"title":"集群规划","slug":"集群规划","link":"#集群规划","children":[]},{"level":3,"title":"集群部署","slug":"集群部署","link":"#集群部署","children":[]},{"level":3,"title":"集群外部访问问题","slug":"集群外部访问问题","link":"#集群外部访问问题","children":[]}]},{"level":2,"title":"后语","slug":"后语","link":"#后语","children":[]}],"git":{"createdTime":1730114142000,"updatedTime":1730114142000,"contributors":[{"name":"yimo","email":"yimo@wikiglobal.com","commits":1}]},"readingTime":{"minutes":4.32,"words":1295},"filePathRelative":"posts/devops/devops_docker_redis_cluster_install.md","localizedDate":"2023年10月9日","excerpt":"<h2>前言</h2>\\n<blockquote>\\n<p><em>Redis 是一个开源的使用 ANSI C 语言编写、遵守 BSD 协议、支持网络、可基于</em> <em>内存</em> <em>、</em> <em>分布式</em> <em>、可选持久性的键值对(</em> <em>Key-Value</em> <em>)存储数据库</em></p>\\n</blockquote>\\n<ul>\\n<li>redis版本：<a href=\\"https://hub.docker.com/_/redis/tags\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">redis:6.2.13</a></li>\\n<li>作者：<a href=\\"https://github.com/yimogit\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">易墨</a></li>\\n</ul>","autoDesc":true}');export{A as comp,x as data};
