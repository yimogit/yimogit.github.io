---
title: winform制作小工具的技巧
date: 2017-07-07 11:59:00
category:
  - Developer
tag:
  - winform
  - C#
---

在使用winfrom制作一些工具的时候，一些基本设置都是去属性里面找来找去，一段时间就忘了，记录记录以备不时之需。
## 一、窗体绘制的常用设置
> 窗体的设置应当在窗体构造函数中InitializeComponent()方法前执行

        public frmMain()
        {
            this.StartPosition = FormStartPosition.CenterScreen;//窗体居中显示  
            this.MaximizeBox = false;//不显示最大化按钮 
            this.FormBorderStyle = FormBorderStyle.FixedSingle;//禁止放大缩小 
            InitializeComponent();
        }
<!--more-->
## 二、winform文本框全选功能
>Control_ControlAdded事件在InitializeComponent()调用之前注册

        public frmMain()
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

## 三、设置一个显示日志的文本框
>首先在页面中放置一个文本框，设置Multiline=true后拖动到合适大小
然后在加载事件中进行设置

    private static int _maxLogmsgTextLength = 10000;//日志框最大输入
    private void frmMain_Load(object sender, EventArgs e)
    {
        this.txtLogMsg.Multiline = true;//多选， 一般在界面中就设置了
        this.txtLogMsg.ScrollBars = ScrollBars.Vertical;//日志输出显示纵向滚动条
        this.txtLogMsg.ReadOnly = true; //输出日志只读
        this.txtLogMsg.TextChanged += txtLogMsg_TextChanged;//注册改变事件
        int.TryParse(System.Configuration.ConfigurationManager.AppSettings["MAX_LOGMSG_TEXT_LENGTH"], out _maxLogmsgTextLength);//优先使用配置文件配置的值
    }
    //文本框事件 使追加日志后滚动光标到末尾
    void txtLogMsg_TextChanged(object sender, EventArgs e)
    {
        if (txtLogMsg.Text.Length > _maxLogmsgTextLength)
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
        txtLogMsg.BeginInvoke(new Action(() =>
        {
            txtLogMsg.AppendText(msg);
            txtLogMsg.AppendText(Environment.NewLine);//追加换行符
        }));
    }

## 四、开启一个线程执行任务
> 避免界面卡死

    var askThread=new Thread(() =>
    {
      //TODO
      //AppendLogMsg("添加日志,调试时不会报错~~~");
    }
    askThread.Start();
    //.NET Framework 4.5+
    //Task.Run(()=>{
    //  //TODO
    //})

## 五、打开图片选择对话框
> 默认为多选，返回选择的文件路径集合，可使用`FirstOrDefault()`方法判断是否选择了文件

    private List<string> OpenImagesDialog(bool isMulti = true)
    {
        var openFileDialog = new OpenFileDialog();
        const string imgExts = "图像文件 (*.bmp;*.ico;*.gif;*.jpeg;*.jpg;*.png)|*.bmp;*.ico;*.gif;*.jpeg;*.jpg;*.png";
        openFileDialog.Filter = imgExts;
        openFileDialog.Multiselect = isMulti;
        openFileDialog.RestoreDirectory = true;
        openFileDialog.FilterIndex = 1;
        var result = new List<string>();
        if (openFileDialog.ShowDialog() == DialogResult.OK)
        {
            result.AddRange(openFileDialog.FileNames);
        }
        return result;
    }

## 六、复制文件到指定目录
> 将传递的文件复制到指定目录并以Guid重命名，目录不存在则自动创建     
> 使用元组返回对应路径键值对(Item1)及失败路径集合(Item2)

    /// <summary>
    /// 复制文件到指定目录并重命名
    /// </summary>
    /// <param name="sourcePaths">要复制的文件路径集合</param>
    /// <param name="targetDir">目标目录</param>
    /// <returns>Item1:对应路径，Item2:失败文件路径</returns>
    public static Tuple<Dictionary<string, string>, List<string>> CopyFileToDir(List<string> sourcePaths, string targetDir)
    {
        if (!Directory.Exists(targetDir))
        {
            Directory.CreateDirectory(targetDir);
        }
        var errorFiles = new List<string>();
        var saveDirs = new Dictionary<string, string>();
        sourcePaths.ForEach(item =>
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
        var result = new Tuple<Dictionary<string, string>, List<string>>(saveDirs, errorFiles);
        return result;
    }

> 调用示例 ( AppendLogMsg 为追加日志方法)

    var selectImgs = OpenImagesDialog(true);//五、打开图片选择对话框方法
    var result = FileHelper.CopyFileToDir(selectImgs, txtSaveDir.Text);
    result.Item1.Keys.ToList().ForEach(item => AppendLogMsg(item + ":" + result.Item1[item]));//成功时输出
    result.Item2.ForEach(item => AppendLogMsg("文件复制失败：" + item));//文件错误输出

## 七、使用Ini文件存取配置
>保存一些配置到ini文件，是自己的工具更佳灵活

### ini操作类
    public class IniHelper
    {
        // 声明INI文件的写操作函数 WritePrivateProfileString()
        [System.Runtime.InteropServices.DllImport("kernel32")]
        private static extern long WritePrivateProfileString(string section, string key, string val, string filePath);

        // 声明INI文件的读操作函数 GetPrivateProfileString()
        [System.Runtime.InteropServices.DllImport("kernel32")]
        private static extern int GetPrivateProfileString(string section, string key, string def, System.Text.StringBuilder retVal, int size, string filePath);

        private readonly int _retLength = 500;
        private readonly string _sPath = null;
        /// <summary>
        /// 初始化IniHelper
        /// </summary>
        /// <param name="path">ini文件保存路径</param>
        /// <param name="rl">默认500</param>
        public IniHelper(string path, int? rl = null)
        {
            this._sPath = path;
            this._retLength = rl.HasValue ? rl.Value : _retLength;
        }
        /// <summary>
        /// 设置Ini配置，默认配置节为Setting
        /// </summary>
        /// <param name="key">键名</param>
        /// <param name="value">键值</param>
        /// <param name="section">配置节</param>
        public void WriteValue(string key, string value, string section = "Setting")
        {
            // section=配置节，key=键名，value=键值，path=路径
            WritePrivateProfileString(section, key, value, _sPath);
        }
        /// <summary>
        /// 根据键名节点读取Ini配置，默认节点为Setting
        /// </summary>
        /// <param name="key">键名</param>
        /// <param name="section">配置节</param>
        /// <returns></returns>
        public string ReadValue(string key, string section = "Setting")
        {
            // 每次从ini中读取多少字节
            System.Text.StringBuilder temp = new System.Text.StringBuilder(_retLength);
            // section=配置节，key=键名，temp=上面，path=路径
            GetPrivateProfileString(section, key, "", temp, _retLength, _sPath);
            return temp.ToString();
        }
    }

### IniHelper使用示例

    string savePath = AppDomain.CurrentDomain.BaseDirectory + "config.ini";
    IniHelper _iniHelper = new IniHelper(savePath);//初始化
    _iniHelper.WriteValue("txtGitAddress");//写入
    _iniHelper.ReadValue("txtGitAddress");//读取


## 其他
> 调用本地程序：`System.Diagnostics.Process.Start("E:\\程序.exe", "c:\\windows");`
> 打开目录：`System.Diagnostics.Process.Start("Explorer.exe", “目录路径E:\abc\”);`

## 工具示例
> Coding :[https://coding.net/u/yimocoding/p/ImgsDownloadClient/git](https://coding.net/u/yimocoding/p/ImgsDownloadClient/git)        
> Github :[https://github.com/yimogit/ImgsDownloadClient](https://github.com/yimogit/ImgsDownloadClient)
