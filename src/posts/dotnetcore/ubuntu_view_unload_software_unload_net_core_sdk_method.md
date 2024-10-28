---
title: ubuntu下查看-卸载软件(卸载.net core sdk的方法)
date: 2018-01-21 16:46:00
category:
  - DotNetCore
tag:
  - linux
---

查看已安装的包：`dpkg --list`            



查看正则匹配的包：`dpkg --list 'dotnet-*'` //查看以dotnet-开头的包        



卸载匹配的包：`sudo apt-get --purge remove <programname>`        



按照正则卸载匹配的包：`sudo apt-get --purge remove 'dotnet-*'` //卸载以dotnet-开头的包



如果不想自己手动输入Y确认的话则使用：`echo "Y" |sudo apt-get --purge remove 'dotnet-*' `





更多参数使用--help查看即可



参考:https://zh.wikihow.com/卸载Ubuntu软件
