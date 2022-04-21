---
title: 快速上手
---


# 快速上手
## 前置依赖
- [Ant Design Vue v1.7.8+](https://www.antdv.com)

::: tip 提示
由于本组件基于 ant-design-vue 封装，所以在安装本组件之前需要先安装 ant-design-vue@1.7.8+ 版本
```bash
npm install ant-design-vue@1.7.8 --save
```
:::


## 手动安装

```bash
# --registry 指向指定镜像源地址进行安装
npm install qz-component --save --registry http://10.15.107.221:8081/repository/npm-public/
```

## 完整引入
```js
// main.js
import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import QzComponent from 'qz-component'
// 1. 导入 ant-design-vue 样式文件
import 'ant-design-vue/dist/antd.css'
// 2. 导入 qz-component 样式文件
import 'qz-component/dist/index.css'

Vue.config.productionTip = false

// qz-component 基于 ant-design-vue，必须 use 它
Vue.use(Antd)
Vue.use(QzComponent)

new Vue({
  // ...
  render: function (h) { return h(App) },
}).$mount('#app')

```