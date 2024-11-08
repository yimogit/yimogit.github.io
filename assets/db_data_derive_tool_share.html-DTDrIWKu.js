import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as e,e as o,o as l}from"./app-f_uNzTRF.js";const a="/assets/662652-20170703163425456-1755280588-BOg_Nj5Z.png",i="/assets/662652-20170703154605675-241795072-DqqKSB1_.png",r="/assets/662652-20170703154657940-1934319122-DRlRkocQ.png",s="/assets/662652-20170703154936019-1655719657-wIFf5rjB.png",c="/assets/662652-20170703182427253-1108288763-i7XScZHA.png",p="/assets/662652-20170704092826612-2098151036-HBa7T0_F.png",u="/assets/662652-20170704092837190-1992148601-B93h1obA.png",d={};function g(q,t){return l(),e("div",null,t[0]||(t[0]=[o('<blockquote><p>一个根据数据库链接字符串，sql语句 即可将结果集导出到Excel的工具 分享，支持sqlserver,mysql。</p></blockquote><h1 id="前因" tabindex="-1"><a class="header-anchor" href="#前因"><span>前因</span></a></h1><blockquote><p>一个月前朋友找到我，让我帮忙做一个根据sql导出查询结果到Excel的工具（之前帮他一个导入Excel然后按其规则统计数据的工具）。</p></blockquote><blockquote><p>然后扔了我一个SQL语句，瞬间懵比。卧槽。这么多列，我特么得定义这么属性，改了还得重新改程序（一直用EF）。</p></blockquote><blockquote><p>于是思考如何忽略列名，进而如何做到通用，做到于我有益，而不是简单的帮个忙。</p></blockquote><h1 id="如何完成这个需求" tabindex="-1"><a class="header-anchor" href="#如何完成这个需求"><span>如何完成这个需求</span></a></h1><blockquote><p>Q:程序中根据SQL查询出数据而不需要关注有哪些列？</p></blockquote><blockquote><p>A:将查询结果保存到DataTable中然后遍历</p></blockquote><blockquote><p>Q:如何将DataTable转换Excel？</p></blockquote><blockquote><p>A:一搜，一试，可用之</p></blockquote><blockquote><p>Q:如何保存到本地？</p></blockquote><blockquote><p>A:待我改改写日志的方法</p></blockquote><p>使用<a href="http://www.codeisbug.com/Doc/8" target="_blank" rel="noopener noreferrer"><code>SqlSugar 4.x</code></a> 进行数据操作</p><blockquote><p>SqlSugar 4.x是一款高性能（达到ADO.NET最高性能水平）、轻量级、支持多库和人性化语法的ORM，语法方便，入门简单，功能强大。</p></blockquote><blockquote><p>对数据库结构没太多要求，支持多主键，多自增列</p></blockquote><blockquote><p>SqlSugar支持sqlserver,mysql故此工具适用于此两者数据库</p></blockquote><h2 id="_0-创建项目-预览" tabindex="-1"><a class="header-anchor" href="#_0-创建项目-预览"><span>0. 创建项目-预览</span></a></h2><figure><img src="'+a+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="_1-到github仓库clone了源码至本地生成需要的dll-然后在项目中添加了引用" tabindex="-1"><a class="header-anchor" href="#_1-到github仓库clone了源码至本地生成需要的dll-然后在项目中添加了引用"><span>1. 到github仓库clone了源码至本地生成需要的dll，然后在项目中添加了引用</span></a></h2><figure><img src="'+i+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="'+r+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="_2-使用sqlsugar获取结果到datatable中-不知道是不是最近帮朋友写ado-net的代码写多了-感觉挺好" tabindex="-1"><a class="header-anchor" href="#_2-使用sqlsugar获取结果到datatable中-不知道是不是最近帮朋友写ado-net的代码写多了-感觉挺好"><span>2. 使用SqlSugar获取结果到DataTable中(不知道是不是最近帮朋友写ado.net的代码写多了，感觉挺好)</span></a></h2><figure><img src="'+s+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="_3-datatable转excel" tabindex="-1"><a class="header-anchor" href="#_3-datatable转excel"><span>3. DataTable转Excel</span></a></h2><pre><code>public class DataTableToExcel

{

    private DataTableToExcel()

    { }

    private static DataTableToExcel _instance = null;



    public static DataTableToExcel Instance

    {

        get

        {

            if (_instance == null) _instance = new DataTableToExcel();

            return _instance;

        }

    }

    /// &lt;summary&gt;

    /// DataTable通过流导出Excel

    /// &lt;/summary&gt;

    /// &lt;param name=&quot;ds&quot;&gt;数据源DataSet&lt;/param&gt;

    /// &lt;param name=&quot;columns&quot;&gt;DataTable中列对应的列名(可以是中文),若为null则取DataTable中的字段名&lt;/param&gt;

    /// &lt;param name=&quot;fileName&quot;&gt;保存文件名(例如：a.xls)&lt;/param&gt;

    /// &lt;returns&gt;&lt;/returns&gt;

    public string StreamExport(DataTable dt, string[] columns = null,string savePath=&quot;&quot;)

    {

        //if (dt.Rows.Count &gt; 65535) //总行数大于Excel的行数 

        //{

        //    throw new Exception(&quot;预导出的数据总行数大于excel的行数&quot;);

        //}



        StringBuilder content = new StringBuilder();

        content.Append(&quot;&lt;html xmlns:o=&#39;urn:schemas-microsoft-com:office:office&#39; xmlns:x=&#39;urn:schemas-microsoft-com:office:excel&#39; xmlns=&#39;http://www.w3.org/TR/REC-html40&#39;&gt;&quot;);

        content.Append(&quot;&lt;head&gt;&lt;title&gt;&lt;/title&gt;&lt;meta http-equiv=&#39;Content-Type&#39; content=\\&quot;text/html; charset=gb2312\\&quot;&gt;&quot;);

        //注意：[if gte mso 9]到[endif]之间的代码，用于显示Excel的网格线，若不想显示Excel的网格线，可以去掉此代码

        content.Append(&quot;&lt;!--[if gte mso 9]&gt;&quot;);

        content.Append(&quot;&lt;xml&gt;&quot;);

        content.Append(&quot; &lt;x:ExcelWorkbook&gt;&quot;);

        content.Append(&quot;  &lt;x:ExcelWorksheets&gt;&quot;);

        content.Append(&quot;   &lt;x:ExcelWorksheet&gt;&quot;);

        content.Append(&quot;    &lt;x:Name&gt;Sheet1&lt;/x:Name&gt;&quot;);

        content.Append(&quot;    &lt;x:WorksheetOptions&gt;&quot;);

        content.Append(&quot;      &lt;x:Print&gt;&quot;);

        content.Append(&quot;       &lt;x:ValidPrinterInfo /&gt;&quot;);

        content.Append(&quot;      &lt;/x:Print&gt;&quot;);

        content.Append(&quot;    &lt;/x:WorksheetOptions&gt;&quot;);

        content.Append(&quot;   &lt;/x:ExcelWorksheet&gt;&quot;);

        content.Append(&quot;  &lt;/x:ExcelWorksheets&gt;&quot;);

        content.Append(&quot;&lt;/x:ExcelWorkbook&gt;&quot;);

        content.Append(&quot;&lt;/xml&gt;&quot;);

        content.Append(&quot;&lt;![endif]--&gt;&quot;);

        content.Append(&quot;&lt;/head&gt;&lt;body&gt;&lt;table style=&#39;border-collapse:collapse;table-layout:fixed;&#39;&gt;&lt;tr&gt;&quot;);



        if (columns != null)

        {

            for (int i = 0; i &lt; columns.Length; i++)

            {

                if (columns[i] != null &amp;&amp; columns[i] != &quot;&quot;)

                {

                    content.Append(&quot;&lt;td&gt;&lt;b&gt;&quot; + columns[i] + &quot;&lt;/b&gt;&lt;/td&gt;&quot;);

                }

                else

                {

                    content.Append(&quot;&lt;td&gt;&lt;b&gt;&quot; + dt.Columns[i].ColumnName + &quot;&lt;/b&gt;&lt;/td&gt;&quot;);

                }

            }

        }

        else

        {

            for (int j = 0; j &lt; dt.Columns.Count; j++)

            {

                content.Append(&quot;&lt;td&gt;&lt;b&gt;&quot; + dt.Columns[j].ColumnName + &quot;&lt;/b&gt;&lt;/td&gt;&quot;);

            }

        }

        content.Append(&quot;&lt;/tr&gt;\\n&quot;);



        for (int j = 0; j &lt; dt.Rows.Count; j++)

        {

            content.Append(&quot;&lt;tr&gt;&quot;);

            for (int k = 0; k &lt; dt.Columns.Count; k++)

            {

                object obj = dt.Rows[j][k];

                Type type = obj.GetType();

                if (type.Name == &quot;Int32&quot; || type.Name == &quot;Single&quot; || type.Name == &quot;Double&quot; || type.Name == &quot;Decimal&quot;)

                {

                    double d = obj == DBNull.Value ? 0.0d : Convert.ToDouble(obj);

                    if (type.Name == &quot;Int32&quot; || (d - Math.Truncate(d) == 0))

                        content.AppendFormat(&quot;&lt;td style=&#39;vnd.ms-excel.numberformat:#,##0&#39;&gt;{0}&lt;/td&gt;&quot;, obj);

                    else

                        content.AppendFormat(&quot;&lt;td style=&#39;vnd.ms-excel.numberformat:#,##0.00&#39;&gt;{0}&lt;/td&gt;&quot;, obj);

                }

                else

                    content.AppendFormat(&quot;&lt;td style=&#39;vnd.ms-excel.numberformat:@&#39;&gt;{0}&lt;/td&gt;&quot;, obj);

            }

            content.Append(&quot;&lt;/tr&gt;\\n&quot;);

        }

        content.Append(&quot;&lt;/table&gt;&lt;/body&gt;&lt;/html&gt;&quot;);

        content.Replace(&quot;&amp;nbsp;&quot;, &quot;&quot;);

        using (var w = new StreamWriter(savePath, false, Encoding.UTF8))

        {

            w.WriteLine(content);

        }

        return savePath;

    }

}
</code></pre><h2 id="_4-使用ini文件保存输入" tabindex="-1"><a class="header-anchor" href="#_4-使用ini文件保存输入"><span>4. 使用Ini文件保存输入</span></a></h2><pre><code>public class IniHelper

{

    // 声明INI文件的写操作函数 WritePrivateProfileString()

    [System.Runtime.InteropServices.DllImport(&quot;kernel32&quot;)]

    private static extern long WritePrivateProfileString(string section, string key, string val, string filePath);



    // 声明INI文件的读操作函数 GetPrivateProfileString()

    [System.Runtime.InteropServices.DllImport(&quot;kernel32&quot;)]

    private static extern int GetPrivateProfileString(string section, string key, string def, System.Text.StringBuilder retVal, int size, string filePath);



    private int retLength = 500;

    private string sPath = null;

    public IniHelper(string path, int rl = 500)

    {

        this.sPath = path;

        if (rl &gt; 0)

        {

            this.retLength = rl;

        }

    }



    public void WriteValue(string key, string value, string section = &quot;Setting&quot;)

    {

        // section=配置节，key=键名，value=键值，path=路径

        WritePrivateProfileString(section, key, value, sPath);

    }



    public string ReadValue(string key, string section = &quot;Setting&quot;)

    {

        // 每次从ini中读取多少字节

        System.Text.StringBuilder temp = new System.Text.StringBuilder(retLength);

        // section=配置节，key=键名，temp=上面，path=路径

        GetPrivateProfileString(section, key, &quot;&quot;, temp, retLength, sPath);

        return temp.ToString();

    }

}
</code></pre><h2 id="_5-文本框全选功能" tabindex="-1"><a class="header-anchor" href="#_5-文本框全选功能"><span>5. 文本框全选功能</span></a></h2><pre><code>    public frmMain()

    {

      

        this.ControlAdded += new System.Windows.Forms.ControlEventHandler(this.Control_ControlAdded); //注册全选功能

        InitializeComponent();

    }

    #region 文本框能够使用Ctrl+A 全选功能

    private void Control_ControlAdded(object sender, ControlEventArgs e)

    {

        //使“未来”生效

        e.Control.ControlAdded += new System.Windows.Forms.ControlEventHandler(this.Control_ControlAdded);

        //使“子孙”生效

        foreach (Control c in e.Control.Controls)

        {

            Control_ControlAdded(sender, new ControlEventArgs(c));

        }

        //使“过去”生效

        TextBox textBox = e.Control as TextBox;

        if (textBox != null)

        {

            textBox.KeyPress += TextBox_KeyPress;

        }

    }

    private void TextBox_KeyPress(object sender, KeyPressEventArgs e)

    {

        TextBox textBox = sender as TextBox;

        if (textBox == null)

            return;

        if (e.KeyChar == (char)1)

        {

            textBox.SelectAll();

            e.Handled = true;

        }

    }

    #endregion
</code></pre><h2 id="_6-打开保存的excel" tabindex="-1"><a class="header-anchor" href="#_6-打开保存的excel"><span>6. 打开保存的excel</span></a></h2><pre><code>    private void btnOpenDir_Click(object sender, EventArgs e)

    {

        var txtFileName = this.txtFileName.Text;

        var txtExportDir = this.txtExportDir.Text;

        var openPath = Path.Combine(txtExportDir, txtFileName);

        if (File.Exists(openPath))

        {

            System.Diagnostics.Process.Start(openPath, &quot;c:\\\\windows&quot;);

        }

        else

        {

            AppendTipMsg(&quot;文件&quot; + openPath + &quot;不存在&quot;);

        }

    }
</code></pre><h2 id="_7-页面主要功能代码" tabindex="-1"><a class="header-anchor" href="#_7-页面主要功能代码"><span>7. 页面主要功能代码</span></a></h2><figure><img src="`+c+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="winform中使用多线程时给ui控件赋值" tabindex="-1"><a class="header-anchor" href="#winform中使用多线程时给ui控件赋值"><span>winform中使用多线程时给ui控件赋值</span></a></h3><pre><code>var txtThread = new Thread(() =&gt; txtMsg.BeginInvoke(new Action(() =&gt; txtMsg.AppendText(&quot;向文本框中追加内容&quot;))));   

txtThread.Start();
</code></pre><h2 id="_8-一些记录" tabindex="-1"><a class="header-anchor" href="#_8-一些记录"><span>8. 一些记录</span></a></h2><h3 id="winform中使用多线程时给ui控件赋值-1" tabindex="-1"><a class="header-anchor" href="#winform中使用多线程时给ui控件赋值-1"><span>winform中使用多线程时给ui控件赋值</span></a></h3><pre><code>var txtThread = new Thread(() =&gt; txtMsg.BeginInvoke(new Action(() =&gt; txtMsg.AppendText(&quot;向文本框中追加内容&quot;))));   

txtThread.Start();
</code></pre><p>源码中的NopI组件可移除，此工具实际未用到</p><p>开启线程执行导出的时候使用的是Task.Run(() =&gt;{});若将框架版本改为4.0则需要将此处修改为new Thread(() =&gt;{}).Start();</p><h3 id="整个过程解决了一下问题" tabindex="-1"><a class="header-anchor" href="#整个过程解决了一下问题"><span>整个过程解决了一下问题</span></a></h3><blockquote><ol start="0"><li>数据库查询（SqlSugar支持sqlserver,mysql）</li></ol></blockquote><blockquote><ol><li>datatable转excel文本</li></ol></blockquote><blockquote><ol start="2"><li>ini存取文件</li></ol></blockquote><blockquote><ol start="3"><li>winform文本框全选功能</li></ol></blockquote><blockquote><ol start="4"><li>winform中使用多线程时给ui控件赋值</li></ol></blockquote><h3 id="源码" tabindex="-1"><a class="header-anchor" href="#源码"><span>源码</span></a></h3><blockquote><p>下载使用：http://files.cnblogs.com/files/morang/DB数据导出工具.rar</p></blockquote><blockquote><p>源码下载：http://files.cnblogs.com/files/morang/DB数据导出工具_源码.rar</p></blockquote><blockquote><p>Coding地址：https://coding.net/u/yimocoding/p/WeDemo/git/tree/NopiExcelDemo</p></blockquote><blockquote><p>git克隆：<code>git clone https://git.coding.net/yimocoding/WeDemo.git -b NopiExcelDemo</code></p></blockquote><h3 id="使用说明" tabindex="-1"><a class="header-anchor" href="#使用说明"><span>使用说明</span></a></h3><figure><img src="`+p+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="'+u+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>',54)]))}const b=n(d,[["render",g],["__file","db_data_derive_tool_share.html.vue"]]),x=JSON.parse('{"path":"/posts/developer/db_data_derive_tool_share.html","title":"DB数据导出工具分享","lang":"zh-CN","frontmatter":{"title":"DB数据导出工具分享","date":"2017-07-03T18:58:00.000Z","category":["Developer"],"tag":["C#","winform"],"description":"一个根据数据库链接字符串，sql语句 即可将结果集导出到Excel的工具 分享，支持sqlserver,mysql。 前因 一个月前朋友找到我，让我帮忙做一个根据sql导出查询结果到Excel的工具（之前帮他一个导入Excel然后按其规则统计数据的工具）。 然后扔了我一个SQL语句，瞬间懵比。卧槽。这么多列，我特么得定义这么属性，改了还得重新改程序（一...","head":[["meta",{"property":"og:url","content":"https://www.yimo.link/posts/developer/db_data_derive_tool_share.html"}],["meta",{"property":"og:site_name","content":"易墨网"}],["meta",{"property":"og:title","content":"DB数据导出工具分享"}],["meta",{"property":"og:description","content":"一个根据数据库链接字符串，sql语句 即可将结果集导出到Excel的工具 分享，支持sqlserver,mysql。 前因 一个月前朋友找到我，让我帮忙做一个根据sql导出查询结果到Excel的工具（之前帮他一个导入Excel然后按其规则统计数据的工具）。 然后扔了我一个SQL语句，瞬间懵比。卧槽。这么多列，我特么得定义这么属性，改了还得重新改程序（一..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-10-28T11:15:42.000Z"}],["meta",{"property":"article:tag","content":"C#"}],["meta",{"property":"article:tag","content":"winform"}],["meta",{"property":"article:published_time","content":"2017-07-03T18:58:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-10-28T11:15:42.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"DB数据导出工具分享\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2017-07-03T18:58:00.000Z\\",\\"dateModified\\":\\"2024-10-28T11:15:42.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"易墨\\",\\"url\\":\\"https://www.yimo.link\\"}]}"]]},"headers":[{"level":2,"title":"0. 创建项目-预览","slug":"_0-创建项目-预览","link":"#_0-创建项目-预览","children":[]},{"level":2,"title":"1. 到github仓库clone了源码至本地生成需要的dll，然后在项目中添加了引用","slug":"_1-到github仓库clone了源码至本地生成需要的dll-然后在项目中添加了引用","link":"#_1-到github仓库clone了源码至本地生成需要的dll-然后在项目中添加了引用","children":[]},{"level":2,"title":"2. 使用SqlSugar获取结果到DataTable中(不知道是不是最近帮朋友写ado.net的代码写多了，感觉挺好)","slug":"_2-使用sqlsugar获取结果到datatable中-不知道是不是最近帮朋友写ado-net的代码写多了-感觉挺好","link":"#_2-使用sqlsugar获取结果到datatable中-不知道是不是最近帮朋友写ado-net的代码写多了-感觉挺好","children":[]},{"level":2,"title":"3. DataTable转Excel","slug":"_3-datatable转excel","link":"#_3-datatable转excel","children":[]},{"level":2,"title":"4. 使用Ini文件保存输入","slug":"_4-使用ini文件保存输入","link":"#_4-使用ini文件保存输入","children":[]},{"level":2,"title":"5. 文本框全选功能","slug":"_5-文本框全选功能","link":"#_5-文本框全选功能","children":[]},{"level":2,"title":"6. 打开保存的excel","slug":"_6-打开保存的excel","link":"#_6-打开保存的excel","children":[]},{"level":2,"title":"7. 页面主要功能代码","slug":"_7-页面主要功能代码","link":"#_7-页面主要功能代码","children":[{"level":3,"title":"winform中使用多线程时给ui控件赋值","slug":"winform中使用多线程时给ui控件赋值","link":"#winform中使用多线程时给ui控件赋值","children":[]}]},{"level":2,"title":"8. 一些记录","slug":"_8-一些记录","link":"#_8-一些记录","children":[{"level":3,"title":"winform中使用多线程时给ui控件赋值","slug":"winform中使用多线程时给ui控件赋值-1","link":"#winform中使用多线程时给ui控件赋值-1","children":[]},{"level":3,"title":"整个过程解决了一下问题","slug":"整个过程解决了一下问题","link":"#整个过程解决了一下问题","children":[]},{"level":3,"title":"源码","slug":"源码","link":"#源码","children":[]},{"level":3,"title":"使用说明","slug":"使用说明","link":"#使用说明","children":[]}]}],"git":{"createdTime":1730114142000,"updatedTime":1730114142000,"contributors":[{"name":"yimo","email":"yimo@wikiglobal.com","commits":1}]},"readingTime":{"minutes":4.79,"words":1438},"filePathRelative":"posts/developer/db_data_derive_tool_share.md","localizedDate":"2017年7月3日","excerpt":"<blockquote>\\n<p>一个根据数据库链接字符串，sql语句 即可将结果集导出到Excel的工具 分享，支持sqlserver,mysql。</p>\\n</blockquote>\\n<h1>前因</h1>\\n<blockquote>\\n<p>一个月前朋友找到我，让我帮忙做一个根据sql导出查询结果到Excel的工具（之前帮他一个导入Excel然后按其规则统计数据的工具）。</p>\\n</blockquote>\\n<blockquote>\\n<p>然后扔了我一个SQL语句，瞬间懵比。卧槽。这么多列，我特么得定义这么属性，改了还得重新改程序（一直用EF）。</p>\\n</blockquote>\\n<blockquote>\\n<p>于是思考如何忽略列名，进而如何做到通用，做到于我有益，而不是简单的帮个忙。</p>\\n</blockquote>","autoDesc":true}');export{b as comp,x as data};
