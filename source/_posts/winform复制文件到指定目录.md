---
title: winform复制文件到指定目录
date: '2017-07-05 11:47'
categories:
  - dotnet
tags: 
  - 工具
---
## 执行步骤

> 1. 弹出选择对话框：`var openFileDialog = new OpenFileDialog();`
> 2. 设置选择内容,如所有图片:`openFileDialog.Filter="图像文件 (*.bmp;*.ico;*.gif;*.jpeg;*.jpg;*.png)|*.bmp;*.ico;*.gif;*.jpeg;*.jpg;*.png";`
> 3. 获取选择的路径集合：`openFileDialog.FileNames`
> 4. 复制文件:`File.Copy(sourcePath,targetPath);//目录重命名见下面代码`

<!--more-->

## 1. 打开图片选择对话框
> 默认为多选，返回选择的文件路径集合，可使用`FirstOrDefault()`方法判断是否选择了文件

    //打开文件对话框并获取选择的文件
    private List<string> OpenImagesDialog(bool isMulti = true)
    {
        var openFileDialog = new OpenFileDialog();
        const string imgExts = "图像文件 (*.bmp;*.ico;*.gif;*.jpeg;*.jpg;*.png)|*.bmp;*.ico;*.gif;*.jpeg;*.jpg;*.png";
        openFileDialog.Filter = imgExts;//可选择的文件格式 (|之前为显示，之后为控制后缀显示)
        openFileDialog.Multiselect = isMulti;//多选设置
        openFileDialog.RestoreDirectory = true;
        openFileDialog.FilterIndex = 1;
        var result = new List<string>();
        if (openFileDialog.ShowDialog() == DialogResult.OK)
        {
            result.AddRange(openFileDialog.FileNames);
        }
        return result;
    }

## 2.复制文件到指定目录
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

      var selectImgs = OpenImagesDialog(true);//打开文件对话框并获取选择的所有文件
      var result = FileHelper.CopyFileToDir(selectImgs, txtSaveDir.Text);
      //result.Item1 [{源文件路径:目标路径}]
      //result.Item2 [失败路径1,失败路径2]

