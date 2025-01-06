---
icon: link
title: 友情链接
description: 来都来了，交个朋友吧

links:
  - name: szhshp 的第三边境研究所
    desc: 心驰寰宇, 不落尘俗.
    logo: https://szhshp.org/favicon.ico
    url: https://szhshp.org
    preview: /assets/images/preview/szhshp.png

banner: /logo.svg
---

> 来都来了，交个朋友吧

## 友情链接

<SiteInfo
  v-for="item in $frontmatter.links"
  :key="item.link"
  v-bind="item"
/>
