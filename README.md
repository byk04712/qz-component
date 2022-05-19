# Vue2.x + Vite2.x + TypeScript 基于 Ant Design for Vue 封装通用组件库

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

### 友情链接
- [Vue2](https://v2.vuejs.org/)
- [AntDesign for Vue](https://1x.antdv.com/)

### Setup
```bash
git clone https://github.com/byk04712/qz-component

cd qz-component

npm i

npm run dev
````

### Usage
```js
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
### 目录结构
```
├── build # 编译脚本
├── dist # 打包后的代码
├── docs # 文档目录
├── coverage # 覆盖率报告（暂无）
├── examples # 代码范例
├── node_modules
├── packages # 组件代码
├── scripts # 脚本 发布、提交信息检查
├── src # 通⽤代码
├── test # 测试（暂无）
└── types # TS类型定义
```

