export const themeData = {
  "logo": "/images/logo.png",
  "navbar": [
    {
      "text": "指南",
      "link": "/guide/"
    },
    {
      "text": "参考",
      "children": [
        {
          "text": "Vue",
          "link": "https://v2.vuejs.org/"
        },
        {
          "text": "Ant Design Vue",
          "link": "https://www.antdv.com/"
        }
      ]
    },
    {
      "text": "当前版本",
      "children": [
        {
          "text": "for Vue2.x",
          "link": "/guide",
          "activeMatch": "^/v2/"
        },
        {
          "text": "for Vue3.x",
          "link": "/v3/guide/",
          "activeMatch": "^/v3/guide"
        }
      ]
    }
  ],
  "repoLabel": "GitLab",
  "repo": "http://39.108.40.223:666/xuxuan02/component-lib.git",
  "docsRepo": "http://39.108.40.223:666/fronted/lib-docs",
  "docsBranch": "master",
  "docsDir": "docs",
  "editLink": true,
  "editLinkText": "在 GitLab 上编辑此页",
  "editLinkPattern": ":repo/-/edit/:branch/:path",
  "lastUpdatedText": "上次更新",
  "contributorsText": "贡献者",
  "tip": "提示",
  "warning": "注意",
  "danger": "危险",
  "backToHome": "返回首页",
  "openInNewWindow": "新窗口中打开",
  "toggleDarkMode": "夜间模式切换",
  "toggleSidebar": "切换侧边栏",
  "sidebar": [
    {
      "text": "介绍",
      "link": "/guide/"
    },
    {
      "text": "快速上手",
      "link": "/guide/getting-started"
    },
    {
      "text": "组件",
      "link": "/component/crud",
      "children": [
        {
          "text": "crud",
          "link": "/component/crud"
        }
      ]
    },
    {
      "text": "指令",
      "link": "/directive/modal",
      "children": [
        {
          "text": "v-modal",
          "link": "/directive/modal"
        }
      ]
    },
    {
      "text": "过滤器",
      "link": "/filter/amount",
      "children": [
        {
          "text": "amount",
          "link": "/filter/amount"
        }
      ]
    },
    {
      "text": "Feature",
      "link": "/feature/"
    }
  ],
  "locales": {
    "/": {
      "selectLanguageName": "English"
    }
  },
  "darkMode": true,
  "selectLanguageText": "Languages",
  "selectLanguageAriaLabel": "Select language",
  "sidebarDepth": 2,
  "lastUpdated": true,
  "contributors": true,
  "notFound": [
    "There's nothing here.",
    "How did we get here?",
    "That's a Four-Oh-Four.",
    "Looks like we've got some broken links."
  ]
}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateThemeData) {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ themeData }) => {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  })
}
