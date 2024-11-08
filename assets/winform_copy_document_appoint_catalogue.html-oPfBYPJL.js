import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as o,e as t,a as i,o as l}from"./app-s030diJy.js";const r={};function a(p,e){return l(),o("div",null,[e[0]||(e[0]=t(`<h2 id="执行步骤" tabindex="-1"><a class="header-anchor" href="#执行步骤"><span>执行步骤</span></a></h2><blockquote><ol><li>弹出选择对话框：<code>var openFileDialog = new OpenFileDialog();</code></li></ol></blockquote><blockquote><ol start="2"><li>设置选择内容,如所有图片:<code>openFileDialog.Filter=&quot;图像文件 (*.bmp;*.ico;*.gif;*.jpeg;*.jpg;*.png)|*.bmp;*.ico;*.gif;*.jpeg;*.jpg;*.png&quot;;</code></li></ol></blockquote><blockquote><ol start="3"><li>获取选择的路径集合：<code>openFileDialog.FileNames</code></li></ol></blockquote><blockquote><ol start="4"><li>复制文件:<code>File.Copy(sourcePath,targetPath);//目录重命名见下面代码</code></li></ol></blockquote><h2 id="_1-打开图片选择对话框" tabindex="-1"><a class="header-anchor" href="#_1-打开图片选择对话框"><span>1. 打开图片选择对话框</span></a></h2><blockquote><p>默认为多选，返回选择的文件路径集合，可使用<code>FirstOrDefault()</code>方法判断是否选择了文件</p></blockquote><pre><code>//打开文件对话框并获取选择的文件

private List&lt;string&gt; OpenImagesDialog(bool isMulti = true)

{

    var openFileDialog = new OpenFileDialog();

    const string imgExts = &quot;图像文件 (*.bmp;*.ico;*.gif;*.jpeg;*.jpg;*.png)|*.bmp;*.ico;*.gif;*.jpeg;*.jpg;*.png&quot;;

    openFileDialog.Filter = imgExts;//可选择的文件格式 (|之前为显示，之后为控制后缀显示)

    openFileDialog.Multiselect = isMulti;//多选设置

    openFileDialog.RestoreDirectory = true;

    openFileDialog.FilterIndex = 1;

    var result = new List&lt;string&gt;();

    if (openFileDialog.ShowDialog() == DialogResult.OK)

    {

        result.AddRange(openFileDialog.FileNames);

    }

    return result;

}
</code></pre>`,8)),i("more"),e[1]||(e[1]=t(`<h2 id="_2-复制文件到指定目录" tabindex="-1"><a class="header-anchor" href="#_2-复制文件到指定目录"><span>2.复制文件到指定目录</span></a></h2><blockquote><p>将传递的文件复制到指定目录并以Guid重命名，目录不存在则自动创建</p></blockquote><blockquote><p>使用元组返回对应路径键值对(Item1)及失败路径集合(Item2)</p></blockquote><pre><code>  /// &lt;summary&gt;

  /// 复制文件到指定目录并重命名

  /// &lt;/summary&gt;

  /// &lt;param name=&quot;sourcePaths&quot;&gt;要复制的文件路径集合&lt;/param&gt;

  /// &lt;param name=&quot;targetDir&quot;&gt;目标目录&lt;/param&gt;

  /// &lt;returns&gt;Item1:对应路径，Item2:失败文件路径&lt;/returns&gt;

  public static Tuple&lt;Dictionary&lt;string, string&gt;, List&lt;string&gt;&gt; CopyFileToDir(List&lt;string&gt; sourcePaths, string targetDir)

  {

      if (!Directory.Exists(targetDir))

      {

          Directory.CreateDirectory(targetDir);

      }

      var errorFiles = new List&lt;string&gt;();

      var saveDirs = new Dictionary&lt;string, string&gt;();

      sourcePaths.ForEach(item =&gt;

      {

          //路径不存在或者路径已存在则失败

          if (!File.Exists(item) || saveDirs.ContainsKey(item))

          {

              errorFiles.Add(item);

          }

          else

          {

              var saveName = Guid.NewGuid() + Path.GetExtension(item);

              var savePath = Path.Combine(targetDir, saveName);

              File.Copy(item, savePath);

              saveDirs.Add(item, savePath);

          }

      });

      var result = new Tuple&lt;Dictionary&lt;string, string&gt;, List&lt;string&gt;&gt;(saveDirs, errorFiles);

      return result;

  }
</code></pre><h2 id="调用示例-appendlogmsg-为追加日志方法" tabindex="-1"><a class="header-anchor" href="#调用示例-appendlogmsg-为追加日志方法"><span>调用示例 ( AppendLogMsg 为追加日志方法)</span></a></h2><pre><code>  var selectImgs = OpenImagesDialog(true);//打开文件对话框并获取选择的所有文件

  var result = FileHelper.CopyFileToDir(selectImgs, txtSaveDir.Text);

  //result.Item1 [{源文件路径:目标路径}]

  //result.Item2 [失败路径1,失败路径2]
</code></pre>`,6))])}const c=n(r,[["render",a],["__file","winform_copy_document_appoint_catalogue.html.vue"]]),m=JSON.parse('{"path":"/posts/developer/winform_copy_document_appoint_catalogue.html","title":"winform复制文件到指定目录","lang":"zh-CN","frontmatter":{"title":"winform复制文件到指定目录","date":"2017-07-05T12:18:00.000Z","category":["Developer"],"tag":["winform","C#"],"description":"执行步骤 弹出选择对话框：var openFileDialog = new OpenFileDialog(); 设置选择内容,如所有图片:openFileDialog.Filter=\\"图像文件 (*.bmp;*.ico;*.gif;*.jpeg;*.jpg;*.png)|*.bmp;*.ico;*.gif;*.jpeg;*.jpg;*.png\\"; 获取...","head":[["meta",{"property":"og:url","content":"https://www.yimo.link/posts/developer/winform_copy_document_appoint_catalogue.html"}],["meta",{"property":"og:site_name","content":"易墨网"}],["meta",{"property":"og:title","content":"winform复制文件到指定目录"}],["meta",{"property":"og:description","content":"执行步骤 弹出选择对话框：var openFileDialog = new OpenFileDialog(); 设置选择内容,如所有图片:openFileDialog.Filter=\\"图像文件 (*.bmp;*.ico;*.gif;*.jpeg;*.jpg;*.png)|*.bmp;*.ico;*.gif;*.jpeg;*.jpg;*.png\\"; 获取..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-10-28T11:15:42.000Z"}],["meta",{"property":"article:tag","content":"winform"}],["meta",{"property":"article:tag","content":"C#"}],["meta",{"property":"article:published_time","content":"2017-07-05T12:18:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-10-28T11:15:42.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"winform复制文件到指定目录\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2017-07-05T12:18:00.000Z\\",\\"dateModified\\":\\"2024-10-28T11:15:42.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"易墨\\",\\"url\\":\\"https://www.yimo.link\\"}]}"]]},"headers":[{"level":2,"title":"执行步骤","slug":"执行步骤","link":"#执行步骤","children":[]},{"level":2,"title":"1. 打开图片选择对话框","slug":"_1-打开图片选择对话框","link":"#_1-打开图片选择对话框","children":[]},{"level":2,"title":"2.复制文件到指定目录","slug":"_2-复制文件到指定目录","link":"#_2-复制文件到指定目录","children":[]},{"level":2,"title":"调用示例 ( AppendLogMsg 为追加日志方法)","slug":"调用示例-appendlogmsg-为追加日志方法","link":"#调用示例-appendlogmsg-为追加日志方法","children":[]}],"git":{"createdTime":1730114142000,"updatedTime":1730114142000,"contributors":[{"name":"yimo","email":"yimo@wikiglobal.com","commits":1}]},"readingTime":{"minutes":1.66,"words":497},"filePathRelative":"posts/developer/winform_copy_document_appoint_catalogue.md","localizedDate":"2017年7月5日","excerpt":"<h2>执行步骤</h2>\\n<blockquote>\\n<ol>\\n<li>弹出选择对话框：<code>var openFileDialog = new OpenFileDialog();</code></li>\\n</ol>\\n</blockquote>\\n<blockquote>\\n<ol start=\\"2\\">\\n<li>设置选择内容,如所有图片:<code>openFileDialog.Filter=\\"图像文件 (*.bmp;*.ico;*.gif;*.jpeg;*.jpg;*.png)|*.bmp;*.ico;*.gif;*.jpeg;*.jpg;*.png\\";</code></li>\\n</ol>\\n</blockquote>","autoDesc":true}');export{c as comp,m as data};
