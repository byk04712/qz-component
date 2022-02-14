import Vue from 'vue'
import VueCompositionAPI, { createApp } from '@vue/composition-api'
import moment from 'moment'
import 'moment/locale/zh-cn'

/* ant-design-vue组件 START */
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
/* ant-design-vue组件 START */

/* Bgy组件 START */
import '../src/style/index.less'
import BgyComponent from '../src/index'
/* Bgy组件 END */

import './src/plugins/index'
import App from './App.vue'

moment.locale('zh-cn')

Vue.use(VueCompositionAPI) // Vue3的 composition api 兼容 Vue2 插件
Vue.use(Antd) // Antd 组件库
Vue.use(BgyComponent) // 组件库

createApp(App).mount('#app')
