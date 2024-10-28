import{_ as t}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as e,e as i,o as p}from"./app-BHZ56IUu.js";const o="/assets/662652-20170218104839613-682235498-DzUfDyl6.png",a="/assets/662652-20170218105008472-1501177044-COgo9Y4k.png",r={};function l(s,n){return p(),e("div",null,n[0]||(n[0]=[i('<p>使用Python生成多渠道包</p><hr><blockquote><p>往apk包中追加到一个空文件到META-INF目录以标识渠道，Android中获取此文件即可获得App的下载渠道</p></blockquote><ol><li><p>首先在info文件夹新建一个qdb.txt的空文本文件</p></li><li><p>新建channel.txt存放渠道来源</p><figure><img src="'+o+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure></li><li><p>运行Python代码即可将目录下的apk生成多渠道文件包</p><figure><img src="'+a+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure></li></ol><h2 id="python代码如下" tabindex="-1"><a class="header-anchor" href="#python代码如下"><span>Python代码如下：</span></a></h2><pre><code>    #!/usr/bin/python

    # coding=utf-8

    import zipfile

    import shutil

    import os



    # 空文件 便于写入此空文件到apk包中作为channel文件

    src_empty_file = &#39;info/qdb.txt&#39;

    # 创建一个空文件（不存在则创建）

    f = open(src_empty_file, &#39;w&#39;) 

    f.close()



    # 获取当前目录中所有的apk源包

    src_apks = []

    # python3 : os.listdir()即可，这里使用兼容Python2的os.listdir(&#39;.&#39;)

    for file in os.listdir(&#39;.&#39;):

        if os.path.isfile(file):

            extension = os.path.splitext(file)[1][1:]

            if extension in &#39;apk&#39;:

                src_apks.append(file)



    # 获取渠道列表

    channel_file = &#39;info/channel.txt&#39;

    f = open(channel_file)

    lines = f.readlines()

    f.close()



    for src_apk in src_apks:

        # file name (with extension)

        src_apk_file_name = os.path.basename(src_apk)

        # 分割文件名与后缀

        temp_list = os.path.splitext(src_apk_file_name)

        # name without extension

        src_apk_name = temp_list[0]

        # 后缀名，包含.   例如: &quot;.apk &quot;

        src_apk_extension = temp_list[1]

        

        # 创建生成目录,与文件名相关

        output_dir = &#39;output_&#39; + src_apk_name + &#39;/&#39;

        # 目录不存在则创建

        if not os.path.exists(output_dir):

            os.mkdir(output_dir)

            

        # 遍历渠道号并创建对应渠道号的apk文件

        for line in lines:

            # 获取当前渠道号，因为从渠道文件中获得带有\\n,所有strip一下

            target_channel = line.strip()

            # 拼接对应渠道号的apk

            target_apk = output_dir + src_apk_name + &quot;-&quot; + target_channel + src_apk_extension  

            # 拷贝建立新apk

            shutil.copy(src_apk,  target_apk)

            # zip获取新建立的apk文件

            zipped = zipfile.ZipFile(target_apk, &#39;a&#39;, zipfile.ZIP_DEFLATED)

            # 初始化渠道信息

            empty_channel_file = &quot;META-INF/qdb_{channel}&quot;.format(channel = target_channel)

            # 写入渠道信息

            zipped.write(src_empty_file, empty_channel_file)

            # 关闭zip流

            zipped.close()
</code></pre><h2 id="android中读取文件取得渠道id" tabindex="-1"><a class="header-anchor" href="#android中读取文件取得渠道id"><span>Android中读取文件取得渠道ID</span></a></h2><pre><code>    /** 获取渠道ID **/

        public String getChannelId() {

            Context context = cordova.getActivity().getApplicationContext();

            //从apk包中获取

            ApplicationInfo appinfo = context.getApplicationInfo();

            String sourceDir = appinfo.sourceDir;

            //默认放在meta-inf/里， 所以需要再拼接一下

            String key = &quot;META-INF/qdbchannel&quot;;

            String ret = &quot;&quot;;

            ZipFile zipfile = null;

            try {

                zipfile = new ZipFile(sourceDir);

                Enumeration&lt;?&gt; entries = zipfile.entries();

                while (entries.hasMoreElements()) {

                    ZipEntry entry = ((ZipEntry) entries.nextElement());

                    String entryName = entry.getName();

                    if (entryName.startsWith(key)) {

                        ret = entryName;

                        break;

                    }

                }

            } catch (IOException e) {

                e.printStackTrace();

            } finally {

                if (zipfile != null) {

                    try {

                        zipfile.close();

                    } catch (IOException e) {

                        e.printStackTrace();

                    }

                }

            }

            String[] split = ret.split(&quot;_&quot;);

            String channel = &quot;&quot;;

            if (split != null &amp;&amp; split.length &gt;= 2) {

                channel = ret.substring(split[0].length() + 1);

            }

            return channel;

        }
</code></pre><h3 id="附上查看apk内文件方法" tabindex="-1"><a class="header-anchor" href="#附上查看apk内文件方法"><span>附上查看apk内文件方法</span></a></h3><ol><li><p>新建一个压缩包</p></li><li><p>打开压缩包</p></li><li><p>在压缩包内回退双击进入apk文件即可</p></li></ol>`,10)]))}const h=t(r,[["render",l],["__file","python_build_android_apk.html.vue"]]),_=JSON.parse('{"path":"/posts/developer/python_build_android_apk.html","title":"使用Python多渠道打包apk","lang":"zh-CN","frontmatter":{"title":"使用Python多渠道打包apk","date":"2017-02-18T21:18:00.000Z","category":["Developer"],"tag":["Python"],"description":"使用Python生成多渠道包 往apk包中追加到一个空文件到META-INF目录以标识渠道，Android中获取此文件即可获得App的下载渠道 首先在info文件夹新建一个qdb.txt的空文本文件 新建channel.txt存放渠道来源 运行Python代码即可将目录下的apk生成多渠道文件包 Python代码如下： Android中读取文件取得渠道...","head":[["meta",{"property":"og:url","content":"https://www.yimo.link/posts/developer/python_build_android_apk.html"}],["meta",{"property":"og:site_name","content":"易墨网"}],["meta",{"property":"og:title","content":"使用Python多渠道打包apk"}],["meta",{"property":"og:description","content":"使用Python生成多渠道包 往apk包中追加到一个空文件到META-INF目录以标识渠道，Android中获取此文件即可获得App的下载渠道 首先在info文件夹新建一个qdb.txt的空文本文件 新建channel.txt存放渠道来源 运行Python代码即可将目录下的apk生成多渠道文件包 Python代码如下： Android中读取文件取得渠道..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-10-28T11:15:42.000Z"}],["meta",{"property":"article:tag","content":"Python"}],["meta",{"property":"article:published_time","content":"2017-02-18T21:18:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-10-28T11:15:42.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用Python多渠道打包apk\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2017-02-18T21:18:00.000Z\\",\\"dateModified\\":\\"2024-10-28T11:15:42.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"易墨\\",\\"url\\":\\"https://www.yimo.link\\"}]}"]]},"headers":[{"level":2,"title":"Python代码如下：","slug":"python代码如下","link":"#python代码如下","children":[]},{"level":2,"title":"Android中读取文件取得渠道ID","slug":"android中读取文件取得渠道id","link":"#android中读取文件取得渠道id","children":[{"level":3,"title":"附上查看apk内文件方法","slug":"附上查看apk内文件方法","link":"#附上查看apk内文件方法","children":[]}]}],"git":{"createdTime":1730114142000,"updatedTime":1730114142000,"contributors":[{"name":"yimo","email":"yimo@wikiglobal.com","commits":1}]},"readingTime":{"minutes":1.96,"words":587},"filePathRelative":"posts/developer/python_build_android_apk.md","localizedDate":"2017年2月18日","excerpt":"<p>使用Python生成多渠道包</p>\\n<hr>\\n<blockquote>\\n<p>往apk包中追加到一个空文件到META-INF目录以标识渠道，Android中获取此文件即可获得App的下载渠道</p>\\n</blockquote>\\n<ol>\\n<li>\\n<p>首先在info文件夹新建一个qdb.txt的空文本文件</p>\\n</li>\\n<li>\\n<p>新建channel.txt存放渠道来源</p>\\n<figure><figcaption></figcaption></figure>\\n</li>\\n<li>\\n<p>运行Python代码即可将目录下的apk生成多渠道文件包</p>\\n<figure><figcaption></figcaption></figure>\\n</li>\\n</ol>","autoDesc":true}');export{h as comp,_ as data};
