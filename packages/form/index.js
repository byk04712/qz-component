/*
 * @Author: 秦真
 * @Date: 2021-11-10 15:12:18
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-11-15 10:57:44
 * @Description: 表单组件
 * @FilePath: \admin-fronted\qz-component\packages\form\index.js
 */
import Form from './src/form.vue'

Form.install = (app) => {
  app.component(Form.name, Form)
}

export default Form
