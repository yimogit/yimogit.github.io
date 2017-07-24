---
title: 如何生成ssh公钥
date: '2017-05-28 12:30'
categories:
  - 全栈
tags: git
---
## windows下生成ssh_key

会生成id_rsa以及 id_rsa.pub。输入命令三次回车即可sshkey生成到id_rsa.pub中，将文件中的公钥复制到coding或者GitHub即可
生成命令：`ssh-keygen -t rsa -C "your_email@example.com"`
生成目录：`C:\Users\用户名\.ssh` （Linux下/your_home_path/.ssh/id_rsa）

<!--more-->
详细：http://www.jianshu.com/p/31cbbbc5f9fa/

