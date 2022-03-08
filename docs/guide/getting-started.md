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


<!-- ## 私有Npm库
本组件未公开发版到 [Npm](https://www.npmjs.com/) 库中，而是发布在 [内网Npm](http://10.15.107.221:8081/#browse/search/npm/) 库中，因此在安装之前需要设置 npm 镜像，推荐使用 NRM 方式管理镜像源。

> 以下方式选择其中一种即可
- NRM方式管理镜像
```bash
# 全局安装 nrm，如果已安装请忽略
npm install nrm --global

# 添加镜像源 bgy
nrm add bgy http://10.15.107.221:8081/repository/npm-public/

# 列出已有镜像源
nrm ls

# 切换到镜像源地址为上面添加的 bgy 地址
nrm use bgy
```

- NPM方式管理镜像
```bash
# 设置镜像源地址
npm config set http://10.15.107.221:8081/repository/npm-public/
```

- YARN方式管理镜像
```bash
# 设置镜像源地址
yarn config set registry http://10.15.107.221:8081/repository/npm-public/
``` -->


## 手动安装

```bash
# --registry 指向指定镜像源地址进行安装
npm install bgy-component --save --registry http://10.15.107.221:8081/repository/npm-public/
```

## 发布新版本
> 发布新版本包需要注册到另一个镜像源地址
::: details 点击查看发布步骤
```bash
# 这里建议使用 nrm 来管理镜像源
# 添加发版镜像源地址，用于发布组件库使用
nrm add bgy-publish http://10.15.107.221:8081/repository/bgy-npm/

# 添加安装组件库地址
nrm add bgy-public http://10.15.107.221:8081/repository/npm-public/

# 发版请切换到 nrm use bgy-publish   安装请切换到 nrm use bgy-public
nrm use bgy-publish
```
:::

## 完整引入
```js
// main.js
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