---
home: true
description: 基于 Ant Design Vue 封装，快速开发中后台系统页面
title: 首页

heroImage: /images/logo.png
# heroText: BgyComponent 组件库
tagline: 基于 Ant Design Vue 封装，快速开发中后台系统页面

actionText: 快速上手
actionLink: /guide/getting-started

features:
  - title: 简洁至上
    details: 以配置为中心的项目结构，以最少的配置帮助你专注于页面开发。
  - title: 基于 Ant Design Vue
    details: 在Ant Design Vue上进行封装扩展组件封装，尽可能的减少学习成本，照着文档示例即可轻松上手开发。
  - title: We want you
    details: 站在巨人的肩膀上，我们可以看得更远。诚邀你的参与，为项目添砖加瓦。

---

### 引入简单
```js
import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import BgyComponent from 'bgy-component'
// 1. 导入 ant-design-vue 样式文件
import 'ant-design-vue/dist/antd.css'
// 2. 导入 bgy-component 样式文件
import 'bgy-component/dist/index.css'

Vue.config.productionTip = false

// bgy-component 基于 ant-design-vue，必须 use 它
Vue.use(Antd)
Vue.use(BgyComponent)

new Vue({
  // ...
  render: function (h) { return h(App) },
}).$mount('#app')

```

::: slot footer
footer: MIT Licensed | Copyright © 2022-present qinzhen09@countrygarden.com.cn
:::