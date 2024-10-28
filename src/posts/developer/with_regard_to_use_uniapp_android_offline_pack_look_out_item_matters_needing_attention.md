---
title: 关于使用uniapp时Android 离线打包的注意事项
date: 2021-01-18 15:41:00
category:
  - Developer
---

## Android 离线打包

文档地址： https://nativesupport.dcloud.net.cn/AppDocs/usesdk/android

### 注意事项：

- 添加权限，需要将 uniapp 项目中 manifest.json 配置的权限 app-plus/distribute/android/permissions 同步到 \app\src\main\AndroidManifest.xml
- 根据文档配置需要的模块
- 录音需要复制 libs/audio-mp3aac-release.aar
- 注意 dcloud_properties.xml 中的 feature 不要重复配置
- 添加推送模块时报错 `Cause: duplicate entry: META-INF/MANIFEST.MF` 修改 build.gradle:
  ```
  dependencies {
      //  classpath 'com.android.tools.build:gradle:3.5.2'
          classpath 'com.android.tools.build:gradle:3.5.4'
      }
  ```

另外需要注意的时，hbuilder的版本问题。不同版本可能行为不一致。具体参考官网说明。

### 离线SDK集成uni-app问题汇总
如果出现部分tab上图标不显示问题，请下载最新SDK，更新SDK目录/SDK/assets/data/下所有文件（尤其是目录下.dat文件）。
如果出现tabbar或者标题栏不显示的问题，检查是否添加gif依赖！2.2.0之后将gif库单独提出来作为一个单独的aar引用。
解决UniPush或个推上传google play违反相关政策的问题，参考链接

### 离线SDK集成uni-app白屏问题汇总
如果出现白屏问题，请检测appid是否一致。
如果在appid一致的情况下仍旧出现白屏现象，请确保Androidmanifest.xml中manifest节点下的package属性与build.gradle中的applicationId一致！
如果appid一致的情况下依旧白屏，请确保ndk配置为armeabi-v7a或者arm64-v8a或者x86.

