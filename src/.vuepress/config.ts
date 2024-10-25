import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "易墨网",
  description: "一个程序猿的博客记录",

  theme,

  markdown: {
    headers: {
      // 用到哪一级就提取哪一级
      level: [2, 3, 4, 5],
    },
  },
  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
