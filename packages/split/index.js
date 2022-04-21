/*
 * @Author: 秦真
 * @Date: 2021-11-15 11:32:12
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-11-15 11:33:22
 * @Description: 面板分割
 * @FilePath: \admin-fronted\qz-component\packages\split\index.js
 */
import Split from './src/split.vue'

Split.install = (app) => {
  app.component(Split.name, Split)
}

export default Split
