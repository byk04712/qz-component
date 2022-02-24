export const data = {
  "key": "v-8daa1a0e",
  "path": "/",
  "title": "首页",
  "lang": "zh-CN",
  "frontmatter": {
    "home": true,
    "description": "基于 Ant Design Vue 封装，快速开发中后台系统页面",
    "title": "首页",
    "heroImage": "/images/logo.png",
    "tagline": "基于 Ant Design Vue 封装，快速开发中后台系统页面",
    "actions": [
      {
        "text": "快速上手",
        "link": "/guide/getting-started",
        "type": "primary"
      },
      {
        "text": "项目简介",
        "link": "/guide/",
        "type": "secondary"
      }
    ],
    "features": [
      {
        "title": "简洁至上",
        "details": "以配置为中心的项目结构，以最少的配置帮助你专注于页面开发。"
      },
      {
        "title": "基于 Ant Design Vue",
        "details": "在Ant Design Vue上进行封装扩展组件封装，尽可能的减少学习成本，照着文档示例即可轻松上手开发。"
      },
      {
        "title": "We want you",
        "details": "站在巨人的肩膀上，我们可以看得更远。诚邀你的参与，为项目添砖加瓦。"
      }
    ],
    "footer": "MIT Licensed | Copyright © 2022-present qinzhen09@countrygarden.com.cn"
  },
  "excerpt": "",
  "headers": [
    {
      "level": 3,
      "title": "引入简单",
      "slug": "引入简单",
      "children": []
    }
  ],
  "git": {
    "updatedTime": 1645430028000,
    "contributors": [
      {
        "name": "秦真",
        "email": "qinzhen09@countrygarden.com.cn",
        "commits": 2
      }
    ]
  },
  "filePathRelative": "README.md"
}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
