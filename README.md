
## 创建文章
```
hexo new 文章名称
```

## 生成静态页面
```
hexo generate
```

## 启动本地服务器预览

```
hexo server
```

## 提交到github
1. 配置_config.yml中的deploy配置

    ```
        ## Docs: https://hexo.io/docs/deployment.html
        deploy:
        type: git
        repo: https://github.com/地址.git
        branch: master
    ```
2. 若提示`ERROR Deployer not found: git`则应安装`hexo-deployer-git`    
    执行`npm install hexo-deployer-git --save`

3. hexo deploy

Coding：https://yimocoding.coding.me/
Github: https://yimogit.github.io/

使用的主题：https://github.com/stkevintan/hexo-theme-material-flow