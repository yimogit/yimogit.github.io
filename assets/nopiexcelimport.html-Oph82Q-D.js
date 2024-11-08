import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,e as l,o}from"./app-s030diJy.js";const a={};function r(i,e){return o(),t("div",null,e[0]||(e[0]=[l(`<h2 id="使用nopi导入excel文档" tabindex="-1"><a class="header-anchor" href="#使用nopi导入excel文档"><span>使用NOPI导入Excel文档</span></a></h2><blockquote><p>NOPI版本：2.3.0,依赖于NPOI的SharpZipLib版本：0.86,经测试适用于.net4.0+</p></blockquote><h2 id="记录遇到的几个问题" tabindex="-1"><a class="header-anchor" href="#记录遇到的几个问题"><span>记录遇到的几个问题</span></a></h2><ol><li><p>NOPI中的<code>IWorkbook</code>接口：xls使用<code>HSSFWorkbook</code>类实现，xlsx使用<code>XSSFWorkbook</code>类实现</p></li><li><p>日期转换，判断<code>row.GetCell(j).CellType == NPOI.SS.UserModel.CellType.Numeric &amp;&amp; HSSFDateUtil.IsCellDateFormatted(row.GetCell(j)</code></p></li></ol><p>不能直接使用<code>row.GetCell(j).DateCellValue</code>,这玩意会直接抛出异常来~</p><h3 id="_1-将文件流转换为datatable" tabindex="-1"><a class="header-anchor" href="#_1-将文件流转换为datatable"><span>1. 将文件流转换为DataTable</span></a></h3><pre><code>    /// &lt;summary&gt;

    /// 根据Excel格式读取Excel

    /// &lt;/summary&gt;

    /// &lt;param name=&quot;stream&quot;&gt;文件流&lt;/param&gt;

    /// &lt;param name=&quot;type&quot;&gt;Excel格式枚举类型，xls/xlsx&lt;/param&gt;

    /// &lt;param name=&quot;sheetName&quot;&gt;表名，默认取第一张&lt;/param&gt;

    /// &lt;returns&gt;DataTable&lt;/returns&gt;

    private static DataTable ImportExcel(Stream stream, ExcelExtType type, string sheetName)

    {

        DataTable dt = new DataTable();

        IWorkbook workbook;

        try

        {

            //xls使用HSSFWorkbook类实现，xlsx使用XSSFWorkbook类实现

            switch (type)

            {

                case ExcelExtType.xlsx:

                    workbook = new XSSFWorkbook(stream);

                    break;

                default:

                    workbook = new HSSFWorkbook(stream);

                    break;

            }

            ISheet sheet = null;

            //获取工作表 默认取第一张

            if (string.IsNullOrWhiteSpace(sheetName))

                sheet = workbook.GetSheetAt(0);

            else

                sheet = workbook.GetSheet(sheetName);



            if (sheet == null)

                return null;

            IEnumerator rows = sheet.GetRowEnumerator();

            #region 获取表头

            IRow headerRow = sheet.GetRow(0);

            int cellCount = headerRow.LastCellNum;

            for (int j = 0; j &lt; cellCount; j++)

            {

                ICell cell = headerRow.GetCell(j);

                if (cell != null)

                {

                    dt.Columns.Add(cell.ToString());

                }

                else

                {

                    dt.Columns.Add(&quot;&quot;);

                }

            }

            #endregion

            #region 获取内容

            for (int i = (sheet.FirstRowNum + 1); i &lt;= sheet.LastRowNum; i++)

            {

                IRow row = sheet.GetRow(i);

                DataRow dataRow = dt.NewRow();



                for (int j = row.FirstCellNum; j &lt; cellCount; j++)

                {

                    if (row.GetCell(j) != null)

                    {

                        //判断单元格是否为日期格式

                        if (row.GetCell(j).CellType == NPOI.SS.UserModel.CellType.Numeric &amp;&amp; HSSFDateUtil.IsCellDateFormatted(row.GetCell(j)))

                        {

                            if (row.GetCell(j).DateCellValue.Year &gt;=1970)

                            {

                                dataRow[j] = row.GetCell(j).DateCellValue.ToString();

                            }

                            else

                            {

                                dataRow[j] = row.GetCell(j).ToString();



                            }

                        }

                        else

                        {

                            dataRow[j] = row.GetCell(j).ToString();

                        }

                    }

                }

                dt.Rows.Add(dataRow);

            }

            #endregion



        }

        catch (Exception ex)

        {

            dt=null;

        }

        finally

        {

            //if (stream != null)

            //{

            //    stream.Close();

            //    stream.Dispose();

            //}

        }

        return dt;

    }
</code></pre><h3 id="_2-文件上载导入" tabindex="-1"><a class="header-anchor" href="#_2-文件上载导入"><span>2. 文件上载导入</span></a></h3><pre><code>    /// &lt;summary&gt;

    /// 上传Excel导入

    /// &lt;/summary&gt;

    /// &lt;param name=&quot;file&quot;&gt;上载文件对象&lt;/param&gt;

    /// &lt;param name=&quot;errorMsg&quot;&gt;错误信息&lt;/param&gt;

    /// &lt;param name=&quot;sheetName&quot;&gt;表名，默认取第一张&lt;/param&gt;

    /// &lt;returns&gt;&lt;/returns&gt;

    public static DataTable Import(System.Web.HttpPostedFileBase file, ref string errorMsg, string sheetName = &quot;&quot;)

    {

        if (file == null || file.InputStream == null || file.InputStream.Length == 0)

        {

            errorMsg = &quot;请选择要导入的Excel文件&quot;;

            return null;

        }

        var excelType = GetExcelFileType(file.FileName);

        if (excelType == null)

        {

            errorMsg = &quot;请选择正确的Excel文件&quot;;

            return null;

        }

        using (var stream = new MemoryStream())

        {

            file.InputStream.Position = 0;

            file.InputStream.CopyTo(stream);

            var dt = ImportExcel(stream, excelType.Value, sheetName);

            if (dt == null)

                errorMsg = &quot;导入失败,请选择正确的Excel文件&quot;;

            return dt;

        }

    }
</code></pre><h3 id="_3-本地路径读取导入" tabindex="-1"><a class="header-anchor" href="#_3-本地路径读取导入"><span>3. 本地路径读取导入</span></a></h3><pre><code>    /// &lt;summary&gt;

    /// 根据文件路径导入Excel

    /// &lt;/summary&gt;

    /// &lt;param name=&quot;filePath&quot;&gt;&lt;/param&gt;

    /// &lt;param name=&quot;errorMsg&quot;&gt;错误信息&lt;/param&gt;

    /// &lt;param name=&quot;sheetName&quot;&gt;表名，默认取第一张&lt;/param&gt;

    /// &lt;returns&gt;可能为null的DataTable&lt;/returns&gt;

    public static DataTable Import(string filePath, ref string errorMsg, string sheetName = &quot;&quot;)

    {

        var excelType = GetExcelFileType(filePath);

        if (GetExcelFileType(filePath) == null)

        {

            errorMsg = &quot;请选择正确的Excel文件&quot;;

            return null;

        }

        if (!File.Exists(filePath))

        {

            errorMsg = &quot;没有找到要导入的Excel文件&quot;;

            return null;

        }

        DataTable dt;

        using (var stream = new FileStream(filePath, FileMode.Open, FileAccess.Read, FileShare.ReadWrite))

        {

            dt = ImportExcel(stream, excelType.Value, sheetName);

        }

        if (dt == null)

            errorMsg = &quot;导入失败,请选择正确的Excel文件&quot;;

        return dt;

    }
</code></pre><h3 id="_4-完整demo" tabindex="-1"><a class="header-anchor" href="#_4-完整demo"><span>4.完整demo</span></a></h3><p>附赠一个winform导入Excel的Demo。</p><p>https://github.com/yimogit/NopiExcelDemo</p>`,14)]))}const c=n(a,[["render",r],["__file","nopiexcelimport.html.vue"]]),m=JSON.parse('{"path":"/posts/developer/nopiexcelimport.html","title":"C#使用NOPI导入Excel","lang":"zh-CN","frontmatter":{"title":"C#使用NOPI导入Excel","date":"2017-05-03T22:56:00.000Z","category":["Developer"],"tag":["C#","excel操作"],"description":"使用NOPI导入Excel文档 NOPI版本：2.3.0,依赖于NPOI的SharpZipLib版本：0.86,经测试适用于.net4.0+ 记录遇到的几个问题 NOPI中的IWorkbook接口：xls使用HSSFWorkbook类实现，xlsx使用XSSFWorkbook类实现 日期转换，判断row.GetCell(j).CellType == N...","head":[["meta",{"property":"og:url","content":"https://www.yimo.link/posts/developer/nopiexcelimport.html"}],["meta",{"property":"og:site_name","content":"易墨网"}],["meta",{"property":"og:title","content":"C#使用NOPI导入Excel"}],["meta",{"property":"og:description","content":"使用NOPI导入Excel文档 NOPI版本：2.3.0,依赖于NPOI的SharpZipLib版本：0.86,经测试适用于.net4.0+ 记录遇到的几个问题 NOPI中的IWorkbook接口：xls使用HSSFWorkbook类实现，xlsx使用XSSFWorkbook类实现 日期转换，判断row.GetCell(j).CellType == N..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-10-28T11:15:42.000Z"}],["meta",{"property":"article:tag","content":"C#"}],["meta",{"property":"article:tag","content":"excel操作"}],["meta",{"property":"article:published_time","content":"2017-05-03T22:56:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-10-28T11:15:42.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"C#使用NOPI导入Excel\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2017-05-03T22:56:00.000Z\\",\\"dateModified\\":\\"2024-10-28T11:15:42.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"易墨\\",\\"url\\":\\"https://www.yimo.link\\"}]}"]]},"headers":[{"level":2,"title":"使用NOPI导入Excel文档","slug":"使用nopi导入excel文档","link":"#使用nopi导入excel文档","children":[]},{"level":2,"title":"记录遇到的几个问题","slug":"记录遇到的几个问题","link":"#记录遇到的几个问题","children":[{"level":3,"title":"1. 将文件流转换为DataTable","slug":"_1-将文件流转换为datatable","link":"#_1-将文件流转换为datatable","children":[]},{"level":3,"title":"2. 文件上载导入","slug":"_2-文件上载导入","link":"#_2-文件上载导入","children":[]},{"level":3,"title":"3. 本地路径读取导入","slug":"_3-本地路径读取导入","link":"#_3-本地路径读取导入","children":[]},{"level":3,"title":"4.完整demo","slug":"_4-完整demo","link":"#_4-完整demo","children":[]}]}],"git":{"createdTime":1730114142000,"updatedTime":1730114142000,"contributors":[{"name":"yimo","email":"yimo@wikiglobal.com","commits":1}]},"readingTime":{"minutes":2.24,"words":673},"filePathRelative":"posts/developer/nopiexcelimport.md","localizedDate":"2017年5月3日","excerpt":"<h2>使用NOPI导入Excel文档</h2>\\n<blockquote>\\n<p>NOPI版本：2.3.0,依赖于NPOI的SharpZipLib版本：0.86,经测试适用于.net4.0+</p>\\n</blockquote>\\n<h2>记录遇到的几个问题</h2>\\n<ol>\\n<li>\\n<p>NOPI中的<code>IWorkbook</code>接口：xls使用<code>HSSFWorkbook</code>类实现，xlsx使用<code>XSSFWorkbook</code>类实现</p>\\n</li>\\n<li>\\n<p>日期转换，判断<code>row.GetCell(j).CellType == NPOI.SS.UserModel.CellType.Numeric &amp;&amp; HSSFDateUtil.IsCellDateFormatted(row.GetCell(j)</code></p>\\n</li>\\n</ol>","autoDesc":true}');export{c as comp,m as data};
