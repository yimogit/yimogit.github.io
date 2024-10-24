import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "易墨网",
  description: "一个程序猿的博客记录",

  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
