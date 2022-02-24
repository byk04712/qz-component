export const data = {
  "key": "v-fffb8e28",
  "path": "/guide/",
  "title": "介绍",
  "lang": "zh-CN",
  "frontmatter": {
    "title": "介绍"
  },
  "excerpt": "",
  "headers": [
    {
      "level": 3,
      "title": "特性",
      "slug": "特性",
      "children": []
    },
    {
      "level": 3,
      "title": "如何贡献",
      "slug": "如何贡献",
      "children": []
    }
  ],
  "git": {
    "updatedTime": 1645436443000,
    "contributors": [
      {
        "name": "秦真",
        "email": "qinzhen09@countrygarden.com.cn",
        "commits": 2
      }
    ]
  },
  "filePathRelative": "guide/index.md"
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
