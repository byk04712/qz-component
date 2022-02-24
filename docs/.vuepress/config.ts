/*
 * @Author: 秦真
 * @Date: 2022-02-21 09:52:53
 * @LastEditors: Do not edit
 * @LastEditTime: 2022-02-23 19:12:52
 * @Description: 
 * @FilePath: \bgy-component-docs\docs\.vuepress\config.js
 */
 
module.exports = {
  // 站点配置
  lang: "zh-CN",
  title: "BgyComponent",
  description: "基于 Ant Design Vue 封装，快速开发中后台系统页面",

  head: [["link", { rel: "icon", href: "/images/favicon.ico" }]],

  // 主题和它的配置
  theme: "@vuepress/theme-default",
  themeConfig: {
    logo: "/images/logo.png",
    navbar: [
      {
        text: "指南",
        link: "/guide/",
      },
      {
        text: "参考",
        children: [
          {
            text: "Vue",
            link: "https://v2.vuejs.org/",
          },
          {
            text: "Ant Design Vue",
            link: "https://www.antdv.com/",
          },
        ],
      },
      {
        text: "当前版本",
        children: [
          {
            text: "for Vue2.x",
            link: "/guide",
            // 该元素将一直处于激活状态
            activeMatch: "^/v2/",
          },
          {
            text: "for Vue3.x",
            link: "/v3/guide/",
            // 该元素在当前路由路径是 /foo/ 开头时激活
            // 支持正则表达式
            activeMatch: "^/v3/guide",
          },
        ],
      },
    ],

    // 参考地址
    repoLabel: "GitLab",
    repo: "http://39.108.40.223:666/xuxuan02/component-lib.git",

    // 文档仓库等信息
    docsRepo: "http://39.108.40.223:666/fronted/lib-docs",
    docsBranch: "master",
    docsDir: "docs",
    editLink: true,
    editLinkText: "在 GitLab 上编辑此页",
    editLinkPattern: ":repo/-/edit/:branch/:path",
    lastUpdatedText: "上次更新",
    contributorsText: "贡献者",

    tip: "提示",
    warning: "注意",
    danger: "危险",

    backToHome: "返回首页",
    openInNewWindow: "新窗口中打开",
    toggleDarkMode: "夜间模式切换",
    toggleSidebar: "切换侧边栏",

    // 侧边栏配置
    sidebar: [
      {
        text: "介绍",
        link: "/guide/",
      },
      {
        text: "快速上手",
        link: "/guide/getting-started",
      },
      {
        text: "组件",
        link: "/component/crud",
        children: [
          {
            text: "crud",
            link: "/component/crud",
          },
        ],
      },
      {
        text: "指令",
        link: "/directive/modal",
        children: [
          {
            text: "v-modal",
            link: "/directive/modal",
          },
        ],
      },
      {
        text: "过滤器",
        link: "/filter/amount",
        children: [
          {
            text: "amount",
            link: "/filter/amount",
          },
        ],
      },
      {
        text: "Feature",
        link: "/feature/",
      },
    ],
  },

  plugins: ["@vuepress/register-components"],
}