---
title: 微服务项目Git仓库自动化脚本
date: 2022-12-20 19:47:00
category:
  - Developer
tag:
  - git
  - 脚本
---

## 说明

基于微服务项目，产生的的多项目仓库管理脚本。可直接保存 shell 脚本后酌情修改后试用

### 目录结构

- xxxx
  - Xxx1Api/
  - Xxx2Api/
  - git_clone_api.sh
  - git_branch_dev.sh
  - git_pull_all.sh
  - git_status.sh
  - api-build-tag.sh
  - api-commit-push.sh
  - api-dev-release-merage.sh
  - api-update-nuget-pack.sh

脚本放置在外层目录，将操作 Api 后缀目录下 git 仓库

## 批量克隆仓库

```sh git_clone_api.sh
#!/bin/bash
# 不要放在中文路径下
# 接口
git clone http://xxxxx.com/XXX.XXXApi.git
read pause
```

## 切换分支到 dev

```sh git_branch_dev.sh
#!/bin/bash
function getdir(){
    for element in `ls $1 | grep /$`
    do
        dir_or_file=$1"\\"$element
		echo $dir_or_file
		cd $dir_or_file
		git checkout $2
		git pull
		cd ..
    done
}
root_dir="./"
branch=dev
getdir $root_dir $branch
```

## 拉取分支最新代码

```sh git_pull_all.sh
#!/bin/bash
function getdir(){
    for element in `ls -F $1 | grep /$`
    do
        dir_or_file=$1"\\"$element
		echo $dir_or_file
        if [ $element = "docs" ]
        then
            echo $dir_or_file skip
        else
           cd $dir_or_file
		   git pull
		   cd ..
        fi
    done
}
root_dir="./"
getdir $root_dir
```

## 查看仓库状态

```sh git_status.sh
#!/bin/bash
function getdir(){
    for element in `ls $1 | grep /$`
    do
        dir_or_file=$1"\\"$element
		echo $dir_or_file
		cd $dir_or_file
		git status
		cd ..
    done
}
root_dir="./"
getdir $root_dir
read pause
```

## 自动升级 dev 的 nuget 包

- `项目`: 匹配的文本
- `*Api`：Api 后缀的目录
- `XXX`: 需要更新的指定包，匹配包名
- `xxxxx.com`:nuget 源

```sh api-update-nuget-pack.sh
#!/bin/bash
#set -x
echo '自动升级nuget包-Need Setting shell to GBK Encoding'
function upgradePack(){
	tempFile=./temp.txt
	tempPackFile=./tempPack.txt
	echo 当前目录：$1
	cd $1
	cd src
	pwd
	#read pause
	dotnet restore
	dotnet list package --source xxxxxxx.com   --include-prerelease  --outdated>$tempFile
	tempProjectMatch="项目"
	projectName=''
	cat $tempFile | while read line
	do
		#if  [[ "$line" == *XXX* ]];then
			if  [[ $line =~ $tempProjectMatch ]];then
				echo $line | grep -Eo "XXX.((\w)+(\.?))+">$tempPackFile
				projectName=$(cat $tempPackFile)
				echo 检测项目：$projectName
			else
				if [[ "$line" == *XXX* ]];then
					echo $line | grep -Eo "XXX.((\w)+(\.?))+">$tempPackFile
					packageName=$(cat $tempPackFile)
					echo 升级包：$packageName
					dotnet add $projectName/$projectName.csproj package $packageName
				fi
			fi

		#fi
	done
	rm $tempFile
	rm $tempPackFile
}
function getdir(){
	branchName=$2
    for element in `ls $1 | grep /*Api`
    do
        dir_or_file=$1/$element
		cd $dir_or_file
		if([ "$branchName" != "" ]);then
			git checkout $branchName
			git pull
		fi
		upgradePack $dir_or_file
    done
}

branch=dev
root_dir=$(cd `dirname $0`;pwd)
#echo 脚本目录：$root_dir
getdir $root_dir $branch
read pause
```

## 将 dev 分支打 tag：vyyyyMMdd 并推送到 origin

```sh api-build-tag.sh
#!/bin/bash
#set -x
echo '重命名分支-Need Setting shell to GBK Encoding'
function pushTag(){
	echo 拉取dev分支
	git checkout dev
	echo 创建tag
	time_span=v`date +%Y%m%d`
	git tag -l $time_span
	git tag -a -f -m relrease $time_span
	echo 推送tag
	git push --set-upstream origin $time_span -f
	echo 推送完毕
}
function getdir(){
    # 文件夹名匹配
    for element in `ls $1 | grep -E 'XXXApi|YYYYApi'`
    do
        dir_or_file=$1/$element
		cd $dir_or_file
		pushTag $dir_or_file
    done
}

root_dir=$(cd `dirname $0`;pwd)
#echo 脚本目录：$root_dir
getdir $root_dir
read pause
```

## 提交 dev 分支并推送

```sh api-commit-push.sh
#!/bin/bash
#set -x
echo '自动提交-Need Setting shell to GBK Encoding'
function pushCode(){
	echo 当前目录：$1
	git add *
	git commit -m 更新包
	git pull
	git push
}
function getdir(){
	branchName=$2
    for element in `ls $1 | grep /*Api`
    do
        dir_or_file=$1/$element
		cd $dir_or_file
		pushCode $dir_or_file
    done
}

branch=dev
root_dir=$(cd `dirname $0`;pwd)
#echo 脚本目录：$root_dir
getdir $root_dir $branch
read pause
```

## 合并 dev 分支到 release

```sh api-dev-release-merage.sh
#!/bin/bash
#set -x
echo '重命名分支-Need Setting shell to GBK Encoding'
function pushTag(){
	echo 当前目录：$1 $branch
	echo 拉取dev分支
	git checkout dev
	echo 创建tag
	time_span=v`date +%Y%m%d`
	git tag -l $time_span
	git tag -a -f -m relrease $time_span
	echo 推送tag
	git push --set-upstream origin $time_span -f
	echo 推送完毕
}
function pushCode(){
	echo 当前目录：$1 $branch
	echo 切换到dev，开始合并
	git checkout dev
	git pull
	echo 删除release分支
	git branch -d release
	echo 新建release分支
	git checkout -b release
	echo 推送新的release分支
	git push --set-upstream origin release -f
}
function getdir(){
    for element in `ls $1 | grep /*Api`
    do
        dir_or_file=$1/$element
		cd $dir_or_file
		pushTag $dir_or_file
		pushCode $dir_or_file
		echo 睡眠30秒
		sleep 30s
    done
}

root_dir=$(cd `dirname $0`;pwd)
#echo 脚本目录：$root_dir
getdir $root_dir
read pause

```

