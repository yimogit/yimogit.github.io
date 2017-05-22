---
title: react学习记录
date: '2017-02-12 15:11'
categories:
  - 全栈
tags: 
  - react-native
---

# react学习记录

2017.01.08
---------------------       

1. 在iOS上使用http链接的图片地址可能不会显示，参见[这篇说明](https://segmentfault.com/a/1190000002933776)修改。        

2. 需要的组件都要在顶部引用。
 ![图片](https://dn-coding-net-production-pp.qbox.me/981a29a8-2574-4e04-9432-d86f61132054.png) 

3. 不能直接在组件外面写样式，需要显示传递，样式名按骆驼命名法书写
顺序声明和使用style属性，以借鉴CSS中的“层叠”做法（即后声明的属性会覆盖先声明的同名属性）       

4. Flexbox布局的说明 http://reactnative.cn/docs/0.40/layout-props.html


<!--more-->

## react-native 项目初始化

1. 搭建java，android，node环境    
    [http://www.cnblogs.com/morang/p/react-native-java-build.html](http://www.cnblogs.com/morang/p/react-native-java-build.html)    
2. 全局安装脚手架  
    `npm install react-native-cli -g`  
3. 使用react-native-cli初始化项目          
    `react-native init 项目名称`
4. 修改android/gradle/wrapper/gradle-wrapper.properties文件的`distributionUrl`值为本地路径(墙)     
    `distributionUrl=file:///F:/CodingRepos/reactDemo/gradle-2.4-all.zip`
5. 绑定模拟器或真机 可以使用adb devices查看连接的设备         
    5.1 使用[夜神模拟器](https://www.yeshen.com/)安装调试app   
    5.2 使用adb命令链接设备到模拟器：`adb connect 127.0.0.1:62001`       
        端口号可使用 安装目录nox/bin/下的nox_adb devices查看或者查看进程PID         
        多个真机连接可用此connect Ip:port的方式连接到指定设备
    5.3 若使用真机调试需要打开USB调试并允许通过USB安装应用
6. 开始构建
    `react-native run-android`
    
7. 构建时会启动8081端口为服务端来在保存代码后进行更新          

8. 点击模拟器的摇一摇（Ctrl+0）选择Dev Setting->Debug Server host & port for device-> 电脑IP:8081        
    ![](http://images2015.cnblogs.com/blog/662652/201702/662652-20170212150730135-700935076.png)

9. 返回到桌面摇一摇~~~Reload~~~Over。        

![](http://images2015.cnblogs.com/blog/662652/201702/662652-20170212150701776-1049586653.png)


