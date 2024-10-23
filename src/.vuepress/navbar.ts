import { navbar } from "vuepress-theme-hope";
//图标配置：https://fontawesome.com/search?q=article&o=r&m=free
export default navbar([
  "/",
  {
    text: "随笔",
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
        link: "zhontai/",
      },
      {
        text: "DevOps 项目实践",
        link: "devops/",
      },
    ],
  },
  {
    text: "一些项目",
    icon: "star",
    prefix: "/project/",
    children: [
      {
        text: "Emo.Dev 代码生成器",
        link: "https://github.com/yimogit/Emo.Dev",
      },
    ],
  },
  {
    text: "一些玩具",
    icon: "sliders",
    prefix: "/tools/",
    children: [
      {
        text: "metools-plugin",
        link: "https://github.com/yimogit/metools-plugin",
      },
      {
        text: "vue-mui-app",
        link: "https://github.com/yimogit/vue-mui-app",
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
