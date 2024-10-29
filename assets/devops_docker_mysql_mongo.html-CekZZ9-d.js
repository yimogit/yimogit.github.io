import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,e,o as i}from"./app-BJhRIsgW.js";const l="/assets/662652-20231006012401240-444762175-BNrva0cT.png",p="/assets/662652-20231006012401242-1357025908-BNvknpVL.png",o="/assets/662652-20231006012401245-189730123-DQvV-LJf.png",d={};function c(r,s){return i(),a("div",null,s[0]||(s[0]=[e('<h3 id="前言" tabindex="-1"><a class="header-anchor" href="#前言"><span>前言</span></a></h3><blockquote><p>书接上篇：<a href="https://www.cnblogs.com/morang/p/devops-docker24-composev2-install.html" target="_blank" rel="noopener noreferrer">Docker V24 及 Docker Compose V2 的安装及使用</a><br> 本篇操作都在 centos8 虚拟机 devops01 中进行，并都归属网络：devopsnetwork<br> 主要增加对容器中 数据文件，日志，配置，网络，时区，端口映射，密码 的配置，更贴合生产实际使用</p></blockquote><h3 id="docker-compose-安装-mysql-v5-7" tabindex="-1"><a class="header-anchor" href="#docker-compose-安装-mysql-v5-7"><span>Docker Compose 安装 MySQL v5.7</span></a></h3><p>目录 /app/mysql 中创建 compose.yml 并运行</p><ul><li><p>指定 mysql 版本 5.7</p></li><li><p>指定网络：devopsnetwork</p></li><li><p>指定时区：Asia/Shanghai</p><ul><li>不设置默认是GMT时间，会比北京时间少8h，直接的影响就是 NOW() 函数会有差异</li><li><img src="'+l+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></li></ul></li><li><p>指定 root 密码：devops666</p></li><li><p>挂载卷：<code>./data</code> <code>./logs</code>，无需手动创建</p></li><li><p>挂载配置文件： 配置文件根据情况挂载，需要手动创建 conf/my.conf ,以下为示例配置</p><ul><li><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>[mysqld]</span></span>
<span class="line"><span>#必须保证在mysql集群中，该字段唯一</span></span>
<span class="line"><span>server_id=1</span></span>
<span class="line"><span>#指定归档日志的存储文件</span></span>
<span class="line"><span>log-bin=master-bin</span></span>
<span class="line"><span>log-bin-index=master-bin.index</span></span>
<span class="line"><span>#指定忽略的数据库</span></span>
<span class="line"><span>binlog-ignore-db=mysql</span></span>
<span class="line"><span>#指定时区</span></span>
<span class="line"><span>default-time-zone=&#39;Asia/Shanghai&#39;</span></span>
<span class="line"><span>#可以通过增加”replicate-do-db” 指定需要复制的数据库，</span></span>
<span class="line"><span>#如果不指定则是所有的数据。如果需要指定多个数据库，只需要增加多个”replicate-do-db” 即可。</span></span>
<span class="line"><span>#replicate-do-db</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#设置这个最大连接数值</span></span>
<span class="line"><span>max_connections=1024</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul></li><li><p>暴露端口：3306</p></li><li><p>启动 mysql 容器： <code>docker compose up -d</code></p><ul><li><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>version: &#39;3.1&#39;</span></span>
<span class="line"><span>services:</span></span>
<span class="line"><span>  mysql:</span></span>
<span class="line"><span>    container_name: db_mysql_5_7</span></span>
<span class="line"><span>    image: mysql:5.7</span></span>
<span class="line"><span>    restart: always</span></span>
<span class="line"><span>    environment:</span></span>
<span class="line"><span>      - TZ=Asia/Shanghai</span></span>
<span class="line"><span>      - MYSQL_ROOT_PASSWORD=devops666</span></span>
<span class="line"><span>    volumes:</span></span>
<span class="line"><span>      - ./data:/var/lib/mysql</span></span>
<span class="line"><span>      - ./logs:/var/log/mysql</span></span>
<span class="line"><span>      # 指定配置文件，需要手动创建</span></span>
<span class="line"><span>      # - ./conf/my.cnf:/etc/mysql/my.cnf</span></span>
<span class="line"><span>    ports:</span></span>
<span class="line"><span>      - &quot;3306:3306&quot;</span></span>
<span class="line"><span>    networks:</span></span>
<span class="line"><span>      - devopsnetwork</span></span>
<span class="line"><span></span></span>
<span class="line"><span>networks:</span></span>
<span class="line"><span>  devopsnetwork:</span></span>
<span class="line"><span>    external: true</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul></li><li><p>运行示例</p><ul><li><img src="`+p+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></li></ul></li><li><p>若需要使用 mysql8.0 ，可使用下面配置，根据需要设置身份验证插件</p><ul><li><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>version: &#39;3.1&#39;</span></span>
<span class="line"><span>services:</span></span>
<span class="line"><span>  mysql:</span></span>
<span class="line"><span>    container_name: db_mysql_8</span></span>
<span class="line"><span>    image: mysql:8.0</span></span>
<span class="line"><span>    restart: always</span></span>
<span class="line"><span>    # MySQL 8.0 默认使用 caching_sha2_password 身份验证插件，而不是 mysql_native_password 插件。在生产环境中，我们应该遵循官方建议，使用 caching_sha2_password 插件提供更强大的安全性</span></span>
<span class="line"><span>    # command: --default-authentication-plugin=mysql_native_password</span></span>
<span class="line"><span>    environment:</span></span>
<span class="line"><span>      MYSQL_ROOT_PASSWORD: devops666</span></span>
<span class="line"><span>    volumes:</span></span>
<span class="line"><span>      - ./data:/var/lib/mysql</span></span>
<span class="line"><span>    ports:</span></span>
<span class="line"><span>      - &quot;3306:3306&quot;</span></span>
<span class="line"><span>    networks:</span></span>
<span class="line"><span>      - devopsnetwork</span></span>
<span class="line"><span></span></span>
<span class="line"><span>networks:</span></span>
<span class="line"><span>  devopsnetwork:</span></span>
<span class="line"><span>    external: true</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul></li><li><p>参考 <a href="https://github.com/docker-library/docs/blob/master/mysql/README.md" target="_blank" rel="noopener noreferrer">docker-library/mysql</a></p></li></ul><h3 id="docker-compose-安装-mongodb-v4-4" tabindex="-1"><a class="header-anchor" href="#docker-compose-安装-mongodb-v4-4"><span>Docker Compose 安装 MongoDB v4.4</span></a></h3><p>目录 /app/mongo 中创建 compose.yml 并运行</p><ul><li><p>指定 mongo 版本 4.4</p></li><li><p>指定网络：devopsnetwork</p></li><li><p>指定时区：Asia/Shanghai</p></li><li><p>指定账号密码：root devops666</p></li><li><p>挂载卷：./data 即：/app/mongo/data，无需手动创建</p></li><li><p>挂载配置文件：./config/mongo.conf 需要手动创建</p><ul><li><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>net:</span></span>
<span class="line"><span>  bindIpAll: true</span></span>
<span class="line"><span></span></span>
<span class="line"><span>security:</span></span>
<span class="line"><span>  authorization: enabled</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul></li><li><p>暴露端口：27017</p></li><li><p>运行 compose.yml:<code>docker compose up -d</code></p><ul><li><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>version: &#39;3.1&#39;</span></span>
<span class="line"><span>services:</span></span>
<span class="line"><span>  mongo:</span></span>
<span class="line"><span>    container_name: mongo_4_4</span></span>
<span class="line"><span>    image: mongo:4.4.0</span></span>
<span class="line"><span>    restart: always</span></span>
<span class="line"><span>    networks:</span></span>
<span class="line"><span>      - devopsnetwork</span></span>
<span class="line"><span>    environment:</span></span>
<span class="line"><span>      - TZ=Asia/Shanghai</span></span>
<span class="line"><span>      - MONGO_INITDB_ROOT_USERNAME=root</span></span>
<span class="line"><span>      - MONGO_INITDB_ROOT_PASSWORD=devops666</span></span>
<span class="line"><span>    command: mongod --config /etc/mongo/mongod.conf</span></span>
<span class="line"><span>    volumes:</span></span>
<span class="line"><span>      - ./data:/data/db</span></span>
<span class="line"><span>      - ./logs:/data/log</span></span>
<span class="line"><span>      - ./config/mongo.conf:/etc/mongo/mongod.conf</span></span>
<span class="line"><span>    ports:</span></span>
<span class="line"><span>      - &quot;27017:27017&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>networks:</span></span>
<span class="line"><span>  devopsnetwork:</span></span>
<span class="line"><span>    external: true</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul></li><li><p>运行示例</p><ul><li><img src="`+o+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></li></ul></li><li><p>参考 <a href="https://github.com/docker-library/docs/blob/master/mongo/README.md" target="_blank" rel="noopener noreferrer">docker-library/mongo</a></p></li></ul><h3 id="后语" tabindex="-1"><a class="header-anchor" href="#后语"><span>后语</span></a></h3><ul><li>安装&amp;记录耗时：5 小时</li><li>后面还会补充 clickhouse 和一个 web 管理工具的使用</li><li>创作不易，且行且珍惜！！！</li></ul>',10)]))}const v=n(d,[["render",c],["__file","devops_docker_mysql_mongo.html.vue"]]),u=JSON.parse('{"path":"/posts/devops/devops_docker_mysql_mongo.html","title":"Docker Compose V2 安装常用数据库MySQL+Mongo","lang":"zh-CN","frontmatter":{"title":"Docker Compose V2 安装常用数据库MySQL+Mongo","date":"2023-10-06T01:26:00.000Z","category":["DevOps"],"description":"前言 书接上篇：Docker V24 及 Docker Compose V2 的安装及使用 本篇操作都在 centos8 虚拟机 devops01 中进行，并都归属网络：devopsnetwork 主要增加对容器中 数据文件，日志，配置，网络，时区，端口映射，密码 的配置，更贴合生产实际使用 Docker Compose 安装 MySQL v5.7 目...","head":[["meta",{"property":"og:url","content":"https://www.yimo.link/posts/devops/devops_docker_mysql_mongo.html"}],["meta",{"property":"og:site_name","content":"易墨网"}],["meta",{"property":"og:title","content":"Docker Compose V2 安装常用数据库MySQL+Mongo"}],["meta",{"property":"og:description","content":"前言 书接上篇：Docker V24 及 Docker Compose V2 的安装及使用 本篇操作都在 centos8 虚拟机 devops01 中进行，并都归属网络：devopsnetwork 主要增加对容器中 数据文件，日志，配置，网络，时区，端口映射，密码 的配置，更贴合生产实际使用 Docker Compose 安装 MySQL v5.7 目..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-10-28T11:15:42.000Z"}],["meta",{"property":"article:published_time","content":"2023-10-06T01:26:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-10-28T11:15:42.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Docker Compose V2 安装常用数据库MySQL+Mongo\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-10-06T01:26:00.000Z\\",\\"dateModified\\":\\"2024-10-28T11:15:42.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"易墨\\",\\"url\\":\\"https://www.yimo.link\\"}]}"]]},"headers":[{"level":3,"title":"前言","slug":"前言","link":"#前言","children":[]},{"level":3,"title":"Docker Compose 安装 MySQL v5.7","slug":"docker-compose-安装-mysql-v5-7","link":"#docker-compose-安装-mysql-v5-7","children":[]},{"level":3,"title":"Docker Compose 安装 MongoDB  v4.4","slug":"docker-compose-安装-mongodb-v4-4","link":"#docker-compose-安装-mongodb-v4-4","children":[]},{"level":3,"title":"后语","slug":"后语","link":"#后语","children":[]}],"git":{"createdTime":1730114142000,"updatedTime":1730114142000,"contributors":[{"name":"yimo","email":"yimo@wikiglobal.com","commits":1}]},"readingTime":{"minutes":2.31,"words":693},"filePathRelative":"posts/devops/devops_docker_mysql_mongo.md","localizedDate":"2023年10月6日","excerpt":"<h3>前言</h3>\\n<blockquote>\\n<p>书接上篇：<a href=\\"https://www.cnblogs.com/morang/p/devops-docker24-composev2-install.html\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">Docker V24 及 Docker Compose V2 的安装及使用</a><br>\\n本篇操作都在 centos8 虚拟机 devops01 中进行，并都归属网络：devopsnetwork<br>\\n主要增加对容器中 数据文件，日志，配置，网络，时区，端口映射，密码 的配置，更贴合生产实际使用</p>\\n</blockquote>","autoDesc":true}');export{v as comp,u as data};
