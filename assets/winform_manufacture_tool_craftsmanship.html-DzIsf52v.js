import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as i,b as e,a as r,e as o,o as a}from"./app-f_uNzTRF.js";const l={};function s(g,t){return a(),i("div",null,[t[0]||(t[0]=e("p",null,"在使用winfrom制作一些工具的时候，一些基本设置都是去属性里面找来找去，一段时间就忘了，记录记录以备不时之需。",-1)),t[1]||(t[1]=e("h2",{id:"一、窗体绘制的常用设置",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#一、窗体绘制的常用设置"},[e("span",null,"一、窗体绘制的常用设置")])],-1)),t[2]||(t[2]=e("blockquote",null,[e("p",null,"窗体的设置应当在窗体构造函数中InitializeComponent()方法前执行")],-1)),t[3]||(t[3]=e("pre",null,[e("code",null,`    public frmMain()
    {
        this.StartPosition = FormStartPosition.CenterScreen;//窗体居中显示  
        this.MaximizeBox = false;//不显示最大化按钮 
        this.FormBorderStyle = FormBorderStyle.FixedSingle;//禁止放大缩小 
        InitializeComponent();
    }
`)],-1)),r("more"),t[4]||(t[4]=o(`<h2 id="二、winform文本框全选功能" tabindex="-1"><a class="header-anchor" href="#二、winform文本框全选功能"><span>二、winform文本框全选功能</span></a></h2><blockquote><p>Control_ControlAdded事件在InitializeComponent()调用之前注册</p></blockquote><pre><code>    public frmMain()
    {
        this.ControlAdded += new System.Windows.Forms.ControlEventHandler(this.Control_ControlAdded);
        InitializeComponent();
    }
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
</code></pre><h2 id="三、设置一个显示日志的文本框" tabindex="-1"><a class="header-anchor" href="#三、设置一个显示日志的文本框"><span>三、设置一个显示日志的文本框</span></a></h2><blockquote><p>首先在页面中放置一个文本框，设置Multiline=true后拖动到合适大小 然后在加载事件中进行设置</p></blockquote><pre><code>private static int _maxLogmsgTextLength = 10000;//日志框最大输入
private void frmMain_Load(object sender, EventArgs e)
{
    this.txtLogMsg.Multiline = true;//多选， 一般在界面中就设置了
    this.txtLogMsg.ScrollBars = ScrollBars.Vertical;//日志输出显示纵向滚动条
    this.txtLogMsg.ReadOnly = true; //输出日志只读
    this.txtLogMsg.TextChanged += txtLogMsg_TextChanged;//注册改变事件
    int.TryParse(System.Configuration.ConfigurationManager.AppSettings[&quot;MAX_LOGMSG_TEXT_LENGTH&quot;], out _maxLogmsgTextLength);//优先使用配置文件配置的值
}
//文本框事件 使追加日志后滚动光标到末尾
void txtLogMsg_TextChanged(object sender, EventArgs e)
{
    if (txtLogMsg.Text.Length &gt; _maxLogmsgTextLength)
    {
       txtLogMsg.Text = txtLogMsg.Text.Substring(_maxLogmsgTextLength / 2);
    }
    txtLogMsg.SelectionStart = txtLogMsg.Text.Length + 10;//设置选中文字的开始位置为文本框的文字的长度，如果超过了文本长度，则默认为文本的最后。
    txtLogMsg.SelectionLength = 0;//设置被选中文字的长度为0（将光标移动到文字最后）
    txtLogMsg.ScrollToCaret();//将滚动条移动到光标位置
}
//追加日志方法 在非UI线程中直接AppendText调试会异常
private void AppendLogMsg(string msg)
{
    //在UI线程中执行
    txtLogMsg.BeginInvoke(new Action(() =&gt;
    {
        txtLogMsg.AppendText(msg);
        txtLogMsg.AppendText(Environment.NewLine);//追加换行符
    }));
}
</code></pre><h2 id="四、开启一个线程执行任务" tabindex="-1"><a class="header-anchor" href="#四、开启一个线程执行任务"><span>四、开启一个线程执行任务</span></a></h2><blockquote><p>避免界面卡死</p></blockquote><pre><code>var askThread=new Thread(() =&gt;
{
  //TODO
  //AppendLogMsg(&quot;添加日志,调试时不会报错~~~&quot;);
}
askThread.Start();
//.NET Framework 4.5+
//Task.Run(()=&gt;{
//  //TODO
//})
</code></pre><h2 id="五、打开图片选择对话框" tabindex="-1"><a class="header-anchor" href="#五、打开图片选择对话框"><span>五、打开图片选择对话框</span></a></h2><blockquote><p>默认为多选，返回选择的文件路径集合，可使用<code>FirstOrDefault()</code>方法判断是否选择了文件</p></blockquote><pre><code>private List&lt;string&gt; OpenImagesDialog(bool isMulti = true)
{
    var openFileDialog = new OpenFileDialog();
    const string imgExts = &quot;图像文件 (*.bmp;*.ico;*.gif;*.jpeg;*.jpg;*.png)|*.bmp;*.ico;*.gif;*.jpeg;*.jpg;*.png&quot;;
    openFileDialog.Filter = imgExts;
    openFileDialog.Multiselect = isMulti;
    openFileDialog.RestoreDirectory = true;
    openFileDialog.FilterIndex = 1;
    var result = new List&lt;string&gt;();
    if (openFileDialog.ShowDialog() == DialogResult.OK)
    {
        result.AddRange(openFileDialog.FileNames);
    }
    return result;
}
</code></pre><h2 id="六、复制文件到指定目录" tabindex="-1"><a class="header-anchor" href="#六、复制文件到指定目录"><span>六、复制文件到指定目录</span></a></h2><blockquote><p>将传递的文件复制到指定目录并以Guid重命名，目录不存在则自动创建<br> 使用元组返回对应路径键值对(Item1)及失败路径集合(Item2)</p></blockquote><pre><code>/// &lt;summary&gt;
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
</code></pre><blockquote><p>调用示例 ( AppendLogMsg 为追加日志方法)</p></blockquote><pre><code>var selectImgs = OpenImagesDialog(true);//五、打开图片选择对话框方法
var result = FileHelper.CopyFileToDir(selectImgs, txtSaveDir.Text);
result.Item1.Keys.ToList().ForEach(item =&gt; AppendLogMsg(item + &quot;:&quot; + result.Item1[item]));//成功时输出
result.Item2.ForEach(item =&gt; AppendLogMsg(&quot;文件复制失败：&quot; + item));//文件错误输出
</code></pre><h2 id="七、使用ini文件存取配置" tabindex="-1"><a class="header-anchor" href="#七、使用ini文件存取配置"><span>七、使用Ini文件存取配置</span></a></h2><blockquote><p>保存一些配置到ini文件，是自己的工具更佳灵活</p></blockquote><h3 id="ini操作类" tabindex="-1"><a class="header-anchor" href="#ini操作类"><span>ini操作类</span></a></h3><pre><code>public class IniHelper
{
    // 声明INI文件的写操作函数 WritePrivateProfileString()
    [System.Runtime.InteropServices.DllImport(&quot;kernel32&quot;)]
    private static extern long WritePrivateProfileString(string section, string key, string val, string filePath);

    // 声明INI文件的读操作函数 GetPrivateProfileString()
    [System.Runtime.InteropServices.DllImport(&quot;kernel32&quot;)]
    private static extern int GetPrivateProfileString(string section, string key, string def, System.Text.StringBuilder retVal, int size, string filePath);

    private readonly int _retLength = 500;
    private readonly string _sPath = null;
    /// &lt;summary&gt;
    /// 初始化IniHelper
    /// &lt;/summary&gt;
    /// &lt;param name=&quot;path&quot;&gt;ini文件保存路径&lt;/param&gt;
    /// &lt;param name=&quot;rl&quot;&gt;默认500&lt;/param&gt;
    public IniHelper(string path, int? rl = null)
    {
        this._sPath = path;
        this._retLength = rl.HasValue ? rl.Value : _retLength;
    }
    /// &lt;summary&gt;
    /// 设置Ini配置，默认配置节为Setting
    /// &lt;/summary&gt;
    /// &lt;param name=&quot;key&quot;&gt;键名&lt;/param&gt;
    /// &lt;param name=&quot;value&quot;&gt;键值&lt;/param&gt;
    /// &lt;param name=&quot;section&quot;&gt;配置节&lt;/param&gt;
    public void WriteValue(string key, string value, string section = &quot;Setting&quot;)
    {
        // section=配置节，key=键名，value=键值，path=路径
        WritePrivateProfileString(section, key, value, _sPath);
    }
    /// &lt;summary&gt;
    /// 根据键名节点读取Ini配置，默认节点为Setting
    /// &lt;/summary&gt;
    /// &lt;param name=&quot;key&quot;&gt;键名&lt;/param&gt;
    /// &lt;param name=&quot;section&quot;&gt;配置节&lt;/param&gt;
    /// &lt;returns&gt;&lt;/returns&gt;
    public string ReadValue(string key, string section = &quot;Setting&quot;)
    {
        // 每次从ini中读取多少字节
        System.Text.StringBuilder temp = new System.Text.StringBuilder(_retLength);
        // section=配置节，key=键名，temp=上面，path=路径
        GetPrivateProfileString(section, key, &quot;&quot;, temp, _retLength, _sPath);
        return temp.ToString();
    }
}
</code></pre><h3 id="inihelper使用示例" tabindex="-1"><a class="header-anchor" href="#inihelper使用示例"><span>IniHelper使用示例</span></a></h3><pre><code>string savePath = AppDomain.CurrentDomain.BaseDirectory + &quot;config.ini&quot;;
IniHelper _iniHelper = new IniHelper(savePath);//初始化
_iniHelper.WriteValue(&quot;txtGitAddress&quot;);//写入
_iniHelper.ReadValue(&quot;txtGitAddress&quot;);//读取
</code></pre><h2 id="其他" tabindex="-1"><a class="header-anchor" href="#其他"><span>其他</span></a></h2><blockquote><p>调用本地程序：<code>System.Diagnostics.Process.Start(&quot;E:\\\\程序.exe&quot;, &quot;c:\\\\windows&quot;);</code> 打开目录：<code>System.Diagnostics.Process.Start(&quot;Explorer.exe&quot;, “目录路径E:\\abc\\”);</code></p></blockquote><h2 id="工具示例" tabindex="-1"><a class="header-anchor" href="#工具示例"><span>工具示例</span></a></h2><blockquote><p>Coding :<a href="https://coding.net/u/yimocoding/p/ImgsDownloadClient/git" target="_blank" rel="noopener noreferrer">https://coding.net/u/yimocoding/p/ImgsDownloadClient/git</a><br> Github :<a href="https://github.com/yimogit/ImgsDownloadClient" target="_blank" rel="noopener noreferrer">https://github.com/yimogit/ImgsDownloadClient</a></p></blockquote>`,27))])}const d=n(l,[["render",s],["__file","winform_manufacture_tool_craftsmanship.html.vue"]]),u=JSON.parse('{"path":"/posts/developer/winform_manufacture_tool_craftsmanship.html","title":"winform制作小工具的技巧","lang":"zh-CN","frontmatter":{"title":"winform制作小工具的技巧","date":"2017-07-07T11:59:00.000Z","category":["Developer"],"tag":["winform","C#"],"description":"在使用winfrom制作一些工具的时候，一些基本设置都是去属性里面找来找去，一段时间就忘了，记录记录以备不时之需。 一、窗体绘制的常用设置 窗体的设置应当在窗体构造函数中InitializeComponent()方法前执行 二、winform文本框全选功能 Control_ControlAdded事件在InitializeComponent()调用之前...","head":[["meta",{"property":"og:url","content":"https://www.yimo.link/posts/developer/winform_manufacture_tool_craftsmanship.html"}],["meta",{"property":"og:site_name","content":"易墨网"}],["meta",{"property":"og:title","content":"winform制作小工具的技巧"}],["meta",{"property":"og:description","content":"在使用winfrom制作一些工具的时候，一些基本设置都是去属性里面找来找去，一段时间就忘了，记录记录以备不时之需。 一、窗体绘制的常用设置 窗体的设置应当在窗体构造函数中InitializeComponent()方法前执行 二、winform文本框全选功能 Control_ControlAdded事件在InitializeComponent()调用之前..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-10-28T11:15:42.000Z"}],["meta",{"property":"article:tag","content":"winform"}],["meta",{"property":"article:tag","content":"C#"}],["meta",{"property":"article:published_time","content":"2017-07-07T11:59:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-10-28T11:15:42.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"winform制作小工具的技巧\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2017-07-07T11:59:00.000Z\\",\\"dateModified\\":\\"2024-10-28T11:15:42.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"易墨\\",\\"url\\":\\"https://www.yimo.link\\"}]}"]]},"headers":[{"level":2,"title":"一、窗体绘制的常用设置","slug":"一、窗体绘制的常用设置","link":"#一、窗体绘制的常用设置","children":[]},{"level":2,"title":"二、winform文本框全选功能","slug":"二、winform文本框全选功能","link":"#二、winform文本框全选功能","children":[]},{"level":2,"title":"三、设置一个显示日志的文本框","slug":"三、设置一个显示日志的文本框","link":"#三、设置一个显示日志的文本框","children":[]},{"level":2,"title":"四、开启一个线程执行任务","slug":"四、开启一个线程执行任务","link":"#四、开启一个线程执行任务","children":[]},{"level":2,"title":"五、打开图片选择对话框","slug":"五、打开图片选择对话框","link":"#五、打开图片选择对话框","children":[]},{"level":2,"title":"六、复制文件到指定目录","slug":"六、复制文件到指定目录","link":"#六、复制文件到指定目录","children":[]},{"level":2,"title":"七、使用Ini文件存取配置","slug":"七、使用ini文件存取配置","link":"#七、使用ini文件存取配置","children":[{"level":3,"title":"ini操作类","slug":"ini操作类","link":"#ini操作类","children":[]},{"level":3,"title":"IniHelper使用示例","slug":"inihelper使用示例","link":"#inihelper使用示例","children":[]}]},{"level":2,"title":"其他","slug":"其他","link":"#其他","children":[]},{"level":2,"title":"工具示例","slug":"工具示例","link":"#工具示例","children":[]}],"git":{"createdTime":1730114142000,"updatedTime":1730114142000,"contributors":[{"name":"yimo","email":"yimo@wikiglobal.com","commits":1}]},"readingTime":{"minutes":4.34,"words":1301},"filePathRelative":"posts/developer/winform_manufacture_tool_craftsmanship.md","localizedDate":"2017年7月7日","excerpt":"<p>在使用winfrom制作一些工具的时候，一些基本设置都是去属性里面找来找去，一段时间就忘了，记录记录以备不时之需。</p>\\n<h2>一、窗体绘制的常用设置</h2>\\n<blockquote>\\n<p>窗体的设置应当在窗体构造函数中InitializeComponent()方法前执行</p>\\n</blockquote>\\n<pre><code>    public frmMain()\\n    {\\n        this.StartPosition = FormStartPosition.CenterScreen;//窗体居中显示  \\n        this.MaximizeBox = false;//不显示最大化按钮 \\n        this.FormBorderStyle = FormBorderStyle.FixedSingle;//禁止放大缩小 \\n        InitializeComponent();\\n    }\\n</code></pre>","autoDesc":true}');export{d as comp,u as data};
