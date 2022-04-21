import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import QzComponent from '../../src/index'
import '../../dist/index.css'

export default ({ Vue }) => {
  Vue.use(Antd)
  Vue.use(QzComponent)
}