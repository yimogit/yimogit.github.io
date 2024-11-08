import { hopeTheme } from "vuepress-theme-hope";
import navbar from "./navbar.js";
import sidebar from "./sidebar.js";

export default hopeTheme({
  hostname: "https://www.yimo.link",

  author: {
    name: "易墨",
    url: "https://www.yimo.link",
  },

  iconAssets: "fontawesome-with-brands",

  logo: "/logo.svg",
  favicon: "favicon.ico",
  repo: "yimogit/yimogit.github.io",

  docsDir: "src",

  // 导航栏
  navbar,
  navbarLayout: {
    start: ["Brand"],
    center: ["Links"],
    end: ["Language", "Repo", "Outlook", "Search"],
  },
  //导航栏层级
  headerDepth: 4,
  // 侧边栏
  sidebar,
  //侧边栏排序
  sidebarSorter: ["readme", "order", "date", "filename", "title"],
  // 页脚
  footer: `欢迎来到易墨网！<a href='https://beian.miit.gov.cn/shouye.html' target='_blank'>蜀ICP备15032981号</a>
        本文总阅读量 <span id="vercount_value_page_pv">Loading</span> 次
        本站总访问量 <span id="vercount_value_site_pv">Loading</span> 次
        本站总访客数 <span id="vercount_value_site_uv">Loading</span> 人`,
  displayFooter: true,
  darkmode: "toggle",
  // 博客相关
  blog: {
    description: "一个全栈程序猿",
    intro: "/intro.html",
    timeline: "未来",
    medias: {
      Github: "https://github.com/yimogit",
      Juejin: {
        icon: "https://www.yimo.link/juejin.svg",
        link: "https://juejin.cn/user/254742426303544/posts",
      },
      Cnblogs: {
        icon: "https://www.yimo.link/cnblogs.svg",
        link: "https://morang.cnblogs.com/",
      },
      Email: "mailto:wsyimo@qq.com",
    },
  },

  // 加密配置
  encrypt: {
    config: {
      "/demo/encrypt.html": ["1234"],
    },
  },

  // 多语言配置
  metaLocales: {
    editLink: "编辑此页",
  },

  // 如果想要实时查看任何改变，启用它。注: 这对更新性能有很大负面影响
  // hotReload: true,

  // 在这里配置主题提供的插件
  plugins: {
    watermark: true,
    searchPro: true,
    blog: true,
    comment: {
      provider: "Giscus",
      repo:"yimogit/yimogit.github.io",
      repoId:"MDEwOlJlcG9zaXRvcnk5MTIzNDA1Mg==",
      category:"General",
      categoryId:"DIC_kwDOBXAfBM4CkFJf",
      mapping:"pathname",
      strict: true,
      reactionsEnabled:true,
      inputPosition:"top",
      lightTheme:"light",
      darkTheme:"dark",
      lazyLoading: true,
    },
    components: {
      components: ["Badge", "VPCard"],
    },

    // 此处开启了很多功能用于演示，你应仅保留用到的功能。
    markdownImage: {
      figure: true,
      lazyload: true,
      size: true,
    },

    // markdownMath: {
    //   // 启用前安装 katex
    //   type: "katex",
    //   // 或者安装 mathjax-full
    //   type: "mathjax",
    // },

    // 此功能被开启用于演示，你应仅当使用时保留。
    markdownTab: true,

    // 此处开启了很多功能用于演示，你应仅保留用到的功能。
    mdEnhance: {
      align: true,
      attrs: true,
      component: true,
      demo: true,
      include: true,
      mark: true,
      plantuml: true,
      spoiler: true,
      stylize: [
        {
          matcher: "Recommended",
          replacer: ({ tag }) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: { type: "tip" },
                content: "Recommended",
              };
          },
        },
      ],
      sub: true,
      sup: true,
      tasklist: true,
      vPre: true,

      // 在启用之前安装 chart.js
      // chart: true,

      // insert component easily

      // 在启用之前安装 echarts
      // echarts: true,

      // 在启用之前安装 flowchart.ts
      // flowchart: true,

      // gfm requires mathjax-full to provide tex support
      // gfm: true,

      // 在启用之前安装 mermaid
      // mermaid: true,

      // playground: {
      //   presets: ["ts", "vue"],
      // },

      // 在启用之前安装 @vue/repl
      // vuePlayground: true,

      // install sandpack-vue3 before enabling it
      // sandpack: true,
    },

    // 如果你需要 PWA。安装 @vuepress/plugin-pwa 并取消下方注释
    // pwa: {
    //   favicon: "/favicon.ico",
    //   cacheHTML: true,
    //   cacheImage: true,
    //   appendBase: true,
    //   apple: {
    //     icon: "/assets/icon/apple-icon-152.png",
    //     statusBarColor: "black",
    //   },
    //   msTile: {
    //     image: "/assets/icon/ms-icon-144.png",
    //     color: "#ffffff",
    //   },
    //   manifest: {
    //     icons: [
    //       {
    //         src: "/assets/icon/chrome-mask-512.png",
    //         sizes: "512x512",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-mask-192.png",
    //         sizes: "192x192",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-512.png",
    //         sizes: "512x512",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-192.png",
    //         sizes: "192x192",
    //         type: "image/png",
    //       },
    //     ],
    //     shortcuts: [
    //       {
    //         name: "Demo",
    //         short_name: "Demo",
    //         url: "/demo/",
    //         icons: [
    //           {
    //             src: "/assets/icon/guide-maskable.png",
    //             sizes: "192x192",
    //             purpose: "maskable",
    //             type: "image/png",
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // },

    // 如果你需要幻灯片，安装 @vuepress/plugin-revealjs 并取消下方注释
    // revealjs: {
    //   plugins: ["highlight", "math", "search", "notes", "zoom"],
    // },
  },
  lastUpdated: false,
});
