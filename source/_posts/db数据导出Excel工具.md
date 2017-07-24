---
title: db数据导出Excel工具
date: '2017-07-03 07:13:49'
categories:
  - dotnet
tags: 
  - 工具
---
> 一个根据数据库链接字符串，sql语句 即可将结果集导出到Excel的工具 分享，支持sqlserver,mysql。

# 前因
> 一个月前朋友找到我，让我帮忙做一个根据sql导出查询结果到Excel的工具（之前帮他一个导入Excel然后按其规则统计数据的工具）。
> 然后扔了我一个SQL语句，瞬间懵比。卧槽。这么多列，我特么得定义这么属性，改了还得重新改程序（一直用EF）。
> 于是思考如何忽略列名，进而如何做到通用，做到于我有益，而不是简单的帮个忙。

# 如何完成这个需求
> Q:程序中根据SQL查询出数据而不需要关注有哪些列？        
> A:将查询结果保存到DataTable中然后遍历          
> Q:如何将DataTable转换Excel？        
> A:一搜，一试，可用之       
> Q:如何保存到本地？        
> A:待我改改写日志的方法      
<!--More-->
使用[`SqlSugar 4.x`](http://www.codeisbug.com/Doc/8) 进行数据操作
>SqlSugar 4.x是一款高性能（达到ADO.NET最高性能水平）、轻量级、支持多库和人性化语法的ORM，语法方便，入门简单，功能强大。
>对数据库结构没太多要求，支持多主键，多自增列
>SqlSugar支持sqlserver,mysql故此工具适用于此两者数据库

## 0. 创建项目-预览 
![](http://images2015.cnblogs.com/blog/662652/201707/662652-20170703163425456-1755280588.png)       

## 1. 到github仓库clone了源码至本地生成需要的dll，然后在项目中添加了引用
![](http://images2015.cnblogs.com/blog/662652/201707/662652-20170703154605675-241795072.png)        
![](http://images2015.cnblogs.com/blog/662652/201707/662652-20170703154657940-1934319122.png)           
## 2. 使用SqlSugar获取结果到DataTable中(不知道是不是最近帮朋友写ado.net的代码写多了，感觉挺好)           
![](http://images2015.cnblogs.com/blog/662652/201707/662652-20170703154936019-1655719657.png)       
## 3. DataTable转Excel

    public class DataTableToExcel
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
        /// <summary>
        /// DataTable通过流导出Excel
        /// </summary>
        /// <param name="ds">数据源DataSet</param>
        /// <param name="columns">DataTable中列对应的列名(可以是中文),若为null则取DataTable中的字段名</param>
        /// <param name="fileName">保存文件名(例如：a.xls)</param>
        /// <returns></returns>
        public string StreamExport(DataTable dt, string[] columns = null,string savePath="")
        {
            //if (dt.Rows.Count > 65535) //总行数大于Excel的行数 
            //{
            //    throw new Exception("预导出的数据总行数大于excel的行数");
            //}

            StringBuilder content = new StringBuilder();
            content.Append("<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:excel' xmlns='http://www.w3.org/TR/REC-html40'>");
            content.Append("<head><title></title><meta http-equiv='Content-Type' content=\"text/html; charset=gb2312\">");
            //注意：[if gte mso 9]到[endif]之间的代码，用于显示Excel的网格线，若不想显示Excel的网格线，可以去掉此代码
            content.Append("<!--[if gte mso 9]>");
            content.Append("<xml>");
            content.Append(" <x:ExcelWorkbook>");
            content.Append("  <x:ExcelWorksheets>");
            content.Append("   <x:ExcelWorksheet>");
            content.Append("    <x:Name>Sheet1</x:Name>");
            content.Append("    <x:WorksheetOptions>");
            content.Append("      <x:Print>");
            content.Append("       <x:ValidPrinterInfo />");
            content.Append("      </x:Print>");
            content.Append("    </x:WorksheetOptions>");
            content.Append("   </x:ExcelWorksheet>");
            content.Append("  </x:ExcelWorksheets>");
            content.Append("</x:ExcelWorkbook>");
            content.Append("</xml>");
            content.Append("<![endif]-->");
            content.Append("</head><body><table style='border-collapse:collapse;table-layout:fixed;'><tr>");

            if (columns != null)
            {
                for (int i = 0; i < columns.Length; i++)
                {
                    if (columns[i] != null && columns[i] != "")
                    {
                        content.Append("<td><b>" + columns[i] + "</b></td>");
                    }
                    else
                    {
                        content.Append("<td><b>" + dt.Columns[i].ColumnName + "</b></td>");
                    }
                }
            }
            else
            {
                for (int j = 0; j < dt.Columns.Count; j++)
                {
                    content.Append("<td><b>" + dt.Columns[j].ColumnName + "</b></td>");
                }
            }
            content.Append("</tr>\n");

            for (int j = 0; j < dt.Rows.Count; j++)
            {
                content.Append("<tr>");
                for (int k = 0; k < dt.Columns.Count; k++)
                {
                    object obj = dt.Rows[j][k];
                    Type type = obj.GetType();
                    if (type.Name == "Int32" || type.Name == "Single" || type.Name == "Double" || type.Name == "Decimal")
                    {
                        double d = obj == DBNull.Value ? 0.0d : Convert.ToDouble(obj);
                        if (type.Name == "Int32" || (d - Math.Truncate(d) == 0))
                            content.AppendFormat("<td style='vnd.ms-excel.numberformat:#,##0'>{0}</td>", obj);
                        else
                            content.AppendFormat("<td style='vnd.ms-excel.numberformat:#,##0.00'>{0}</td>", obj);
                    }
                    else
                        content.AppendFormat("<td style='vnd.ms-excel.numberformat:@'>{0}</td>", obj);
                }
                content.Append("</tr>\n");
            }
            content.Append("</table></body></html>");
            content.Replace("&nbsp;", "");
            using (var w = new StreamWriter(savePath, false, Encoding.UTF8))
            {
                w.WriteLine(content);
            }
            return savePath;
        }
    }



## 4. 使用Ini文件保存输入

    public class IniHelper
    {
        // 声明INI文件的写操作函数 WritePrivateProfileString()
        [System.Runtime.InteropServices.DllImport("kernel32")]
        private static extern long WritePrivateProfileString(string section, string key, string val, string filePath);

        // 声明INI文件的读操作函数 GetPrivateProfileString()
        [System.Runtime.InteropServices.DllImport("kernel32")]
        private static extern int GetPrivateProfileString(string section, string key, string def, System.Text.StringBuilder retVal, int size, string filePath);

        private int retLength = 500;
        private string sPath = null;
        public IniHelper(string path, int rl = 500)
        {
            this.sPath = path;
            if (rl > 0)
            {
                this.retLength = rl;
            }
        }

        public void WriteValue(string key, string value, string section = "Setting")
        {
            // section=配置节，key=键名，value=键值，path=路径
            WritePrivateProfileString(section, key, value, sPath);
        }

        public string ReadValue(string key, string section = "Setting")
        {
            // 每次从ini中读取多少字节
            System.Text.StringBuilder temp = new System.Text.StringBuilder(retLength);
            // section=配置节，key=键名，temp=上面，path=路径
            GetPrivateProfileString(section, key, "", temp, retLength, sPath);
            return temp.ToString();
        }
    }
## 5. 文本框全选功能

        public frmMain()
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
## 6. 打开保存的excel
        private void btnOpenDir_Click(object sender, EventArgs e)
        {
            var txtFileName = this.txtFileName.Text;
            var txtExportDir = this.txtExportDir.Text;
            var openPath = Path.Combine(txtExportDir, txtFileName);
            if (File.Exists(openPath))
            {
                System.Diagnostics.Process.Start(openPath, "c:\\windows");
            }
            else
            {
                AppendTipMsg("文件" + openPath + "不存在");
            }
        }

## 7. 页面主要功能代码
![](http://images2015.cnblogs.com/blog/662652/201707/662652-20170703182427253-1108288763.png)

### winform中使用多线程时给ui控件赋值

    
    var txtThread = new Thread(() => txtMsg.BeginInvoke(new Action(() => txtMsg.AppendText("向文本框中追加内容"))));   
    txtThread.Start();


## 8. 一些记录

### winform中使用多线程时给ui控件赋值

    
    var txtThread = new Thread(() => txtMsg.BeginInvoke(new Action(() => txtMsg.AppendText("向文本框中追加内容"))));   
    txtThread.Start();

源码中的NopI组件可移除，此工具实际未用到    

开启线程执行导出的时候使用的是Task.Run(() =>{});若将框架版本改为4.0则需要将此处修改为new Thread(() =>{}).Start();        

### 整个过程解决了一下问题

> 0. 数据库查询（SqlSugar支持sqlserver,mysql）
> 1. datatable转excel文本
> 2. ini存取文件
> 3. winform文本框全选功能
> 4. winform中使用多线程时给ui控件赋值

### 源码

> 下载使用：http://files.cnblogs.com/files/morang/DB数据导出工具.rar        
> 源码下载：http://files.cnblogs.com/files/morang/DB数据导出工具_源码.rar        
> Coding地址：https://coding.net/u/yimocoding/p/WeDemo/git/tree/NopiExcelDemo               
> git克隆：`git clone https://git.coding.net/yimocoding/WeDemo.git -b NopiExcelDemo`

### 使用说明
![](http://images2015.cnblogs.com/blog/662652/201707/662652-20170704092826612-2098151036.png)        
![](http://images2015.cnblogs.com/blog/662652/201707/662652-20170704092837190-1992148601.png)
