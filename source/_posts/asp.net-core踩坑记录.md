---
title: asp.net-core踩坑记录
date: '2017-07-09 12:40'
categories:
  - 全栈
tags: 
  - netcore
---

> 系统：win10  
> VS版本：2017
> .NET Core 版本： 1.1

## 零.读取配置文件
> 参考：http://www.tuicool.com/articles/QfYVBvi
0. 此版本无需添加其他组件
1. 在`appsettings.json`配置中添加节点AppSettings
     ![图片](https://dn-coding-net-production-pp.qbox.me/6e12aae7-7ebd-486f-8775-e80c989eae97.png)
2. 添加配置文件的映射模型
     ![图片](https://dn-coding-net-production-pp.qbox.me/ea4ac89a-7e83-4a90-a514-ab3f4c453af1.png) 
3. 在Startup.cs  ConfigureServices方法中注册
 ![图片](https://dn-coding-net-production-pp.qbox.me/7cac2c8c-c374-4558-b49f-9c963fe69906.png) 

            services.AddOptions();
            services.Configure<AppSettings>(Configuration.GetSection("AppSettings"));
<!--more-->
4. Controller中使用
    ![图片](https://dn-coding-net-production-pp.qbox.me/976314e3-77a4-4a42-844e-e42bfcd748b3.png) 

## 一、登录记录session
> 参考：http://www.cnblogs.com/fonour/p/5943401.html

## 二、发布.net core1.1.2网站到windos服务器
> 参考：https://docs.microsoft.com/en-us/aspnet/core/publishing/iis
> 0. 我的服务器是windows server 2012 ,.net core网站版本为1.1.2
> 1. 经安装好iis
> 2. 下载安装： 
      [.NET Core Windows Server Hosting](https://go.microsoft.com/fwlink/?linkid=848766) 
      [Microsoft Visual C++ 2015 Redistributable Update 3](https://www.microsoft.com/en-us/download/details.aspx?id=53840)
 ![图片](https://dn-coding-net-production-pp.qbox.me/a0318ad1-a06e-413e-9412-52b30149a516.png) 
> 3. 发布.net core网站到IIS，并将应用池的.NET CLR版本修改为[无托管代码]
 ![图片](https://dn-coding-net-production-pp.qbox.me/d0ccf5ba-0535-4832-a239-dcb1a5686ae3.png) 

## 三、DES加密解密算法
> 亲测可用

      public class SecurityHelper
      {
          #region 加密解密法一
          //默认密钥向量 
          private static byte[] Keys = { 0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0A, 0x0B, 0x0C, 0x0D, 0x0E, 0x0F };
          /// <summary> 
          /// DES加密字符串 
          /// </summary> 
          /// <param name="encryptString">待加密的字符串</param> 
          /// <param name="encryptKey">加密密钥,要求为16位</param> 
          /// <returns>加密成功返回加密后的字符串，失败返回源串</returns> 
          public static string EncryptDES(string encryptString, string encryptKey = "Key123Ace#321Key")
          {
              try
              {
                  byte[] rgbKey = Encoding.UTF8.GetBytes(encryptKey.Substring(0, 16));
                  byte[] rgbIV = Keys;
                  byte[] inputByteArray = Encoding.UTF8.GetBytes(encryptString);
                  var DCSP = Aes.Create();
                  MemoryStream mStream = new MemoryStream();
                  CryptoStream cStream = new CryptoStream(mStream, DCSP.CreateEncryptor(rgbKey, rgbIV), CryptoStreamMode.Write);
                  cStream.Write(inputByteArray, 0, inputByteArray.Length);
                  cStream.FlushFinalBlock();
                  return Convert.ToBase64String(mStream.ToArray());
              }
              catch (Exception ex)
              {
                  return ex.Message + encryptString;
              }
          }
          /// <summary> 
          /// DES解密字符串 
          /// </summary> 
          /// <param name="decryptString">待解密的字符串</param> 
          /// <param name="decryptKey">解密密钥,要求为16位,和加密密钥相同</param> 
          /// <returns>解密成功返回解密后的字符串，失败返源串</returns> 
          public static string DecryptDES(string decryptString, string decryptKey = "Key123Ace#321Key")
          {
              try
              {
                  byte[] rgbKey = Encoding.UTF8.GetBytes(decryptKey.Substring(0, 16));
                  byte[] rgbIV = Keys;
                  byte[] inputByteArray = Convert.FromBase64String(decryptString);
                  var DCSP = Aes.Create();
                  MemoryStream mStream = new MemoryStream();
                  CryptoStream cStream = new CryptoStream(mStream, DCSP.CreateDecryptor(rgbKey, rgbIV), CryptoStreamMode.Write);
                  Byte[] inputByteArrays = new byte[inputByteArray.Length];
                  cStream.Write(inputByteArray, 0, inputByteArray.Length);
                  cStream.FlushFinalBlock();
                  return Encoding.UTF8.GetString(mStream.ToArray());
              }
              catch (Exception ex)
              {
                  return ex.Message + decryptString;
              }
          }
          #endregion 
      }

## 四、过滤器定义
> 继承Attribute,实现IActionFilter即可
> 简单校验登录,获取cookie值并解密后得到用户名,未登录则跳转登录(ApplicationKey为自定义的类存放)

        public class UserCheckFilterAttribute : Attribute, IActionFilter
        {
            public void OnActionExecuted(ActionExecutedContext context)
            {
            }
            public void OnActionExecuting(ActionExecutingContext filterContext)
            {
                string encryptValue = "";
                filterContext.HttpContext.Request.Cookies.TryGetValue(ApplicationKey.User_Cookie_Key, out encryptValue);
                if (encryptValue == null)
                {
                    filterContext.Result = new RedirectResult("/Account/Login");
                    return;
                }
                var userName = SecurityHelper.DecryptDES(encryptValue, ApplicationKey.User_Cookie_Encryption_Key);
                if (string.IsNullOrEmpty(userName))
                {
                    filterContext.Result = new RedirectResult("/Account/Login");
                    return;
                }
            }
        }

## 注入服务
> `Startup.cs`中的`ConfigureServices`方法调用`services.AddTransient<IUserService,UserService>();`注册服务
 ![图片](https://dn-coding-net-production-pp.qbox.me/7f9d0747-a9bf-4be3-89d8-5d87123c5b4d.png) 
