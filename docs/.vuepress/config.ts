/*
 * @Author: 秦真
 * @Date: 2022-02-24 15:20:40
 * @LastEditors: Do not edit
 * @LastEditTime: 2022-02-24 17:39:50
 * @Description: 
 * @FilePath: /bgy-component/docs/.vuepress/config.ts
 */
import { resolve } from 'path'
import {  defineConfig} from 'vuepress/config'

export default defineConfig({
  title: 'BgyComponent',
  description: '基于 Ant Design Vue 封装，快速开发中后台系统页面',

  head: [['link', { rel: 'icon', href: '/images/favicon.ico' }]],

  // 主题和它的配置
  // theme: '@vuepress/theme-default',
  themeConfig: {
    logo: '/images/logo.png',

    search: false,

    nav: [
      {
        text: '指南',
        link: '/guide/',
        target: '_self'
      },
      {
        text: '参考',
        items: [
          {
            text: 'Vue2',
            link: 'https://v2.vuejs.org/'
          },
          {
            text: 'Ant Design Vue',
            link: 'https://www.antdv.com/'
          }
        ]
      }
    ],

    // 参考地址
    repoLabel: 'GitLab',
    repo: 'http://39.108.40.223:666/xuxuan02/component-lib.git',

    // 文档仓库等信息
    // docsRepo: 'http://39.108.40.223:666/fronted/lib-docs',
    // docsBranch: 'master',
    docsDir: 'docs',
    editLinks: true,
    editLinkText: '帮助我们改善此页面',
    // editLinkPattern: ':repo/-/edit/:branch/:path',
    lastUpdated: '上次更新',

    smoothScroll: true,
    // contributorsText: '贡献者',

    // tip: '提示',
    // warning: '注意',
    // danger: '危险',

    // backToHome: '返回首页',
    // openInNewWindow: '新窗口中打开',
    // toggleDarkMode: '夜间模式切换',
    // toggleSidebar: '切换侧边栏',

    // 侧边栏配置
    sidebar: [
      {
        title: '介绍',
        path: '/guide/'
      },
      {
        title: '快速上手',
        path: '/guide/getting-started'
      },
      {
        title: '组件',
        collapsable: false,
        path: '/component/crud/',
        children: [
          ['/component/crud/', 'crud'],
          ['/component/item/', 'item']
        ]
      },
      {
        title: '指令',
        collapsable: false,
        path: '/directive/modal',
        children: [['/directive/modal', 'v-modal']]
      },
      {
        title: '过滤器',
        collapsable: false,
        path: '/filter/amount',
        children: [['/filter/amount', 'amount']]
      },
      {
        title: 'Feature',
        path: '/feature/'
      }
    ]
  },
  markdown: {
    lineNumbers: true
  },
  plugins: [
    [
      '@vuepress/register-components',
      {
        componentsDir: resolve(__dirname, 'src/index.js')
      }
    ],
    'demo-container'
  ]
})
