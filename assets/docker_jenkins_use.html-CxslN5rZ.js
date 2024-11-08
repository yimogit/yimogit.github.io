import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as i,e as n,o as a}from"./app-f_uNzTRF.js";const l={};function d(r,s){return a(),i("div",null,s[0]||(s[0]=[n(`<blockquote><p>本文分享在 docker 环境中，使用 docker-compose.yml 快速安装 Jenkins，以及使用主机中的 docker 打包推送镜像到阿里云 博客园的第100篇文章达成，2019的第一篇文章，新的开始，新的征程，一起迎接崭新的世界。</p></blockquote><p>系统环境：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>Distributor ID: Ubuntu</span></span>
<span class="line"><span>Description:    Ubuntu 16.04.2 LTS</span></span>
<span class="line"><span>Release:        16.04</span></span>
<span class="line"><span>Codename:       xenial</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当前 docker 版本：<code>Docker version 18.09.0</code><br> 当前 docker-compose 版本：<code>docker-compose version 1.23.2</code></p><h2 id="使用docker安装jenkins" tabindex="-1"><a class="header-anchor" href="#使用docker安装jenkins"><span>使用docker安装Jenkins</span></a></h2><p>指定了时区及jvm参数，映射了docker，可以再jenkins中使用docker打包</p><div class="language-sh line-numbers-mode" data-highlighter="shiki" data-ext="sh" data-title="sh" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">docker</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> run</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -d</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> \\</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">--restart=always </span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">\\</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">--user=root </span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">\\</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">-p </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">8080:8080</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> \\</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">-p </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">50000:50000</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> \\</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">-e </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">TZ=Asia/Shanghai</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> \\</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">-e </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">JAVA_OPTS=&quot;-Duser.timezone=Asia/Shanghai -Dhudson.security.csrf.GlobalCrumbIssuerConfiguration.DISABLE_CSRF_PROTECTION=true -server -Xms2048m -Xmx2048m -Xss512k&quot;</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> \\</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">-v </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">/etc/docker:/etc/docker</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> \\</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">-v </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">/etc/localtime:/etc/localtime</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> \\</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">-v </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">/root/.docker:/root/.docker</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> \\</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">-v </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">/root/.nuget:/root/.nuget</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> \\</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">-v </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">/usr/bin/docker:/usr/bin/docker</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> \\</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">-v </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">/var/run/docker.sock:/var/run/docker.sock</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> \\</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">-v </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">./data:/var/jenkins_home</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> \\</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">--name </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">jenkins</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> \\</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">jenkins/jenkins:2.277.1</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="使用-docker-compose-安装" tabindex="-1"><a class="header-anchor" href="#使用-docker-compose-安装"><span>使用 docker-compose 安装</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>version: &#39;3&#39;</span></span>
<span class="line"><span>services:</span></span>
<span class="line"><span>  docker_jenkins:</span></span>
<span class="line"><span>    restart: always</span></span>
<span class="line"><span>    image: jenkins/jenkins:lts</span></span>
<span class="line"><span>    container_name: docker_jenkins</span></span>
<span class="line"><span>    ports:</span></span>
<span class="line"><span>      - &#39;8080:8080&#39;</span></span>
<span class="line"><span>      - &#39;50000:50000&#39;</span></span>
<span class="line"><span>    volumes:</span></span>
<span class="line"><span>      - ./data/:/var/jenkins_home</span></span>
<span class="line"><span>      - /var/run/docker.sock:/var/run/docker.sock</span></span>
<span class="line"><span>      - /usr/bin/docker:/usr/bin/docker</span></span>
<span class="line"><span>      - /usr/lib/x86_64-linux-gnu/libltdl.so.7:/usr/lib/x86_64-linux-gnu/libltdl.so.7</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="创建-data-目录并设置权限" tabindex="-1"><a class="header-anchor" href="#创建-data-目录并设置权限"><span>创建 data 目录并设置权限</span></a></h2><ul><li><code>mkdir ./data</code></li><li><code>sudo chown -R 1000 ./data</code> //把当前目录的拥有者赋值给uid 1000<br> 若已启动则需要重建下服务</li></ul><h2 id="构建jenkins服务" tabindex="-1"><a class="header-anchor" href="#构建jenkins服务"><span>构建Jenkins服务</span></a></h2><p><code>docker-compose up -d</code></p><p>...访问 http://ip:8080 进行初始化...</p><h3 id="jenkins在docker中安装后查看登录令牌" tabindex="-1"><a class="header-anchor" href="#jenkins在docker中安装后查看登录令牌"><span>jenkins在docker中安装后查看登录令牌</span></a></h3><p>使用命令 <code>docker logs 容器名称/容器ID</code> 查看访问日志，即可查看到登录令牌</p><h3 id="若未设置账户-如何查看admin的密码" tabindex="-1"><a class="header-anchor" href="#若未设置账户-如何查看admin的密码"><span>若未设置账户，如何查看admin的密码</span></a></h3><p>一不小心，未创建新的账户，可通过查看挂载目录下的 /secrets/initialAdminPassword 中的 Key 作为密码登录<br> 账户：<code>admin</code><br> 密码：<code>cat ./data/secrets/initialAdminPassword</code></p><h3 id="docker-build-无权限的解决办法" tabindex="-1"><a class="header-anchor" href="#docker-build-无权限的解决办法"><span>docker build 无权限的解决办法</span></a></h3><p>在 docker-compose.yml 已将主机 docker 映射到容器内，故使用 docker -v 已经能够查看到版本号</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>+ docker -v</span></span>
<span class="line"><span>Docker version 18.09.0, build 4d60db4</span></span>
<span class="line"><span>+ docker build -t test/test.admin.vue:v3 .</span></span>
<span class="line"><span>Got permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: Post http://%2Fvar%2Frun%2Fdocker.sock/v1.39/build?buildargs=%7B%7D&amp;cachefrom=%5B%5D&amp;cgroupparent=&amp;cpuperiod=0&amp;cpuquota=0&amp;cpusetcpus=&amp;cpusetmems=&amp;cpushares=0&amp;dockerfile=Dockerfile&amp;labels=%7B%7D&amp;memory=0&amp;memswap=0&amp;networkmode=default&amp;rm=1&amp;session=c0j8whn50ubpyukeblzkng7cq&amp;shmsize=0&amp;t=test%2Ftest.admin.vue%3Av3&amp;target=&amp;ulimits=null&amp;version=1: dial unix /var/run/docker.sock: connect: permission denied</span></span>
<span class="line"><span>Build step &#39;Execute shell&#39; marked build as failure</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是当使用 <code>docker build -t .</code> 命令的时候依旧无法执行，提示无权限(<code> permission denied</code>)<br> 这个问题之前将Jenkins直接装在linux主机的时候也遇到过，在shell脚本输入框顶部加上 <code>#!/bin/bash -ilex</code> 即可<br> 如果依旧不行，可执行(赋予读写执行权限)：<code>sudo chmod 777 /var/run/docker.sock</code> 注：服务器重启后可能权限会失效</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>#!/bin/bash -ilex</span></span>
<span class="line"><span>+ docker -v</span></span>
<span class="line"><span>Docker version 18.09.0, build 4d60db4</span></span>
<span class="line"><span>+ export DOCKER_IMAGE_NAME=test/test.admin.vue:v3</span></span>
<span class="line"><span>+ docker build -t test/test.admin.vue:v3 .</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="关于-docker-镜像的构建" tabindex="-1"><a class="header-anchor" href="#关于-docker-镜像的构建"><span>关于 docker 镜像的构建</span></a></h2><p>注册阿里云账号，并申请阿里云的容器镜像服务，创建命名空间(公/私有，可自动创建仓库)，设置下 Registry 登录密码，随便新建一个仓库，查看仓库详情可查看推送 docker 的相关信息 创建好账号信息后，即可在 Jenkins 中构建推送。 可参考以下脚本，脚本环境变量说明 <code>DOCKER_IMAGE_NAME</code>：镜像名称(命名空间/镜像名:版本号) <code>DOCKER_CLOUD_URL</code>： 镜像源 <code>ALIYUN_USERNAME</code>：阿里云用户名 <code>ALIYUN_USERPWD</code>：阿里云 Docker Registry 密码</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>#!/bin/bash -ilex</span></span>
<span class="line"><span>docker -v</span></span>
<span class="line"><span>echo &#39;打包镜像&#39;</span></span>
<span class="line"><span>export DOCKER_IMAGE_NAME=test/$JOB_NAME:v$BUILD_NUMBER</span></span>
<span class="line"><span>docker build -t $DOCKER_IMAGE_NAME .</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo &#39;推送镜像&#39;</span></span>
<span class="line"><span>export DOCKER_CLOUD_URL=registry.cn-hangzhou.aliyuncs.com</span></span>
<span class="line"><span></span></span>
<span class="line"><span>docker login --username=$ALIYUN_USERNAME --password=$ALIYUN_USERPWD $DOCKER_CLOUD_URL</span></span>
<span class="line"><span></span></span>
<span class="line"><span>docker tag $DOCKER_IMAGE_NAME $DOCKER_CLOUD_URL/$DOCKER_IMAGE_NAME</span></span>
<span class="line"><span>docker push $DOCKER_CLOUD_URL/$DOCKER_IMAGE_NAME</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo &#39;删除镜像&#39;</span></span>
<span class="line"><span>docker rmi $DOCKER_IMAGE_NAME</span></span>
<span class="line"><span>docker rmi $DOCKER_CLOUD_URL/$DOCKER_IMAGE_NAME</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考"><span>参考</span></a></h2><ul><li>https://github.com/jenkinsci/docker/blob/master/README.md</li><li>https://www.cnblogs.com/leolztang/p/6934694.html</li></ul>`,28)]))}const t=e(l,[["render",d],["__file","docker_jenkins_use.html.vue"]]),o=JSON.parse('{"path":"/posts/docker/docker_jenkins_use.html","title":"使用 docker-compose 快速安装Jenkins","lang":"zh-CN","frontmatter":{"title":"使用 docker-compose 快速安装Jenkins","date":"2019-01-01T03:13:00.000Z","category":["Docker"],"tag":["jenkins","docker-compose","docker"],"description":"本文分享在 docker 环境中，使用 docker-compose.yml 快速安装 Jenkins，以及使用主机中的 docker 打包推送镜像到阿里云 博客园的第100篇文章达成，2019的第一篇文章，新的开始，新的征程，一起迎接崭新的世界。 系统环境： 当前 docker 版本：Docker version 18.09.0 当前 docker-...","head":[["meta",{"property":"og:url","content":"https://www.yimo.link/posts/docker/docker_jenkins_use.html"}],["meta",{"property":"og:site_name","content":"易墨网"}],["meta",{"property":"og:title","content":"使用 docker-compose 快速安装Jenkins"}],["meta",{"property":"og:description","content":"本文分享在 docker 环境中，使用 docker-compose.yml 快速安装 Jenkins，以及使用主机中的 docker 打包推送镜像到阿里云 博客园的第100篇文章达成，2019的第一篇文章，新的开始，新的征程，一起迎接崭新的世界。 系统环境： 当前 docker 版本：Docker version 18.09.0 当前 docker-..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-10-28T11:15:42.000Z"}],["meta",{"property":"article:tag","content":"jenkins"}],["meta",{"property":"article:tag","content":"docker-compose"}],["meta",{"property":"article:tag","content":"docker"}],["meta",{"property":"article:published_time","content":"2019-01-01T03:13:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-10-28T11:15:42.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用 docker-compose 快速安装Jenkins\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-01-01T03:13:00.000Z\\",\\"dateModified\\":\\"2024-10-28T11:15:42.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"易墨\\",\\"url\\":\\"https://www.yimo.link\\"}]}"]]},"headers":[{"level":2,"title":"使用docker安装Jenkins","slug":"使用docker安装jenkins","link":"#使用docker安装jenkins","children":[]},{"level":2,"title":"使用 docker-compose 安装","slug":"使用-docker-compose-安装","link":"#使用-docker-compose-安装","children":[]},{"level":2,"title":"创建 data 目录并设置权限","slug":"创建-data-目录并设置权限","link":"#创建-data-目录并设置权限","children":[]},{"level":2,"title":"构建Jenkins服务","slug":"构建jenkins服务","link":"#构建jenkins服务","children":[{"level":3,"title":"jenkins在docker中安装后查看登录令牌","slug":"jenkins在docker中安装后查看登录令牌","link":"#jenkins在docker中安装后查看登录令牌","children":[]},{"level":3,"title":"若未设置账户，如何查看admin的密码","slug":"若未设置账户-如何查看admin的密码","link":"#若未设置账户-如何查看admin的密码","children":[]},{"level":3,"title":"docker build 无权限的解决办法","slug":"docker-build-无权限的解决办法","link":"#docker-build-无权限的解决办法","children":[]}]},{"level":2,"title":"关于 docker 镜像的构建","slug":"关于-docker-镜像的构建","link":"#关于-docker-镜像的构建","children":[]},{"level":2,"title":"参考","slug":"参考","link":"#参考","children":[]}],"git":{"createdTime":1730114142000,"updatedTime":1730114142000,"contributors":[{"name":"yimo","email":"yimo@wikiglobal.com","commits":1}]},"readingTime":{"minutes":2.86,"words":859},"filePathRelative":"posts/docker/docker_jenkins_use.md","localizedDate":"2019年1月1日","excerpt":"<blockquote>\\n<p>本文分享在 docker 环境中，使用 docker-compose.yml 快速安装 Jenkins，以及使用主机中的 docker 打包推送镜像到阿里云\\n博客园的第100篇文章达成，2019的第一篇文章，新的开始，新的征程，一起迎接崭新的世界。</p>\\n</blockquote>\\n<p>系统环境：</p>\\n<div class=\\"language- line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext=\\"\\" data-title=\\"\\" style=\\"--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes one-light one-dark-pro vp-code\\"><code><span class=\\"line\\"><span>Distributor ID: Ubuntu</span></span>\\n<span class=\\"line\\"><span>Description:    Ubuntu 16.04.2 LTS</span></span>\\n<span class=\\"line\\"><span>Release:        16.04</span></span>\\n<span class=\\"line\\"><span>Codename:       xenial</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{t as comp,o as data};