---
title: 使用node自动生成html并调用cmd命令提交代码到仓库
tags: node
categories:
  - 程序猿之路
---
# 生成html提交到git仓库

>基于目前的express博客,写了一点代码,通过request模块来请求站点，将html保存到coding-pages目录，复制静态文件夹到coding-pages,最后使用node的child_process模块执行cmd命令提交到仓库~~
<!--more-->
## 1. 发送http请求
-----------------------
    var request = require('request');
    var options = {
        url: url,
        encoding: null,
        headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; 
        Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36' }
    };
    request(options, function (error, response, body) {
        //请求的回调，编码问题使用iconv模块解决
        //var iconv = require('iconv-lite');
        //var html=iconv.decode(body,'utf-8');
        //若是需要解析html则可以使用cheerio模块
        //var cheerio=require('cheerio').load(html,{decodeEntities: false});
        //然后就可以像jqueryy一样去解析html了。
        //cheerio('选择器');
    });
然后就可以愉快的抓数据了。之前也写过基于request，iconv，cheerio,schedule(定时调度模块)写了一个抓取的[框架](https://coding.net/u/yimocoding/p/YFKDataGrab/git) 

2.  保存html到目录   
-----------------------
得到url的路径部分(除去域名)，即：/index.html,/msg.html...
现在只需要根据这个路径和获取到的html保存即可
此时有了保存的路径和内容，保存还不小事一桩么。如下。    

        function writeText(pathName,content){   
            var dir= pathHelper.dirname(pathName);//获取到路径中的目录
            fs.exists(dir, function (exists) {//如果不存在则创建目录
                if(exists==false){
                    fs.mkdir(dir);
                }
            });
            fs.writeFile(pathName, content, function (err) {//写入内容
                if (err){
                    console.log(pathName+'生成失败');
                }
            });
        }

3. 使用node执行.bat文件复制静态文件到coding-pages目录
---------------------------
>复制目录可以使用[async模块实现的目录操作](https://coding.net/u/yimocoding/p/yimocoding/git/blob/server/website/utils/dirHelper.js)                 
调用copyDir方法即可。                     
>也可以使用child_process模块来调用cmd命令实现     

注：直接使用require('child_process').exec 执行xcopy并不能复制目录，需要一种折中的方式            
如下：         

    var exec = require('child_process').exec;
    var execbat = __dirname + '\\exec.bat';
    //1. 创建复制脚本
    commonHelper.writeText(execbat, 'xcopy F:\\CodingRepos\\yimocoding\\coding-pages\\tag F:\\CodingRepos\\yimocoding\\coding-pages\\tag3 /s /e /Q /Y /I');
    //2.执行批处理复制目录
    exec(execbat, function (err, stdout, stderr) {
        if (err) {
            console.log(err);
        }
        else{
            console.log('复制成功');
        }
    });
    //3.删除批处理文件
    exec('del ' + execbat, function (err, stdout, stderr) {
        if (err) {
            console.log(err);
        }else{
            console.log('删除脚本成功');
        }
    })

4. 啥？怎么提交到git
---------------------------
运行环境安装好。能从cmd命令提交(配置环境变量)
然后，看代码呗~~

    var cmds = [
        'git add *',
        'git commit -m "提交。。。"',
        'git push'
    ]
    cmds.forEach(function (cmd, i) {
        setTimeout(function () {
            console.log(cmd);
            exec(cmd, function (err, stdout, stderr) {
                if (err) {
                    console.log(err);
                }
            });
        }, i * 1000);
    })


写文章还是挺累的。但是把用到的东西记录下来是有必要的。文笔欠佳，然记录一二也是挺好滴。