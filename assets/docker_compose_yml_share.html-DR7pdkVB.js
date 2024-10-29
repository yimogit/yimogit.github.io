import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,e as i,o as e}from"./app-BJhRIsgW.js";const l={};function p(d,s){return e(),a("div",null,s[0]||(s[0]=[i(`<p>本篇将分享一些 docker-compose 的配置，可参考其总结自己的一套基于docker的开发/生产环境配置。</p><h2 id="安装docker及docker-compose" tabindex="-1"><a class="header-anchor" href="#安装docker及docker-compose"><span>安装docker及docker-compose</span></a></h2><h3 id="install-docker" tabindex="-1"><a class="header-anchor" href="#install-docker"><span>install docker</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="install-docker-compose" tabindex="-1"><a class="header-anchor" href="#install-docker-compose"><span>install docker-compose</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>sudo curl -L https://github.com/docker/compose/releases/download/1.23.2/docker-compose-\`uname -s\`-\`uname -m\` -o /usr/local/bin/docker-compose</span></span>
<span class="line"><span>sudo chmod +x /usr/local/bin/docker-compose</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="创建专属网络" tabindex="-1"><a class="header-anchor" href="#创建专属网络"><span>创建专属网络</span></a></h2><p>使用 docker network 创建自己的专属常用网络 me_gateway，使得 docker 的软件能够互相访问</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>docker network create me_gateway</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="docker-compose-部署-traefik" tabindex="-1"><a class="header-anchor" href="#docker-compose-部署-traefik"><span>docker-compose 部署 Traefik</span></a></h2><blockquote><p>一个反向代理服务器，它非常快，有自动发现服务，自动申请 https 等非常棒的特性，<a href="https://github.com/containous/traefik" target="_blank" rel="noopener noreferrer">项目地址</a>,<a href="http://docs.traefik.cn/" target="_blank" rel="noopener noreferrer">中文文档</a>。</p></blockquote><h3 id="docker-compose-yml" tabindex="-1"><a class="header-anchor" href="#docker-compose-yml"><span>docker-compose.yml</span></a></h3><p>这是一个使用 traefik 的 docker-compose.yml 配置示例 其中，挂载的 <code>./traefik.toml</code> 为其配置， 挂载的 <code>acme.json</code> 为 Let&#39;s Encrypt 的配置（需要设置权限：<code>chmod 600 acme.json</code>）</p><div class="language-yml line-numbers-mode" data-highlighter="shiki" data-ext="yml" data-title="yml" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">version</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;3&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">services</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">  me_traefik</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    image</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">traefik:1.7.4</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    container_name</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">me_traefik</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    ports</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">      - </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;80:80&#39;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">      - </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;443:443&#39;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">      - </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;8090:8090&#39;</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    volumes</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">      - </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">/var/run/docker.sock:/var/run/docker.sock</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">      - </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">./traefik.toml:/traefik.toml</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">      - </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">./acme.json:/acme.json</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    networks</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">      - </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">webgateway</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">networks</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">  webgateway</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    external</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">      name</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">me_gateway</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="traefik-toml" tabindex="-1"><a class="header-anchor" href="#traefik-toml"><span>traefik.toml</span></a></h3><blockquote><p>配置详细说明：http://docs.traefik.cn/toml#acme-lets-encrypt-configuration 以下为一个示例，在配置验证的时候遇到一些问题，可参考下面配置或者<a href="https://www.digitalocean.com/community/tutorials/how-to-use-traefik-as-a-reverse-proxy-for-docker-containers-on-ubuntu-18-04" target="_blank" rel="noopener noreferrer">这篇文章的评论</a></p></blockquote><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>################################################################</span></span>
<span class="line"><span># Global configuration</span></span>
<span class="line"><span>################################################################</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Enable debug mode</span></span>
<span class="line"><span>#</span></span>
<span class="line"><span># Optional</span></span>
<span class="line"><span># Default: false</span></span>
<span class="line"><span>#</span></span>
<span class="line"><span>debug = false</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Log level</span></span>
<span class="line"><span>#</span></span>
<span class="line"><span># Optional</span></span>
<span class="line"><span># Default: &quot;ERROR&quot;</span></span>
<span class="line"><span>#</span></span>
<span class="line"><span>logLevel = &quot;ERROR&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Entrypoints to be used by frontends that do not specify any entrypoint.</span></span>
<span class="line"><span># Each frontend can specify its own entrypoints.</span></span>
<span class="line"><span>#</span></span>
<span class="line"><span># Optional</span></span>
<span class="line"><span># Default: [&quot;http&quot;]</span></span>
<span class="line"><span>#</span></span>
<span class="line"><span>defaultEntryPoints = [&quot;http&quot;,&quot;https&quot;]</span></span>
<span class="line"><span>################################################################</span></span>
<span class="line"><span># Entrypoints configuration</span></span>
<span class="line"><span>################################################################</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Entrypoints definition</span></span>
<span class="line"><span>#</span></span>
<span class="line"><span># Optional</span></span>
<span class="line"><span># Default:</span></span>
<span class="line"><span># 要为一个入口点开启基础认证（basic auth）</span></span>
<span class="line"><span># 使用2组用户名/密码: test:test 与 test2:test2</span></span>
<span class="line"><span># 密码可以以MD5、SHA1或BCrypt方式加密：你可以使用htpasswd来生成这些用户名密码。</span></span>
<span class="line"><span># [entryPoints]</span></span>
<span class="line"><span>#   [entryPoints.http]</span></span>
<span class="line"><span>#   address = &quot;:80&quot;</span></span>
<span class="line"><span>#   [entryPoints.http.auth.basic]</span></span>
<span class="line"><span>#   users = [&quot;test:$apr1$H6uskkkW$IgXLP6ewTrSuBkTrqE8wj/&quot;, &quot;test2:$apr1$d9hr9HBB$4HxwgUir3HP4EsggP/QNo0&quot;]</span></span>
<span class="line"><span>#</span></span>
<span class="line"><span># 要为一个入口点开启摘要认证（digest auth）</span></span>
<span class="line"><span># 使用2组用户名/域/密码： test:traefik:test 与 test2:traefik:test2</span></span>
<span class="line"><span># 你可以使用htdigest来生成这些用户名/域/密码</span></span>
<span class="line"><span>[entryPoints]</span></span>
<span class="line"><span>  [entryPoints.http]</span></span>
<span class="line"><span>  address = &quot;:80&quot;</span></span>
<span class="line"><span>#    [entryPoints.http.redirect]</span></span>
<span class="line"><span>#      entryPoint = &quot;https&quot;</span></span>
<span class="line"><span>  [entryPoints.https]</span></span>
<span class="line"><span>  address = &quot;:443&quot;</span></span>
<span class="line"><span>    [entryPoints.https.tls]</span></span>
<span class="line"><span>  [entryPoints.webentry]</span></span>
<span class="line"><span>    address = &quot;:8090&quot;</span></span>
<span class="line"><span>    [entryPoints.webentry.auth]</span></span>
<span class="line"><span>      [entryPoints.webentry.auth.basic]</span></span>
<span class="line"><span>         users = [&quot;test:$apr1$H6uskkkW$IgXLP6ewTrSuBkTrqE8wj/&quot;]</span></span>
<span class="line"><span>################################################################</span></span>
<span class="line"><span># API and dashboard configuration</span></span>
<span class="line"><span>################################################################</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Enable API and dashboard</span></span>
<span class="line"><span>[api]</span></span>
<span class="line"><span>dashboard = true</span></span>
<span class="line"><span>entrypoint = &quot;webentry&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>################################################################</span></span>
<span class="line"><span># Ping configuration</span></span>
<span class="line"><span>################################################################</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Enable ping</span></span>
<span class="line"><span>[ping]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  # Name of the related entry point</span></span>
<span class="line"><span>  #</span></span>
<span class="line"><span>  # Optional</span></span>
<span class="line"><span>  # Default: &quot;traefik&quot;</span></span>
<span class="line"><span>  #</span></span>
<span class="line"><span>  # entryPoint = &quot;traefik&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>################################################################</span></span>
<span class="line"><span># Docker 后端配置</span></span>
<span class="line"><span>################################################################</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 使用默认域名。</span></span>
<span class="line"><span># 可以通过为容器设置&quot;traefik.domain&quot; label来覆盖。</span></span>
<span class="line"><span># 启用Docker后端配置</span></span>
<span class="line"><span>[docker]</span></span>
<span class="line"><span>endpoint = &quot;unix:///var/run/docker.sock&quot;</span></span>
<span class="line"><span>domain = &quot;yimo.link&quot;</span></span>
<span class="line"><span>watch = true</span></span>
<span class="line"><span>exposedByDefault = false</span></span>
<span class="line"><span>usebindportip = true</span></span>
<span class="line"><span>swarmMode = false</span></span>
<span class="line"><span>network = &quot;me_gateway&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[acme]</span></span>
<span class="line"><span>email = &quot;yimo666666@qq.com&quot;</span></span>
<span class="line"><span>storage = &quot;acme.json&quot;</span></span>
<span class="line"><span>entryPoint = &quot;https&quot;</span></span>
<span class="line"><span>onDemand = false</span></span>
<span class="line"><span>onHostRule = true</span></span>
<span class="line"><span>  [acme.httpChallenge]</span></span>
<span class="line"><span>  entryPoint=&quot;http&quot;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="docker-compose-部署-gogs-并使用-traefik-绑定域名" tabindex="-1"><a class="header-anchor" href="#docker-compose-部署-gogs-并使用-traefik-绑定域名"><span>docker-compose 部署 Gogs，并使用 traefik 绑定域名</span></a></h2><p>如果想要与 mysql 一起构建，可参考<a href="https://github.com/nanoninja/docker-gogs-mysql/blob/master/docker-compose.yml" target="_blank" rel="noopener noreferrer">此配置</a></p><h3 id="docker-compose-yml-1" tabindex="-1"><a class="header-anchor" href="#docker-compose-yml-1"><span>docker-compose.yml</span></a></h3><div class="language-yml line-numbers-mode" data-highlighter="shiki" data-ext="yml" data-title="yml" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">version</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;3&#39;</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">services</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">  me_gogs</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    restart</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">always</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    image</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">gogs/gogs</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    container_name</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">me_gogs</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    volumes</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">      - </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">./data:/data</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">      - </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">./logs:/app/gogs/log</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    ports</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">      - </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;10022:22&#39;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">      - </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;10080:3000&#39;</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    labels</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">      - </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;traefik.backend=me_gogs&#39;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">      - </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;traefik.frontend.rule=Host:git.yimo.link&#39;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">      - </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;traefik.enable=true&#39;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">      - </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;traefik.protocol=http&#39;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">      - </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;traefik.port=3000&#39;</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    networks</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">      - </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">webgateway</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">networks</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">  webgateway</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    external</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">      name</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">me_gateway</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>初始化时需要将域名设置为 <code>0.0.0.0</code> 或者<code>git.yimo.link</code> 即 <code>./data/gogs/conf/app.ini</code> 项为</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>DOMAIN           = git.yimo.link</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="docker-compose-部署-mysql" tabindex="-1"><a class="header-anchor" href="#docker-compose-部署-mysql"><span>docker-compose 部署 mysql</span></a></h2><p>这个值得说明的就是，同一网络下，可直接使用 me_mysql 连接</p><h3 id="docker-compose-yml-2" tabindex="-1"><a class="header-anchor" href="#docker-compose-yml-2"><span>docker-compose.yml</span></a></h3><div class="language-yml line-numbers-mode" data-highlighter="shiki" data-ext="yml" data-title="yml" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">version</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;3&#39;</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">services</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">  me_mysql</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    image</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">mysql:5.7.21</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    container_name</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">me_mysql</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    volumes</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">      - </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">./data:/var/lib/mysql</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    ports</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">      - </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;3306:3306&#39;</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    environment</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">      - </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">MYSQL_ROOT_PASSWORD=root</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    networks</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">      - </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">webgateway</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">networks</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">  webgateway</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    external</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">      name</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">me_gateway</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="docker-compose-部署-jenkins" tabindex="-1"><a class="header-anchor" href="#docker-compose-部署-jenkins"><span>docker-compose 部署 Jenkins</span></a></h2><p><a href="https://www.cnblogs.com/morang/p/docker-jenkins-use.html" target="_blank" rel="noopener noreferrer">具体介绍见</a></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>version: &#39;3&#39;</span></span>
<span class="line"><span>services:</span></span>
<span class="line"><span>  me_jenkins:</span></span>
<span class="line"><span>    restart: always</span></span>
<span class="line"><span>    image: jenkins/jenkins:lts</span></span>
<span class="line"><span>    container_name: me_jenkins</span></span>
<span class="line"><span>    networks:</span></span>
<span class="line"><span>      - webgateway</span></span>
<span class="line"><span>    ports:</span></span>
<span class="line"><span>      - &#39;50000:50000&#39;</span></span>
<span class="line"><span>    labels:</span></span>
<span class="line"><span>      - &#39;traefik.backend=me_jenkins&#39;</span></span>
<span class="line"><span>      - &#39;traefik.frontend.rule=Host:jenkins.yimo.link&#39;</span></span>
<span class="line"><span>      - &#39;traefik.enable=true&#39;</span></span>
<span class="line"><span>      - &#39;traefik.protocol=http&#39;</span></span>
<span class="line"><span>      - &#39;traefik.port=8080&#39;</span></span>
<span class="line"><span>    volumes:</span></span>
<span class="line"><span>      - ./data/:/var/jenkins_home</span></span>
<span class="line"><span>      - /var/run/docker.sock:/var/run/docker.sock</span></span>
<span class="line"><span>      - /usr/bin/docker:/usr/bin/docker</span></span>
<span class="line"><span>      - /usr/lib/x86_64-linux-gnu/libltdl.so.7:/usr/lib/x86_64-linux-gnu/libltdl.so.7</span></span>
<span class="line"><span></span></span>
<span class="line"><span>networks:</span></span>
<span class="line"><span>  webgateway:</span></span>
<span class="line"><span>    external:</span></span>
<span class="line"><span>      name: me_gateway</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="docker-compose-部署开发环境依赖" tabindex="-1"><a class="header-anchor" href="#docker-compose-部署开发环境依赖"><span>docker-compose 部署开发环境依赖</span></a></h2><p>示例：sqlserver,redis,rabbitmq,es,seq。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>version: &#39;3&#39;</span></span>
<span class="line"><span>services:</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 注意： sqlserver 需要执行以下命令授予目录权限</span></span>
<span class="line"><span># chgrp -R 0 ./mssql_data/&amp;&amp;chmod -R g=u ./mssql_data/&amp;&amp;chown -R 10001:0 ./mssql_data/</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  mssql:</span></span>
<span class="line"><span>    image: mcr.microsoft.com/mssql/server:2019-latest</span></span>
<span class="line"><span>    container_name: me_mssql</span></span>
<span class="line"><span>    restart: always</span></span>
<span class="line"><span>    ports:</span></span>
<span class="line"><span>      - &#39;1433:1433&#39;</span></span>
<span class="line"><span>    volumes:</span></span>
<span class="line"><span>      - ./mssql_data/data:/var/opt/mssql/data</span></span>
<span class="line"><span>      - ./mssql_data/log:/var/opt/mssql/log</span></span>
<span class="line"><span>      - ./mssql_data/secrets:/var/opt/mssql/secrets</span></span>
<span class="line"><span>    environment:</span></span>
<span class="line"><span>      - ACCEPT_EULA=Y</span></span>
<span class="line"><span>      - SA_PASSWORD=mssql@pwd</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  redis:</span></span>
<span class="line"><span>    image: redis:alpine</span></span>
<span class="line"><span>    container_name: me_redis</span></span>
<span class="line"><span>    restart: always</span></span>
<span class="line"><span>    ports:</span></span>
<span class="line"><span>      - &#39;6379:6379&#39;</span></span>
<span class="line"><span>    volumes:</span></span>
<span class="line"><span>      - ./redis_data:/data</span></span>
<span class="line"><span>  rabbitmq:</span></span>
<span class="line"><span>    image: rabbitmq:3-management</span></span>
<span class="line"><span>    container_name: me_rabbitmq</span></span>
<span class="line"><span>    restart: always</span></span>
<span class="line"><span>    ports:</span></span>
<span class="line"><span>      - &#39;5672:5672&#39;</span></span>
<span class="line"><span>      - &#39;15672:15672&#39;</span></span>
<span class="line"><span>    volumes:</span></span>
<span class="line"><span>      - ./rabbitmq_data:/var/lib/rabbitmq</span></span>
<span class="line"><span>  es:</span></span>
<span class="line"><span>    image: elasticsearch</span></span>
<span class="line"><span>    container_name: me_es</span></span>
<span class="line"><span>    restart: always</span></span>
<span class="line"><span>    ports:</span></span>
<span class="line"><span>      - &#39;9200:9200&#39;</span></span>
<span class="line"><span>      - &#39;9300:9300&#39;</span></span>
<span class="line"><span>    environment:</span></span>
<span class="line"><span>      - discovery.type=single-node</span></span>
<span class="line"><span>  seq:</span></span>
<span class="line"><span>    image: datalust/seq</span></span>
<span class="line"><span>    container_name: me_seq</span></span>
<span class="line"><span>    restart: always</span></span>
<span class="line"><span>    ports:</span></span>
<span class="line"><span>      - &#39;15341:80&#39;</span></span>
<span class="line"><span>      - &#39;5341:5341&#39;</span></span>
<span class="line"><span>    environment:</span></span>
<span class="line"><span>      - ACCEPT_EULA=Y</span></span>
<span class="line"><span>    volumes:</span></span>
<span class="line"><span>      - ./seq_data:/data</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,33)]))}const c=n(l,[["render",p],["__file","docker_compose_yml_share.html.vue"]]),o=JSON.parse('{"path":"/posts/docker/docker_compose_yml_share.html","title":"linux中使用docker-compose部署软件配置分享","lang":"zh-CN","frontmatter":{"title":"linux中使用docker-compose部署软件配置分享","date":"2018-12-15T21:07:00.000Z","category":["Docker"],"tag":["docker","docker-compose","linux"],"description":"本篇将分享一些 docker-compose 的配置，可参考其总结自己的一套基于docker的开发/生产环境配置。 安装docker及docker-compose install docker install docker-compose 创建专属网络 使用 docker network 创建自己的专属常用网络 me_gateway，使得 docker...","head":[["meta",{"property":"og:url","content":"https://www.yimo.link/posts/docker/docker_compose_yml_share.html"}],["meta",{"property":"og:site_name","content":"易墨网"}],["meta",{"property":"og:title","content":"linux中使用docker-compose部署软件配置分享"}],["meta",{"property":"og:description","content":"本篇将分享一些 docker-compose 的配置，可参考其总结自己的一套基于docker的开发/生产环境配置。 安装docker及docker-compose install docker install docker-compose 创建专属网络 使用 docker network 创建自己的专属常用网络 me_gateway，使得 docker..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-10-28T11:15:42.000Z"}],["meta",{"property":"article:tag","content":"docker"}],["meta",{"property":"article:tag","content":"docker-compose"}],["meta",{"property":"article:tag","content":"linux"}],["meta",{"property":"article:published_time","content":"2018-12-15T21:07:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-10-28T11:15:42.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"linux中使用docker-compose部署软件配置分享\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2018-12-15T21:07:00.000Z\\",\\"dateModified\\":\\"2024-10-28T11:15:42.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"易墨\\",\\"url\\":\\"https://www.yimo.link\\"}]}"]]},"headers":[{"level":2,"title":"安装docker及docker-compose","slug":"安装docker及docker-compose","link":"#安装docker及docker-compose","children":[{"level":3,"title":"install docker","slug":"install-docker","link":"#install-docker","children":[]},{"level":3,"title":"install docker-compose","slug":"install-docker-compose","link":"#install-docker-compose","children":[]}]},{"level":2,"title":"创建专属网络","slug":"创建专属网络","link":"#创建专属网络","children":[]},{"level":2,"title":"docker-compose 部署 Traefik","slug":"docker-compose-部署-traefik","link":"#docker-compose-部署-traefik","children":[{"level":3,"title":"docker-compose.yml","slug":"docker-compose-yml","link":"#docker-compose-yml","children":[]},{"level":3,"title":"traefik.toml","slug":"traefik-toml","link":"#traefik-toml","children":[]}]},{"level":2,"title":"docker-compose 部署 Gogs，并使用 traefik 绑定域名","slug":"docker-compose-部署-gogs-并使用-traefik-绑定域名","link":"#docker-compose-部署-gogs-并使用-traefik-绑定域名","children":[{"level":3,"title":"docker-compose.yml","slug":"docker-compose-yml-1","link":"#docker-compose-yml-1","children":[]}]},{"level":2,"title":"docker-compose 部署 mysql","slug":"docker-compose-部署-mysql","link":"#docker-compose-部署-mysql","children":[{"level":3,"title":"docker-compose.yml","slug":"docker-compose-yml-2","link":"#docker-compose-yml-2","children":[]}]},{"level":2,"title":"docker-compose 部署 Jenkins","slug":"docker-compose-部署-jenkins","link":"#docker-compose-部署-jenkins","children":[]},{"level":2,"title":"docker-compose 部署开发环境依赖","slug":"docker-compose-部署开发环境依赖","link":"#docker-compose-部署开发环境依赖","children":[]}],"git":{"createdTime":1730114142000,"updatedTime":1730114142000,"contributors":[{"name":"yimo","email":"yimo@wikiglobal.com","commits":1}]},"readingTime":{"minutes":3.24,"words":972},"filePathRelative":"posts/docker/docker_compose_yml_share.md","localizedDate":"2018年12月15日","excerpt":"<p>本篇将分享一些 docker-compose 的配置，可参考其总结自己的一套基于docker的开发/生产环境配置。</p>\\n<h2>安装docker及docker-compose</h2>\\n<h3>install docker</h3>\\n<div class=\\"language- line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext=\\"\\" data-title=\\"\\" style=\\"--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes one-light one-dark-pro vp-code\\"><code><span class=\\"line\\"><span>curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{c as comp,o as data};
