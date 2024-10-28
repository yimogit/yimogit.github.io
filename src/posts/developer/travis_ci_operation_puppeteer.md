---
title: travis-ci 中运行 puppeteer
date: 2018-06-26 09:06:00
category:
  - Developer
tag:
  - node
---

> 通过 travis-ci 可以构建基于 puppeteer 的自动化任务，基于此构建的一个 [计划任务](https://github.com/yimogit/autotask_puppeteer)



## puppeteer中调用需要禁用沙箱环境



> https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md#running-puppeteer-on-travis-ci



```

const browser = await puppeteer.launch({args: ['--no-sandbox']});

```



## .travis.yml 文件的配置



> https://stackoverflow.com/questions/50682848/puppeteer-travis-ci-chrome-headless-not-working



```

language: node_js

node_js:

  - "9"

dist: trusty

sudo: false  

addons:

  chrome: stable

before_install:

  - google-chrome-stable --headless --disable-gpu --remote-debugging-port=9222 http://localhost &

cache:

  yarn: true

  directories:

    - node_modules



install:

  - yarn install



script:

  - node -v



branches:

  only:

    - master

env:

 global:

```
