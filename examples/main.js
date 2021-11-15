import Vue from 'vue'
import VueCompositionAPI, { createApp } from '@vue/composition-api'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import BgyComponent from '../src/index'
import '../dist/index.css'
import App from './App.vue'

Vue.use(VueCompositionAPI) // Vue3的 composition api 兼容 Vue2 插件
Vue.use(Antd)
Vue.use(BgyComponent) // 组件库

createApp(App).mount('#app')
