import{_ as i}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as l,e as t,o}from"./app-CS3knfL2.js";const a={};function c(n,e){return o(),l("div",null,e[0]||(e[0]=[t('<h2 id="配置本地仓库" tabindex="-1"><a class="header-anchor" href="#配置本地仓库"><span>配置本地仓库</span></a></h2><ul><li><code>git config --global user.name、git config --global user.email</code></li></ul><h2 id="查看配置详情" tabindex="-1"><a class="header-anchor" href="#查看配置详情"><span>查看配置详情</span></a></h2><ul><li><code>git config -l </code></li></ul><h2 id="初始仓库" tabindex="-1"><a class="header-anchor" href="#初始仓库"><span>初始仓库</span></a></h2><ul><li><p><code>git init </code></p></li><li><p><code>git init --bare</code> --初始化一个共享仓库</p></li></ul><h2 id="查看当前仓库的状态" tabindex="-1"><a class="header-anchor" href="#查看当前仓库的状态"><span>查看当前仓库的状态</span></a></h2><ul><li><code>git status</code></li></ul><h2 id="添加文件到暂存区" tabindex="-1"><a class="header-anchor" href="#添加文件到暂存区"><span>添加文件到暂存区</span></a></h2><ul><li><p><code>git add *</code> --添加当前目录下的所有未排除的文件,或使用<code>git add --all</code></p></li><li><p><code>git add -u</code> --仅监控已经被add的文件或<code>git add --update</code></p></li><li><p><code>git add .</code> --提交不包括被删除的文件的修改</p></li></ul><h2 id="提交到本地仓库" tabindex="-1"><a class="header-anchor" href="#提交到本地仓库"><span>提交到本地仓库</span></a></h2><ul><li><code>git commit -m &#39;备注信息&#39;</code></li></ul><h2 id="查看本地仓库的提交历史" tabindex="-1"><a class="header-anchor" href="#查看本地仓库的提交历史"><span>查看本地仓库的提交历史</span></a></h2><ul><li><code>git log</code></li></ul><h2 id="克隆仓库" tabindex="-1"><a class="header-anchor" href="#克隆仓库"><span>克隆仓库</span></a></h2><ul><li><p><code>git clone 仓库地址</code> --克隆远程仓库的默认分支，可以是本地文件路径，也可以是远程地址</p></li><li><p><code>git clone https://github.com/../xxx.git -b 分支名称</code> --克隆远程仓库的指定分支</p></li><li><p><code>git clone https://github.com/../xxx.git 文件夹路径</code> --克隆远程仓库到指定文件夹</p></li></ul><h2 id="分支操作" tabindex="-1"><a class="header-anchor" href="#分支操作"><span>分支操作</span></a></h2><blockquote><p>命令中的origin为默认的主机别名</p></blockquote><h3 id="本地操作" tabindex="-1"><a class="header-anchor" href="#本地操作"><span>本地操作</span></a></h3><ul><li><p><code>git branch</code> --查看本地分支</p></li><li><p><code>git branch -a</code> --查看本地及远程分支</p></li><li><p><code>git branch 分支名称</code> --在本地创建一个新分支</p></li><li><p><code>git checkout 分支名称</code> --获取远程分支并切换到该分支</p></li><li><p><code>git checkout -b 分支名称</code> --获取远程分支,不存在则创建，并切换到该分支</p></li><li><p><code>git branch -d 分支名称</code> --删除本地分支</p></li><li><p><code>git branch -m 分支名称 新分支名称</code> --分支重命名</p></li></ul><h3 id="更新远程分支" tabindex="-1"><a class="header-anchor" href="#更新远程分支"><span>更新远程分支</span></a></h3><ul><li><p><code>git fetch</code> -- 更新本地仓库的所有分支，不合并到分支(通常用来查看其他人的进程)</p></li><li><p><code>git fetch orgin 分支名称</code> -- 更新本地仓库的指定分支，不合并到分支(通常用来查看其他人的进程)</p></li><li><p><code>git pull</code> --更新当前分支</p></li><li><p><code>git pull origin 远程分支:本地分支</code> --取回origin主机的远程分支，与指定本地分支合并</p></li></ul><h3 id="删除远程分支" tabindex="-1"><a class="header-anchor" href="#删除远程分支"><span>--删除远程分支</span></a></h3><ul><li><p><code>git push origin --delete 分支名称</code> --v1.7.0+</p></li><li><p><code>git push origin :分支名称</code> --删除远程分支,例：<code>git push origin :gh-pages</code>，意为将空白分支变成远程分支</p></li></ul><h3 id="重命名远程分支" tabindex="-1"><a class="header-anchor" href="#重命名远程分支"><span>--重命名远程分支</span></a></h3><ol><li><p><code>git push --delete origin 远程分支</code> -- 删除本地远程分支（github上需为非默认分支）</p></li><li><p><code>git branch -m 本地分支 新远程分支名</code> --重命名分支</p></li><li><p><code>git push orgin 新远程分支名</code> --推送本地分支</p></li></ol><h2 id="合并操作" tabindex="-1"><a class="header-anchor" href="#合并操作"><span>合并操作</span></a></h2><ul><li><code>git merge -b 分支名称</code> --合并当前分支到指定分支</li></ul><h2 id="推送" tabindex="-1"><a class="header-anchor" href="#推送"><span>推送</span></a></h2><blockquote><p>如果本地仓库分支名称==远程仓库分支名称,可直接使用 <code>git push</code></p></blockquote><ul><li><p><code>git push origin 本地分支名称:远程分支名称</code> --将本地分支推送至远程分支,远程分支不存在则自动创建</p></li><li><p><code>git remote add 主机别名 远程仓库地址</code> --添加远程主机，给远程主机起个别名，方便使用,默认的为origin</p></li><li><p><code>git remote</code> --查看已添加的远程主机</p></li><li><p><code>git remote show 主机别名</code> 可以查看远程主机的信息</p></li></ul><blockquote><p>总结一下，收获满满。</p></blockquote>',32)]))}const r=i(a,[["render",c],["__file","git_common_commands.html.vue"]]),g=JSON.parse('{"path":"/posts/developer/git_common_commands.html","title":"git常用命令记录","lang":"zh-CN","frontmatter":{"title":"git常用命令记录","date":"2017-05-21T23:54:00.000Z","category":["Developer"],"tag":["git","web开发"],"description":"配置本地仓库 git config --global user.name、git config --global user.email 查看配置详情 git config -l 初始仓库 git init git init --bare --初始化一个共享仓库 查看当前仓库的状态 git status 添加文件到暂存区 git add * --添加当前...","head":[["meta",{"property":"og:url","content":"https://www.yimo.link/posts/developer/git_common_commands.html"}],["meta",{"property":"og:site_name","content":"易墨网"}],["meta",{"property":"og:title","content":"git常用命令记录"}],["meta",{"property":"og:description","content":"配置本地仓库 git config --global user.name、git config --global user.email 查看配置详情 git config -l 初始仓库 git init git init --bare --初始化一个共享仓库 查看当前仓库的状态 git status 添加文件到暂存区 git add * --添加当前..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-10-28T11:15:42.000Z"}],["meta",{"property":"article:tag","content":"git"}],["meta",{"property":"article:tag","content":"web开发"}],["meta",{"property":"article:published_time","content":"2017-05-21T23:54:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-10-28T11:15:42.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"git常用命令记录\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2017-05-21T23:54:00.000Z\\",\\"dateModified\\":\\"2024-10-28T11:15:42.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"易墨\\",\\"url\\":\\"https://www.yimo.link\\"}]}"]]},"headers":[{"level":2,"title":"配置本地仓库","slug":"配置本地仓库","link":"#配置本地仓库","children":[]},{"level":2,"title":"查看配置详情","slug":"查看配置详情","link":"#查看配置详情","children":[]},{"level":2,"title":"初始仓库","slug":"初始仓库","link":"#初始仓库","children":[]},{"level":2,"title":"查看当前仓库的状态","slug":"查看当前仓库的状态","link":"#查看当前仓库的状态","children":[]},{"level":2,"title":"添加文件到暂存区","slug":"添加文件到暂存区","link":"#添加文件到暂存区","children":[]},{"level":2,"title":"提交到本地仓库","slug":"提交到本地仓库","link":"#提交到本地仓库","children":[]},{"level":2,"title":"查看本地仓库的提交历史","slug":"查看本地仓库的提交历史","link":"#查看本地仓库的提交历史","children":[]},{"level":2,"title":"克隆仓库","slug":"克隆仓库","link":"#克隆仓库","children":[]},{"level":2,"title":"分支操作","slug":"分支操作","link":"#分支操作","children":[{"level":3,"title":"本地操作","slug":"本地操作","link":"#本地操作","children":[]},{"level":3,"title":"更新远程分支","slug":"更新远程分支","link":"#更新远程分支","children":[]},{"level":3,"title":"--删除远程分支","slug":"删除远程分支","link":"#删除远程分支","children":[]},{"level":3,"title":"--重命名远程分支","slug":"重命名远程分支","link":"#重命名远程分支","children":[]}]},{"level":2,"title":"合并操作","slug":"合并操作","link":"#合并操作","children":[]},{"level":2,"title":"推送","slug":"推送","link":"#推送","children":[]}],"git":{"createdTime":1730114142000,"updatedTime":1730114142000,"contributors":[{"name":"yimo","email":"yimo@wikiglobal.com","commits":1}]},"readingTime":{"minutes":2.56,"words":767},"filePathRelative":"posts/developer/git_common_commands.md","localizedDate":"2017年5月21日","excerpt":"<h2>配置本地仓库</h2>\\n<ul>\\n<li><code>git config --global user.name、git config --global user.email</code></li>\\n</ul>\\n<h2>查看配置详情</h2>\\n<ul>\\n<li><code>git config -l </code></li>\\n</ul>\\n<h2>初始仓库</h2>\\n<ul>\\n<li>\\n<p><code>git init </code></p>\\n</li>\\n<li>\\n<p><code>git init --bare</code> --初始化一个共享仓库</p>\\n</li>\\n</ul>\\n<h2>查看当前仓库的状态</h2>","autoDesc":true}');export{r as comp,g as data};