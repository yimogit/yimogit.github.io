import{_ as i}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as e,e as n,o as a}from"./app-BHZ56IUu.js";const l="/assets/662652-20230824222423658-1180459547-C1FNcQPt.png",t={};function d(r,s){return a(),e("div",null,s[0]||(s[0]=[n('<blockquote><p>文章源于 Jenkins 构建 Vue 项目失败，然后就把 node_modules 删了重新构建发现 node-sass 安装不上了，折腾一天终于可以稳定构建了。<br> 犹记得从学 node 的第一天，就被 node-sass 折磨了一整天，后面本地没问题了然后服务器开始折磨了，这次又遇到，尝试了一次又一次，还是用本地包构建最稳，觉得还算有用，故记录一二。</p></blockquote><h3 id="构建环境-docker-jenkins" tabindex="-1"><a class="header-anchor" href="#构建环境-docker-jenkins"><span>构建环境 docker+jenkins</span></a></h3><ul><li><a href="https://www.cnblogs.com/morang/p/9501223.html" target="_blank" rel="noopener noreferrer">docker 及 docker-compose 的快速安装和简单使用</a></li><li><a href="https://www.cnblogs.com/morang/p/docker-jenkins-use.html" target="_blank" rel="noopener noreferrer">使用 docker-compose 快速安装 Jenkins</a></li></ul><p>之前已经记录过就不在多说了，可参考之前的文章，此为打包构建的流程 <img src="'+l+`" alt="" loading="lazy"></p><p>本篇文章的目录结构</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>- Dockerfile 构建node打包镜像</span></span>
<span class="line"><span>- sources.list 阿里云软件源 debian 9</span></span>
<span class="line"><span>- linux-x64-83_binding.node  node-sass包 v4.14.1</span></span>
<span class="line"><span>- Dockerfile.dist 构建vue运行的nginx镜像</span></span>
<span class="line"><span>- nginx.conf nginx镜像的配置</span></span>
<span class="line"><span>- src  源码</span></span>
<span class="line"><span>  - dist 由node打包镜像运行的容器生成的构建产物</span></span>
<span class="line"><span>  - package.json npm包配置</span></span>
<span class="line"><span>  - ...</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="为-vue-项目制制作-node-打包镜像" tabindex="-1"><a class="header-anchor" href="#为-vue-项目制制作-node-打包镜像"><span>为 vue 项目制制作 node 打包镜像</span></a></h2><h3 id="linxu-下-node-打包遇到解决的问题" tabindex="-1"><a class="header-anchor" href="#linxu-下-node-打包遇到解决的问题"><span>linxu 下 node 打包遇到解决的问题</span></a></h3><p>笔者环境：docker:18.06，node:14.10.1，vue:2.6.11 ，webpack-cli:3.3.12</p><ul><li>image-webpack-loader 在 linux 环境需要安装依赖包 <ul><li><code>apt-get clean &amp;&amp; apt-get update &amp;&amp; apt-get install -y --no-install-recommends apt-utils autoconf automake file g++ libtool make nasm libpng-dev</code></li></ul></li><li>sentry 下载慢可以设置下镜像 <ul><li><code>npm set sentrycli_cdnurl=https://npmmirror.com/mirrors/sentry-cli/</code></li></ul></li><li>node-sass <ul><li>从 GitHub 下载下半天，尝试设置淘宝镜像也没有用</li><li><code>npm set sass_binary_site=https://npmmirror.com/mirrors/node-sass/</code></li><li>最后各种尝试设置源都无效，于是采用指定本地的方式,</li><li><ol><li><a href="https://npmmirror.com/mirrors/node-sass/" target="_blank" rel="noopener noreferrer">下载</a> node 所<a href="https://www.npmjs.com/package/node-sass" target="_blank" rel="noopener noreferrer">对应的 node-sass 版本</a></li></ol></li><li><ol start="2"><li>指定文件路径： <code>npm set sass_binary_path=/app/linux-x64-83_binding.node</code></li></ol></li><li><ol start="3"><li>安装到依赖：<code>npm i --save-dev node-sass@4.14.1 --sass_binary_path=/app/linux-x64-83_binding.node</code></li></ol></li><li><ol start="4"><li>重新构建包生成相关文件 :<code>npm rebuild node-sass</code>(不执行会报错找不到 node_modules/node-sass/vendor)</li></ol></li></ul></li></ul><p>以上，就是在 linux 中 node 打包 vue 项目的过程中所遇到的一些问题，接下来分享 docker 中如何将这些坑一一解决</p><h3 id="dockerfile" tabindex="-1"><a class="header-anchor" href="#dockerfile"><span>Dockerfile</span></a></h3><p>node14 的镜像<a href="https://hub.docker.com/layers/library/node/14.10.1/images/sha256-3ab45e1f177ac393cd00e15a4de6138e22c1683e95c8b122c9ed224e51a0688c?context=explore" target="_blank" rel="noopener noreferrer">基于 debian 9</a> ,默认源安装不了软件，故需要指定其他镜像软件源，笔者用的阿里云的</p><div class="language-dockerfile line-numbers-mode" data-highlighter="shiki" data-ext="dockerfile" data-title="dockerfile" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">FROM</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> node:14.10.1 </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">AS</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> base</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">COPY</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> ./sources.list /etc/apt/</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">COPY</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> ./linux-x64-83_binding.node /app/linux-x64-83_binding.node</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">RUN</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> apt-get clean &amp;&amp; apt-get update &amp;&amp; apt-get install -y --no-install-recommends apt-utils autoconf automake file g++ libtool make nasm libpng-dev</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="dockerfile-用到的-sources-list" tabindex="-1"><a class="header-anchor" href="#dockerfile-用到的-sources-list"><span>Dockerfile 用到的 sources.list</span></a></h3><p>阿里云的包源设置，用于软件安装，构建打包镜像会将其复制到 /etc/apt 目录<br> ！官方文档更新没对，还是在<a href="https://developer.aliyun.com/mirror/debian?spm=a2c6h.13651102.0.0.467e1b11F3fFAF" target="_blank" rel="noopener noreferrer">阿里云包源文档的评论区</a>的有用</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>deb http://mirrors.aliyun.com/debian-archive/debian stretch main contrib non-free</span></span>
<span class="line"><span>deb http://mirrors.aliyun.com/debian-archive/debian stretch-backports main</span></span>
<span class="line"><span>deb http://mirrors.aliyun.com/debian-archive/debian-security stretch/updates main</span></span>
<span class="line"><span>deb-src http://mirrors.aliyun.com/debian-archive/debian stretch main</span></span>
<span class="line"><span>deb-src http://mirrors.aliyun.com/debian-archive/debian stretch-backports main</span></span>
<span class="line"><span>deb-src http://mirrors.aliyun.com/debian-archive/debian-security stretch/updates main</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="dockerfile-用到的-linux-x64-83-binding-node" tabindex="-1"><a class="header-anchor" href="#dockerfile-用到的-linux-x64-83-binding-node"><span>Dockerfile 用到的 linux-x64-83_binding.node</span></a></h3><p>用于 vue 项目构建时指定本地路径，构建打包镜像复制到 /app 目录</p><ul><li>github 下载：https://github.com/sass/node-sass/releases/download/v4.14.1/linux-x64-83_binding.node</li><li>cnpm 下载：https://registry.npmmirror.com/-/binary/node-sass/v4.14.0/linux-x64-83_binding.node</li></ul><h3 id="构建-node-打包镜像" tabindex="-1"><a class="header-anchor" href="#构建-node-打包镜像"><span>构建 node 打包镜像</span></a></h3><p>将上面的 Dockerfile,sources.list,linux-x64-83_binding.node 放到 linux 同一目录中，执行 <a href="https://www.runoob.com/docker/docker-build-command.html" target="_blank" rel="noopener noreferrer">docker build 命令</a> 打包自定义镜像即可</p><div class="language-sh line-numbers-mode" data-highlighter="shiki" data-ext="sh" data-title="sh" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">docker</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> build</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> --rm</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">  -t</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> mynode:14.10.1</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> .</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>打包镜像完成，接下来将使用此镜像进行 vue 项目的打包生成 dist 部署文件</p><h2 id="使用-docker-构建的自定义-node-镜像打包-vue-项目" tabindex="-1"><a class="header-anchor" href="#使用-docker-构建的自定义-node-镜像打包-vue-项目"><span>使用 docker 构建的自定义 node 镜像打包 vue 项目</span></a></h2><p>将项目顶级目录 src 映射到容器中的 /src ,运行刚刚构建的 mynode:14.10.1 镜像并传入打包 vue 相关命令，如果还有下载慢需要加镜像的包，再添加即可。</p><div class="language-sh line-numbers-mode" data-highlighter="shiki" data-ext="sh" data-title="sh" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">docker</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> run</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -i</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> --rm</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> \\</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">--privileged=true </span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">\\</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">-e </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;TZ=Asia/Shanghai&quot;</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> \\</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">-v </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">./src:/src</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> \\</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">--name </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">build_node_vueproject</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> \\</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">mynode:14.10.1 </span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">\\</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">/bin/bash </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">-c</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;cd /src</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">node -v</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">npm -v</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">npm set sentrycli_cdnurl=https://cdn.npm.taobao.org/dist/sentry-cli</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">npm set sass_binary_path=/app/linux-x64-83_binding.node</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">npm config set registry https://registry.npm.taobao.org</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">npm i --save-dev node-sass@4.14.1 --sass_binary_path=/app/linux-x64-83_binding.node</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">npm rebuild node-sass</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">npm install</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">npm run prod&#39;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>构建生成的容器运行完毕，就可以将 dist 下的构建产物进行发布了</p><h2 id="制作-vue-项目发布镜像" tabindex="-1"><a class="header-anchor" href="#制作-vue-项目发布镜像"><span>制作 vue 项目发布镜像</span></a></h2><p>Dockerfile.dist,nginx.conf 与上面 Dockerfile 等同级目录，故映射前一步的构建产物 ./src/dist 到镜像中</p><ul><li>Dockerfile 文件: Dockerfile.dist</li></ul><div class="language-dockerfile line-numbers-mode" data-highlighter="shiki" data-ext="dockerfile" data-title="dockerfile" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">FROM</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> nginx:latest</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">EXPOSE</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> 80</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">COPY</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> ./src/dist /usr/share/nginx/html</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">COPY</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> ./nginx.conf /etc/nginx</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>history 模式的 nginx.conf(根据项目调整)</li><li>nginx 版本不同可能配置文件会不同，新版的路径也不一样了，配置文件在/etc/nginx/conf.d/，然后conf文件也去掉了http节点。</li></ul><div class="language-nginx line-numbers-mode" data-highlighter="shiki" data-ext="nginx" data-title="nginx" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">worker_processes </span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">auto;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">events</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    worker_connections </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">1024</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">http</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    server</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">        listen </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">      80</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">        location</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> / {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">            root </span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">/usr/share/nginx/html/;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">            index </span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">index.html;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">            try_files </span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">$</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">uri</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> $</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">uri</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">/ /index.html;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>执行构建</li></ul><p><code>docker build --rm -f ./Dockerfile.dist -t vuedist:latest .</code></p><h2 id="运行构建的-vue-镜像" tabindex="-1"><a class="header-anchor" href="#运行构建的-vue-镜像"><span>运行构建的 vue 镜像</span></a></h2><p><code>docker run --name myvueproject -d -p 80:80 vuedist:latest</code></p><p>至此，记录结束，踩坑不易，文章更不易，如有错误，也欢迎指教 转载请注明出处：By 易墨</p>`,39)]))}const o=i(t,[["render",d],["__file","docker_build_node_vue_01.html.vue"]]),c=JSON.parse('{"path":"/posts/web/docker_build_node_vue_01.html","title":"使用 docker 打包构建部署 Vue 项目，一劳永逸解决node-sass安装问题","lang":"zh-CN","frontmatter":{"title":"使用 docker 打包构建部署 Vue 项目，一劳永逸解决node-sass安装问题","date":"2023-08-24T22:48:00.000Z","category":["Web"],"tag":["docker","node","vue"],"description":"文章源于 Jenkins 构建 Vue 项目失败，然后就把 node_modules 删了重新构建发现 node-sass 安装不上了，折腾一天终于可以稳定构建了。 犹记得从学 node 的第一天，就被 node-sass 折磨了一整天，后面本地没问题了然后服务器开始折磨了，这次又遇到，尝试了一次又一次，还是用本地包构建最稳，觉得还算有用，故记录一二。...","head":[["meta",{"property":"og:url","content":"https://www.yimo.link/posts/web/docker_build_node_vue_01.html"}],["meta",{"property":"og:site_name","content":"易墨网"}],["meta",{"property":"og:title","content":"使用 docker 打包构建部署 Vue 项目，一劳永逸解决node-sass安装问题"}],["meta",{"property":"og:description","content":"文章源于 Jenkins 构建 Vue 项目失败，然后就把 node_modules 删了重新构建发现 node-sass 安装不上了，折腾一天终于可以稳定构建了。 犹记得从学 node 的第一天，就被 node-sass 折磨了一整天，后面本地没问题了然后服务器开始折磨了，这次又遇到，尝试了一次又一次，还是用本地包构建最稳，觉得还算有用，故记录一二。..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-10-28T11:15:42.000Z"}],["meta",{"property":"article:tag","content":"docker"}],["meta",{"property":"article:tag","content":"node"}],["meta",{"property":"article:tag","content":"vue"}],["meta",{"property":"article:published_time","content":"2023-08-24T22:48:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-10-28T11:15:42.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用 docker 打包构建部署 Vue 项目，一劳永逸解决node-sass安装问题\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-08-24T22:48:00.000Z\\",\\"dateModified\\":\\"2024-10-28T11:15:42.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"易墨\\",\\"url\\":\\"https://www.yimo.link\\"}]}"]]},"headers":[{"level":3,"title":"构建环境 docker+jenkins","slug":"构建环境-docker-jenkins","link":"#构建环境-docker-jenkins","children":[]},{"level":2,"title":"为 vue 项目制制作 node 打包镜像","slug":"为-vue-项目制制作-node-打包镜像","link":"#为-vue-项目制制作-node-打包镜像","children":[{"level":3,"title":"linxu 下 node 打包遇到解决的问题","slug":"linxu-下-node-打包遇到解决的问题","link":"#linxu-下-node-打包遇到解决的问题","children":[]},{"level":3,"title":"Dockerfile","slug":"dockerfile","link":"#dockerfile","children":[]},{"level":3,"title":"Dockerfile 用到的 sources.list","slug":"dockerfile-用到的-sources-list","link":"#dockerfile-用到的-sources-list","children":[]},{"level":3,"title":"Dockerfile 用到的 linux-x64-83_binding.node","slug":"dockerfile-用到的-linux-x64-83-binding-node","link":"#dockerfile-用到的-linux-x64-83-binding-node","children":[]},{"level":3,"title":"构建 node 打包镜像","slug":"构建-node-打包镜像","link":"#构建-node-打包镜像","children":[]}]},{"level":2,"title":"使用 docker 构建的自定义 node 镜像打包 vue 项目","slug":"使用-docker-构建的自定义-node-镜像打包-vue-项目","link":"#使用-docker-构建的自定义-node-镜像打包-vue-项目","children":[]},{"level":2,"title":"制作 vue 项目发布镜像","slug":"制作-vue-项目发布镜像","link":"#制作-vue-项目发布镜像","children":[]},{"level":2,"title":"运行构建的 vue 镜像","slug":"运行构建的-vue-镜像","link":"#运行构建的-vue-镜像","children":[]}],"git":{"createdTime":1730114142000,"updatedTime":1730114142000,"contributors":[{"name":"yimo","email":"yimo@wikiglobal.com","commits":1}]},"readingTime":{"minutes":4.12,"words":1235},"filePathRelative":"posts/web/docker_build_node_vue_01.md","localizedDate":"2023年8月24日","excerpt":"<blockquote>\\n<p>文章源于 Jenkins 构建 Vue 项目失败，然后就把 node_modules 删了重新构建发现 node-sass 安装不上了，折腾一天终于可以稳定构建了。<br>\\n犹记得从学 node 的第一天，就被 node-sass 折磨了一整天，后面本地没问题了然后服务器开始折磨了，这次又遇到，尝试了一次又一次，还是用本地包构建最稳，觉得还算有用，故记录一二。</p>\\n</blockquote>\\n<h3>构建环境 docker+jenkins</h3>\\n<ul>\\n<li><a href=\\"https://www.cnblogs.com/morang/p/9501223.html\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">docker 及 docker-compose 的快速安装和简单使用</a></li>\\n<li><a href=\\"https://www.cnblogs.com/morang/p/docker-jenkins-use.html\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">使用 docker-compose 快速安装 Jenkins</a></li>\\n</ul>","autoDesc":true}');export{o as comp,c as data};
