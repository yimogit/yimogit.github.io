import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "易墨网",
  description: "一个程序猿的博客记录",
  head: [
    ["script", { src: "https://cn.vercount.one/js", defer: "true" }],
    ["script", { src: "https://cloud.umami.is/script.js","data-website-id":"2d883236-5598-4088-9cf8-1663e4962d52", defer: "true" }],
  ],
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
