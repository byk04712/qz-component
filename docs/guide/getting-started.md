---
title: 快速上手
prev: /guide/
---


# 快速上手
## 前置依赖
- [Ant Design Vue v1.7.8+](https://www.antdv.com)

::: tip
由于本组件基于 ant-design-vue 封装，所以在安装本组件之前需要先安装 ant-design-vue@1.7.8+ 版本
```bash:no-line-numbers
npm install ant-design-vue@1.7.8 --save
```
:::

<!-- 
## 私有Npm库
本组件未公开发版到 [Npm](https://www.npmjs.com/) 库中，而是发布在 [内网Npm](http://10.15.107.221:8081/#browse/search/npm/) 库中，因此在安装之前需要设置 npm 镜像，推荐使用 NRM 方式管理镜像源。

:::: code-group
::: code-group-item NRM
```bash:no-line-numbers
# 全局安装 nrm，如果已安装请忽略
npm install nrm --global

# 添加镜像源 bgy
nrm add bgy http://10.15.107.221:8081/repository/npm-public/

# 列出已有镜像源
nrm ls

# 切换到镜像源地址为上面添加的 bgy 地址
nrm use bgy
```
:::
::: code-group-item NPM
```bash:no-line-numbers
# 设置镜像源地址
npm config set http://10.15.107.221:8081/repository/npm-public/
```
:::
::: code-group-item YARN
```bash:no-line-numbers
# 设置镜像源地址
yarn config set registry http://10.15.107.221:8081/repository/npm-public/
```
:::
::::
 -->

## 手动安装

```bash:no-line-numbers
# --registry 指向指定镜像源地址进行安装
npm install bgy-component --save --registry http://10.15.107.221:8081/repository/npm-public/
```

## 完整引入
:::: code-group
::: code-group-item main.js
```v-pre
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
:::