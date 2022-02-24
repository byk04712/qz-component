export const data = {
  "key": "v-fb0f0066",
  "path": "/guide/getting-started.html",
  "title": "快速上手",
  "lang": "zh-CN",
  "frontmatter": {
    "title": "快速上手",
    "prev": "/guide/"
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "前置依赖",
      "slug": "前置依赖",
      "children": []
    },
    {
      "level": 2,
      "title": "手动安装",
      "slug": "手动安装",
      "children": []
    },
    {
      "level": 2,
      "title": "完整引入",
      "slug": "完整引入",
      "children": []
    }
  ],
  "git": {
    "updatedTime": 1645606813000,
    "contributors": [
      {
        "name": "秦真",
        "email": "qinzhen09@countrygarden.com.cn",
        "commits": 4
      }
    ]
  },
  "filePathRelative": "guide/getting-started.md"
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
