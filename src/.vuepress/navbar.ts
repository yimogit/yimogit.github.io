import { navbar } from "vuepress-theme-hope";
//图标配置：https://fontawesome.com/search?q=article&o=r&m=free
export default navbar([
  "/",
  {
    text: "文章",
    icon: "book",
    link: "/article/",
  },
  {
    text: "时间轴",
    icon: "timeline",
    link: "/timeline/",
  },
  {
    text: "合集",
    icon: "newspaper",
    prefix: "/posts/",
    children: ["admincore/","devops/","developer/","web/","docker/","dotnetcore/"]
  },
  {
    text: "一些轮子",
    icon: "sliders",
    prefix: "/tools/",
    children: [
      {
        text: "CoverView 封面生成器",
        link: "https://coverview.yimo.link",
      },
      {
        text: "MeTools 日常工具集",
        link: "https://github.com/yimogit/metools-plugin",
      },
      {
        text: "一些尝试",
        children: [
          {
            text: "代码生成器",
            link: "https://github.com/yimogit/Emo.Dev",
          },
          {
            text: "模板替换工具",
            link: "https://github.com/yimogit/ExcelDocTxtTemplateReplace",
          },
          {
            text: "一个自动化签到程序",
            link: "https://github.com/yimogit/YimoCustomizedSign",
          },
          {
            text: "vue 模板封装",
            link: "https://github.com/yimogit/vue-template",
          },
          {
            text: "vue-layui 封装",
            link: "https://github.com/yimogit/vue-layui",
          },
          {
            text: "vue-ElementUI 模板封装",
            link: "https://github.com/yimogit/me-admin-template",
          },
          {
            text: "vue-ElementUI npm包封装",
            link: "https://github.com/yimogit/me-admin-sdk",
          },
          {
            text: "vue 项目经验总结",
            link: "https://github.com/yimogit/vue-project-summary",
          },
        ],
      },
    ],
  },
  {
    text: "友链",
    icon: "link",
    link: "/link",
  },
  {
    text: "关于我",
    icon: "circle-info",
    link: "/intro",
  }
]);
