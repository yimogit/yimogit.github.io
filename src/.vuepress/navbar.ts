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
    children: [
      {
        text: "Admin.Core 中台项目实践",
        link: "admincore/",
      },
      {
        text: "DevOps 项目实践",
        link: "devops/",
      },
    ],
  },
  // {
  //   text: "一些项目",
  //   icon: "star",
  //   prefix: "/project/",
  //   children: [
  //     {
  //       text: "Emo.Dev 代码生成器",
  //       link: "https://github.com/yimogit/Emo.Dev",
  //     },
  //   ],
  // },
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
  // "/demo/",
  // {
  //   text: "博文",
  //   icon: "pen-to-square",
  //   prefix: "/posts/",
  //   children: [
  //     {
  //       text: "苹果",
  //       icon: "pen-to-square",
  //       prefix: "apple/",
  //       children: [
  //         { text: "苹果1", icon: "pen-to-square", link: "1" },
  //         { text: "苹果2", icon: "pen-to-square", link: "2" },
  //         "3",
  //         "4",
  //       ],
  //     },
  //     {
  //       text: "香蕉",
  //       icon: "pen-to-square",
  //       prefix: "banana/",
  //       children: [
  //         {
  //           text: "香蕉 1",
  //           icon: "pen-to-square",
  //           link: "1",
  //         },
  //         {
  //           text: "香蕉 2",
  //           icon: "pen-to-square",
  //           link: "2",
  //         },
  //         "3",
  //         "4",
  //       ],
  //     },
  //     { text: "樱桃", icon: "pen-to-square", link: "cherry" },
  //     { text: "火龙果", icon: "pen-to-square", link: "dragonfruit" },
  //     "tomato",
  //     "strawberry",
  //   ],
  // },
  // {
  //   text: "V2 文档",
  //   icon: "book",
  //   link: "https://theme-hope.vuejs.press/zh/",
  // },
]);
