---
title: 从零开始在win10系统搭建react-native开发环境
tags: 环境搭建
categories:
  - 程序猿之路
---
# win10 react-native环境搭建            
------------------------------------
>首先不得不先吐槽一下自己，一个坑总是踩很多次，且乐此不疲。
咋办? 写博客记录记录呗。               

## 零、记录的点    
1. Java环境的下载与配置

2. Android环境的下载与配置

3. Node环境的下载与配置

4. 创建第一个react-native应用  

最终能够达到的目的：在手机上能够运行第一个React-Native应用~

以备后用，已将安装包上传到了[网盘](http://pan.baidu.com/s/1dFgLPuT) 密码：bqbc              

![图片](https://dn-coding-net-production-pp.qbox.me/f5d0a6f2-9324-4899-9378-0da577a5b33d.png)        
<!--more-->
## 一、Java环境的下载与配置      

记录下Java里面的三个[术语理解](http://blog.csdn.net/songkai320/article/details/51819046)    

#### JDK是什么？                     

>答曰：JDK乃【Java开发工具包】 (Java Development Kit ) 的缩写,
>是一种用于构建在 Java 平台上发布的应用程序、applet 和组件的开发环境

### JRE是什么？  

>答曰：JRE乃【Java运行环境】(Java Runtime Environment)的缩写,
>其包含JVM标准实现及Java核心类库

### JVM是什么？

>答曰：JVM是【Java虚拟机】(Java Virtual Machine)的缩写

### 下载安装配置JDK

1. 到[官网](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) 或者[android-studio](http://jdk.android-studio.org/)下载JDK                
2. 安装JDK，我安装到的`D:\Software\JavaJdk` 
3. 必须得配置环境变量滴
    ①java_home:`D:\Software\JavaJdk` 
    ②classpath(.;开头):`.;%java_home%\lib\dt.jar;%java_home%\lib\tools.jar`
    ③追加path变量的值:`;%java_home%\bin`
 ![图片](https://dn-coding-net-production-pp.qbox.me/d5996b21-1403-4e67-ba41-8e647ea2cc2b.png) 

## 二、Android环境的下载与配置  

### 下载Android SDK
---------------------------------
到[android-studio](http://tools.android-studio.org/index.php/sdk)下载SDK。     
运行installer_r24.4.1-windows.exe安装、或zip解压出来的`SDK Manager.exe`        

![图片](https://dn-coding-net-production-pp.qbox.me/407332aa-a5ee-40da-aefa-1de323e107fd.png) 

然后我安装了以下这些包(我的react-native版本是0.40.0)

![图片](https://dn-coding-net-production-pp.qbox.me/e47c55bd-0f90-443c-bf16-c8860c8b726e.png)     

### SDKManager使用说明： 
---------------------------------
被镜像坑了，所以不推荐镜像，直接修改hosts文件就成--->[去找最新的hosts](https://laod.cn)    
镜像地址--->[去找最新的镜像地址](http://tools.android-studio.org/index.php/proxy)    

### 镜像使用说明      
---------------------------------
使用镜像安装不了23.0.1的同学趁早换hosts的方式或者挂vpn。     

![图片](https://dn-coding-net-production-pp.qbox.me/a37b209b-56ba-4329-a044-a55429ef75b8.png)     
     
科学上网还是得备个vpn呐~~~     

![图片](https://dn-coding-net-production-pp.qbox.me/d6a81e25-2b2c-40a0-bd85-dd70644f5de6.png) 

### SDK包下好了，接下来就配置系统环境变量吧     
--------------------------------
①ANDROID_HOME:`D:\Software\JavaAndroidSdk` 
②追加path变量的值:`%ANDROID_HOME%\platforms\;%ANDROID_HOME%\platform-tools\;%ANDROID_HOME%\tools\;%ANDROID_HOME%;` 
我的Path图

![图片](https://dn-coding-net-production-pp.qbox.me/d63ba276-04c3-44df-bb6e-fd6b41972e1a.png) 

### 测试Java环境，Android环境
--------------------------------
![图片](https://dn-coding-net-production-pp.qbox.me/2c7e4384-a916-42af-9cff-51701bd7c882.png)     

失败自行回退检查~~

## 三、安装node.js

node官网历史版本修改下载链接的值就能下载历史版本了
如：我使用的是版本是[V6.2.0](https://nodejs.org/dist/v6.2.0/node-v6.2.0-x64.msi)      
然后就是node的一些设置了      
`npm config set prefix "D:\Program Files\nodejs\node_global"`  //设置全局包目录   
`npm config set cache "D:\Program Files\nodejs\node_cache"`    //设置缓存目录
`npm config set registry https://registry.npm.taobao.org"`     //设置淘宝镜像

之前有安装过node，卸载旧版重新安装到之前的目录就==升级了
npm升级命令`npm update`

## 四、创建第一个在手机上运行的react-native应用

1. 启动CMD定位到开发目录：例`F:\ReactDemo`
2. 全局安装[`npm install -g react-native-cli`](https://github.com/facebook/react-native)
3. 初始化一个项目：`react-native init yimoapp`
4. `cd yimoapp`
5. 运行packager：`react-native start`  
    >如果你碰到了ERROR Watcher took too long to load的报错，请尝试将这个文件中的MAX_WAIT_TIME值改得更大一些 (文件在node_modules/react-native/目录下)。        
    >成功运行这时候可以用浏览器访问<bdi>http//localhost:8081/index.android.bundle?platform=android</bdi>查看服务端是否已成功启动
6. 真机运行,使用usb连接手机，开启USB调试权限
7. 查看连接的设备：`adb devices`
     ![图片](https://dn-coding-net-production-pp.qbox.me/6130f787-3bf3-437b-a353-746550210595.png) 
8. `react-native run-android`构建工程并自动安装到手机
    > 不要慌，先做点准备工作。[手动下载gradle-2.4-all.zip](http://gradle.android-studio.org/)到本地                
    > 修改 `F:\ReactDemo\yimoapp\android\gradle\wrapper\gradle-wrapper.properties`文件的`distributionUrl`配置为[本地的gradle-2.4-all.zip路径]以使其可离线下载    
    >![gradle-2.4-all配置图](https://dn-coding-net-production-pp.qbox.me/7bf85be0-1f5a-4ec2-be7a-ba93e2740b8f.png) 
    > ![成功离线下载](https://dn-coding-net-production-pp.qbox.me/adf94677-334f-4832-aed5-46f9d1cbac08.png) 

9. 包安装得差不多的时候会提示你安装应用
    ![图片](https://dn-coding-net-production-pp.qbox.me/5772db37-212f-4d62-b85f-9182d228dab7.png) 
    可能会有一个这样的错误，奇怪的是第一次安装有,这一次安装就没有遇到了。
     
     ![图片](https://dn-coding-net-production-pp.qbox.me/495d3c84-c3e8-49d3-9bc2-c24f5cd2e27d.png) 
    将android/build.gradle文件中的 classpath 'com.android.tools.build:gradle:1.3.1' 改为 classpath 'com.android.tools.build:gradle:1.2.3' 。猜测是插件包不兼容导致。
10. 解决白屏问题
    找到并开启应用的悬浮窗权限,以mui8.1为例，设置->授权管理->应用权限管理->yimoapp->勾选显示浮窗权限
    然后再次打开yimoapp。我去。这次来个大红色的错误了
    
    ![图片](https://dn-coding-net-production-pp.qbox.me/bbc9f9bd-a116-4e9f-a1cc-f439cd7266cc.png) 
    
    咋办。摇一摇说不定有奇迹
    
    ![图片](https://dn-coding-net-production-pp.qbox.me/4ea624fe-1062-452e-b0c2-6e91b84202b1.png) 
    ![图片](https://dn-coding-net-production-pp.qbox.me/835cf850-602f-47c7-8d67-4bb5bb0225c9.png) 
    
    在回退刷新前。我去改了改`index.android.js`，好了回到页面摇一摇然后刷新    

    ![图片](https://dn-coding-net-production-pp.qbox.me/180e6277-28ea-4f81-afdb-c4d379db529b.png)         


## 总结与收获

总结是很有必要的。   
有很多问题是在Java和Android环境没有弄好的情况下会出现的。
参考文章：
1. http://www.tuicool.com/articles/26byiuZ 这里面的错我也都遇到过~~
2. http://www.cnblogs.com/suxun/p/5220564.html 有配置模拟器的





一天就这样结束，一天就这样开始。





