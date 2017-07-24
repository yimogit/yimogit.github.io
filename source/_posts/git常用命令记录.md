---
title: Git常用命令记录
date: '2017-05-21 23:54'
categories:
  - 全栈
tags: 
  - git
---

## 配置本地仓库 

* 设置用户名：`git config --global user.name 易墨`     
* 设置邮箱：`git config --global user.email yimo@yimo.com`
* 删除配置： `git config --global --unset key`
> [更多](http://blog.csdn.net/sky1203850702/article/details/40985505)

## 查看配置详情 

* `git config -l `  

## 初始仓库

* `git init `   
* `git init --bare` --初始化一个共享仓库 

## 查看当前仓库的状态

* `git status`
<!--more-->
## 添加文件到暂存区

* `git add *` --添加当前目录下的所有未排除的文件,或使用`git add --all` 
* `git add -u`  --仅监控已经被add的文件或`git add --update`   
* `git add .` --提交不包括被删除的文件的修改  

## 提交到本地仓库

* `git commit -m 备注信息`        

## 撤销修改 

* `git checkout .` --撤销本地所有修改
* `git checkout 路径/*.cs`--撤销本地路径下的所有cs文件

* `git revert` --将需要revert的版本的内容再反向修改回去，版本会递增，不影响之前提交的内容
* `git revert HEAD` --撤销前一次commit
* `git revert HEAD^` --撤销前前一次commit
* `git revert commitid` --撤销指定版本

* `git reset` 撤销暂存
* `git reset HEAD <file>` --撤销已经被暂存的文件


## 查看本地仓库的提交历史

* `git log`

## 克隆仓库

* `git clone 仓库地址` --克隆远程仓库的默认分支，可以是本地文件路径，也可以是远程地址 
* `git clone https://github.com/../xxx.git -b 分支名称` --克隆远程仓库的指定分支   
* `git clone https://github.com/../xxx.git 文件夹路径` --克隆远程仓库到指定文件夹    


## 分支操作

>命令中的origin为默认的主机别名 

### 本地操作

* `git branch` --查看本地分支         
* `git branch -a` --查看本地及远程分支       
* `git branch 分支名称` --在本地创建一个新分支        
* `git checkout 分支名称` --获取远程分支并切换到该分支           
* `git checkout -b 分支名称` --获取远程分支,不存在则创建，并切换到该分支        
* `git branch -d 分支名称` --删除本地分支     
* `git branch -m 分支名称 新分支名称` --分支重命名    

### 更新远程分支

* `git fetch` -- 更新本地仓库的所有分支，不合并到分支(通常用来查看其他人的进程)       
* `git fetch orgin 分支名称` -- 更新本地仓库的指定分支，不合并到分支(通常用来查看其他人的进程)        
* `git pull` --更新当前分支       
* `git pull origin 远程分支:本地分支` --取回origin主机的远程分支，与指定本地分支合并       

### 删除远程分支

* `git push origin --delete 分支名称` --v1.7.0+     
* `git push origin :分支名称` --删除远程分支,例：`git push origin :gh-pages`，意为将空白分支变成远程分支      

### 重命名远程分支

1. `git push --delete origin 远程分支` -- 删除本地远程分支（github上需为非默认分支）      
2. `git branch -m 本地分支 新远程分支名` --重命名分支          
3. `git push orgin 新远程分支名` --推送本地分支     

## 合并操作    

* `git merge -b 分支名称` --合并当前分支到指定分支     

## 推送

> 如果本地仓库分支名称==远程仓库分支名称,可直接使用 `git push`         

* `git push origin 本地分支名称:远程分支名称` --将本地分支推送至远程分支,远程分支不存在则自动创建           
* `git remote add 主机别名 远程仓库地址` --添加远程主机，给远程主机起个别名，方便使用,默认的为origin       
* `git remote` --查看已添加的远程主机     
* `git remote show 主机别名` 可以查看远程主机的信息        


> 总结一下，收获满满。